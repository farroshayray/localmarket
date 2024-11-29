   // src/index.tsx
   import { useEffect } from 'react';
   import { useRouter } from 'next/router';

   const IndexPage: React.FC = () => {
       const router = useRouter();

       useEffect(() => {
           // Redirect ke halaman home
           router.push('/home');
       }, [router]);

       return null; // Tidak ada konten yang ditampilkan di halaman ini
   };

   export default IndexPage;
