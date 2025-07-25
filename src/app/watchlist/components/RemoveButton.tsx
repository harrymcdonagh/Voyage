import React from "react";
import { Button } from "@/components/ui/button";
import { localAxios } from "@/src/lib/axios";

interface RemoveButtonProps {
  userId: string;
  id: string;
  mutate: () => void;
}

const RemoveButton: React.FC<RemoveButtonProps> = ({ userId, id, mutate }) => {
  const handleRemove = async () => {
    try {
      await localAxios.delete(`/api/user/${userId}/watchlist/${id}`);
      mutate();
    } catch (error) {
      console.error("Failed to remove coin:", error);
    }
  };

  return (
    <Button variant="destructive" onClick={handleRemove}>
      Remove
    </Button>
  );
};

export default RemoveButton;
