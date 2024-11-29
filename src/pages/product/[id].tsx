// pages/product/[id].tsx
import React from 'react';
import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import axios from 'axios';
import Navbar from '@/components/ui/navbar';

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
}

interface ProductDetailProps {
  product: Product | null;
}

const ProductDetail: NextPage<ProductDetailProps> = ({ product }) => {
  const router = useRouter();

  if (!product) {
    return (
        <>
        <Navbar />
        <p>Product not found.</p>
        </>
    );
  }

  return (
    <>
    <Navbar />
    <div>
      <button onClick={() => router.back()}>Back</button>
      <h1>{product.title}</h1>
      <img src={product.imageUrl} alt={product.title} style={{ maxWidth: '300px' }} />
      <p>{product.description}</p>
      <p>Price: ${product.price.toFixed(2)}</p>
    </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params!;
  try {
    const response = await axios.get<Product>(`https://api.example.com/products/${id}`);
    return {
      props: {
        product: response.data,
      },
    };
  } catch (error) {
    console.error('Error fetching product:', error);
    return {
      props: {
        product: null,
      },
    };
  }
};

export default ProductDetail;
