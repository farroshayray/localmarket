import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import styles from './product_grid.module.css';

// Define Product interface
interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
}

const ProductGrid: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/products/all_products`);
        const fetchedProducts = response.data.products.map((product: any) => ({
          id: product.id,
          title: product.product_name,
          description: product.description,
          price: product.price,
          imageUrl: product.image_url,
        }));
        setProducts(fetchedProducts);
      } catch (err) {
        setError("Failed to fetch products. Please try again later.");
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);


  const handleProductClick = (id: number) => {
    router.push(`/product/${id}`);
  };

  if (loading) {
    return <p>Loading products...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
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
  );
};

export default ProductGrid;
