import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import TopUpBalance from "@/components/ui/topUpBalance";
import Navbar from "@/components/ui/navbar";
import SetDeliveryLocation from "@/components/ui/setDeliveryLocation";
import UpdateDescription from "@/components/ui/updateDescription";
import { Button } from "@/components/ui/button";

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

const TransactionDetailPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [transaction, setTransaction] = useState<CartTransaction | null>(null);
  const [shippingCost, setShippingCost] = useState<number>(0);
  const [balance, setBalance] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    if (!id) return;

    const fetchTransactionDetail = async () => {
      try {
        const token = localStorage.getItem("access_token");
        const response = await axios.get(`${API_BASE_URL}/transaction/detail/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTransaction(response.data.transaction);
      } catch (err) {
        setError("Failed to fetch transaction details. Please try again.");
        console.error("Error fetching transaction details:", err);
      } finally {
        setLoading(false);
      }
    };

    const fetchBalance = async () => {
      try {
        const token = localStorage.getItem("access_token");
        const response = await axios.get(`${API_BASE_URL}/user/get_balance`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBalance(response.data.balance);
      } catch (err) {
        console.error("Error fetching balance:", err);
      }
    };

    fetchTransactionDetail();
    fetchBalance();
  }, [id]);

  const handlePayment = async () => {
    try {
      const token = localStorage.getItem("access_token");
      if (!transaction) return;

      const amount_update_balance = transaction.total_amount + Number(shippingCost);
      // Deduct balance
      const deductBalanceResponse = await axios.put(
        `${API_BASE_URL}/user/update_balance`,
        {
          amount: amount_update_balance,
          plus_minus: "minus",
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert(deductBalanceResponse.data.message);

      // Update transaction status
      const updateStatusResponse = await axios.put(
        `${API_BASE_URL}/transaction/update_status`,
        {
          transaction_id: transaction.id,
          status: "ordered",
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert(updateStatusResponse.data.message);
      router.push("/home");
    } catch (err: any) {
      if (err.response?.data?.error) {
        alert(err.response.data.error);
      } else {
        console.error("Error during payment process:", err);
        alert("Failed to process payment. Please try again.");
      }
    }
  };

  if (loading) {
    return <p className="text-center text-gray-600 mt-4">Loading transaction details...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500 mt-4">{error}</p>;
  }

  if (!transaction) {
    return <p className="text-center text-gray-600 mt-4">Transaction not found.</p>;
  }

  const totalCost = transaction.total_amount + shippingCost;

  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto mt-8 p-6 bg-white shadow-md rounded-lg">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Detail Transaksi</h1>
        <h2 className="text-lg font-semibold text-gray-700 mb-2">
          Market: {transaction.market_name}
        </h2>
        <div className="bg-gray-100 p-4 rounded-lg">
          {transaction.items.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center mb-4"
            >
              <div className="flex">
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
                  <p className="text-sm text-gray-600">
                    Jumlah: {item.quantity}
                  </p>
                </div>
              </div>
              <p className="text-gray-800 font-semibold">
                Subtotal: Rp {item.subtotal.toLocaleString()}
              </p>
            </div>
          ))}
          <div className="border-t pt-2 mt-2">
            <p className="text-gray-800 font-bold">
              Total Harga Produk: Rp {transaction.total_amount.toLocaleString()}
            </p>
          </div>
        </div>
        <UpdateDescription
          transactionId={transaction.id}
          onDescriptionUpdate={() => {
            alert("Description updated successfully!");
          }}
        />
        <SetDeliveryLocation
          transactionId={transaction.id}
          onLocationUpdate={(distanceKm, shippingCost) => {
            alert(`Distance: ${distanceKm} km, Shipping Cost: Rp ${shippingCost.toLocaleString()}`);
            setShippingCost(shippingCost);
          }}
        />
        <TopUpBalance />
      </div>
      <div className="max-w-4xl mx-auto mt-8 p-6 bg-white shadow-md rounded-lg">
        <div className="flex justify-between">
          <div>
            <p className="text-gray-600">Harga Belanjaan: Rp {transaction.total_amount.toLocaleString()}</p>
            <p className="text-gray-600">Biaya Pengantaran: Rp {shippingCost.toLocaleString()}</p>
            <hr className="my-2 border-gray-800" />
            <p className="text-black font-bold">
              Total Keseluruhan: Rp {totalCost.toLocaleString()}
            </p>
            {balance !== null && (
              <div className="flex">
                <p className="text-gray-600 mt-2">
                  Saldo Anda: <span className="text-green-600">Rp {balance.toLocaleString()}</span>
                </p>
                <p className="text-gray-600 mt-2 ml-4">
                  {balance >= totalCost ? <span className="text-green-400">Saldo cukup</span> : <span className="text-red-400">Saldo kurang, silahkan topup saldo terlebih dahulu</span>}
                </p>
              </div>
            )}
          </div>
          <Button
            onClick={handlePayment}
            className="bg-green-600 hover:bg-green-700 my-auto"
            disabled={balance !== null && balance < totalCost}
          >
            <p className="text-white p-3">Bayar</p>
          </Button>
        </div>
      </div>
    </>
  );
};

export default TransactionDetailPage;
