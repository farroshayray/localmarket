import "@/styles/globals.css";
// pages/_app.tsx
import React from 'react';
import { AppProps } from 'next/app';
import { UserProvider } from '../context/UserContext';
import Head from "next/head";

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <UserProvider>
      <Head>
        <link rel="icon" href="/favicon.png" />
        <link rel="manifest" href="/manifest.json" />
        <title>Golekin</title>
      </Head>
      <Component {...pageProps} />
    </UserProvider>
  );
};

export default MyApp;

