import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import styles from './market_product_grid.module.css';
import Navbar from '@/components/ui/navbar';

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
}

const MarketProductPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [marketName, setMarketName] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const router = useRouter();
  const { marketId } = router.query; // Extract marketId from URL

  useEffect(() => {
    if (!marketId) return;
  
    const fetchProducts = async () => {
      try {
        setLoading(true);
        try {
          const response = await axios.get(`${API_BASE_URL}/products/agen_products/${marketId}`);
          const market_name = response.data.market_name;
          const fetchedProducts = response.data.products.map((product: any) => ({
            id: product.id,
            title: product.product_name,
            description: product.description,
            price: product.price,
            imageUrl: product.image_url,
          }));
          setProducts(fetchedProducts);
          setMarketName(market_name);
        } catch (err: any) {
          if (axios.isAxiosError(err) && err.response?.status === 404) {
            setError('No products found for this market.');
          } else {
            throw err; // Lempar error lainnya untuk ditangani di luar blok
          }
        }
      } catch (err: any) {
        setError('Failed to fetch products. Please try again later.');
        console.error('Error fetching products:', err.message || err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [marketId]);

  const handleProductClick = (id: number) => {
    router.push(`/product/${id}`);
  };

  if (loading) {
    return <p>Loading products...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (!products.length) {
    return <p className="text-gray-500 text-center">No products available for this market.</p>;
  }

  return (
    <>
    <Navbar />
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4 ml-4 mt-10">Produk di {marketName}</h1>
      <div className={styles.productGrid}>
        {products.map((product) => (
          <div
            key={product.id}
            className={styles.productCard}
            onClick={() => handleProductClick(product.id)}
          >
            <img
              src={product.imageUrl}
              alt={product.title}
              className={styles.productImage}
            />
            <div className={styles.productInfo}>
              <h3 className={styles.productTitle}>{product.title}</h3>
              <p className={styles.productDescription}>{product.description}</p>
              <p className={styles.productPrice}>Rp {product.price.toLocaleString()}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
    </>
  );
};

export default MarketProductPage;
