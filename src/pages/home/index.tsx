// pages/home/index.tsx
import React, { useState, useEffect } from "react";
import Navbar from "@/components/ui/navbar";
import PromoCarousel from "./promo_carousel";
import MarketList from "./market_list";
import CategoryList from "./category_list";
import ProductGrid from "./product_grid";
import axios from "axios";

// Define the Product type
interface Product {
  id: number;
  product_name: string;
  description: string;
  price: number;
  image_url: string;
  stock: number;
  category_id: number;
  is_active: number;
  created_at: string;
}

const Home = () => {

  const markets = [
    {
      id: 1,
      title: "Pasar Brontokusuman",
      description: "Pasar tradisional yang menawarkan berbagai produk segar, mulai dari sayuran hingga buah-buahan.",
      location: "Brontokusuman, Yogyakarta",
      imageUrl: "https://images.pexels.com/photos/757432/pexels-photo-757432.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      id: 2,
      title: "Pasar Warungboto",
      description: "Pasar yang terkenal dengan produk lokal dan kerajinan tangan khas Yogyakarta.",
      location: "Warungboto, Yogyakarta",
      imageUrl: "https://images.pexels.com/photos/439818/pexels-photo-439818.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      id: 3,
      title: "Pasar Jodipan",
      description: "Pasar yang terkenal dengan warna-warni bangunan dan produk kerajinan tangan.",
      location: "Jodipan, Malang",
      imageUrl: "https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
  ];

  return (
    <div>
      <Navbar />
      <div className="promo-container flex flex-col">
        <h1 className="mt-3 mb-3 mx-auto">Lihat Promo Hari Ini!</h1>
        <PromoCarousel />
      </div>
      <div className="market-list-container flex flex-col mt-5 p-10">
        <h1 className="mt-3 mb-3 mx-auto">Market List</h1>
        <MarketList markets={markets} />
      </div>
      <div className="product-list-by-radius flex flex-col mt-5 rounded-xl bg-gray-800 p-10">
        <h1 className="mt-3 mb-3 mx-auto">Product Category</h1>
        <CategoryList categoryId={1} />
        <CategoryList categoryId={2} />
      </div>
      <div className="product-grid flex flex-col mt-5 rounded-xl bg-gray-800 p-10">
        <h1 className="mt-3 mb-3 mx-auto">Product Grid</h1>
        <ProductGrid />
      </div>
    </div>
  );
};

export default Home;
