import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import API_BASE_URL from "../../../config";

interface Category {
  id: number;
  category_name: string;
  description: string;
  image_url: string;
}

const CategoryDropdown: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/products/categories`);
        setCategories(response.data.categories);
      } catch (err) {
        setError("Failed to fetch categories. Please try again.");
        console.error("Error fetching categories:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  if (loading) {
    return <button className="text-white hover:text-gray-300">Loading...</button>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="text-white hover:text-gray-300"
      >
        Kategori
      </button>
      {isDropdownOpen && (
        <div className="absolute top-full left-0 mt-2 bg-white shadow-lg rounded-md w-64 z-10">
          <ul className="divide-y divide-gray-200">
            {categories.map((category) => (
              <li key={category.id} className="p-4 hover:bg-gray-100">
                <Link href={`/category/${category.id}`}>
                  <p className="flex items-center space-x-4">
                    <img
                      src={category.image_url}
                      alt={category.category_name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="text-sm font-semibold text-gray-700">{category.category_name}</h3>
                      <p className="text-xs text-gray-500">{category.description}</p>
                    </div>
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CategoryDropdown;
