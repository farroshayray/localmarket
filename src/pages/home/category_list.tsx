// components/ui/CategoryList.tsx
import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import axios from 'axios';
import styles from './category_list.module.css';
import API_BASE_URL from '../../../config';
import { useRouter } from 'next/router';


interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
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
  const router = useRouter();
 

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_BASE_URL}/products/category_products/${categoryId}`);
        const { category_name, products } = response.data;
        setCategoryName(category_name);
        const fetchedProducts = response.data.products.map((product: any) => ({
          id: product.id,
          title: product.product_name,
          description: product.description,
          price: product.price,
          imageUrl: product.image_url,
        }));
        setProducts(fetchedProducts);
      } catch (err) {
        setError('Failed to fetch products for this category. Please try again later.');
        console.error('Error fetching category products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryProducts();
  }, [categoryId]);

  const handleProductClick = (id: number) => {
    router.push(`/product/${id}`)
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6, // Adjust the number of slides for desktop
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024, // Tablet
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768, // Mobile
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  if (loading) {
    return <p>Loading products...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h2 className="mb-3 text-xl font-semibold">{capitalizeFirstLetter(categoryName || 'Category')}</h2>
      <div className={styles.sliderContainer}>
        <Slider {...settings}>
          {products.map((product) => (
            <div key={product.id} onClick={() => handleProductClick(product.id)}>
              <div className={styles.productCard}>
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
