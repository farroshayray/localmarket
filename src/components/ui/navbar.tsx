import React, { useState, useEffect } from 'react';
import { FaShoppingCart } from 'react-icons/fa'; // Menggunakan ikon keranjang dari react-icons
import { Button } from "@/components/ui/button";
import Link from 'next/link';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [location, setLocation] = useState<string | null>(null);
  const [radius, setRadius] = useState<string>(''); // State for radius selection
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State untuk status login

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    // Cek keberadaan access_token di localStorage
    const token = localStorage.getItem('access_token');
    setIsLoggedIn(!!token);

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

  const handleLogout = () => {
    // Hapus token dari localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('role');
    setIsLoggedIn(false); // Perbarui status login
  };

  const handleRadiusChange = (selectedRadius: string) => {
    setRadius(selectedRadius);
    console.log(`Selected radius: ${selectedRadius}`);
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href='/'>
          <h1 className="text-white text-2xl font-bold">Golekin</h1>
        </Link>
        
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
            {isLoggedIn ? (
              <li>
                <Button onClick={handleLogout} className="bg-red-600 hover:bg-red-700">
                  Keluar
                </Button>
              </li>
            ) : (
              <>
                <li>
                  <Link href='/login'><Button className="bg-slate-600 hover:bg-slate-50">Masuk</Button></Link>
                </li>
                <li>
                  <Link href='/register'><Button>Daftar</Button></Link>
                </li>
              </>
            )}
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
              className="bg-gray-700 text-white rounded-md py-1 px-2 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
            >
              <option className="cursor-pointer" value="">Select Radius</option>
              <option className="cursor-pointer" value="<5">{"< 5 km"}</option>
              <option className="cursor-pointer" value="5-10">{"5 s.d 10 km"}</option>
              <option className="cursor-pointer" value="10-20">{"10 s.d 20 km"}</option>
              <option className="cursor-pointer" value=">20">{"> 20 km"}</option>
            </select>
          </div>
        </div>
      )}

      {/* Menu Dropdown untuk Mobile */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-700 p-4">
          <ul className="flex flex-col space-y-2">
            {isLoggedIn ? (
              <li>
                <Button onClick={handleLogout} className="bg-red-600 hover:bg-red-700">
                  Keluar
                </Button>
              </li>
            ) : (
              <>
                <li><Link href="/login"><Button className="bg-slate-600 hover:bg-slate-50">Masuk</Button></Link></li>
                <li><Link href="/register"><Button>Daftar</Button></Link></li>
              </>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
