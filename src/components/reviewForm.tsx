// ReviewForm.js
import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import axios from "axios";

interface ReviewFormProps {
  itemId: number;
  onClose: () => void;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ itemId, onClose }) => {
  const [reviewText, setReviewText] = useState("");
  const [starRating, setStarRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("access_token");

      if (!token) {
        setErrorMessage("Unauthorized. Please log in.");
        return;
      }

      const payload = {
        item_id: itemId,
        review_text: reviewText,
        star_rating: starRating,
      };

      await axios.post(`${API_BASE_URL}/products/input_review`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Review submitted successfully!");
      onClose();
    } catch (error) {
      console.error("Error submitting review:", error);
      setErrorMessage("Failed to submit review. Please try again later.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-bold mb-4">Write a Review</h2>

        {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}

        <textarea
          className="w-full p-2 border rounded-md mb-4"
          placeholder="Write your review here..."
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
        />

        <div className="flex items-center mb-4">
          <span className="mr-2">Rating:</span>
          {[1, 2, 3, 4, 5].map((star) => (
            <FaStar
              key={star}
              size={24}
              className={
                starRating >= star || hoverRating >= star
                  ? "text-yellow-400 cursor-pointer"
                  : "text-gray-400 cursor-pointer"
              }
              onClick={() => setStarRating(star)}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
            />
          ))}
        </div>

        <div className="flex justify-end">
          <button
            className="bg-red-600 text-white px-4 py-2 rounded-md mr-2"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-md"
            onClick={handleSubmit}
            disabled={!reviewText || starRating === 0}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewForm;
