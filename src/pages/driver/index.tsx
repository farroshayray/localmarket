import React, { useState, useEffect } from "react";
import Navbar from "@/components/ui/navbar";
import ProtectedRoute from "@/components/ProtectedRoute";
import { Button } from "@/components/ui/button";
import axios from "axios";

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
}

const tabs = [
  { label: "Order List", status: "processed" },
  { label: "Order Taken", status: "taken" },
];

const Driver: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [selectedTab, setSelectedTab] = useState<string>("processed");
  const [loading, setLoading] = useState<boolean>(true);
  const [noDataMessage, setNoDataMessage] = useState<string>("");
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        setLoading(true);
        const agenId = localStorage.getItem("agen_id");
        if (!agenId) {
          throw new Error("Agent ID not found.");
        }

        const endpoint =
          selectedTab === "processed"
            ? `/transaction/status_processed/agent/${agenId}`
            : `/transaction/status_taken/agent/${agenId}`;

        const response = await axios.get(`${API_BASE_URL}${endpoint}`);

        if (response.data.grouped_transactions?.length > 0) {
          const allTransactions = response.data.grouped_transactions.flatMap(
            (group: { transactions: Transaction[] }) => group.transactions
          );
          setTransactions(allTransactions);
          setNoDataMessage("");
        } else {
          setTransactions([]);
          setNoDataMessage(response.data.message || "No transactions found.");
        }
      } catch (error: any) {
        if (error.response && error.response.status === 404) {
          setTransactions([]);
          setNoDataMessage(
            error.response.data.message || "No transactions found for this agent."
          );
        } else {
          console.error("Error fetching transactions:", error);
          setNoDataMessage("Failed to fetch transactions. Please try again later.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [selectedTab]);

  const handleTakeOrder = async (transactionId: number) => {
    try {
      const token = localStorage.getItem("access_token");
      const response = await axios.put(
        `${API_BASE_URL}/transaction/update_status`,
        { transaction_id: transactionId, status: "taken" },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const update_driver_id = await axios.put(
        `${API_BASE_URL}/transaction/update_driver_id`,
        { transaction_id: transactionId, driver_id: localStorage.getItem("id") },
        { headers: { Authorization: `Bearer ${token}` } }
      )

      alert(response.data.message || "Order taken successfully.");
      alert(update_driver_id.data.message || "Driver id updated")

      // setTransactions((prev) => prev.filter((t) => t.id !== transactionId));
    } catch (error: any) {
      console.error("Error taking order:", error);
      alert(
        error.response?.data?.error || error.update_driver_id?.data?.error ||
          "Failed to take order. Please try again later."
      );
    }
  };

  return (
    <ProtectedRoute allowedRoles={["driver"]}>
      <Navbar />
      <div className="bg-gray-100 min-h-screen py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Driver Orders</h1>

          {/* Tabs */}
          <div className="flex justify-center space-x-4 mb-6">
            {tabs.map((tab) => (
              <button
                key={tab.status}
                onClick={() => setSelectedTab(tab.status)}
                className={`px-6 py-2 rounded-lg font-medium ${
                  selectedTab === tab.status
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Transaction List */}
          {loading ? (
            <p className="text-center text-gray-500">Loading...</p>
          ) : transactions.length === 0 ? (
            <p className="text-center text-gray-500">{noDataMessage}</p>
          ) : (
            <div className="bg-white shadow-md rounded-lg p-6">
              {transactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="border border-gray-300 rounded-lg p-4 mb-4 flex flex-col sm:flex-row justify-between"
                >
                  <div>
                    <h3 className="text-gray-700 font-medium mb-2">
                      Transaction ID: {transaction.id} - Market: {transaction.market_name}
                    </h3>
                    <ul className="list-disc list-inside text-gray-700">
                      {transaction.items.map((item) => (
                        <li key={item.id}>
                          {item.product_name} - {item.quantity} pcs @Rp.{" "}
                          {item.product_price.toLocaleString()} = (Rp.{" "}
                          {item.subtotal.toLocaleString()},-)
                        </li>
                      ))}
                    </ul>
                    <p className="text-gray-600 font-bold mt-2">
                      Subtotal Harga Barang: Rp {transaction.total_amount.toLocaleString()}
                    </p>
                    <ul>
                      <li className="list-disc list-inside text-gray-700">
                        Ongkos kirim: Rp{" "}
                        {transaction.shipping_cost
                          ? transaction.shipping_cost.toLocaleString()
                          : "0"}
                      </li>
                    </ul>
                    <p className="text-gray-800 font-bold mt-2 border-2 p-1 rounded-xl border-black">
                      Total Biaya: Rp.{" "}
                      {transaction.total_amount && transaction.shipping_cost
                        ? (transaction.total_amount + transaction.shipping_cost).toLocaleString()
                        : "0"}
                      ,-
                    </p>
                    <p className="text-sm text-gray-500">
                      Transaksi tanggal:{" "}
                      {new Date(transaction.created_at).toLocaleString()}
                    </p>
                  </div>
                  {selectedTab === "processed" && (
                    <div className="my-auto">
                      <Button
                        className="bg-blue-700 hover:bg-blue-800"
                        onClick={() => handleTakeOrder(transaction.id)}
                      >
                        Ambil Order
                      </Button>
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

export default Driver;
