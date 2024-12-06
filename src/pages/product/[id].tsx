import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Navbar from "@/components/ui/navbar";

interface Product {
  id: number;
  category_id: number;
  product_name: string;
  description: string;
  price: number;
  image_url: string;
  stock: number;
  created_at: string;
  user_id: number;
}

const ProductDetail: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState<Product | null>(null);
  const [categoryName, setCategoryName] = useState<string>("");
  const [shopName, setShopName] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/products/product/${id}`);
        const { product, category_name, shop_name } = response.data;
        console.log(response)

        setProduct({
          id: product.id,
          category_id: product.category_id,
          product_name: product.product_name,
          description: product.description,
          price: product.price,
          image_url: product.image_url,
          stock: product.stock,
          created_at: product.created_at,
          user_id: product.user_id,
        });
        setCategoryName(category_name);
        setShopName(shop_name);
      } catch (err) {
        setError("Failed to fetch product details. Please try again later.");
        console.error("Error fetching product details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    try {
      const userId = localStorage.getItem("id"); // Assuming user_id is stored in localStorage
      if (!userId) {
        alert("Please log in to add items to your cart.");
        router.push("/login");
        return;
      }

      const payload = {
        product_id: product?.id,
        quantity: 1,
      };

      const response = await axios.post(`${API_BASE_URL}/cart/add/${userId}`, payload);
      alert("Product successfully added to cart!");
    } catch (err) {
      console.error("Error adding to cart:", err);
      alert("Failed to add product to cart. Please try again.");
    }
  };

  if (loading) {
    return <p className="text-center text-gray-600 mt-4">Loading product details...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500 mt-4">{error}</p>;
  }

  if (!product) {
    return <p className="text-center text-gray-600 mt-4">Product not found.</p>;
  }

  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto mt-8 p-6 bg-white shadow-md rounded-lg">
        <div className="flex flex-col md:flex-row">
          {/* Image Section */}
          <div className="flex-shrink-0 w-full md:w-1/2">
            <img
              src={product.image_url}
              alt={product.product_name}
              className="w-full h-auto rounded-md object-cover"
            />
          </div>

          {/* Details Section */}
          <div className="mt-6 md:mt-0 md:ml-6 flex flex-col">
            <h1 className="text-2xl font-bold text-gray-800">{product.product_name}</h1>
            <p className="text-sm text-gray-500 mt-2">
              Category: <span className="font-medium text-gray-700">{categoryName}</span>
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Shop: <span className="font-medium text-gray-700">{shopName}</span>
            </p>
            <p className="text-gray-600 mt-4">{product.description}</p>
            <p className="text-gray-600 mt-2">
              Stock: <span className="font-medium">{product.stock}</span>
            </p>
            <p className="text-lg font-bold text-blue-600 mt-4">
              Price: Rp {product.price.toLocaleString()}
            </p>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              className="mt-6 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
            >
              Masukan Keranjang
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
