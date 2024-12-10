import React, { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useRouter } from "next/router";
import axios from "axios";

interface Category {
  id: number;
  category_name: string;
  description: string;
  image_url: string;
}

const CategoryCarousel = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/products/categories`);
      setCategories(response.data.categories);
      setError(null);
    } catch (err) {
      setError("Failed to fetch categories. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleCategoryClick = (id: number) => {
    router.push(`/category/${id}`);
  };

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
      slidesToSlide: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3,
      slidesToSlide: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
      slidesToSlide: 1,
    },
  };

  if (loading) return <p>Loading categories...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <Carousel
      swipeable
      draggable
      showDots
      responsive={responsive}
      ssr
      infinite
      autoPlay
      autoPlaySpeed={3000}
      slidesToSlide={1}
      keyBoardControl
      customTransition="transform 800ms ease-in-out"
      transitionDuration={800}
      containerClass="carousel-container"
      removeArrowOnDeviceType={["tablet", "mobile"]}
      dotListClass="custom-dot-list-style"
      itemClass="carousel-item-padding-2-px"
    >
      {categories.map((category) => (
        <div
          key={category.id}
          onClick={() => handleCategoryClick(category.id)}
          className="h-60 mb-4 cursor-pointer bg-white rounded-lg shadow-md hover:shadow-lg mx-2 mt-4 flex flex-col items-center transform hover:scale-105 transition-transform duration-300"
        >
          <img
            src={category.image_url}
            alt={category.category_name}
            className="w-full h-32 object-cover rounded-t-md"
          />
          <div className="mt-3 text-center">
          <h3
            className="text-lg font-semibold text-gray-800 overflow-hidden text-ellipsis whitespace-normal max-h-12"
            style={{ display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}
          >{category.category_name}</h3>
            <p className="text-sm text-gray-600 mt-1 overflow-hidden text-ellipsis whitespace-normal max-h-12"
            style={{ display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}
            >{category.description}</p>
          </div>
        </div>
      ))}
    </Carousel>
  );
};

export default CategoryCarousel;
