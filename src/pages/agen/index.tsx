import React, { useState, useEffect } from "react";
import Navbar from "@/components/ui/navbar";
import ProtectedRoute from "@/components/ProtectedRoute";

interface Transaction {
  id: number;
  userName: string;
  products: { name: string; quantity: number }[];
  total: number;
  status: "cart" | "ordered" | "processed" | "completed";
  description: string;
  createdAt: string;
}

const tabs = [
  { label: "Belum Bayar", status: "cart" },
  { label: "Order Masuk", status: "ordered" },
  { label: "Order Diproses", status: "processed" },
  { label: "Order Selesai", status: "completed" },
];

const Agen: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [selectedTab, setSelectedTab] = useState<string>("cart");

  // Mock API call to fetch transactions
  useEffect(() => {
    const fetchTransactions = async () => {
      const mockData: Transaction[] = [
        {
          id: 1,
          userName: "John Doe",
          products: [
            { name: "Product A", quantity: 2 },
            { name: "Product B", quantity: 1 },
          ],
          total: 300000,
          status: "cart",
          description: "Awaiting payment.",
          createdAt: "2023-12-01",
        },
        {
          id: 2,
          userName: "Jane Smith",
          products: [{ name: "Product C", quantity: 3 }],
          total: 450000,
          status: "ordered",
          description: "Order received.",
          createdAt: "2023-12-02",
        },
        {
          id: 3,
          userName: "Bob Johnson",
          products: [{ name: "Product D", quantity: 5 }],
          total: 750000,
          status: "processed",
          description: "Order is being processed.",
          createdAt: "2023-12-03",
        },
        {
          id: 4,
          userName: "Alice Brown",
          products: [
            { name: "Product E", quantity: 1 },
            { name: "Product F", quantity: 2 },
          ],
          total: 500000,
          status: "completed",
          description: "Order completed.",
          createdAt: "2023-12-04",
        },
      ];
      setTransactions(mockData);
    };

    fetchTransactions();
  }, []);

  const filteredTransactions = transactions.filter(
    (transaction) => transaction.status === selectedTab
  );

  return (
    <ProtectedRoute allowedRoles={["agen"]}>
    <Navbar />
    <div className="bg-gray-100 min-h-screen py-6">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Agen Transactions</h1>

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
        <div className="bg-white shadow-md rounded-lg p-6">
          {filteredTransactions.length === 0 ? (
            <p className="text-center text-gray-500">No transactions found.</p>
          ) : (
            filteredTransactions.map((transaction) => (
              <div
                key={transaction.id}
                className="border border-gray-300 rounded-lg p-4 mb-4"
              >
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Transaction ID: {transaction.id}
                </h3>
                <p className="text-gray-700 mb-2">
                  <strong>User:</strong> {transaction.userName}
                </p>
                <p className="text-gray-700 mb-2">
                  <strong>Products:</strong>
                  <ul className="list-disc list-inside">
                    {transaction.products.map((product, index) => (
                      <li key={index}>
                        {product.name} - {product.quantity} pcs
                      </li>
                    ))}
                  </ul>
                </p>
                <p className="text-gray-700 mb-2">
                  <strong>Total:</strong> Rp {transaction.total.toLocaleString()}
                </p>
                <p className="text-gray-700 mb-2">
                  <strong>Description:</strong> {transaction.description}
                </p>
                <p className="text-gray-500 text-sm">
                  <strong>Created At:</strong> {transaction.createdAt}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
    </ProtectedRoute>
  );
};

export default Agen;
