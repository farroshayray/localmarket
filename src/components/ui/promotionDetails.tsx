// components/ui/PromotionDetails.tsx
import React from "react";

interface Promotion {
  description: string;
  scheme: string;
  scheme_percentage: number;
  start_date: string | null;
  end_date: string | null;
}

interface PromotionDetailsProps {
  promotion: Promotion | null;
}

const PromotionDetails: React.FC<PromotionDetailsProps> = ({ promotion }) => {
  if (!promotion) return null;

  return (
    <div className="bg-blue-100 p-4 rounded-lg shadow-md mt-2">
      <h2 className="text-lg font-bold text-blue-800">Promo yang anda dapat</h2>
      <p className="text-blue-600 mt-2">
        <strong>Program:</strong> {promotion.scheme} ({promotion.scheme_percentage}%)
      </p>
      <p className="text-blue-600 mt-2">
        <strong>Deskripsi:</strong> {promotion.description}
      </p>
      {promotion.start_date && (
        <p className="text-blue-600 mt-2">
          <strong>Start Date:</strong> {new Date(promotion.start_date).toLocaleDateString()}
        </p>
      )}
      {promotion.end_date && (
        <p className="text-blue-600 mt-2">
          <strong>End Date:</strong> {new Date(promotion.end_date).toLocaleDateString()}
        </p>
      )}
    </div>
  );
};

export default PromotionDetails;
