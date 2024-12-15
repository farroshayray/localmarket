import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Navbar from "@/components/ui/navbar";

interface CartItem {
  id: number;
  product_id: number;
  product_name: string;
  product_description: string;
  product_price: number;
  product_image_url: string;
  quantity: number;
  subtotal: number;
}

interface CartTransaction {
  id: number;
  from_user_id: number;
  to_user_id: number;
  market_name: string;
  total_amount: number;
  status: string;
  description: string | null;
  created_at: string;
  updated_at: string;
  items: CartItem[];
}

const CartPage: React.FC = () => {
  const router = useRouter();
  const [cart, setCart] = useState<CartTransaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  const getAuthHeaders = () => {
    const token = localStorage.getItem("access_token");
    return { Authorization: `Bearer ${token}` };
  };

  useEffect(() => {
    const userId = localStorage.getItem("id");
    if (!userId) {
      alert("Please log in to view your cart.");
      router.push("/login");
      return;
    }

    const fetchCart = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/cart/list/${userId}`, {
          headers: getAuthHeaders(),
        });
        setCart(response.data.cart);
      } catch (err) {
        setError("Failed to fetch cart data. Please try again.");
        console.error("Error fetching cart data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  const handleDeleteItem = async (userId: string, productId: number) => {
    const confirmDelete = confirm("Apakah produk akan dihapus?");
    if (!confirmDelete) return;

    try {
      const response = await axios.delete(
        `${API_BASE_URL}/cart/delete/${userId}/${productId}`,
        { headers: getAuthHeaders() }
      );
      if (response.status === 200) {
        alert("Produk berhasil dihapus.");
        setCart((prevCart) =>
          prevCart
            .map((transaction) => ({
              ...transaction,
              items: transaction.items.filter(
                (item) => item.product_id !== productId
              ),
            }))
            .filter((transaction) => transaction.items.length > 0)
        );
      }
    } catch (err) {
      console.error("Error deleting item:", err);
      alert("Gagal menghapus produk. Silakan coba lagi.");
    }
  };

  const updateQuantity = (transactionId: number, itemId: number, quantity: number) => {
    setCart((prevCart) =>
      prevCart.map((transaction) => {
        if (transaction.id === transactionId) {
          const updatedItems = transaction.items.map((item) =>
            item.id === itemId
              ? { ...item, quantity, subtotal: quantity * item.product_price }
              : item
          );

          const updatedTotalAmount = updatedItems.reduce((sum, item) => sum + item.subtotal, 0);

          return {
            ...transaction,
            items: updatedItems,
            total_amount: updatedTotalAmount,
          };
        }
        return transaction;
      })
    );
  };

  const syncQuantityToServer = async (itemId: number, quantity: number) => {
    try {
      await axios.put(
        `${API_BASE_URL}/cart/update_quantity`,
        {
          item_id: itemId,
          quantity,
        },
        { headers: getAuthHeaders() }
      );
    } catch (err) {
      console.error("Error updating quantity on server:", err);
      alert("Failed to update quantity. Please try again.");
    }
  };

  const handlePayment = async (transaction: CartTransaction) => {
    try {
      for (const item of transaction.items) {
        await syncQuantityToServer(item.id, item.quantity);
      }
      router.push(`/transaction_detail/${transaction.id}`);
    } catch (err) {
      alert("Failed to process payment. Please try again.");
    }
  };

  if (loading) {
    return <p className="text-center text-gray-600 mt-4">Loading cart...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500 mt-4">{error}</p>;
  }

  if (cart.length === 0) {
    return (
      <>
        <Navbar />
        <p className="text-center text-gray-600 mt-4">Your cart is empty.</p>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto mt-8 p-6 bg-white shadow-md rounded-lg">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Keranjang Anda</h1>
        {cart.map((transaction) => (
          <div key={transaction.id} className="mb-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">
              Agen: {transaction.market_name}
            </h2>
            <div className="p-4 rounded-lg bg-gray-50">
              {transaction.items.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-start sm:items-center mb-4 flex-col sm:flex-row bg-gray-200 p-2 rounded-lg"
                >
                  <div className="flex my-2">
                    <img
                      src={item.product_image_url}
                      alt={item.product_name}
                      className="w-16 h-16 object-cover rounded mr-4"
                    />
                    <div>
                      <p className="text-gray-800 font-semibold">
                        {item.product_name}
                      </p>
                      <p className="text-sm text-gray-600">
                        {item.product_description}
                      </p>
                      <p className="text-sm text-gray-600">
                        Harga: Rp {item.product_price.toLocaleString()}
                      </p>
                      <div className="flex items-center mt-2">
                        <button
                          onClick={() => {
                            if (item.quantity > 1) {
                              const newQuantity = item.quantity - 1;
                              updateQuantity(transaction.id, item.id, newQuantity);
                              syncQuantityToServer(item.id, newQuantity);
                            }
                          }}
                          className="bg-gray-300 text-black px-2 py-1 rounded"
                        >
                          -
                        </button>
                        <span className="mx-2 text-gray-800 font-semibold">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => {
                            const newQuantity = item.quantity + 1;
                            updateQuantity(transaction.id, item.id, newQuantity);
                            syncQuantityToServer(item.id, newQuantity);
                          }}
                          className="bg-gray-300 text-black px-2 py-1 rounded"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-800 font-semibold">
                    Subtotal: Rp {item.subtotal.toLocaleString()}
                  </p>
                  <button
                    onClick={() =>
                      handleDeleteItem(localStorage.getItem("id")!, item.product_id)
                    }
                    className="bg-red-800 text-white rounded hover:bg-red-900"
                  >
                    <p className="m-2">Hapus</p>
                  </button>
                </div>
              ))}
              <div className="border-t pt-2 mt-2 flex justify-between">
                <p className="text-gray-800 font-bold">
                  Jumlah Total: Rp {transaction.total_amount.toLocaleString()}
                </p>
                <button
                  onClick={() => handlePayment(transaction)}
                  className="bg-blue-800 text-white rounded hover:bg-blue-950"
                >
                  <p className="m-2">Pembayaran</p>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default CartPage;
