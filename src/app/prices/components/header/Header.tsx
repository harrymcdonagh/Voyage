import React from "react";
import FearAndGreed from "./fearAndGreed/FearAndGreed";
import TopGainers from "./TopGainers";
import TopLosers from "./TopLosers";

const Header = () => {
  return (
    <div className="w-full p-4">
      <div className="flex flex-col md:flex-row gap-4 max-w-7xl mx-auto">
        <div className="flex-1">
          <TopGainers />
        </div>
        <div className="flex-1">
          <TopLosers />
        </div>
        <div className="flex-1">
          <FearAndGreed />
        </div>
      </div>
    </div>
  );
};

export default Header;
