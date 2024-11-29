// components/marketCarousel.tsx
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from './market_list.module.css';

interface Market {
  id: number;
  title: string;
  description: string;
  location: string;
  imageUrl: string;
}

interface MarketCarouselProps {
  markets: Market[];
}

const MarketCarousel: React.FC<MarketCarouselProps> = ({ markets }) => {
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
          <h2>Pasar terdekat</h2>
          <div className={styles.sliderContainer}>
            <Slider {...settings}>
              {markets.map((market) => (
                <div key={market.id}>
                  <div className={styles.marketCard}>
                    <img src={market.imageUrl} alt={market.title} className={styles.marketImage} />
                    <h3 className={styles.marketTitle}>{market.title}</h3>
                    <p className={styles.marketDescription}>{market.description}</p>
                    <p className={styles.marketLocation}>{market.location}</p>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
    );
};

export default MarketCarousel;
