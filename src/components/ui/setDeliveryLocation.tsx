import React, { useState, useRef } from "react";
import { GoogleMap, MarkerF, useLoadScript, Autocomplete } from "@react-google-maps/api";
import axios from "axios";

interface SetDeliveryLocationProps {
  transactionId: number;
  onLocationUpdate: (distanceKm: number, shippingCost: number) => void; // Callback after successful update
}

const mapContainerStyle = {
  width: "100%",
  height: "300px",
};

const center = {
  lat: -6.200000, // Default latitude
  lng: 106.816666, // Default longitude (Jakarta)
};

const SetDeliveryLocation: React.FC<SetDeliveryLocationProps> = ({ transactionId, onLocationUpdate }) => {
  const [markerPosition, setMarkerPosition] = useState(center);
  const [mapCenter, setMapCenter] = useState(center);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [distanceKm, setDistanceKm] = useState<number | null>(null);
  const [shippingCost, setShippingCost] = useState<number | null>(null);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY || "",
    libraries: ["places"],
  });

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

  const handleUpdateLocation = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("access_token");

      const location = {
        lat: markerPosition.lat,
        lng: markerPosition.lng,
      };

      const response = await axios.put(
        `${API_BASE_URL}/transaction/delivery_location`,
        {
          transaction_id: transactionId,
          location,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const { distance_km, shipping_cost, message } = response.data;
      setMessage(message || "Location updated successfully!");
      setDistanceKm(distance_km);
      setShippingCost(shipping_cost);
      setError(null);

      onLocationUpdate(distance_km, shipping_cost); // Trigger the callback
    } catch (err: any) {
      setError(err.response?.data?.error || "Failed to update location.");
      setMessage(null);
    } finally {
      setLoading(false);
    }
  };

  if (!isLoaded) {
    return <p>Loading map...</p>;
  }

  return (
    <div className="cover mx-auto mt-4 p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-lg font-bold text-gray-800 mb-4">Set Delivery Location</h2>
      <Autocomplete
        onLoad={(autocomplete) => (autocompleteRef.current = autocomplete)}
        onPlaceChanged={handlePlaceChange}
      >
        <input
          type="text"
          placeholder="Cari lokasi anda"
          className="w-full border px-3 py-2 rounded-lg mb-2 text-gray-800"
        />
      </Autocomplete>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={mapCenter}
        zoom={15}
        onClick={handleMapClick}
      >
        <MarkerF position={markerPosition} />
      </GoogleMap>
      <button
        onClick={handleUpdateLocation}
        disabled={loading}
        className={`w-full bg-blue-500 text-white py-2 px-4 rounded-lg mt-4 hover:bg-blue-600 ${
          loading ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {loading ? "Updating..." : "Save Location"}
      </button>
      {message && <p className="text-green-500 mt-2">{message}</p>}
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {distanceKm !== null && shippingCost !== null && (
        <div className="mt-4">
          <p className="text-gray-800">Distance: {distanceKm} km</p>
          <p className="text-gray-800">Shipping Cost: Rp {shippingCost.toLocaleString()}</p>
        </div>
      )}
    </div>
  );
};

export default SetDeliveryLocation;
