import { useEffect } from 'react';
import { useRouter } from 'next/router';

type ProtectedRouteProps = {
  allowedRoles: string[];
  children: React.ReactNode;
};

const ProtectedRoute = ({ allowedRoles, children }: ProtectedRouteProps) => {
  const router = useRouter();

  useEffect(() => {
    const role = localStorage.getItem('role'); // Ambil role dari localStorage
    if (!role || !allowedRoles.includes(role)) {
      // Redirect jika role tidak diizinkan
      router.push('/unauthorized');
    }
  }, [allowedRoles, router]);

  return <>{children}</>;
};

export default ProtectedRoute;
