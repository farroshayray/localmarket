import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Navbar from "@/components/ui/navbar";
import useStyles from "./style";
import classNames from "classnames";

const productSchema = z.object({
  name: z.string().min(1, "Nama produk wajib diisi"),
  description: z.string().optional(),
  price: z.number().min(0, "Harga tidak boleh negatif"),
  stock: z.number().min(0, "Stok tidak boleh negatif"),
  category: z.string().optional(),
  img: z.string().url("Harus berupa URL gambar yang valid").optional(),
});

type ProductFormValues = z.infer<typeof productSchema>;

export function ProductForm() {
  const styles = useStyles();
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

  const onSubmit = (data: ProductFormValues) => {
    console.log("Form Data:", data);
  };

  return (
    <>
      <Navbar />
      <div className={classNames('input-background',styles.inputBackground)}>
        <div className={classNames('input-enter',styles.inputEnter)}>
          <h1 className={classNames('input-addproduct',styles.inputAddProduct)}>Tambah Produk</h1>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={classNames('label-name',styles.labelName)}>Nama Produk</FormLabel>
                    <FormControl>
                      <Input
                        className="border border-gray-300 rounded-lg focus:ring-black-500 focus:border-black-500"
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
                        className="border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
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
                        className="border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Masukkan harga"
                        {...field}
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
                        className="border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Masukkan stok"
                        {...field}
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
                      <Input
                        className="border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Masukkan kategori produk"
                        {...field}
                      />
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
                    <FormLabel className="text-gray-700">URL Gambar</FormLabel>
                    <FormControl>
                      <Input
                        className="border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Masukkan URL gambar"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <button
                type="submit"
                className="w-full py-2 bg-indigo-500 text-white rounded-lg font-semibold hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1"
              >
                Submit
              </button>
            </form>
          </Form>
        </div>
      </div>
    </>
  );
}

export default ProductForm;
