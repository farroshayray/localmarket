import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TopUpBalance: React.FC = () => {
  const [balance, setBalance] = useState<number | null>(null);
  const [amount, setAmount] = useState<number | string>('');
  const [pin, setPin] = useState<string>('');
  const [pinError, setPinError] = useState<string | null>(null); // Pin validation error
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false); // Toggle for showing the form
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  // Fetch the current balance
  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const token = localStorage.getItem('access_token');
        if (!token) {
          setError('User is not authenticated. Please log in.');
          return;
        }
        const response = await axios.get(`${API_BASE_URL}/user/get_balance`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBalance(response.data.balance);
      } catch (err: any) {
        setError(err.response?.data?.error || 'Failed to fetch balance.');
        console.error('Error fetching balance:', err);
      }
    };

    fetchBalance();
  }, [API_BASE_URL]);

  const handlePinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPin(value);

    if (!/^\d{0,6}$/.test(value)) {
      setPinError('PIN must be up to 6 numeric digits.');
    } else if (value.length !== 6 && value.length > 0) {
      setPinError('PIN must be exactly 6 digits.');
    } else {
      setPinError(null); // No error
    }
  };

  const handleTopUp = async () => {
    if (!amount || !pin) {
      setError('Amount and PIN are required.');
      return;
    }

    if (pinError) {
      setError('Please fix the PIN error before submitting.');
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem('access_token');
      const response = await axios.post(
        `${API_BASE_URL}/user/topup`,
        { amount: Number(amount), pin },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage(response.data.message);
      setAmount('');
      setPin('');
      setError(null);
      // Refresh balance after top-up
      const balanceResponse = await axios.get(`${API_BASE_URL}/user/get_balance`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBalance(balanceResponse.data.balance);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to top-up balance.');
      setMessage(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="cover mx-auto mt-8 p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Saldo Anda</h1>
      {balance !== null && (
        <p className="text-lg font-medium text-gray-800 mb-4 flex">
          Saldo Anda: <span className="text-green-600 ml-2">Rp {balance.toLocaleString()}</span>
        </p>
      )}
      <button
        onClick={() => setShowForm(!showForm)} // Toggle form visibility
        className={`w-full bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 ${
          showForm ? 'mb-4' : ''
        }`}
      >
        {showForm ? 'Minimize' : 'Top-Up Saldo'}
      </button>
      {showForm && (
        <>
          <div className="mb-4">
            <label className="block font-medium text-gray-700">Nominal</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full border px-3 py-2 rounded-lg text-gray-800"
              placeholder="Enter top-up amount"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block font-medium text-gray-700">PIN</label>
            <input
              type="password"
              value={pin}
              onChange={handlePinChange}
              className="w-full border px-3 py-2 rounded-lg text-gray-800"
              placeholder="Enter your 6-digit PIN"
              required
            />
            {pinError && <p className="text-red-500 text-sm mt-2">{pinError}</p>}
          </div>
          <button
            onClick={handleTopUp}
            disabled={loading || !!pinError}
            className={`w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 ${
              loading || pinError ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {loading ? 'Processing...' : 'Top-Up'}
          </button>
        </>
      )}
      {message && <p className="mt-4 text-green-500">{message}</p>}
      {error && <p className="mt-4 text-red-500">{error}</p>}
    </div>
  );
};

export default TopUpBalance;
