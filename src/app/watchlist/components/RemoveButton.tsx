import React from "react";
import { Button } from "@/components/ui/button";
import axiosInstance from "@/src/lib/axios";

interface RemoveButtonProps {
  userId: string;
  id: string;
}

const RemoveButton: React.FC<RemoveButtonProps> = ({ userId, id }) => {
  const handleRemove = async () => {
    try {
      await axiosInstance.delete(`/api/user/${userId}/watchlist/${id}`);
      alert("Coin removed successfully!");
    } catch (error) {
      console.error("Failed to remove coin:", error);
      alert("Failed to remove coin");
    }
  };

  return (
    <Button variant="destructive" onClick={handleRemove}>
      Remove
    </Button>
  );
};

export default RemoveButton;
