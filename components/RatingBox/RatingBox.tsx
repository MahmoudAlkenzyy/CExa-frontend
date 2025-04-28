import React from "react";
import { FaStar, FaRegStar } from "react-icons/fa";

interface RatingBoxProps {
  rating: number;
}

const RatingBox: React.FC<RatingBoxProps> = ({ rating }) => {
  const totalStars = 5;

  return (
    <div className="flex gap-2 text-xl">
      {Array.from({ length: totalStars }, (_, index) => (
        <span key={index}>
          {index < rating ? (
            <FaStar className="text-yellow-500" />
          ) : (
            <FaRegStar className="text-yellow-500" />
          )}
        </span>
      ))}
    </div>
  );
};

export default RatingBox;
