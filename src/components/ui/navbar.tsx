import React, { useState, useEffect } from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import { useRouter } from 'next/router';
import CategoryDropdown from './categoryDropDown';
import SearchBar from './searchBar';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [location, setLocation] = useState<string | null>(null);
  const [radius, setRadius] = useState<string>('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAgent, setIsAgent] = useState(false);
  const [isDriver, setIsDriver] = useState(false);
  const [isConsumer, setIsConsumer] = useState(false);
  const [username, setUsername] = useState('');
  const [profileImage, setProfileImage] = useState('/images/user-polos.jpg');

  const router = useRouter();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    const role = localStorage.getItem('role');
    const username = localStorage.getItem('username');
    const imageUrl = localStorage.getItem('image_url');

    setIsLoggedIn(!!token);
    setIsAgent(role === 'agen');
    setIsDriver(role === 'driver');
    setIsConsumer(role === 'konsumen');
    setUsername(username || '');

    if (imageUrl) {
      setProfileImage(imageUrl);
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`)
            .then((response) => response.json())
            .then((data) => {
              const { suburb, city } = data.address || {};
              setLocation(`${suburb || ''}${suburb && city ? ', ' : ''}${city || ''}`);
            })
            .catch(() => setLocation('Location not available'));
        },
        () => setLocation('Location not available')
      );
    } else {
      setLocation('Geolocation not supported');
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    router.push('/login');
    setIsLoggedIn(false);
    setIsAgent(false);
    setIsDriver(false);
    setIsConsumer(false);
  };
  
  const handleNavigateToProfile = () => {
    router.push('/profile');
  }

  const handleRadiusChange = (selectedRadius: string) => {
    setRadius(selectedRadius);
  };

  return (
    <nav className="bg-gray-900 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href='/' className='ml-4'>
          <img src="/images/Golekin_logo.png" alt="Logo" className="w-24 h-auto" />
        </Link>

        <div className="hidden md:flex items-center space-x-6">
          {isAgent && (
            <Link href="/agen" className="text-white hover:text-gray-300">
              Agen
            </Link>
          )}
          {isDriver && (
            <Link href="/driver" className="text-white hover:text-gray-300">
              Driver
            </Link>
          )}
          {isConsumer && (
            <Link href="/transaction_list" className="text-white hover:text-gray-300">
              Transaksi Anda
            </Link>
          )}
          <CategoryDropdown />
          <SearchBar />
          <a href="/cartpage" className="text-white hover:text-gray-300 flex items-center">
            <FaShoppingCart className="text-xl" />
          </a>
          <p className="text-white">{username}</p>
        </div>

        <div className="flex items-center space-x-4">
          <ul className="hidden md:flex space-x-4">
            {isLoggedIn ? (
              <li className="relative">
                <img
                  src={profileImage}
                  alt="User Profile"
                  className="w-10 h-10 rounded-full cursor-pointer"
                  onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                  onError={() => setProfileImage('/images/user-polos.jpg')}
                />
                {isProfileMenuOpen && (
                  <div className="absolute right-0 mt-2 bg-gray-800 text-white py-2 px-4 rounded shadow-md">
                    <button
                      onClick={handleNavigateToProfile}
                      className="block w-full text-left bg-black hover:bg-gray-900 rounded px-2 py-1 mb-1"
                    >
                      Profil
                    </button>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left bg-red-800 hover:bg-red-900 rounded px-2 py-1"
                    >
                      Keluar
                    </button>
                  </div>
                )}
              </li>
            ) : (
              <>
                <li>
                  <Link href='/login'><Button className="bg-slate-600">Masuk</Button></Link>
                </li>
                <li>
                  <Link href='/register'><Button className='bg-gray-500'>Daftar</Button></Link>
                </li>
              </>
            )}
          </ul>

          <button onClick={toggleMenu} className="md:hidden">
          <img
              src={profileImage}
              alt="User Profile"
              className="w-10 h-10 rounded-full cursor-pointer"
              onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
              onError={() => setProfileImage('/images/user-polos.jpg')}
            />
          </button>
        </div>
      </div>

      {location && (
        <div className="flex justify-end items-center text-white text-sm mt-2">
          <span>{location}</span>
          <div className="ml-4">
            <select
              value={radius}
              onChange={(e) => handleRadiusChange(e.target.value)}
              className="bg-gray-700 text-white rounded-md py-1 px-2 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
            >
              <option value="">Pilih Radius</option>
              <option value="<5">{"< 5 km"}</option>
              <option value="5-10">{"5 s.d 10 km"}</option>
              <option value="10-20">{"10 s.d 20 km"}</option>
              <option value=">20">{"> 20 km"}</option>
            </select>
          </div>
        </div>
      )}

      {isMenuOpen && (
        <div className="md:hidden bg-gray-700 p-4">
          <SearchBar />
          <div className="flex items-center mb-4">
            <p className="text-white ml-3">{username}</p>
          </div>
          <ul className="flex flex-col items-center">
          {isLoggedIn ? (
            <li className="flex flex-col space-y-1">
              {isAgent && (
                <li>
                  <Link href="/agen">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">Agen</Button>
                  </Link>
                </li>
              )}
              {isDriver && (
                <li>
                  <Link href="/driver">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">Driver</Button>
                  </Link>
                </li>
              )}
              {isConsumer && (
                <li>
                  <Link href="/transaction_list">
                    <Button className="w-full">Transaksi Anda</Button>
                  </Link>
                </li>
              )}
              <Link href="/cartpage">
                <Button className="w-full">Keranjang <FaShoppingCart className="text-xl" /></Button>
              </Link>
              <Link href="/profile">
                <Button className="w-full">Profil</Button>
              </Link>
              <Link href="#">
                <Button
                  onClick={handleLogout}
                  className="w-full bg-red-600 hover:bg-red-700"
                >
                  Keluar
                </Button>
              </Link>
            </li>
          ) : (
            <div className='space-y-1'>
              <li>
                <Link href="/login">
                  <Button className="w-full bg-slate-600 hover:bg-slate-50">Masuk</Button>
                </Link>
              </li>
              <li>
                <Link href="/register">
                  <Button className="w-full bg-gray-600">Daftar</Button>
                </Link>
              </li>
            </div>
          )}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
