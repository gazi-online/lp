import React from "react";

interface GlassButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
}

const GlassButton: React.FC<GlassButtonProps> = ({ children, onClick }) => {
  return (
    <button
      onClick={onClick}
      style={{
        backdropFilter: "blur(10px)",
        background: "rgba(255,255,255,0.7)",
        border: "1px solid rgba(255,255,255,0.2)",
        padding: "12px 20px",
        borderRadius: "12px",
        color: "#000",
        cursor: "pointer",
        transition: "all 0.3s ease",
      }}
      onMouseEnter={(e) => {
        (e.target as HTMLButtonElement).style.transform = "scale(1.05)";
      }}
      onMouseLeave={(e) => {
        (e.target as HTMLButtonElement).style.transform = "scale(1)";
      }}
    >
      {children}
    </button>
  );
};

export default GlassButton;
