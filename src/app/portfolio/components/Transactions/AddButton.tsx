import React from "react";
import { Button } from "@/src/components/ui/button";
import axiosInstance from "@/src/lib/axios";

interface AddButtonProps {
  userId: string | undefined;
}

const AddButton: React.FC<AddButtonProps> = ({ userId }) => {
  const transactionData = {
    name: "Brett",
    amount: 16000,
    price: 0.08,
    symbol: "BRETT",
    date: "2024-08-10T14:00:00.000Z",
    type: "BUY",
  };

  const handleAdd = async () => {
    try {
      await axiosInstance.post(`/api/user/${userId}/transactions`, transactionData);
    } catch (error) {
      console.error("Failed to add transaction:", error);
    }
  };

  return <Button onClick={handleAdd}>ADD BRETT </Button>;
};

export default AddButton;
