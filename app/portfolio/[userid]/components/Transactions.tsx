"use client";
import { useSession } from "next-auth/react";
import React from "react";
import axios from "axios";

const Transactions = () => {
  const { status, data: session } = useSession();

  return <div>{session?.user?.id}</div>;
};

export default Transactions;
