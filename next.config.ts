import type { NextConfig } from "next";
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
});

// Kombinasi konfigurasi dengan static export
const nextConfig: NextConfig = withPWA({
  reactStrictMode: true,
  output: "export", // Mengaktifkan static export
  // Tambahkan konfigurasi lainnya jika diperlukan
});

export default nextConfig;
