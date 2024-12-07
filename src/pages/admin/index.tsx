'use client';

import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '@/components/ui/navbar';
import ProtectedRoute from "@/components/ProtectedRoute";
import ImageUploader from '@/components/ui/imageUploader';

const AdminPage: React.FC = () => {
  const [categoryName, setCategoryName] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const API_URL = `${API_BASE_URL}/products/add_category`;
  const UPLOAD_URL = `${API_BASE_URL}/upload/files`;

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const data = {
      category_name: categoryName,
      description,
      image_url: imageUrl,
    };

    try {
      const response = await axios.post(API_URL, data, {
        headers: { 'Content-Type': 'application/json' },
      });
      if (response.status === 201 || response.status === 200) {
        setMessage('Category created successfully!');
        setCategoryName('');
        setDescription('');
        setImageUrl('');
      } else {
        setMessage('Failed to create category.');
      }
    } catch (error) {
      console.error('Error creating category:', error);
      setMessage('An error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <Navbar />
      <div className="max-w-4xl mx-auto mt-8 p-6 bg-white shadow-md rounded-lg">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Create Category</h1>
        {message && <p className={`mb-4 ${message.includes('success') ? 'text-green-500' : 'text-red-500'}`}>{message}</p>}
        <form onSubmit={handleFormSubmit}>
          <div className="mb-4">
            <label htmlFor="categoryName" className="block text-gray-700 font-medium mb-2">
              Category Name
            </label>
            <input
              type="text"
              id="categoryName"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-500"
              placeholder="Enter category name"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-gray-700 font-medium mb-2">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-500"
              placeholder="Enter category description"
              required
            />
          </div>
          <ImageUploader
            onUploadSuccess={(url) => setImageUrl(url)}
            uploadUrl={UPLOAD_URL}
          />
          <button
            type="submit"
            className={`w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-medium ${loading ? 'opacity-50' : 'hover:bg-blue-700'}`}
            disabled={loading}
          >
            {loading ? 'Processing...' : 'Create Category'}
          </button>
        </form>
      </div>
    </ProtectedRoute>
  );
};

export default AdminPage;
