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
  shipping_cost: number;
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
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        setLoading(true);
        const agentId = localStorage.getItem("id");
        if (!agentId) {
          throw new Error("Agent ID not found.");
        }

        const endpoint =
          selectedTab === "cart"
            ? `/transaction/status_cart/agent/${agentId}`
            : `/transaction/status_${selectedTab}/agent/${agentId}`;

        const response = await axios.get(`${API_BASE_URL}${endpoint}`);

        if (response.data.grouped_transactions?.length > 0) {
          setGroupedTransactions(response.data.grouped_transactions);
          setNoDataMessage("");
        } else {
          setGroupedTransactions([]);
          setNoDataMessage(response.data.message || "Tidak ada transaksi.");
        }
      } catch (error: any) {
        if (error.response && error.response.status === 404) {
          setGroupedTransactions([]);
          setNoDataMessage(
            error.response.data.message || "Belum ada transaksi untuk Agen ini."
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

  const handleProcessOrder = async (transactionId: number) => {
    try {
      const token = localStorage.getItem("access_token");
      const response = await axios.put(
        `${API_BASE_URL}/transaction/update_status`,
        { transaction_id: transactionId, status: "processed" },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert(response.data.message || "Order processed successfully.");

      setGroupedTransactions((prev) =>
        prev.map((group) => ({
          ...group,
          transactions: group.transactions.filter((t) => t.id !== transactionId),
        })).filter((group) => group.transactions.length > 0)
      );
    } catch (error: any) {
      console.error("Error processing order:", error);
      alert(
        error.response?.data?.error ||
          "Failed to process order. Please try again later."
      );
    }
  };

  return (
    <ProtectedRoute allowedRoles={["agen"]}>
      <Navbar />
      <div className="bg-gray-100 min-h-screen py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Transaksi Agen</h1>

          {/* Feature buttons */}
          <div className="flex justify-center mb-4">
            <Link href="/input_product">
              <Button className="mr-4 bg-gray-200 text-black hover:bg-gray-300">Tambah Produk</Button>
            </Link>
            <Link href="/list_product">
              <Button className="ml-4 bg-gray-200 text-black hover:bg-gray-300">Produk Anda</Button>
            </Link>
            <Link href="/input_promotion">
              <Button className="ml-4 bg-gray-200 text-black hover:bg-gray-300">Promosi Anda</Button>
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
          ) : groupedTransactions.length === 0 ? (
            <p className="text-center text-gray-500">{noDataMessage}</p>
          ) : (
            <div className="bg-white shadow-md rounded-lg p-6">
              {groupedTransactions.map((group) =>
                group.transactions.map((transaction) => (
                  <div
                    key={transaction.id}
                    className="border border-gray-300 rounded-lg p-4 mb-4 flex flex-col sm:flex-row justify-between"
                  >
                    <div>
                      <h2 className="text-lg font-semibold text-gray-800 mb-2">
                        Konsumen: {group.consumer_name}
                      </h2>
                      <h3 className="text-gray-700 font-medium mb-2">
                        ID Transaksi: {transaction.id} - Agen: {transaction.market_name}
                      </h3>
                      <ul className="list-disc list-inside text-gray-700">
                        {transaction.items.map((item) => (
                          <li key={item.id}>
                            {item.product_name} - {item.quantity} pcs @Rp. {item.product_price.toLocaleString()} = (Rp. 
                            {item.subtotal.toLocaleString()},-)
                          </li>
                        ))}
                      </ul>
                      <p className="text-gray-600 font-bold mt-2">
                        Subtotal Harga Barang: Rp {transaction.total_amount.toLocaleString()}
                      </p>
                      <ul>
                        <li className="list-disc list-inside text-gray-700">Ongkos kirim: Rp {transaction.shipping_cost ? transaction.shipping_cost.toLocaleString() : '0'}</li>
                      </ul>
                      <p className="text-gray-800 font-bold mt-2 border-2 p-1 rounded-xl border-black">Total Biaya: Rp. {transaction.total_amount && transaction.shipping_cost
                        ? (transaction.total_amount + transaction.shipping_cost).toLocaleString() : '0'},-</p>
                      <p className="text-sm text-gray-500">
                        Transaksi tanggal: {new Date(transaction.created_at).toLocaleString()}
                      </p>
                    </div>
                    {selectedTab === "ordered" && (
                      <div className="my-auto">
                        <Button
                          className="bg-blue-700 hover:bg-blue-800"
                          onClick={() => handleProcessOrder(transaction.id)}
                        >
                          Proses Order
                        </Button>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Agen;
