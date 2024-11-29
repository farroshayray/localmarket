import React from "react";
import { useRouter } from "next/router";
import styles from './product_grid.module.css'

interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    imageUrl: string;
  }
  
  interface ProductGridProps {
    products: Product[];
  }
const ProductGrid: React.FC<ProductGridProps> = ({ products }) => {
  const router = useRouter();

  const handleProductClick = (id: number) => {
    router.push(`/product/${id}`);
  }
    return (
      <div className={styles.productGrid}>
        {products.map((product) => (
          <div key={product.id} className={styles.productCard} onClick={() => handleProductClick(product.id)}>
            <img src={product.imageUrl} alt={product.title} className={styles.productImage} />
            <div className={styles.productInfo}>
              <h3 className={styles.productTitle}>{product.title}</h3>
              <p className={styles.productDescription}>{product.description}</p>
              <p className={styles.productPrice}>${product.price.toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>
    );
  };
  
  export default ProductGrid;