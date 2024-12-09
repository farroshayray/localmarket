// /pages/products.tsx
import { Button } from "@/components/ui/button"; 
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"; 
import { useState } from "react";
import useStyle from './style';
import classNames from "classnames";
import ProtectedRoute from "@/components/ProtectedRoute";
import Navbar from "@/components/ui/navbar";

// Tipe data produk untuk TypeScript
type Product = {
  id: number;
  img: string; 
  description: string; 
  price: number; 
};

const styles = useStyle();

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([
    { id: 1, img: "/img1.jpg", description: "This is Product 1 description.", price: 100 },
    { id: 2, img: "/img2.jpg", description: "This is Product 2 description.", price: 200 },
    { id: 3, img: "/img3.jpg", description: "This is Product 3 description.", price: 300 },
  ]);

  // Fungsi untuk menghapus produk
  const handleDelete = (id: number) => {
    setProducts((prev) => prev.filter((product) => product.id !== id));
  };

  // Fungsi untuk mengedit produk (sementara hanya alert)
  const handleEdit = (id: number) => {
    alert(`Edit product ${id}`);
  };

  return (
    <ProtectedRoute allowedRoles={["agen"]}>
    <Navbar />
    <div className={classNames('container-tittle',styles.containerTittle)}>
      {/* Judul Halaman */}
      <h1 className={classNames('tittle',styles.tittle)}>Product List Golekin</h1>
      {/* List untuk daftar produk */}
      <div className={classNames('listSpace',styles.listSpace)}>
        {products.map((product) => (
          // Setiap produk dirender dalam komponen Card
          <Card key={product.id} className={classNames('card',styles.card)}>
            {/* Gambar produk */}
            <img
              src={product.img}
              alt={product.description}
              className={classNames('cardImage',styles.cardImage)}
            />
            {/* Detail Produk */}
            <div className={classNames('card-content',styles.cardContent)}>
              <CardHeader>
                <CardTitle className={classNames('cardTitle',styles.cardTitle)}>{product.description}</CardTitle>
              </CardHeader>
              <CardContent>
                {/* Deskripsi produk */}
                <p className={classNames('card-description',styles.cardDescription)}>
                  {product.description}
                </p>
                {/* Harga produk */}
                <p className={classNames('card-price',styles.cardPrice)}>
                  Price: <span className={classNames('card-font',styles.cardFont)}>${product.price}</span>
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
    </div>
    </ProtectedRoute>
  );
};

export default ProductsPage;
