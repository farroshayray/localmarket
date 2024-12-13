import React, { useState, useEffect } from "react";
import Navbar from "@/components/ui/navbar";
import ProtectedRoute from "@/components/ProtectedRoute";
import axios from "axios";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";

const MapComponent = dynamic(() => import("@/components/MapComponent"), { ssr: false });
const ReviewForm = dynamic(() => import("@/components/reviewForm"), { ssr: false });

interface Product {
  id: number;
  product_name: string;
  product_description: string;
  product_image_url: string;
  product_price: number;
  quantity: number;
  subtotal: number;
}

interface Transaction {
  id: number;
  market_name: string;
  total_amount: number;
  items: Product[];
  created_at: string;
  status: string;
  shipping_cost: number;
  description: string;
  user_location: string;
}

const TransactionList: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [showMap, setShowMap] = useState<{ [key: number]: boolean }>({});
  const [driverLocations, setDriverLocations] = useState<{ [key: number]: { lat: number; lng: number } | null }>({});
  const [showReviewForm, setShowReviewForm] = useState<{ [key: number]: boolean }>({});
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        setLoading(true);
        const userId = localStorage.getItem("id");
        const token = localStorage.getItem("access_token");

        if (!userId || !token) {
          throw new Error("User ID or token not found.");
        }

        const response = await axios.get(`${API_BASE_URL}/transaction/transaction_list/user/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setTransactions(response.data.transactions);
        setErrorMessage("");
      } catch (error: any) {
        console.error("Error fetching transactions:", error);
        setErrorMessage(
          error.response?.data?.message || "Failed to fetch transactions. Please try again later."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  const fetchDriverLocation = async (transactionId: number) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/transaction/driver_location/${transactionId}`);
      const location = JSON.parse(response.data.driver_location);
      if (location?.lat && location?.lng) {
        setDriverLocations((prev) => ({ ...prev, [transactionId]: location }));
      } else {
        console.warn(`Invalid location data for transaction ${transactionId}`);
      }
    } catch (error) {
      console.error("Error fetching driver location:", error);
    }
  };

  useEffect(() => {
    const intervals: { [key: number]: NodeJS.Timeout } = {};

    Object.keys(showMap).forEach((transactionId) => {
      const id = parseInt(transactionId, 10);
      if (showMap[id]) {
        intervals[id] = setInterval(() => {
          fetchDriverLocation(id);
        }, 5000);
      }
    });

    return () => {
      Object.values(intervals).forEach(clearInterval);
    };
  }, [showMap]);

  return (
    <ProtectedRoute allowedRoles={["konsumen"]}>
      <Navbar />
      <div className="bg-gray-100 min-h-screen py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Daftar Transaksi</h1>
          {loading ? (
            <p className="text-center text-gray-500">Loading...</p>
          ) : errorMessage ? (
            <p className="text-center text-red-500">{errorMessage}</p>
          ) : transactions.length === 0 ? (
            <p className="text-center text-gray-500">Tidak ada transaksi.</p>
          ) : (
            <div className="bg-white shadow-md rounded-lg p-6">
              {transactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="border border-gray-300 rounded-lg p-4 mb-4"
                >
                  <h3 className="text-lg font-medium text-gray-800 mb-2">
                    ID Transaksi: {transaction.id} - Agen: {transaction.market_name}
                  </h3>
                  <p className="text-sm text-gray-500 mb-4">
                    Dibuat tanggal: {new Date(transaction.created_at).toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-500 mb-4">
                    Deskripsi: {transaction.description}
                  </p>
                  <ul className="list-disc list-inside mb-4">
                    {transaction.items.map((item) => (
                      <li key={item.id} className="text-gray-700 flex justify-between items-center my-1">
                        <span>
                          {item.product_name} - {item.quantity} pcs @Rp. {item.product_price.toLocaleString()} =
                          Rp. {item.subtotal.toLocaleString()}
                        </span>
                        {transaction.status === "completed" && (
                          <span>
                            {showReviewForm[item.id] ? (
                              <ReviewForm
                                productId={item.id}
                                onClose={() => setShowReviewForm((prev) => ({ ...prev, [item.id]: false }))}
                              />
                            ) : (
                              <Button
                                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1"
                                onClick={() =>
                                  setShowReviewForm((prev) => ({ ...prev, [item.id]: true }))
                                }
                              >
                                Review
                              </Button>
                            )}
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                  <p className="text-gray-800 font-bold mb-2">
                    Total: Rp. {(transaction.total_amount + transaction.shipping_cost).toLocaleString()}
                  </p>
                  {transaction.status === "taken" && (
                    <div>
                      {showMap[transaction.id] ? (
                        <div>
                          <MapComponent
                            lat={driverLocations[transaction.id]?.lat || 0}
                            lng={driverLocations[transaction.id]?.lng || 0}
                          />
                          <Button
                            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 mt-2"
                            onClick={() => setShowMap((prev) => ({ ...prev, [transaction.id]: false }))}
                          >
                            Tutup Peta
                          </Button>
                        </div>
                      ) : (
                        <Button
                          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 mt-2"
                          onClick={() => {
                            setShowMap((prev) => ({ ...prev, [transaction.id]: true }));
                            fetchDriverLocation(transaction.id);
                          }}
                        >
                          Lihat Lokasi Driver
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default TransactionList;
