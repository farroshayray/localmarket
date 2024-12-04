import React from "react";
import { useRouter } from "next/router";

const NotFoundPage: React.FC = () => {
  const router = useRouter();

  const goHome = () => {
    router.push("/home"); // Redirect to the home page
  };

  return (
    <>
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <button
        onClick={goHome}
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
        Go to Home
      </button>
    </div>
    </>
  );
};

export default NotFoundPage;
