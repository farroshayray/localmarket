import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import axios from 'axios';
import styles from './category_list.module.css';
import { useRouter } from 'next/router';

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  promotion?: {
    scheme: string;
    scheme_percentage: number;
    description: string;
  };
}

interface CategoryListProps {
  categoryId: number;
}

function capitalizeFirstLetter(text: string): string {
  if (!text) return '';
  return text.charAt(0).toUpperCase() + text.slice(1);
}

const CategoryList: React.FC<CategoryListProps> = ({ categoryId }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [categoryName, setCategoryName] = useState<string | null>(null);
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const router = useRouter();

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      try {
        setLoading(true);
        console.log(`Fetching from: ${API_BASE_URL}/products/category_products/${categoryId}`);
        const response = await axios.get(`${API_BASE_URL}/products/category_products/${categoryId}`);
        
        // Handle successful response
        if (response.data && response.status === 200) {
          const { category_name, products } = response.data;
          setCategoryName(category_name);
          const fetchedProducts = products.map((product: any) => ({
            id: product.id,
            title: product.product_name,
            description: product.description,
            price: product.price,
            imageUrl: product.image_url,
            promotion: product.promotion
              ? {
                  scheme: product.promotion.scheme,
                  scheme_percentage: product.promotion.scheme_percentage,
                  description: product.promotion.description,
                }
              : null,
          }));
          setProducts(fetchedProducts);
        } 
      } catch (err: any) {
        console.error('Error details:', err);

        // Gracefully handle the 404 error
        if (err.response && err.response.status === 404) {
          setError('Category not found.');
        } else if (err.request) {
          setError('No response from the server. Please check your network.');
        } else {
          setError('An unexpected error occurred. Please try again later.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryProducts();
  }, [categoryId]);

  const handleProductClick = (id: number) => {
    router.push(`/product/${id}`);
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 2 },
      },
    ],
  };

  if (loading) {
    return <p>Loading products...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>; // Display error message
  }

  return (
    <div>
      <h2 className="mb-3 text-xl font-semibold">{capitalizeFirstLetter(categoryName || 'Category')}</h2>
      <div className={styles.sliderContainer}>
        <Slider {...settings}>
          {products.map((product) => (
            <div key={product.id} onClick={() => handleProductClick(product.id)}>
              <div className={styles.productCard}>
                {product.promotion && (
                  <div className={styles.promotionLabel}>
                    {`${capitalizeFirstLetter(product.promotion.scheme)}  ${product.promotion.scheme_percentage}%`}
                  </div>
                )}
                <img src={product.imageUrl} alt={product.title} className={styles.productImage} />
                <h3 className={styles.productTitle}>{product.title}</h3>
                <p className={styles.productDescription}>{product.description}</p>
                <p className={styles.productPrice}>Rp {product.price.toLocaleString()}</p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default CategoryList;
