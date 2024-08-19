"use client";

import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { addToWatchlist } from "../../actions";
import { useSession } from "next-auth/react";

interface Props {
  coinId: number;
  isWatchlisted: boolean;
  onWatchlistChange: (newState: boolean) => void;
}

const WatchlistButton = ({ coinId, isWatchlisted, onWatchlistChange }: Props) => {
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const handleWatchlist = async () => {
    if (!userId) return;

    try {
      const result = await addToWatchlist(userId, coinId);
      if (result) {
        onWatchlistChange(!isWatchlisted);
      }
    } catch (error) {
      console.error("Error adding to watchlist:", error);
    }
  };

  return (
    <div className="flex justify-center">
      <button
        onClick={handleWatchlist}
        className={`p-2 rounded-full ${
          isWatchlisted ? "text-yellow-400" : "text-gray-300"
        }`}
      >
        <FaStar className="h-5 w-5" />
      </button>
    </div>
  );
};
export default WatchlistButton;
