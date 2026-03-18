import React from "react";

interface GlassCardProps {
  children: React.ReactNode;
}

const GlassCard: React.FC<GlassCardProps> = ({ children }) => {
  return (
    <div
      style={{
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        background: "rgba(255, 255, 255, 0.6)",
        border: "1px solid rgba(0,0,0,0.1)",
        borderRadius: "20px",
        padding: "30px",
        boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
        color: "#111",
        transition: "all 0.3s ease",
        maxWidth: "400px",
        width: "100%",
      }}
    >
      {children}
    </div>
  );
};

export default GlassCard;
