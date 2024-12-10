// pages/home/index.tsx
import React, { useState, useEffect } from "react";
import Navbar from "@/components/ui/navbar";
import CategoryCarousel from "../../components/ui/category_carousel";
import MarketList from "./market_list";
import CategoryList from "./category_list";
import ProductGrid from "./product_grid";
import Home_topupBalance from "@/components/ui/home_topupBalance";

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

  return (
    <div>
      <Navbar />
      <div className="mt-4 py-4 flex flex-col rounded-xl p-1 sm:flex-col md:flex-row h-96">
        <div className="md:w-1/4 md:mr-2"><Home_topupBalance /></div>
        <div className="md:w-3/4 p-2 rounded-xl bg-white bg-opacity-20">
          <p>Kategori</p>
          <div><CategoryCarousel /></div>
        </div>
        
      </div>
      <div className="market-list-container flex flex-col p-10 mt-32 md:mt-0 bg-white bg-opacity-20 rounded-xl">
        <h1 className="mt-3 mb-3 mx-auto text-3xl">Daftar Pasar</h1>
        <MarketList />
      </div>
      <div className="product-list-by-radius flex flex-col mt-5 rounded-xl bg-white bg-opacity-20 p-10">
        <h1 className="mt-3 mb-3 mx-auto text-3xl">Kategori Pilihan</h1>
        <CategoryList categoryId={2} />
        <CategoryList categoryId={3} />
      </div>
      <div className="product-grid flex flex-col mt-5 rounded-xl bg-white bg-opacity-20 p-10">
        <h1 className="mt-3 mb-3 mx-auto text-3xl">Semua Produk</h1>
        <ProductGrid />
      </div>
    </div>
  );
};

export default Home;
