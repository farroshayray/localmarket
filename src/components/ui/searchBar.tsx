import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

interface SearchResult {
  type: string;
  data: any;
}

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter(); // Next.js router for navigation
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  const handleSearch = async (searchTerm: string) => {
    if (!searchTerm.trim()) {
      setResults([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const [productsRes, categoriesRes, agentsRes] = await Promise.all([
        axios.get(`${API_BASE_URL}/products/all_products`),
        axios.get(`${API_BASE_URL}/products/categories`),
        axios.get(`${API_BASE_URL}/user/agents`),
      ]);

      const products = productsRes.data.products.filter((product: any) =>
        product.product_name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      const categories = categoriesRes.data.categories.filter((category: any) =>
        category.category_name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      const agents = agentsRes.data.agents.filter((agent: any) =>
        agent.fullname.toLowerCase().includes(searchTerm.toLowerCase())
      );

      const combinedResults: SearchResult[] = [
        ...products.map((product: any) => ({ type: 'product', data: product })),
        ...categories.map((category: any) => ({ type: 'category', data: category })),
        ...agents.map((agent: any) => ({ type: 'market', data: agent })),
      ];

      setResults(combinedResults.length > 0 ? combinedResults : []);
    } catch (err: any) {
      setError('Gagal memuat data pencarian. Silakan coba lagi.');
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleResultClick = (result: SearchResult) => {
    if (result.type === 'category') {
      // Navigate to category page
      router.push(`/category/${result.data.id}`);
    } else if (result.type === 'product') {
      // Navigate to product page
      router.push(`/product/${result.data.id}`);
    } else if (result.type === 'market') {
      router.push(`/market_product/${result.data.id}`)
    }
    // Add logic for other types (market) if needed
  };

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      handleSearch(query);
    }, 300); // Debounce untuk menghindari terlalu banyak permintaan API
    return () => clearTimeout(delayDebounce);
  }, [query]);

  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Cari produk, kategori, atau pasar..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="bg-gray-700 text-white rounded-md py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {loading && <p className="text-gray-400 text-sm mt-2">Memuat hasil pencarian...</p>}
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      <div className="absolute bg-white rounded-md shadow-lg w-full mt-2 z-10">
        {!loading && query && results.length > 0 && (
          <ul className="divide-y divide-gray-300">
            {results.map((result, index) => (
              <li
                key={index}
                className="p-4 hover:bg-gray-100 cursor-pointer rounded-md"
                onClick={() => handleResultClick(result)}
              >
                {result.type === 'product' && (
                  <div>
                    <small className='text-gray-400'>{result.type} :</small>
                    <p className="font-bold text-gray-800">{result.data.product_name}</p>
                    <p className="text-gray-500 text-sm">{result.data.description}</p>
                  </div>
                )}
                {result.type === 'category' && (
                  <div>
                    <small className='text-gray-400'>{result.type} :</small>
                    <p className="font-bold text-gray-800">{result.data.category_name}</p>
                    <p className="text-gray-500 text-sm">{result.data.description}</p>
                  </div>
                )}
                {result.type === 'market' && (
                  <div>
                    <small className='text-gray-400'>{result.type} :</small>
                    <p className="font-bold text-gray-800">{result.data.fullname}</p>
                    <p className="text-gray-500 text-sm">{result.data.email}</p>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
        {!loading && query && results.length === 0 && (
          <p className="text-gray-500 text-sm p-4">Tidak ada data pencarian.</p>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
