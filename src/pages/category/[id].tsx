import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import styles from "./category_grid.module.css";
import Navbar from "@/components/ui/navbar";

// Define Product interface
interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
}

const CategoryProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categoryName, setCategoryName] = useState<string>("Category Products");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (!id) return;

    const fetchCategoryProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${API_BASE_URL}/products/category_products/${id}`
        );
        const { products, category_name } = response.data;

        setProducts(
          products.map((product: any) => ({
            id: product.id,
            title: product.product_name,
            description: product.description,
            price: product.price,
            imageUrl: product.image_url,
          }))
        );
        setCategoryName(category_name);
      } catch (err) {
        setError("Failed to fetch products. Please try again.");
        console.error("Error fetching category products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryProducts();
  }, [id]);

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
    <>
    <Navbar />
    <div className={styles.container}>
      <h1 className={styles.categoryTitle}>{categoryName}</h1>
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
              <p className={styles.productPrice}>
                Rp {product.price.toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
    </>
  );
};

export default CategoryProducts;
