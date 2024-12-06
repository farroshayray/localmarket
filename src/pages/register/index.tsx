'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { GoogleMap, MarkerF, useLoadScript, Autocomplete } from '@react-google-maps/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import useStyles from './style';
import classNames from 'classnames';
import Navbar from '@/components/ui/navbar';
import { registerUser } from '@/services/authService';
import { useRouter } from 'next/router';
import axios from 'axios';

const mapContainerStyle = {
  width: '100%',
  height: '300px',
};

const center = {
  lat: -6.200000, // Default latitude
  lng: 106.816666, // Default longitude (Jakarta)
};

function Register() {
  const styles = useStyles();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [pin, setPin] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [tempatUsaha, setTempatUsaha] = useState('');
  const [markerPosition, setMarkerPosition] = useState(center);
  const [mapCenter, setMapCenter] = useState(center);
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY || '',
    libraries: ['places'],
  });
  const router = useRouter();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
      if (!allowedTypes.includes(file.type)) {
        alert('File type not supported. Please upload a valid image (JPG, PNG, GIF).');
        return;
      }
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const uploadImage = async (): Promise<string | null> => {
    if (!image) return null;

    const formData = new FormData();
    formData.append('file', image);

    try {
      const response = await axios.post(`${API_BASE_URL}/upload/files`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data.url;
    } catch (error) {
      console.error('Failed to upload image:', error);
      alert('Gagal mengunggah gambar.');
      return null;
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    const uploadedImageUrl = await uploadImage();

    const data = {
      username,
      fullname: fullName,
      email,
      password,
      description,
      pin,
      role: selectedRole,
      phone_number: phoneNumber,
      location: JSON.stringify(markerPosition),
      image_url: uploadedImageUrl,
    };

    try {
      const response = await registerUser(data);
      console.log('Register berhasil:', response);
      alert(response.message);
      router.push('/login');
    } catch (error: any) {
      console.error('Register gagal:', error.message);
      alert('Registrasi gagal: ' + error.message);
    }
  };

  const handlePlaceChange = () => {
    if (autocompleteRef.current) {
      const place = autocompleteRef.current.getPlace();
      if (place.geometry && place.geometry.location) {
        const location = place.geometry.location;
        const newCenter = {
          lat: location.lat(),
          lng: location.lng(),
        };
        setMarkerPosition(newCenter);
        setMapCenter(newCenter);
      }
    }
  };

  const handleMapClick = (event: google.maps.MapMouseEvent) => {
    if (event.latLng) {
      const newPosition = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
      };
      setMarkerPosition(newPosition);
    }
  };

  return (
    <>
      <Navbar />
      <div className={classNames('box-register', styles.boxRegister)}>
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className={classNames('effect-Motion', styles.effectMotion)}
        >
          <div className={classNames('box-login', styles.boxLogin)}>
            <div className={classNames('box-center', styles.boxCenter)}>
              <h1 className={classNames('box-title', styles.boxTitle)}>Daftar Golekin</h1>
            </div>

            <form className={classNames('nama-space', styles.namaSpace)} onSubmit={handleRegister}>
              <div className="space-y-2">
                <Label htmlFor="posisi" className={classNames('position-text', styles.positionText)}>
                  Daftar Sebagai
                </Label>
                <select
                  onChange={(e) => setSelectedRole(e.target.value)}
                  className={classNames('position-select', styles.positionSelect)}
                >
                  <option value="">Pilih</option>
                  <option value="konsumen">Konsumen</option>
                  <option value="agen">Agen</option>
                  <option value="pedagang">Pedagang</option>
                  <option value="driver">Driver</option>
                </select>
              </div>

              <div className={classNames('nama-enter', styles.namaEnter)}>
                <Label htmlFor="username" className={classNames('nama-text', styles.namaText)}>
                  Username
                </Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Masukkan Username Anda"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className={classNames('nama-input', styles.namaInput)}
                />
              </div>

              <div className={classNames('nama-enter', styles.namaEnter)}>
                <Label htmlFor="fullName" className={classNames('nama-text', styles.namaText)}>
                  Nama Lengkap
                </Label>
                <Input
                  id="fullName"
                  type="text"
                  placeholder="Nama Lengkap Anda"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className={classNames('nama-input', styles.namaInput)}
                />
              </div>

              <div className={classNames('email-enter', styles.emailEnter)}>
                <Label htmlFor="email" className={classNames('email-text', styles.emailText)}>
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={classNames('email-input', styles.emailInput)}
                />
              </div>

              <div className={classNames('phone-enter', styles.phoneEnter)}>
                <Label htmlFor="phoneNumber" className={classNames('phone-text', styles.phoneText)}>
                  Nomor Telepon
                </Label>
                <Input
                  id="phoneNumber"
                  type="text"
                  placeholder="Masukkan nomor telepon"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className={classNames('phone-input', styles.phoneInput)}
                />
              </div>

              {(selectedRole === 'pedagang' || selectedRole === 'driver' || selectedRole === 'agen') && (
                <div className={classNames('nama-enter', styles.namaEnter)}>
                  <Label htmlFor="tempatUsaha" className={classNames('nama-text', styles.namaText)}>
                    Tempat Usaha
                  </Label>
                  {isLoaded && (
                    <Autocomplete
                      onLoad={(autocomplete) => {
                        autocompleteRef.current = autocomplete;
                      }}
                      onPlaceChanged={handlePlaceChange}
                    >
                      <Input
                        id="tempatUsaha"
                        placeholder="Cari nama tempat atau alamat"
                        value={tempatUsaha}
                        onChange={(e) => setTempatUsaha(e.target.value)}
                        className={classNames('nama-input', styles.namaInput)}
                      />
                    </Autocomplete>
                  )}

                  {isLoaded && (
                    <div style={{ marginTop: '1rem' }}>
                      <GoogleMap
                        mapContainerStyle={mapContainerStyle}
                        center={mapCenter}
                        zoom={15}
                        onClick={handleMapClick}
                      >
                        <MarkerF position={markerPosition} />
                      </GoogleMap>
                    </div>
                  )}

                  {/* description */}
                  <div className={classNames('description-enter', styles.descriptionEnter)}>
                    <Label htmlFor="description" className={classNames('description-text', styles.descriptionText)}>
                      Deskripsi
                    </Label>
                    <Input
                      id="description"
                      type="text"
                      placeholder="Deskripsi"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className={classNames('description-input', styles.descriptionInput)}
                    />
                  </div>
                </div>
              )}

              <div className={classNames('password-enter', styles.passwordEnter)}>
                <Label htmlFor="password" className={classNames('password-text', styles.passwordText)}>
                  Password
                </Label>
                <div className={classNames('password-relative', styles.passwordRelative)}>
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={classNames('placeholder-password', styles.placeHolderPassword)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className={classNames('button-eye', styles.buttonEye)}
                  >
                    {showPassword ? '🙈' : '👁️'}
                  </button>
                </div>
              </div>

              <div className={classNames('pin-enter', styles.pinEnter)}>
                <Label htmlFor="pin" className={classNames('pin-text', styles.pinText)}>
                  PIN (6 Angka)
                </Label>
                <Input
                  id="pin"
                  type="password"
                  placeholder="Masukkan 6 angka PIN"
                  value={pin}
                  onChange={(e) => {
                    const newValue = e.target.value.replace(/[^0-9]/g, '').slice(0, 6);
                    setPin(newValue);
                  }}
                  className={classNames('pin-input', styles.pinInput)}
                />
              </div>

              <div className="mt-4">
                <Label htmlFor="imageUpload" className="text-gray-700">
                  Upload Foto Profil
                </Label>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="border border-gray-300 rounded-lg text-black bg-gray-300 hover:bg-gray-400 cursor-pointer"
                />
                {imagePreview && (
                  <div className="mt-4">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="h-32 w-32 object-cover rounded-lg"
                    />
                  </div>
                )}
              </div>

              <div className={classNames('button-submit', styles.buttonSubmit)}>
                <Button type="submit" className={classNames('submit-button', styles.submitButton)}>
                  Daftar
                </Button>
              </div>

              <p className={classNames('footer-text', styles.footerText)}>
                Sudah punya akun?{' '}
                <Link href="/login" className={classNames('footer-hover', styles.footerHover)}>
                  Masuk
                </Link>
              </p>
            </form>
          </div>
        </motion.div>
      </div>
    </>
  );
}

export default Register;
