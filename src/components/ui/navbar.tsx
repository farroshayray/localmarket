import React, { useState, useEffect } from 'react';
import { FaShoppingCart } from 'react-icons/fa'; // Menggunakan ikon keranjang dari react-icons
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [location, setLocation] = useState<string | null>(null);
  const [radius, setRadius] = useState<string>(''); // State for radius selection

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    // Mendapatkan lokasi pengguna
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          // Menggunakan Nominatim untuk mendapatkan alamat
          fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`)
            .then(response => response.json())
            .then(data => {
              if (data && data.address) {
                const { suburb, city } = data.address;
                setLocation(`${suburb ? suburb : ''}${suburb && city ? ', ' : ''}${city ? city : ''}`);
              } else {
                setLocation("Location not available");
              }
            })
            .catch(error => {
              console.error("Error fetching location: ", error);
              setLocation("Location not available");
            });
        },
        (error) => {
          console.error("Error getting location: ", error);
          setLocation("Location not available");
        }
      );
    } else {
      setLocation("Geolocation not supported");
    }
  }, []);

  const handleRadiusChange = (selectedRadius: string) => {
    setRadius(selectedRadius);
    // Here you can add logic to fetch or filter products based on the selected radius
    console.log(`Selected radius: ${selectedRadius}`);
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-2xl font-bold">Golekin</h1>
        
        <div className="hidden md:flex items-center space-x-4">
          <button className="text-white hover:text-gray-300">Kategori</button>
          
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="bg-gray-700 text-white rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <a href="/cart" className="text-white hover:text-gray-300 flex items-center">
            <FaShoppingCart className="text-xl" />
          </a>
        </div>

        <div className="flex items-center space-x-4">
          <ul className="hidden md:flex space-x-4">
            <li><Button className='bg-slate-600 hover:bg-slate-50'>Masuk</Button></li>
            <li><Button>Daftar</Button></li>
          </ul>

          {/* Tombol untuk mobile menu */}
          <button onClick={toggleMenu} className="md:hidden text-white hover:text-gray-300">
            Menu
          </button>
        </div>
      </div>

      {/* Menampilkan lokasi pengguna di sebelah kanan */}
      {location && (
        <div className="flex justify-end items-center text-white text-sm mt-10">
          <span>{location}</span>
          <div className="ml-4">
            <select
              value={radius}
              onChange={(e) => handleRadiusChange(e.target.value)}
              className="bg-gray-700 text-white rounded-md py-1 px-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Radius</option>
              <option value="<5">{"< 5 km"}</option>
              <option value="5-10">{"5 s.d 10 km"}</option>
              <option value="10-20">{"10 s.d 20 km"}</option>
              <option value=">20">{"> 20 km"}</option>
            </select>
          </div>
        </div>
      )}

      {/* Menu Dropdown untuk Mobile */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-700 p-4">
          <ul className="flex flex-col space-y-2">
            <li><Button className='bg-slate-600 hover:bg-slate-50'>Masuk</Button></li>
            <li><Button>Daftar</Button></li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
