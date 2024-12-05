import axios from 'axios';

// Interface for Product Data
interface ProductData {
  name: string;
  description?: string;
  price: number;
  stock: number;
  category?: string;
  img?: string;
}
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const ProductService = {
  // Function to add a product
  async addProduct(productData: ProductData) {
    try {
      // Retrieve the token from localStorage
      const token = localStorage.getItem('access_token');

      // Check if token exists
      if (!token) {
        throw new Error('No authentication token found');
      }

      // Prepare the payload matching backend expectations
      const payload = {
        product_name: productData.name,
        description: productData.description || '',
        price: productData.price,
        stock: productData.stock,
        category_id: productData.category || null,
        image_url: productData.img || '',
        is_active: 1
      };

      // Make the API call
      const response = await axios.post(`${API_BASE_URL}/products/add_product`, payload, {
        headers: {
          'Authorization': `Bearer ${token}`, // Include token in Authorization header
          'Content-Type': 'application/json'
        }
      });

      return response.data;
    } catch (error) {
      console.error('Error adding product:', error);
      throw error;
    }
  }
};