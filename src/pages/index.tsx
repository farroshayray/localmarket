// pages/index.tsx
import React from 'react';
import { useUserContext } from '../context/UserContext';

const HomePage: React.FC = () => {
  const { user, setUser } = useUserContext();

  const handleLogin = () => {
    // Simulasi login
    setUser({ name: 'John Doe', email: 'john@example.com' });
  };

  return (
    <div>
      <h1>Welcome to Next.js with Context API</h1>
      {user ? (
        <div>
          <h2>Hello, {user.name}</h2>
          <p>Email: {user.email}</p>
        </div>
      ) : (
        <button onClick={handleLogin}>Login</button>
      )}
    </div>
  );
};

export default HomePage;
