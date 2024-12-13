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
  const [profileImage, setProfileImage] = useState('/default-user.png');

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
                  onError={() => setProfileImage('/default-user.png')}
                />
                {isProfileMenuOpen && (
                  <div className="absolute right-0 mt-2 bg-gray-800 text-white py-2 px-4 rounded shadow-md">
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
              onError={() => setProfileImage('/default-user.png')}
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
              <option value="">Select Radius</option>
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
          <ul className="flex flex-col space-y-2">
            {isAgent && (
              <li>
                <Link href="/agen">
                  <Button className="bg-blue-600 hover:bg-blue-700">Agen</Button>
                </Link>
              </li>
            )}
            {isLoggedIn ? (
              <li>
                <Button onClick={handleLogout} className="bg-red-600 hover:bg-red-700">
                  Keluar
                </Button>
              </li>
            ) : (
              <>
                <li><Link href="/login"><Button className="bg-slate-600 hover:bg-slate-50">Masuk</Button></Link></li>
                <li><Link href="/register"><Button className='bg-gray-600'>Daftar</Button></Link></li>
              </>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
