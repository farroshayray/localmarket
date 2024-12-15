import React, { useState, useEffect } from "react";
import Navbar from "@/components/ui/navbar";
import ProtectedRoute from "@/components/ProtectedRoute";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { MapPinIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";

interface Product {
  id: number;
  product_name: string;
  product_description: string;
  product_image_url: string;
  product_price: number;
  quantity: number;
  subtotal: number;
}

interface Transaction {
  id: number;
  market_name: string;
  total_amount: number;
  items: Product[];
  created_at: string;
  status: string;
  shipping_cost: number;
  user_location: string;
}

const tabs = [
  { label: "Order List", status: "processed" },
  { label: "Order Taken", status: "taken" },
];

const Driver: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [selectedTab, setSelectedTab] = useState<string>("processed");
  const [loading, setLoading] = useState<boolean>(true);
  const [noDataMessage, setNoDataMessage] = useState<string>("");
  const [locations, setLocations] = useState<{ [key: number]: string }>({});
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  const router = useRouter();

  const reverseGeocode = async (lat: number, lng: number): Promise<string> => {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
      );
      if (response.data && response.data.address) {
        const { suburb, town, village, city } = response.data.address;
        return suburb || town || village || city || "Unknown Location";
      }
      return "Unknown Location";
    } catch (error) {
      console.error("Reverse geocoding error:", error);
      return "Unknown Location";
    }
  };

  const openGoogleMaps = (lat: number, lng: number) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const currentLat = position.coords.latitude;
          const currentLng = position.coords.longitude;
          const mapsUrl = `https://www.google.com/maps/dir/${currentLat},${currentLng}/${lat},${lng}`;
          window.open(mapsUrl, "_blank");
        },
        (error) => {
          console.error("Error getting current location:", error);
          alert("Unable to fetch your current location. Please check your permissions.");
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  const handleCompleteOrder = async (transactionId: number) => {
    try {
      const token = localStorage.getItem('access_token');
      console.log('token',token);
      const response = await axios.put(`${API_BASE_URL}/transaction/update_status_completed`, {
        transaction_id: transactionId,
      }, { headers: { Authorization: `Bearer ${token}` } });
      
      console.log('response',response);
      alert(response.data.message || "Order completed successfully.");
      setTransactions((prev) => prev.filter((t) => t.id !== transactionId));
    } catch (error: any) {
      console.error("Error completing order:", error);
      alert(
        error.response?.data?.error ||
          "Failed to complete order. Please try again later."
      );
    }
  };

  const updateDriverLocation = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const currentLat = position.coords.latitude;
          const currentLng = position.coords.longitude;
          const token = localStorage.getItem('access_token');
          const driver_id = localStorage.getItem('id');
          // const updatePromises = transactions.map((transaction) => {
          //   return axios.put(`${API_BASE_URL}/transaction/update_driver_location`, {
          //     driver_id: driver_id,
          //     driver_location: JSON.stringify({lat: currentLat,lng: currentLng}),
          //   }, { headers: { Authorization: `Bearer ${token}` }});
          // });

          try {
            // await Promise.all(updatePromises);
            const driver_id = localStorage.getItem('id');
            const token = localStorage.getItem('access_token');
            await axios.put(`${API_BASE_URL}/transaction/update_driver_location`, {
              driver_id: driver_id,
              driver_location: JSON.stringify({lat: currentLat,lng: currentLng}),
            }, { headers: { Authorization: `Bearer ${token}` }});
            console.log("Driver location updated for all transactions.");
            console.log('driver location:')
          } catch (error) {
            console.error("Error updating driver locations:", error);
          }
        },
        (error) => {
          console.error("Error getting current location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by your browser.");
    }
  };

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        setLoading(true);
        const agenId = localStorage.getItem("agen_id");
        if (!agenId) {
          throw new Error("Agent ID not found.");
        }

        const token = localStorage.getItem("access_token");
        const driver_id = localStorage.getItem("id");
        const endpoint =
          selectedTab === "processed"
            ? `/transaction/status_processed/agent/${agenId}`
            : `/transaction/status_taken_driver/agent/${agenId}/${driver_id}`;

        const config = token
          ? { headers: { Authorization: `Bearer ${token}` } }
          : undefined;

        const response = await axios.get(`${API_BASE_URL}${endpoint}`, config);


        if (response.data.grouped_transactions?.length > 0) {
          const allTransactions = response.data.grouped_transactions.flatMap(
            (group: { transactions: Transaction[] }) => group.transactions
          );
          setTransactions(allTransactions);
          setNoDataMessage("");

          // Fetch locations
          const locationPromises = allTransactions.map((transaction: Transaction) => {
            if (transaction.user_location) {
              const parsedLocation = JSON.parse(transaction.user_location);
              const { lat, lng } = parsedLocation;
              return reverseGeocode(lat, lng).then((address) => ({
                id: transaction.id,
                address,
              }));
            }
            return Promise.resolve({ id: transaction.id, address: "Unknown Location" });
          });

          const resolvedLocations = await Promise.all(locationPromises);
          const locationMap: { [key: number]: string } = {};
          resolvedLocations.forEach((loc) => {
            locationMap[loc.id] = loc.address;
          });
          setLocations(locationMap);
        } else {
          setTransactions([]);
          setNoDataMessage(response.data.message || "No transactions found.");
        }
      } catch (error: any) {
        if (error.response && error.response.status === 404) {
          setTransactions([]);
          setNoDataMessage(
            error.response.data.message || "No transactions found for this agent."
          );
        } else {
          console.error("Error fetching transactions:", error);
          setNoDataMessage("Failed to fetch transactions. Please try again later.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();

    let locationInterval: NodeJS.Timeout | null = null;
    if (selectedTab === "taken") {
      locationInterval = setInterval(updateDriverLocation, 5000);
    }

    return () => {
      if (locationInterval) {
        clearInterval(locationInterval);
      }
    };
  }, [selectedTab]);

  const handleTakeOrder = async (transactionId: number) => {
    try {
      const token = localStorage.getItem("access_token");
      const response = await axios.put(
        `${API_BASE_URL}/transaction/assign_driver`,
        {
          transaction_id: transactionId,
          status: "taken",
          driver_id: localStorage.getItem("id"),
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert(response.data.message || "Order taken successfully.");
      router.reload();

      // setTransactions((prev) => prev.filter((t) => t.id !== transactionId));
    } catch (error: any) {
      console.error("Error taking order:", error);
      alert(
        error.response?.data?.error ||
          "Failed to take order. Please try again later."
      );
    }
  };

  return (
    <ProtectedRoute allowedRoles={["driver"]}>
      <Navbar />
      <div className="bg-gray-100 min-h-screen py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Orderan Driver</h1>

          {/* Tabs */}
          <div className="flex justify-center space-x-4 mb-6">
            {tabs.map((tab) => (
              <button
                key={tab.status}
                onClick={() => setSelectedTab(tab.status)}
                className={`px-6 py-2 rounded-lg font-medium ${
                  selectedTab === tab.status
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Transaction List */}
          {loading ? (
            <p className="text-center text-gray-500">Loading...</p>
          ) : transactions.length === 0 ? (
            <p className="text-center text-gray-500">{noDataMessage}</p>
          ) : (
            <div className="bg-white shadow-md rounded-lg p-6">
              {transactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="border border-gray-300 rounded-lg p-4 mb-4 flex flex-col sm:flex-row justify-between"
                >
                  <div>
                    <h3 className="text-gray-700 font-medium mb-2">
                      ID Transaksi: {transaction.id} - Agen: {transaction.market_name}
                    </h3>
                    <ul className="list-disc list-inside text-gray-700">
                      {transaction.items.map((item) => (
                        <li key={item.id}>
                          {item.product_name} - {item.quantity} pcs @Rp. {" "}
                          {item.product_price.toLocaleString()} = (Rp. {" "}
                          {item.subtotal.toLocaleString()},-)
                        </li>
                      ))}
                    </ul>
                    <p className="text-gray-600 font-bold mt-2">
                      Subtotal Harga Barang: Rp {transaction.total_amount.toLocaleString()}
                    </p>
                    <ul>
                      <li className="list-disc list-inside text-gray-700">
                        Ongkos kirim: Rp{" "}
                        {transaction.shipping_cost
                          ? transaction.shipping_cost.toLocaleString()
                          : "0"}
                      </li>
                    </ul>
                    <p className="text-gray-800 font-bold mt-2 border-2 p-1 rounded-xl border-black">
                      Total Biaya: Rp. {" "}
                      {transaction.total_amount && transaction.shipping_cost
                        ? (transaction.total_amount + transaction.shipping_cost).toLocaleString()
                        : "0"}
                      ,-
                    </p>
                    <p className="text-sm text-gray-500">
                      Transaksi tanggal: {" "}
                      {new Date(transaction.created_at).toLocaleString()}
                    </p>
                    <p className="text-sm text-blue-700">
                      Lokasi Pengiriman: {locations[transaction.id] || "Loading..."}
                    </p>
                  </div>
                  {selectedTab === "processed" && (
                    <div className="my-auto">
                      <Button
                        className="bg-blue-700 hover:bg-blue-800"
                        onClick={() => handleTakeOrder(transaction.id)}
                      >
                        Ambil Order
                      </Button>
                    </div>
                  )}
                  {selectedTab === "taken" && (
                    <div className="my-auto flex flex-col">
                      <Button
                        className="bg-blue-700 hover:bg-blue-800 my-2"
                        onClick={() => {
                          const parsedLocation = JSON.parse(transaction.user_location);
                          openGoogleMaps(parsedLocation.lat, parsedLocation.lng);
                        }}
                      >
                        <MapPinIcon /> Lokasi
                      </Button>
                      <Button
                        className="bg-red-700 hover:bg-red-800 my-2"
                        onClick={() => handleCompleteOrder(transaction.id)}
                      >
                        Selesaikan Order
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Driver;
