import { Button } from "@/components/ui/button"; 
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"; 
import { useState, useEffect } from "react";
import useStyle from './style';
import classNames from "classnames";
import ProtectedRoute from "@/components/ProtectedRoute";
import Navbar from "@/components/ui/navbar";
import axios from "axios";
import { useRouter } from "next/router";

// Tipe data produk untuk TypeScript
type Product = {
  id: number;
  image_url: string; 
  description: string; 
  price: number; 
  stock: number; 
  product_name: string;
};

const styles = useStyle();

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const agentId = localStorage.getItem("id"); // Retrieve agent ID from localStorage
        if (!agentId) {
          throw new Error("Agent ID not found in localStorage.");
        }

        const response = await axios.get(
          `http://127.0.0.1:5000/products/agen_products/${agentId}`
        );
        
        if (response.data.products) {
          setProducts(response.data.products);
        } else {
          setErrorMessage("No products found for this agent.");
        }
      } catch (error: any) {
        console.error("Error fetching products:", error);
        setErrorMessage(error.response?.data?.error || "Failed to fetch products.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Fungsi untuk menghapus produk
  const handleDelete = async (id: number) => {
    const confirmDelete = confirm("Are you sure you want to delete this product?");
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("access_token"); // Retrieve the access token from localStorage
      await axios.delete(`http://127.0.0.1:5000/products/delete_product/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Add Authorization header
        },
      });

      alert("Product deleted successfully!");
      // Update the products list after deletion
      setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));
    } catch (error: any) {
      console.error("Error deleting product:", error);
      alert(error.response?.data?.error || "Failed to delete the product.");
    }
  };

  // Fungsi untuk mengedit produk
  const handleEdit = (id: number) => {
    router.push(`edit_product/${id}`);
  };

  return (
    <ProtectedRoute allowedRoles={["agen"]}>
      <Navbar />
      <div className={classNames('container-tittle',styles.containerTittle)}>
        {/* Judul Halaman */}
        <h1 className={classNames('tittle',styles.tittle)}>Product List Golekin</h1>
        {/* Kondisi loading */}
        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : errorMessage ? (
          <p className="text-center text-red-500">{errorMessage}</p>
        ) : (
          // List untuk daftar produk
          <div className={classNames('listSpace',styles.listSpace)}>
            {products.map((product) => (
              // Setiap produk dirender dalam komponen Card
              <Card key={product.id} className={classNames('card',styles.card)}>
                {/* Gambar produk */}
                <img
                  src={product.image_url}
                  alt={product.product_name}
                  className={classNames('cardImage',styles.cardImage)}
                />
                {/* Detail Produk */}
                <div className={classNames('card-content',styles.cardContent)}>
                  <CardHeader>
                    <CardTitle className={classNames('cardTitle',styles.cardTitle)}>
                      {product.product_name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {/* Deskripsi produk */}
                    <p className={classNames('card-description',styles.cardDescription)}>
                      {product.description}
                    </p>
                    {/* Harga produk */}
                    <p className={classNames('card-price',styles.cardPrice)}>
                      Price: <span className={classNames('card-font',styles.cardFont)}>
                        Rp {product.price.toLocaleString()}
                      </span>
                    </p>
                    {/* Stok produk */}
                    <p className={classNames('card-stock',styles.cardStock)}>
                      Stock: {product.stock} pcs
                    </p>
                    {/* Tombol Edit dan Delete */}
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleEdit(product.id)}>
                        Edit
                      </Button>
                      <Button variant="destructive" size="sm" onClick={() => handleDelete(product.id)}>
                        Delete
                      </Button>
                    </div>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
};

export default ProductsPage;
