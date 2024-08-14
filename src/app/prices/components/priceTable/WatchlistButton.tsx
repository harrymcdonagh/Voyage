"use client";

import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { addToWatchlist } from "../../actions";
import { useSession } from "next-auth/react";

interface Props {
  symbol: string;
}

const WatchlistButton = ({ symbol }: Props) => {
  const [isSelected, setIsSelected] = useState(false);

  const { data: session } = useSession();
  const userId = session?.user?.id;

  const handleWatchlist = async () => {
    try {
      const result = await addToWatchlist(userId, symbol);
      if (result) {
        setIsSelected(!isSelected);
      }
    } catch (error) {
      console.error("Error adding to watchlist:", error);
    }
  };

  return (
    <div className="flex justify-center">
      <button
        onClick={handleWatchlist}
        className={`p-2 rounded-full ${isSelected ? "text-yellow-400" : "text-gray-300"}`}
      >
        <FaStar className="h-5 w-5" />
      </button>
    </div>
  );
};

export default WatchlistButton;
