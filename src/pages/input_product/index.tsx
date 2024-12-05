import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Navbar from "@/components/ui/navbar";
import useStyles from "./style";
import classNames from "classnames";
import axios from "axios";
import { ProductService } from "@/services/productService";
import API_BASE_URL from "../../../config";
import ProtectedRoute from "@/components/ProtectedRoute";

const productSchema = z.object({
  name: z.string().min(1, "Nama produk wajib diisi"),
  description: z.string().optional(),
  price: z.number().min(0, "Harga tidak boleh negatif"),
  stock: z.number().min(0, "Stok tidak boleh negatif"),
  category: z.string().optional(),
  img: z.string().url("Harus berupa URL gambar yang valid").or(z.literal("")),
});

type ProductFormValues = z.infer<typeof productSchema>;

export function ProductForm() {
  const styles = useStyles();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [categories, setCategories] = useState<{ id: number; category_name: string }[]>([]);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      stock: 0,
      category: "",
      img: "",
    },
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/products/categories`);
        setCategories(response.data.categories);
      } catch (error) {
        if (error instanceof Error) {
          console.error("Failed to fetch categories:", error.message);
        } else {
          console.error("An unknown error occurred while fetching categories.");
        }
      }
    };
    fetchCategories();
  }, []);

  const handleImageUpload = async (file: File) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
    const maxFileSize = 5 * 1024 * 1024; // 5 MB

    if (!allowedTypes.includes(file.type)) {
      setMessage("File type not supported. Please upload a valid image (JPG, PNG, GIF).");
      throw new Error("Unsupported file type");
    }

    if (file.size > maxFileSize) {
      setMessage("File is too large. Please upload a file smaller than 5 MB.");
      throw new Error("File size exceeds limit");
    }

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(`${API_BASE_URL}/upload/files`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setUploading(false);
      console.log("Uploaded file URL:", response.data.url); // Debug log
      return response.data.url; // Use the absolute URL returned by the backend
    } catch (error) {
      setUploading(false);
      if (error instanceof Error) {
        console.error("Failed to upload image:", error.message);
        setMessage(error.message);
      } else {
        console.error("An unknown error occurred during image upload.");
        setMessage("Terjadi kesalahan saat mengunggah gambar.");
      }
      throw error;
    }
  };

  const onSubmit = async (data: ProductFormValues) => {
    try {
      setLoading(true);
      setMessage(null);

      const result = await ProductService.addProduct(data);

      setMessage("Produk berhasil ditambahkan!");
      console.log("Produk berhasil ditambahkan:", result);

      form.reset();
      setImagePreview(null);
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error:", error.message);
        setMessage(error.message);
      } else {
        console.error("An unknown error occurred.");
        setMessage("Terjadi kesalahan yang tidak diketahui.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProtectedRoute allowedRoles={["agen"]}>
      <Navbar />
      <div className={classNames("input-background", styles.inputBackground)}>
        <div className={classNames("input-enter", styles.inputEnter)}>
          <h1 className={classNames("input-addproduct", styles.inputAddProduct)}>Tambah Produk</h1>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={classNames("label-name", styles.labelName)}>Nama Produk</FormLabel>
                    <FormControl>
                      <Input
                        className="border border-gray-300 rounded-lg focus:ring-black-500 focus:border-black-500 text-gray-800"
                        placeholder="Masukkan nama produk"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">Deskripsi</FormLabel>
                    <FormControl>
                      <Textarea
                        className="border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 text-gray-800"
                        placeholder="Masukkan deskripsi produk"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">Harga</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        className="border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 text-gray-800"
                        placeholder="Masukkan harga"
                        {...field}
                        value={field.value || ""}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="stock"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">Stok</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        className="border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 text-gray-800"
                        placeholder="Masukkan stok"
                        {...field}
                        value={field.value || ""}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">Kategori</FormLabel>
                    <FormControl>
                      <select
                        className="border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 w-full text-gray-800"
                        {...field}
                      >
                        <option value="">Pilih kategori</option>
                        {categories.map((category) => (
                          <option key={category.id} value={category.id}>
                            {category.category_name}
                          </option>
                        ))}
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="img"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">Gambar Produk</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        className="border border-gray-300 rounded-lg text-black bg-gray-300 hover:bg-gray-400 cursor-pointer"
                        onChange={async (e) => {
                          if (e.target.files?.[0]) {
                            try {
                              const url = await handleImageUpload(e.target.files[0]);
                              field.onChange(url);
                              setImagePreview(url);
                              setMessage("Gambar berhasil diunggah");
                            } catch (err) {
                              if (err instanceof Error) {
                                setMessage(err.message);
                              } else {
                                setMessage("Gagal mengunggah gambar.");
                              }
                            }
                          }
                        }}
                      />
                    </FormControl>
                    {imagePreview && (
                      <div className="mt-4">
                        <img src={imagePreview} alt="Preview" className="h-32 w-32 object-cover rounded-lg" />
                      </div>
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />
              <button
                type="submit"
                className="w-full py-2 bg-indigo-500 text-white rounded-lg font-semibold hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1"
                disabled={loading || uploading}
              >
                {loading || uploading ? "Loading..." : "Submit"}
              </button>
            </form>
          </Form>
          {message && (
            <div
              className={`mt-4 p-2 text-center ${
                message.includes("berhasil") ? "text-green-500" : "text-red-500"
              }`}
            >
              {message}
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}

export default ProductForm;
