'use client';

import React, { useState, useEffect, useRef } from 'react';
import { GoogleMap, MarkerF, useLoadScript, Autocomplete } from '@react-google-maps/api';
import Navbar from '@/components/ui/navbar';
import axios from 'axios';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

const mapContainerStyle = {
  width: '100%',
  height: '300px',
};

const center = {
  lat: -6.200000,
  lng: 106.816666,
};

const Profile: React.FC = () => {
  const [profileData, setProfileData] = useState<any>(null);
  const [updatedData, setUpdatedData] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [markerPosition, setMarkerPosition] = useState(center);
  const [mapCenter, setMapCenter] = useState(center);
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [agents, setAgents] = useState<{ id: number; fullname: string }[]>([]);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY || '',
    libraries: ['places'],
  });

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('access_token');
      const storedRole = localStorage.getItem('role');
      setRole(storedRole);

      try {
        const response = await axios.get(`${API_BASE_URL}/auth/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfileData(response.data);
        setUpdatedData(response.data);
        if (response.data.image_url) {
          setImagePreview(response.data.image_url); // Set existing profile picture
        }
        if (response.data.location) {
          const location = JSON.parse(response.data.location);
          setMarkerPosition(location);
          setMapCenter(location);
        }
      } catch (err: any) {
        setError(err.response?.data?.error || 'Failed to fetch profile.');
      } finally {
        setLoading(false);
      }
    };

    const fetchAgents = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/user/agents`);
        setAgents(response.data.agents.map((agent: any) => ({ id: agent.id, fullname: agent.fullname })));
      } catch (error) {
        console.error('Failed to fetch agents:', error);
      }
    };

    fetchProfile();
    fetchAgents();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setUpdatedData((prev: any) => ({ ...prev, [id]: value }));
  };

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
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.data.url;
    } catch (error) {
      console.error('Failed to upload image:', error);
      alert('Failed to upload image.');
      return null;
    }
  };

  const handlePlaceChange = () => {
    if (autocompleteRef.current) {
      const place = autocompleteRef.current.getPlace();
      if (place.geometry?.location) {
        const location = place.geometry.location;
        const newCenter = { lat: location.lat(), lng: location.lng() };
        setMarkerPosition(newCenter);
        setMapCenter(newCenter);
        setUpdatedData((prev: any) => ({ ...prev, location: JSON.stringify(newCenter) }));
      }
    }
  };

  const handleMapClick = (event: google.maps.MapMouseEvent) => {
    if (event.latLng) {
      const newPosition = { lat: event.latLng.lat(), lng: event.latLng.lng() };
      setMarkerPosition(newPosition);
      setUpdatedData((prev: any) => ({ ...prev, location: JSON.stringify(newPosition) }));
    }
  };

  const handleUpdateProfile = async () => {
    const token = localStorage.getItem('access_token');
    const uploadedImageUrl = await uploadImage();
    const dataToUpdate = {
      ...updatedData,
      image_url: uploadedImageUrl || updatedData.image_url,
    };

    try {
      await axios.put(`${API_BASE_URL}/auth/profile`, dataToUpdate, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Profile updated successfully!');
    } catch (err: any) {
      console.error('Failed to update profile:', err);
      alert(err.response?.data?.error || 'Failed to update profile.');
    }
  };

  if (loading) return <p className="text-center text-gray-600">Loading...</p>;
  if (error) return <p className="text-center text-red-600">{error}</p>;

  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg mt-6 text-black">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Profil Anda</h1>
        <div className="space-y-4">
          <div>
            <Label htmlFor="username">Username</Label>
            <Input id="username" value={updatedData.username} disabled className="mt-1 w-full" />
          </div>
          <div>
            <Label htmlFor="fullname">Nama Lengkap</Label>
            <Input id="fullname" value={updatedData.fullname} onChange={handleInputChange} className="mt-1 w-full" />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" value={updatedData.email} onChange={handleInputChange} className="mt-1 w-full" />
          </div>
          <div>
            <Label htmlFor="phone_number">Nomor Hp.</Label>
            <Input id="phone_number" value={updatedData.phone_number} onChange={handleInputChange} className="mt-1 w-full" />
          </div>
          <div>
            <Label htmlFor="description">Deskripsi</Label>
            <Input id="description" value={updatedData.description} onChange={handleInputChange} className="mt-1 w-full" />
          </div>
          {(role === 'konsumen' || role === 'agen' || role === 'driver') && (
            <div>
            <Label htmlFor="location">Lokasi Anda</Label>
            {isLoaded && (
              <>
                <Autocomplete
                  onLoad={(ref) => (autocompleteRef.current = ref)}
                  onPlaceChanged={handlePlaceChange}
                >
                  <Input
                    id="location"
                    placeholder="Cari nama tempat atau alamat"
                    value={updatedData.location}
                    onChange={(e) => setUpdatedData((prev: any) => ({ ...prev, location: e.target.value }))}
                    className="mt-1 w-full"
                  />
                </Autocomplete>
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
              </>
            )}
          </div>
          
          )}
          {role === 'driver' && (
            <div>
              <Label htmlFor="agen_id">Agen</Label>
              <select id="agen_id" value={updatedData.agen_id} onChange={handleInputChange} className="mt-1 w-full">
                <option value="">Pilih Agen</option>
                {agents.map((agent) => (
                  <option key={agent.id} value={agent.id}>
                    {agent.fullname}
                  </option>
                ))}
              </select>
            </div>
          )}
          <div>
            <Label htmlFor="imageUpload">Upload Foto Profil</Label>
            <Input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="mt-1 w-full"
            />
            {/* Display only one preview: the new image or the current profile picture */}
            {imagePreview ? (
                <img
                src={imagePreview}
                alt="Preview"
                className="mt-4 h-32 w-32 object-cover rounded-md"
                />
            ) : (
                profileData?.image_url && (
                <img
                    src={profileData.image_url}
                    alt="Current Profile"
                    className="mt-4 h-32 w-32 object-cover rounded-md"
                />
                )
            )}
        </div>

        </div>
        <button
          onClick={handleUpdateProfile}
          className="mt-6 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
        >
          Simpan
        </button>
      </div>
    </>
  );
};

export default Profile;
