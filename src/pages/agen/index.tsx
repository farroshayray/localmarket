import React, { useState, useEffect } from "react";
import Navbar from "@/components/ui/navbar";
import ProtectedRoute from "@/components/ProtectedRoute";
import { Button } from "@/components/ui/button";
import Link from "next/link";
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
}

interface GroupedTransaction {
  consumer_id: number;
  consumer_name: string;
  transactions: Transaction[];
}

const tabs = [
  { label: "Belum Bayar", status: "cart" },
  { label: "Order Masuk", status: "ordered" },
  { label: "Order Diproses", status: "processed" },
  { label: "Order Selesai", status: "completed" },
];

const Agen: React.FC = () => {
  const [groupedTransactions, setGroupedTransactions] = useState<GroupedTransaction[]>([]);
  const [selectedTab, setSelectedTab] = useState<string>("cart");
  const [loading, setLoading] = useState<boolean>(true);
  const [noDataMessage, setNoDataMessage] = useState<string>("");

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        setLoading(true);
        const agentId = localStorage.getItem("id"); // Assuming agent ID is stored in localStorage
        if (!agentId) {
          throw new Error("Agent ID not found.");
        }
        if (selectedTab === "cart") {
          const response = await axios.get(
            `http://127.0.0.1:5000/transaction/status_cart/agent/${agentId}`
          );
          if (response.data.grouped_transactions?.length > 0) {
            setGroupedTransactions(response.data.grouped_transactions);
            setNoDataMessage(""); // Clear message if data exists
          } else {
            setGroupedTransactions([]);
            setNoDataMessage(response.data.message || "No transactions found.");
          }
        }
      } catch (error: any) {
        if (error.response && error.response.status === 404) {
          setGroupedTransactions([]);
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

  return (
    <ProtectedRoute allowedRoles={["agen"]}>
      <Navbar />
      <div className="bg-gray-100 min-h-screen py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Agen Transactions</h1>

          {/* Feature buttons */}
          <div className="flex justify-center mb-4">
            <Link href="/input_product">
              <Button className="mr-4 bg-gray-200 text-black hover:bg-gray-300">Input Product</Button>
            </Link>
            <Link href="/list_product">
              <Button className="ml-4 bg-gray-200 text-black hover:bg-gray-300">Products</Button>
            </Link>
          </div>

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
          ) : selectedTab === "cart" ? (
            <div className="bg-white shadow-md rounded-lg p-6">
              {groupedTransactions.length === 0 ? (
                <p className="text-center text-gray-500">{noDataMessage}</p>
              ) : (
                groupedTransactions.map((group) => (
                  <div key={group.consumer_id} className="border border-gray-300 rounded-lg p-4 mb-4">
                    <h2 className="text-lg font-semibold text-gray-800 mb-2">
                      Konsumen: {group.consumer_name}
                    </h2>
                    {group.transactions.map((transaction) => (
                      <div key={transaction.id} className="mb-4">
                        <h3 className="text-gray-700 font-medium mb-2">
                          Transaction ID: {transaction.id} - Market: {transaction.market_name}
                        </h3>
                        <ul className="list-disc list-inside text-gray-700">
                          {transaction.items.map((item) => (
                            <li key={item.id}>
                              {item.product_name} - {item.quantity} pcs (
                              Rp {item.product_price.toLocaleString()})
                            </li>
                          ))}
                        </ul>
                        <p className="text-gray-800 font-bold mt-2">
                          Total Amount: Rp {transaction.total_amount.toLocaleString()}
                        </p>
                        <p className="text-sm text-gray-500">
                          Created At: {new Date(transaction.created_at).toLocaleString()}
                        </p>
                      </div>
                    ))}
                  </div>
                ))
              )}
            </div>
          ) : (
            <p className="text-center text-gray-500">Feature under development for this tab.</p>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Agen;
