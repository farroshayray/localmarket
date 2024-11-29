// components/ProductCarousel.tsx
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from './category_list.module.css';

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
}

interface ProductCarouselProps {
  products: Product[];
}

const ProductCarousel: React.FC<ProductCarouselProps> = ({ products }) => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 6, // Default untuk desktop
        slidesToScroll: 3,
        autoplay: true, // Menambahkan autoplay
        autoplaySpeed: 3000, // Kecepatan autoplay dalam milidetik
        responsive: [
          {
            breakpoint: 1024, // Tablet
            settings: {
              slidesToShow: 6,
            },
          },
          {
            breakpoint: 768, // Mobile
            settings: {
              slidesToShow: 3,
            },
          },
        ],
      };

      return (
        <div>
          <h2>Category 1</h2>
          <div className={styles.sliderContainer}>
              <Slider {...settings}>
                {products.map((product) => (
                  <div key={product.id}>
                    <div className={styles.productCard}>
                      <img src={product.imageUrl} alt={product.title} className={styles.productImage} />
                      <h3 className={styles.productTitle}>{product.title}</h3>
                      <p className={styles.productDescription}>{product.description}</p>
                      <p className={styles.productPrice}>${product.price.toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </Slider>
          </div>
        </div>
    );
};

export default ProductCarousel;
