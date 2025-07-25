import React from "react";
import { Button } from "@/components/ui/button";
import { localAxios } from "@/src/lib/axios";
import { Trash2 } from "lucide-react"; // bin icon

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
    <Button variant="destructive" size="sm" onClick={handleRemove}>
      <Trash2 className="h-4 w-4" />
    </Button>
  );
};

export default RemoveButton;
