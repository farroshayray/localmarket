'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import ProtectedRoute from '@/components/ProtectedRoute';
import Navbar from '@/components/ui/navbar';
import PromotionList from './promotionList';
import { useRouter } from 'next/router';

const CreatePromotion: React.FC = () => {
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const [promotionType, setPromotionType] = useState<'agen' | 'product' | ''>('');
  const [products, setProducts] = useState<any[]>([]);
  const [productId, setProductId] = useState<number | null>(null);
  const [scheme, setScheme] = useState<string>('');
  const [schemePercentage, setSchemePercentage] = useState<number | null>(null);
  const [description, setDescription] = useState<string>('');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [agenId, setAgenId] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    // Safely access localStorage in the browser
    if (typeof window !== 'undefined') {
      setAgenId(localStorage.getItem('id'));
      setToken(localStorage.getItem('access_token'));
    }
  }, []);

  useEffect(() => {
    if (promotionType === 'product' && agenId) {
      fetchProducts();
    }
  }, [promotionType, agenId]);

  const fetchProducts = async () => {
    try {
      if (!agenId || !token) return;
      const response = await axios.get(`${API_BASE_URL}/products/agen_products/${agenId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProducts(response.data.products);
    } catch (err) {
      console.error('Error fetching products:', err);
      setError('Failed to fetch products.');
    }
  };

  const handleSubmit = async () => {
    try {
      if (!token) return;

      const payload = {
        product_id: promotionType === 'product' ? productId : null,
        scheme,
        scheme_percentage: schemePercentage,
        description: description,
        start_date: startDate,
        end_date: endDate,
      };

      const response = await axios.post(`${API_BASE_URL}/promotion/handle_promotion`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      setSuccessMessage('Promotion created successfully!');
      setError(null);
      // Reset form
      setPromotionType('');
      setProductId(null);
      setScheme('');
      setSchemePercentage(null);
      setDescription('');
      setStartDate('');
      setEndDate('');
      router.reload();
      
    } catch (err: any) {
      console.error('Error creating promotion:', err);
      setError(err.response?.data?.error || 'Failed to create promotion.');
    }
  };

  return (
    <ProtectedRoute allowedRoles={['agen']}>
      <Navbar />
      <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-md mt-6 text-gray-800">
        <h1 className="text-2xl font-bold mb-4">Buat Promosi</h1>

        {error && <p className="text-red-600 mb-4">{error}</p>}
        {successMessage && <p className="text-green-600 mb-4">{successMessage}</p>}

        <div className="mb-4">
          <Label htmlFor="promotionType">Tipe Promosi</Label>
          <select
            id="promotionType"
            value={promotionType}
            onChange={(e) => setPromotionType(e.target.value as 'agen' | 'product')}
            className="mt-1 w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">Pilih Tipe Promosi</option>
            <option value="agen">Promo dari Agen</option>
            <option value="product">Promo dari Produk</option>
          </select>
        </div>

        {promotionType === 'product' && (
          <div className="mb-4">
            <Label htmlFor="productId">Pilih Produk</Label>
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="w-full text-left p-2 border border-gray-300 rounded-md bg-white"
              >
                {productId
                  ? products.find((product) => product.id === productId)?.product_name || 'Pilih Produk Anda'
                  : 'Pilih Produk Anda'}
              </button>
              {dropdownOpen && (
                <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 max-h-60 overflow-y-auto">
                  {products.map((product) => (
                    <div
                      key={product.id}
                      onClick={() => {
                        setProductId(product.id);
                        setDropdownOpen(false);
                      }}
                      className="flex items-center p-2 cursor-pointer hover:bg-gray-100"
                    >
                      <img
                        src={product.image_url}
                        alt={product.product_name}
                        className="w-12 h-12 object-cover rounded-md mr-4"
                      />
                      <div>
                        <p className="font-medium">{product.product_name}</p>
                        <p className="text-sm text-gray-600">Rp. {product.price.toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        <div className="mb-4">
          <Label htmlFor="scheme">Skema Promosi</Label>
          <select
            id="scheme"
            value={scheme}
            onChange={(e) => setScheme(e.target.value)}
            className="mt-1 w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">Pilih Skema</option>
            <option value="discount">Discount</option>
            <option value="cashback">Cashback</option>
            <option value="nominal">Nominal</option>
          </select>
        </div>

        <div className="mb-4">
          <Label htmlFor="schemePercentage">Persentase Skema</Label>
          <Input
            id="schemePercentage"
            type="number"
            placeholder="Pilih persentase skema"
            value={schemePercentage || ''}
            onChange={(e) => setSchemePercentage(Number(e.target.value))}
            className="mt-1 w-full"
          />
        </div>
        <div className='mb-4'>
            <Label htmlFor='description'>Deskripsi</Label>
            <Input 
            id="description"
            type='text'
            placeholder='Masukan deskripsi promo'
            value={description || ''}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 w-full"
            />
        </div>

        <div className="mb-4">
          <Label htmlFor="startDate">Dimulai Pada</Label>
          <Input
            id="startDate"
            type="datetime-local"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="mt-1 w-full"
          />
        </div>

        <div className="mb-4">
          <Label htmlFor="endDate">Berakhir Pada</Label>
          <Input
            id="endDate"
            type="datetime-local"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="mt-1 w-full"
          />
        </div>

        <Button
          onClick={handleSubmit}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
        >
          Buat Promosi
        </Button>
      </div>
      <PromotionList />
    </ProtectedRoute>
  );
};

export default CreatePromotion;
