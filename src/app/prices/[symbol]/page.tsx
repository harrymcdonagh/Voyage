import React from "react";

interface Props {
  params: { symbol: string };
}

const page = ({ params: { symbol } }: Props) => {
  return <div>Info for {symbol}</div>;
};

export default page;
