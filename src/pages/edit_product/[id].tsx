import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/ui/navbar";
import ProtectedRoute from "@/components/ProtectedRoute";
import axios from "axios";
import ImageUploader from "@/components/ui/imageUploader";

const EditProductPage = () => {
  const router = useRouter();
  const { id } = router.query; // Get product ID from the URL
  const [loading, setLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [categories, setCategories] = useState<{ id: number; category_name: string }[]>([]);
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  const [formData, setFormData] = useState({
    product_name: "",
    description: "",
    price: 0,
    stock: 0,
    category_id: 0,
    image_url: "",
    is_active: 1,
  });

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        if (!id) return; // Ensure the ID is available
        setLoading(true);

        const token = localStorage.getItem("access_token"); // Get access token from localStorage

        const [productResponse, categoriesResponse] = await Promise.all([
          axios.get(`${API_BASE_URL}/products/product/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`${API_BASE_URL}/products/categories`),
        ]);

        const product = productResponse.data.product;
        const categoriesData = categoriesResponse.data.categories;

        setFormData({
          product_name: product.product_name || "",
          description: product.description || "",
          price: product.price || 0,
          stock: product.stock || 0,
          category_id: product.category_id || 0,
          image_url: product.image_url || "",
          is_active: product.is_active || 1,
        });

        setCategories(categoriesData);
      } catch (error: any) {
        console.error("Error fetching product or categories:", error);
        setErrorMessage(
          error.response?.data?.error || "Failed to fetch product details or categories."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "price" || name === "stock" || name === "category_id" ? Number(value) : value,
    }));
  };

  const handleImageUploadSuccess = (url: string) => {
    setFormData((prev) => ({
      ...prev,
      image_url: url, // Update the image_url in formData
    }));
  };

  const handleUpdateProduct = async () => {
    try {
      const token = localStorage.getItem("access_token"); // Get access token from localStorage
      const response = await axios.put(
        `${API_BASE_URL}/products/update_product/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Add Authorization header
            "Content-Type": "application/json",
          },
        }
      );

      alert(response.data.message || "Product updated successfully!");
      router.push("/list_product"); // Redirect to the products page
    } catch (error: any) {
      console.error("Error updating product:", error);
      setErrorMessage(
        error.response?.data?.error || "Failed to update product."
      );
    }
  };

  if (loading) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  if (errorMessage) {
    return <p className="text-center text-red-500">{errorMessage}</p>;
  }

  return (
    <ProtectedRoute allowedRoles={["agen"]}>
      <Navbar />
      <div className="max-w-4xl mx-auto mt-8 p-6 bg-white shadow-md rounded-lg">
        <h1 className="text-2xl font-bold mb-4 text-black">Edit Produk</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleUpdateProduct();
          }}
          className="space-y-4"
        >
          <div>
            <label className="block font-medium text-black">Nama Produk</label>
            <input
              type="text"
              name="product_name"
              value={formData.product_name}
              onChange={handleInputChange}
              className="w-full border px-3 py-2 rounded-lg text-gray-800"
              required
            />
          </div>
          <div>
            <label className="block font-medium text-black">Deskripsi Produk</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="w-full border px-3 py-2 rounded-lg text-gray-800"
              required
            />
          </div>
          <div>
            <label className="block font-medium text-black">Harga</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              className="w-full border px-3 py-2 rounded-lg text-gray-800"
              required
            />
          </div>
          <div>
            <label className="block font-medium text-black">Stok</label>
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleInputChange}
              className="w-full border px-3 py-2 rounded-lg text-gray-800"
              required
            />
          </div>
          <div>
            <label className="block font-medium text-black">Kategori</label>
            <select
              name="category_id"
              value={formData.category_id}
              onChange={handleInputChange}
              className="w-full border px-3 py-2 rounded-lg text-gray-800"
              required
            >
              <option value={0} disabled>
                Pilih Kategori
              </option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.category_name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <ImageUploader
              currentImageUrl={formData.image_url}
              uploadUrl={`${API_BASE_URL}/upload/files`}
              onUploadSuccess={handleImageUploadSuccess}
            />
          </div>
          <div>
            <label className="block font-medium text-black">Apakah Produk diaktifkan?</label>
            <select
              name="is_active"
              value={formData.is_active}
              onChange={handleInputChange}
              className="w-full border px-3 py-2 rounded-lg text-gray-800"
              required
            >
              <option value={1} className="text-black">Aktif</option>
              <option value={0} className="text-black">Tidak Aktif</option>
            </select>
          </div>
          <Button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg">
            Update Product
          </Button>
        </form>
      </div>
    </ProtectedRoute>
  );
};

export default EditProductPage;
