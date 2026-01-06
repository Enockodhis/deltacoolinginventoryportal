import React from "react";

const Authlayout = ({ children }) => {
  return (
    <div
      className="min-h-screen w-full flex items-center justify-center bg-cover bg-center relative"
      style={{
        backgroundImage: "url('/images/backgroundImage.png')",
      }}
    >
      {/* Stronger overlay for contrast */}
      <div className="absolute inset-0 bg-green-950/70"></div>

      {/* Centered content */}
      <div className="relative z-10 w-full flex justify-center px-4">
        {children}
      </div>
    </div>
  );
};

export default Authlayout;