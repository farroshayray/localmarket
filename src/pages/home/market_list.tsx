import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import axios from 'axios';
import styles from './market_list.module.css';

interface Market {
  id: number;
  title: string;
  phone: string;
  email: string;
  location: string;
  imageUrl: string;
}

const MarketCarousel: React.FC = () => {
  const [markets, setMarkets] = useState<Market[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Reverse geocode to get human-readable location
  const reverseGeocode = async (lat: number, lng: number): Promise<string> => {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
      );
      if (response.data && response.data.address) {
        const { suburb, town, village, city } = response.data.address;
        return suburb || town || village || city || 'Unknown Location';
      }
      return 'Unknown Location';
    } catch (error) {
      console.error('Reverse geocoding error:', error);
      return 'Unknown Location';
    }
  };

  // Fetch agent data and process locations
  useEffect(() => {
    const fetchMarkets = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://127.0.0.1:5000/user/agents');
        const agents = response.data.agents;

        const formattedMarkets = await Promise.all(
          agents.map(async (agent: any) => {
            let formattedLocation = 'Location not available';
            if (agent.location) {
              try {
                const parsedLocation = JSON.parse(agent.location);
                const { lat, lng } = parsedLocation;
                formattedLocation = await reverseGeocode(lat, lng);
              } catch (error) {
                console.error('Location parsing error:', error);
              }
            }

            return {
              id: agent.id,
              title: agent.fullname,
              phone: agent.phone_number,
              email: agent.email,
              location: formattedLocation,
              imageUrl: `https://via.placeholder.com/150?text=${encodeURIComponent(
                agent.fullname
              )}`,
            };
          })
        );

        setMarkets(formattedMarkets);
      } catch (error) {
        setError('Failed to fetch markets. Please try again.');
        console.error('Error fetching markets:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMarkets();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6, // Default for desktop
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
    return <p>Loading markets...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Pasar Terdekat</h2>
      <div className={styles.sliderContainer}>
        <Slider {...settings}>
          {markets.map((market) => (
            <div key={market.id}>
              <div className={styles.marketCard}>
                <img
                  src={market.imageUrl}
                  alt={market.title}
                  className={styles.marketImage}
                />
                <h3 className={styles.marketTitle}>{market.title}</h3>
                <p className={styles.marketDescription}>HP: {market.phone}</p>
                <p className={styles.marketDescription}>email: {market.email}</p>
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
