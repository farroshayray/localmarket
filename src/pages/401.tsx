import React from "react";
import { useRouter } from "next/router";

const UnauthorizedPage: React.FC = () => {
  const router = useRouter();

  const goLogin = () => {
    router.push("/login"); // Redirect to the home page
  };

  return (
    <>
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <h1>401 - Token Expired</h1>
      <p>Token kamu sudah habis, harap login kembali</p>
      <button
        onClick={goLogin}
        style={{
          marginTop: "1rem",
          padding: "0.5rem 1rem",
          fontSize: "1rem",
          color: "#fff",
          backgroundColor: "#0070f3",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Login
      </button>
    </div>
    </>
  );
};

export default UnauthorizedPage;
