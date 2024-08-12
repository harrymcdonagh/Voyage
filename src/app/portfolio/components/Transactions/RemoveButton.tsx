import React from "react";
import { Button } from "@/components/ui/button";
import localAxios from "@/src/lib/axios";

interface RemoveButtonProps {
  userId: string;
  id: string;
}

const RemoveButton: React.FC<RemoveButtonProps> = ({ userId, id }) => {
  const handleRemove = async () => {
    try {
      await localAxios.delete(`/api/user/${userId}/transactions/${id}`);
      alert("Transaction removed successfully!");
    } catch (error) {
      console.error("Failed to remove transaction:", error);
      alert("Failed to remove transaction");
    }
  };

  return (
    <Button variant="destructive" onClick={handleRemove}>
      Remove
    </Button>
  );
};

export default RemoveButton;
