import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { GoogleMap, MarkerF, useLoadScript, Autocomplete } from "@react-google-maps/api";
import Navbar from "@/components/ui/navbar";
import axios from "axios";

interface TransactionItem {
  id: number;
  product_name: string;
  product_description: string;
  product_price: number;
  product_image_url: string;
  quantity: number;
  subtotal: number;
}

interface TransactionDetails {
  id: number;
  market_name: string;
  total_amount: number;
  items: TransactionItem[];
}

const mapContainerStyle = {
  width: "100%",
  height: "300px",
};

const center = {
  lat: -6.200000, // Default latitude
  lng: 106.816666, // Default longitude (Jakarta)
};

const TransactionPage: React.FC = () => {
  const [transaction, setTransaction] = useState<TransactionDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [location, setLocation] = useState<string>("");
  const [markerPosition, setMarkerPosition] = useState(center);
  const [mapCenter, setMapCenter] = useState(center);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY || "",
    libraries: ["places"],
  });
  const router = useRouter();

  useEffect(() => {
    const userId = localStorage.getItem("id"); // Assuming user_id is stored in localStorage
    if (!userId) {
      alert("Please log in to view transaction details.");
      router.push("/login");
      return;
    }

    const fetchTransactionDetails = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/transaction/details/${userId}`);
        setTransaction(response.data.transaction);
      } catch (err) {
        setError("Failed to fetch transaction details. Please try again.");
        console.error("Error fetching transaction details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactionDetails();
  }, []);

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
        setLocation(place.formatted_address || "Unknown location");
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

  if (loading) {
    return <p className="text-center text-gray-600 mt-4">Loading transaction details...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500 mt-4">{error}</p>;
  }

  if (!transaction) {
    return (
      <>
        <Navbar />
        <p className="text-center text-gray-600 mt-4">No transaction details available.</p>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto mt-8 p-6 bg-white shadow-md rounded-lg">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Transaction Details</h1>
        <h2 className="text-lg font-semibold text-gray-700 mb-2">Market: {transaction.market_name}</h2>
        <div className="bg-gray-100 p-4 rounded-lg">
          {transaction.items.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center mb-4"
            >
              <div className="flex">
                <img
                  src={item.product_image_url}
                  alt={item.product_name}
                  className="w-16 h-16 object-cover rounded mr-4"
                />
                <div>
                  <p className="text-gray-800 font-semibold">{item.product_name}</p>
                  <p className="text-sm text-gray-600">{item.product_description}</p>
                  <p className="text-sm text-gray-600">
                    Price: Rp {item.product_price.toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-600">
                    Quantity: {item.quantity}
                  </p>
                </div>
              </div>
              <p className="text-gray-800 font-semibold">
                Subtotal: Rp {item.subtotal.toLocaleString()}
              </p>
            </div>
          ))}
          <div className="border-t pt-2 mt-2">
            <p className="text-gray-800 font-bold">
              Total Amount: Rp {transaction.total_amount.toLocaleString()}
            </p>
          </div>
        </div>

        <h2 className="text-lg font-semibold text-gray-700 mt-6">Delivery Location</h2>
        <div className="mt-4">
          {isLoaded && (
            <>
              <Autocomplete
                onLoad={(autocomplete) => {
                  autocompleteRef.current = autocomplete;
                }}
                onPlaceChanged={handlePlaceChange}
              >
                <input
                  type="text"
                  placeholder="Search location"
                  className="border border-gray-300 rounded-lg p-2 w-full"
                />
              </Autocomplete>
              <div style={{ marginTop: "1rem" }}>
                <GoogleMap
                  mapContainerStyle={mapContainerStyle}
                  center={mapCenter}
                  zoom={15}
                  onClick={handleMapClick}
                >
                  <MarkerF position={markerPosition} />
                </GoogleMap>
              </div>
              {location && (
                <p className="mt-2 text-gray-600">
                  Selected Location: {location}
                </p>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default TransactionPage;
