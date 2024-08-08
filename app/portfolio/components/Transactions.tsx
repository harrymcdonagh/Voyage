"use client";
import { useSession } from "next-auth/react";
import React from "react";

const Transactions = () => {
  const { status, data: session } = useSession();
  console.log(session);

  return <div>{session?.user?.id}</div>;
};

export default Transactions;
