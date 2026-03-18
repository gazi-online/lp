"use client";

import React from "react";
import AnimatedBackground from "./AnimatedBackground";

export function ThemeWrapper({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AnimatedBackground />
      {children}
    </>
  );
}
