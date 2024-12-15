import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

const Home_topupBalance: React.FC = () => {
  const [balance, setBalance] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const router = useRouter();

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("access_token");
        if (!token) {
          setError("Tidak dapat melihat saldo, harap login terlebih dahulu..");
          return;
        }
        const response = await axios.get(`${API_BASE_URL}/user/get_balance`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBalance(response.data.balance);
      } catch (err: any) {
        setError(err.response?.data?.error || "Failed to fetch balance.");
        console.error("Error fetching balance:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBalance();
  }, [API_BASE_URL]);

  const handleTopUpNavigate = () => {
    router.push("/topUpBalance");
  };

  return (
    <div className="cover mx-auto p-6 bg-white bg-opacity-20 shadow-md rounded-lg flex">
        <div className="w-full bg-gray-600 p-3 rounded-xl mr-4">
            <h1 className="text-2xl font-bold mb-4 text-gray-200">Saldo Anda</h1>
            {loading ? (
                <p className="text-lg text-gray-600">Loading balance...</p>
            ) : error ? (
                <p className="text-lg text-red-500">{error}</p>
            ) : (
                <>
                {balance !== null && (
                    <p className="text-lg font-medium text-gray-200 mb-4 flex">
                    Saldo Anda: <span className="text-green-600 ml-2">Rp {balance.toLocaleString()}</span>
                    </p>
                )}
                <button
                    onClick={handleTopUpNavigate}
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
                >
                    Top-Up Saldo
                </button>
                </>
            )}
        
      </div>
    </div>
  );
};

export default Home_topupBalance;
