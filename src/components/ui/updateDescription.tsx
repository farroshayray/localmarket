import React, { useState } from "react";
import axios from "axios";

interface UpdateDescriptionProps {
  transactionId: number;
  onDescriptionUpdate: () => void; // Callback to handle UI updates after successful submission
}

const UpdateDescription: React.FC<UpdateDescriptionProps> = ({ transactionId, onDescriptionUpdate }) => {
  const [description, setDescription] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  const handleUpdateDescription = async () => {
    if (!description) {
      setError("Description cannot be empty.");
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem("access_token");

      const response = await axios.put(
        `${API_BASE_URL}/transaction/update_description`,
        {
          transaction_id: transactionId,
          description,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setMessage(response.data.message || "Description updated successfully!");
      setError(null);
      onDescriptionUpdate(); // Notify parent component about the update
    } catch (err: any) {
      setError(err.response?.data?.error || "Failed to update description.");
      setMessage(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="cover mx-auto mt-4 p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-lg font-bold text-gray-800 mb-4">Tambah Pesan/detail pesanan</h2>
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Tambah pesan untuk transaksi anda"
        className="w-full border px-3 py-2 rounded-lg mb-2 text-gray-800"
        rows={3}
      ></textarea>
      <button
        onClick={handleUpdateDescription}
        disabled={loading}
        className={`w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 ${
          loading ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {loading ? "Updating..." : "Update Description"}
      </button>
      {message && <p className="text-green-500 mt-2">{message}</p>}
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default UpdateDescription;
