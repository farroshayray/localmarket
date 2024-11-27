// pages/home/index.tsx
import React from "react";
import Navbar from "@/components/ui/navbar";
import PromoCarousel from "./promo_carousel";
import MarketList from "./market_list";

const Home = () => {
  return (
    <div>
      <Navbar />
      <div className="promo-container flex flex-col">
        <h1 className="mt-3 mb-3 mx-auto">Lihat Promo Hari Ini !</h1>
        <PromoCarousel/>
      </div>
      <div className="market-list-container flex flex-col mt-5">
        <h1 className="mt-3 mb-3 mx-auto">Market List</h1>
        <MarketList/>
      </div>
    </div>
  );
};

export default Home;
