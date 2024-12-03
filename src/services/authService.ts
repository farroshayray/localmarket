import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:5000'; // Ganti dengan URL API Anda

// Fungsi untuk register user
export const registerUser = async (data: {
  username: string;
  fullname: string;
  email: string;
  password: string;
  pin: string;
  role: string;
  phone_number: string;
  location?: string; //{ lat: number; lng: number };
}) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/register`, data);
      return response.data;
    } catch (error: any) {
      console.error('API Error:', error.response?.data || error.message); // Log detail error
      if (error.response && error.response.data) {
        throw new Error(error.response.data.message || JSON.stringify(error.response.data));
      } else {
        throw new Error(error.message || 'Something went wrong');
      }
    }
  };


  // fungsi untuk login user
  export const loginUser = async (data: {
    email: string;
    password: string;
    role: string;
  }) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/login`, data);
      console.log('Login berhasil:', response.data); // Menampilkan response pada console log
      return response.data;
    } catch (error: any) {
      console.error('Full API Error Response:', error.response); // Log respons error lengkap
    const errorMessage =
      error.response?.data?.error || // Ambil properti `error` jika tersedia
      error.response?.data?.message || // Fallback ke `message` jika ada
      'Login gagal'; // Pesan fallback
      throw new Error(errorMessage); // Lempar error dengan pesan yang diperoleh
    }
  };