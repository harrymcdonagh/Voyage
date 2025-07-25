import React from "react";
import { Button } from "@/components/ui/button";
import { localAxios } from "@/src/lib/axios";
import { Trash2 } from "lucide-react"; // bin icon

interface RemoveButtonProps {
  userId: string;
  id: string;
  mutate: () => void;
}

const RemoveButton: React.FC<RemoveButtonProps> = ({ userId, id, mutate }) => {
  const handleRemove = async () => {
    try {
      await localAxios.delete(`/api/user/${userId}/transactions/${id}`);
      mutate();
    } catch (error) {
      console.error("Failed to remove transaction:", error);
    }
  };

  return (
    <Button variant="destructive" size="sm" onClick={handleRemove}>
      <Trash2 className="h-4 w-4" />
    </Button>
  );
};

export default RemoveButton;
