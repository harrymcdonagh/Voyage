import React from "react";

interface CoinDescriptionProps {
  name: string;
  description: string;
}

const CoinDescription: React.FC<CoinDescriptionProps> = ({ name, description }) => (
  <section>
    <h2 className="text-2xl font-bold">About {name}</h2>
    <p className="mt-4 text-muted-foreground">{description}</p>
  </section>
);

export default CoinDescription;
