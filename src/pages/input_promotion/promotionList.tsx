'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/router';

const PromotionList: React.FC = () => {
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const [promotions, setPromotions] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const router = useRouter();

  const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;

  useEffect(() => {
    fetchPromotions();
  }, []);

  const fetchPromotions = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/promotion/handle_promotion`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPromotions(response.data);
    } catch (err) {
      console.error('Error fetching promotions:', err);
      setError('Failed to fetch promotions.');
    }
  };

  const handleDelete = async (promotionId: number) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this promotion? This action cannot be undone.'
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(`${API_BASE_URL}/promotion/handle_promotion`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        data: { id: promotionId },
      });
      setSuccessMessage('Promotion deleted successfully!');
      setPromotions(promotions.filter((promotion) => promotion.id !== promotionId));
    } catch (err) {
      console.error('Error deleting promotion:', err);
      setError('Failed to delete promotion.');
    }
  };

  const handleEdit = (promotionId: number) => {
    router.push(`/edit_promotion/${promotionId}`);
  };

  return (
    <>
      <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md mt-6 text-gray-800">
        <h1 className="text-2xl font-bold mb-4">Promosi Anda</h1>

        {error && <p className="text-red-600 mb-4">{error}</p>}
        {successMessage && <p className="text-green-600 mb-4">{successMessage}</p>}

        {promotions.length === 0 ? (
          <p className="text-gray-600">Tidak ada promosi.</p>
        ) : (
          <div className="space-y-4">
            {promotions.map((promotion) => (
              <div key={promotion.id} className="border border-gray-300 rounded-md p-4 flex justify-between">
                <div>
                  <h2 className="font-medium text-lg">{promotion.scheme}</h2>
                  <p className="text-sm text-gray-600">Persentase Skema: {promotion.scheme_percentage}%</p>
                  <p className='text-sm text-gray-600'>Deskripsi: {promotion.description}</p>
                  <p className="text-sm text-gray-600">
                    Dimulai pada: {new Date(promotion.start_date).toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-600">
                    Berakhir pada: {new Date(promotion.end_date).toLocaleString()}
                  </p>
                </div>
                <div className="space-x-2">
                  <Button
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                    onClick={() => handleEdit(promotion.id)}
                  >
                    Ubah
                  </Button>
                  <Button
                    className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
                    onClick={() => handleDelete(promotion.id)}
                  >
                    Hapus
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default PromotionList;
