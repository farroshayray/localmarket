import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Navbar from "@/components/ui/navbar";

interface Product {
  id: number;
  category_id: number;
  product_name: string;
  description: string;
  price: number;
  image_url: string;
  stock: number;
  created_at: string;
  user_id: number;
}

interface Promotion {
  scheme: string;
  scheme_percentage: number;
  description: string;
  start_date: string | null;
  end_date: string | null;
}

interface ReviewDetails {
  created_at: string;
  review_text: string;
  star_rating: number;
  user_id: number;
  user_fullname: string;
}

interface Reviews {
  average_rating: number;
  details: ReviewDetails[];
}

const ProductDetail: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState<Product | null>(null);
  const [promotion, setPromotion] = useState<Promotion | null>(null);
  const [categoryName, setCategoryName] = useState<string>("");
  const [shopName, setShopName] = useState<string>("");
  const [reviews, setReviews] = useState<Reviews | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isBuyer, setIsBuyer] = useState(false);
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/products/product/${id}`);
        const { product, category_name, shop_name, promotion, reviews } = response.data;

        const role = localStorage.getItem("role");
        setIsBuyer(role === "konsumen");

        setProduct({
          id: product.id,
          category_id: product.category_id,
          product_name: product.product_name,
          description: product.description,
          price: product.price,
          image_url: product.image_url,
          stock: product.stock,
          created_at: product.created_at,
          user_id: product.user_id,
        });

        setPromotion(promotion || null);
        setCategoryName(category_name);
        setShopName(shop_name);
        setReviews(reviews);
      } catch (err) {
        setError("Failed to fetch product details. Please try again later.");
        console.error("Error fetching product details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    try {
      const userId = localStorage.getItem("id");
      if (!userId) {
        alert("Please log in to add items to your cart.");
        router.push("/login");
        return;
      }

      const payload = {
        product_id: product?.id,
        quantity: 1,
      };

      await axios.post(`${API_BASE_URL}/cart/add/${userId}`, payload);
      alert("Product successfully added to cart!");
    } catch (err) {
      console.error("Error adding to cart:", err);
      alert("Failed to add product to cart. Please try again.");
    }
  };

  const renderStars = (rating: number) => {
    const filledStars = "\u2605".repeat(Math.floor(rating));
    const emptyStars = "\u2606".repeat(5 - Math.floor(rating));
    return `${filledStars}${emptyStars}`;
  };

  if (loading) {
    return <p className="text-center text-gray-600 mt-4">Loading product details...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500 mt-4">{error}</p>;
  }

  if (!product) {
    return <p className="text-center text-gray-600 mt-4">Product not found.</p>;
  }

  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto mt-8 p-6 bg-white shadow-md rounded-lg">
        <div className="relative flex flex-col md:flex-row">
          {/* Image Section */}
          <div className="relative flex-shrink-0 w-full md:w-1/2">
            {promotion && (
              <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold py-1 px-2 rounded-md shadow-md z-10">
                {promotion.scheme} {promotion.scheme_percentage}%
              </div>
            )}
            <img
              src={product.image_url}
              alt={product.product_name}
              className="w-full h-auto rounded-md object-cover"
            />
          </div>

          {/* Details Section */}
          <div className="mt-6 md:mt-0 md:ml-6 flex flex-col">
            <h1 className="text-2xl font-bold text-gray-800">{product.product_name}</h1>
            <p className="text-sm text-gray-500 mt-2">
              Category: <span className="font-medium text-gray-700">{categoryName}</span>
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Shop: <span className="font-medium text-gray-700">{shopName}</span>
            </p>
            <p className="text-gray-600 mt-4">{product.description}</p>
            <p className="text-gray-600 mt-2">
              Stock: <span className="font-medium">{product.stock}</span>
            </p>
            <p className="text-lg font-bold text-blue-600 mt-4">
              Price: Rp {product.price.toLocaleString()}
            </p>

            {/* Add to Cart Button */}
            {isBuyer && (
              <button
                onClick={handleAddToCart}
                className="mt-6 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
              >
                Masukan Keranjang
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Promotion Details */}
      {promotion && (
        <div className="max-w-4xl mx-auto mt-8 p-6 bg-blue-100 shadow-md rounded-lg">
          <h2 className="text-lg font-bold text-blue-800">Promotion Details</h2>
          <p className="text-blue-600 mt-2">
            <strong>Scheme:</strong> {promotion.scheme} ({promotion.scheme_percentage}%)
          </p>
          <p className="text-blue-600 mt-2">
            <strong>Description:</strong> {promotion.description}
          </p>
          {promotion.start_date && (
            <p className="text-blue-600 mt-2">
              <strong>Start Date:</strong> {new Date(promotion.start_date).toLocaleString()}
            </p>
          )}
          {promotion.end_date && (
            <p className="text-blue-600 mt-2">
              <strong>End Date:</strong> {new Date(promotion.end_date).toLocaleString()}
            </p>
          )}
        </div>
      )}

      {/* Reviews */}
      <div className="max-w-4xl mx-auto mt-8 p-6 bg-white shadow-md rounded-lg">
        <div className="mt-6 bg-gray-900 p-4 rounded-lg">
          <h2 className="text-lg font-bold text-gray-200">Reviews</h2>
          {reviews?.average_rating ? (
            <>
              <p className="text-gray-200 flex">
                Average Rating:
                <span className="text-yellow-400 mx-2">{renderStars(reviews.average_rating)}</span>
                ({reviews.average_rating.toFixed(1)}/5)
              </p>
            </>
          ) : (
            <p className="text-gray-500 mt-2">No ratings yet.</p>
          )}
          {reviews && reviews.details.length > 0 ? (
            <ul className="mt-2">
              {reviews.details.map((review, index) => (
                <li key={index} className="mb-4 bg-gray-200 p-2 rounded-lg my-1">
                  <p className="text-yellow-400">{renderStars(review.star_rating)}</p>
                  <p className="text-gray-600 mt-2">"{review.review_text}"</p>
                  <p className="text-sm text-gray-500 mt-2">
                    Pembeli: {review.user_fullname}
                  </p>
                  <small className="text-gray-600">Dibuat pada: {review.created_at}</small>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 mt-2">No reviews yet.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
