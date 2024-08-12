import React, { useState } from "react";
import { FaStar } from "react-icons/fa";

const WatchlistButton = () => {
  const [isSelected, setIsSelected] = useState(false);

  const handleWatchlist = () => {
    setIsSelected(!isSelected);
  };

  return (
    <div className="flex justify-center">
      <button
        onClick={handleWatchlist}
        className={`p-2 rounded-full ${isSelected ? "text-yellow-400" : "text-white-300"}`}
      >
        <FaStar className="h-5 w-5" />
      </button>
    </div>
  );
};

export default WatchlistButton;
