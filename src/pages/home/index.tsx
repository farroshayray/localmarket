// pages/home/index.tsx
import React from "react";
import Navbar from "@/components/ui/navbar";
import PromoCarousel from "./promo_carousel";
import MarketList from "./market_list";
import CategoryList from "./category_list";
import ProductGrid from "./product_grid";

const Home = () => {
  const markets = [
    {
      id: 1,
      title: 'Pasar Brontokusuman',
      description: 'Pasar tradisional yang menawarkan berbagai produk segar, mulai dari sayuran hingga buah-buahan.',
      location: 'Brontokusuman, Yogyakarta',
      imageUrl: 'https://images.pexels.com/photos/757432/pexels-photo-757432.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
      id: 2,
      title: 'Pasar Warungboto',
      description: 'Pasar yang terkenal dengan produk lokal dan kerajinan tangan khas Yogyakarta.',
      location: 'Warungboto, Yogyakarta',
      imageUrl: 'https://images.pexels.com/photos/439818/pexels-photo-439818.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
      id: 3,
      title: 'Pasar Jodipan',
      description: 'Pasar yang terkenal dengan warna-warni bangunan dan produk kerajinan tangan.',
      location: 'Jodipan, Malang',
      imageUrl: 'https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
      id: 4,
      title: 'Pasar Sinduadi',
      description: 'Pasar yang menawarkan berbagai makanan khas dan produk lokal.',
      location: 'Sinduadi, Sleman',
      imageUrl: 'https://images.pexels.com/photos/1855214/pexels-photo-1855214.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
      id: 5,
      title: 'Pasar Godean',
      description: 'Pasar yang terkenal dengan produk pertanian segar dan makanan tradisional.',
      location: 'Godean, Sleman',
      imageUrl: 'https://images.pexels.com/photos/1483778/pexels-photo-1483778.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
      id: 6,
      title: 'Pasar Beringharjo',
      description: 'Pasar yang terkenal dengan batik dan kerajinan tangan khas Yogyakarta.',
      location: 'Beringharjo, Yogyakarta',
      imageUrl: 'https://images.pexels.com/photos/159924/pexels-photo-159924.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
      id: 7,
      title: 'Pasar Malam Sleman',
      description: 'Pasar malam yang menawarkan berbagai makanan dan hiburan.',
      location: 'Sleman, Yogyakarta',
      imageUrl: 'https://images.pexels.com/photos/533353/pexels-photo-533353.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
      id: 8,
      title: 'Pasar Cinde',
      description: 'Pasar yang menawarkan berbagai produk lokal dan makanan khas.',
      location: 'Cinde, Palembang',
      imageUrl: 'https://images.pexels.com/photos/2246789/pexels-photo-2246789.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
      id: 9,
      title: 'Pasar Turi',
      description: 'Pasar yang terkenal dengan kerajinan tangan dan produk lokal.',
      location: 'Turi, Sleman',
      imageUrl: 'https://images.pexels.com/photos/1304154/pexels-photo-1304154.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
      id: 10,
      title: 'Pasar Kaliurang',
      description: 'Pasar yang menawarkan berbagai produk segar dan makanan khas daerah.',
      location: 'Kaliurang, Yogyakarta',
      imageUrl: 'https://images.pexels.com/photos/757432/pexels-photo-757432.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
  ];
  
  
  const products = [
    {
      id: 1,
      title: 'Tomat',
      description: 'Tomat segar dan matang, cocok untuk berbagai hidangan.',
      price: 2.99,
      imageUrl: 'https://images.pexels.com/photos/533280/pexels-photo-533280.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
      id: 2,
      title: 'Wortel',
      description: 'Wortel yang renyah dan manis, sempurna untuk salad dan sup.',
      price: 1.49,
      imageUrl: 'https://images.pexels.com/photos/143133/pexels-photo-143133.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
      id: 3,
      title: 'Kentang',
      description: 'Kentang serbaguna yang bisa dipanggang, dihancurkan, atau digoreng.',
      price: 3.49,
      imageUrl: 'https://images.pexels.com/photos/2286776/pexels-photo-2286776.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
      id: 4,
      title: 'Bawang Merah',
      description: 'Bawang merah yang wajib ada di dapur untuk membuat sup, saus, dan tumisan.',
      price: 0.99,
      imageUrl: 'https://images.pexels.com/photos/7456550/pexels-photo-7456550.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
      id: 5,
      title: 'Bawang Putih',
      description: 'Bawang putih dengan aroma yang kuat untuk menambah rasa pada masakan.',
      price: 1.29,
      imageUrl: 'https://images.pexels.com/photos/7223303/pexels-photo-7223303.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
      id: 6,
      title: 'Bayam',
      description: 'Daun bayam segar yang bisa digunakan untuk salad, sup, atau smoothie.',
      price: 2.99,
      imageUrl: 'https://images.pexels.com/photos/6824475/pexels-photo-6824475.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
      id: 7,
      title: 'Mentimun',
      description: 'Mentimun segar yang renyah, cocok untuk salad segar.',
      price: 1.59,
      imageUrl: 'https://images.pexels.com/photos/2329440/pexels-photo-2329440.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
      id: 8,
      title: 'Selada',
      description: 'Selada segar untuk salad yang sehat.',
      price: 1.79,
      imageUrl: 'https://images.pexels.com/photos/1213859/pexels-photo-1213859.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
      id: 9,
      title: 'Paprika',
      description: 'Paprika berwarna-warni yang bisa menambah keceriaan pada masakan.',
      price: 2.49,
      imageUrl: 'https://images.pexels.com/photos/4198928/pexels-photo-4198928.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
      id: 10,
      title: 'Brokoli',
      description: 'Brokoli segar untuk dipanggang, direbus, atau ditumis.',
      price: 3.99,
      imageUrl: 'https://images.pexels.com/photos/3872432/pexels-photo-3872432.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
      id: 11,
      title: 'Kembang Kol',
      description: 'Kembang kol yang serbaguna untuk dipanggang, dihancurkan, atau dibuat sup.',
      price: 4.29,
      imageUrl: 'https://images.pexels.com/photos/4963827/pexels-photo-4963827.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
      id: 12,
      title: 'Zucchini',
      description: 'Zucchini segar yang bisa dipanggang, ditumis, atau dipanggang.',
      price: 2.29,
      imageUrl: 'https://images.pexels.com/photos/237635/pexels-photo-237635.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
      id: 13,
      title: 'Kacang Panjang',
      description: 'Kacang panjang yang renyah untuk direbus atau ditambahkan dalam hidangan.',
      price: 2.99,
      imageUrl: 'https://images.pexels.com/photos/17975550/pexels-photo-17975550/free-photo-of-close-up-of-long-green-vegetables.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
      id: 14,
      title: 'Terong',
      description: 'Terong untuk dipanggang, ditumis, atau dimasukkan dalam sup.',
      price: 3.49,
      imageUrl: 'https://images.pexels.com/photos/5529596/pexels-photo-5529596.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
      id: 15,
      title: 'Jagung Manis',
      description: 'Jagung manis segar yang bisa dipanggang.',
      price: 1.99,
      imageUrl: 'https://images.pexels.com/photos/1353865/pexels-photo-1353865.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
      id: 16,
      title: 'Minyak Zaitun',
      description: 'Minyak zaitun berkualitas tinggi untuk memasak dan salad.',
      price: 8.99,
      imageUrl: 'https://images.pexels.com/photos/3621952/pexels-photo-3621952.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
      id: 17,
      title: 'Cuka',
      description: 'Cuka putih yang bisa digunakan untuk memasak atau membersihkan.',
      price: 2.29,
      imageUrl: 'https://images.pexels.com/photos/5223214/pexels-photo-5223214.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
      id: 18,
      title: 'Tepung Terigu',
      description: 'Tepung serbaguna untuk membuat roti, kue, dan banyak lagi.',
      price: 3.49,
      imageUrl: 'https://images.pexels.com/photos/3893526/pexels-photo-3893526.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
      id: 19,
      title: 'Gula Pasir',
      description: 'Gula pasir yang bisa digunakan untuk membuat kue atau manisan.',
      price: 2.59,
      imageUrl: 'https://images.pexels.com/photos/6061602/pexels-photo-6061602.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
      id: 20,
      title: 'Garam',
      description: 'Garam halus untuk menambah rasa pada masakan.',
      price: 0.99,
      imageUrl: 'https://images.pexels.com/photos/2624400/pexels-photo-2624400.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
      id: 21,
      title: 'Merica Hitam',
      description: 'Merica hitam yang baru digiling untuk memberikan rasa pada masakan.',
      price: 1.89,
      imageUrl: 'https://images.pexels.com/photos/5988689/pexels-photo-5988689.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
      id: 22,
      title: 'Kemangi',
      description: 'Daun kemangi segar untuk menambah rasa pada masakan khas Indonesia.',
      price: 2.99,
      imageUrl: 'https://images.pexels.com/photos/1391505/pexels-photo-1391505.jpeg?auto=compress&cs=tinysrgb&w=600',
    }
  ];
  
  return (
    <div>
      <Navbar />
      <div className="promo-container flex flex-col">
        <h1 className="mt-3 mb-3 mx-auto">Lihat Promo Hari Ini !</h1>
        <PromoCarousel/>
      </div>
      <div className="market-list-container flex flex-col mt-5 p-10">
        <h1 className="mt-3 mb-3 mx-auto">Market List</h1>
        <MarketList markets={markets}/>
      </div>
      <div className="product-list-by-radius flex flex-col mt-5 rounded-xl bg-gray-800 p-10">
        <h1 className="mt-3 mb-3 mx-auto"> Product Category</h1>
        <CategoryList products={products}/>
      </div>
      <div className="product-grid flex flex-col mt-5 rounded-xl bg-gray-800 p-10">
        <h1 className="mt-3 mb-3 mx-auto">Product Grid</h1>
        <ProductGrid products={products}/>
      </div>
    </div>
  );
};

export default Home;
