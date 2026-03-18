"use client";

import React, { useRef, useEffect } from "react";

interface AnimatedBackgroundProps {
  particleCount?: number;
  speed?: number;
  colorScheme?: string[];
  enableInteraction?: boolean;
}

const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({
  particleCount = 80,
  speed = 0.5,
  colorScheme = ["#2563eb", "#7c3aed", "#0ea5e9"],
  enableInteraction = true,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const particlesRef = useRef<any[]>([]);
  const mouse = useRef<{ x: number | null; y: number | null }>({ x: null, y: null });

  // Resize canvas
  const resizeCanvas = (canvas: HTMLCanvasElement) => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };

  // Create particles
  const createParticles = (canvas: HTMLCanvasElement) => {
    const particles = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 1,
        speedX: (Math.random() - 0.5) * speed,
        speedY: (Math.random() - 0.5) * speed,
        color: colorScheme[Math.floor(Math.random() * colorScheme.length)],
      });
    }
    particlesRef.current = particles;
  };

  // Draw particles
  const drawParticles = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particlesRef.current.forEach((p) => {
      p.x += p.speedX;
      p.y += p.speedY;

      // Wrap around edges
      if (p.x > canvas.width) p.x = 0;
      if (p.x < 0) p.x = canvas.width;
      if (p.y > canvas.height) p.y = 0;
      if (p.y < 0) p.y = canvas.height;

      // Mouse interaction
      if (enableInteraction && mouse.current.x !== null && mouse.current.y !== null) {
        const dx = p.x - mouse.current.x;
        const dy = p.y - mouse.current.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 100) {
          p.x += dx / 20;
          p.y += dy / 20;
        }
      }

      // Draw particle
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.shadowColor = p.color;
      ctx.shadowBlur = 10;
      ctx.fill();
    });
  };

  // Animation loop
  const animate = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    drawParticles(ctx, canvas);
    animationRef.current = requestAnimationFrame(() => animate(ctx, canvas));
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    resizeCanvas(canvas);
    createParticles(canvas);

    animate(ctx, canvas);

    // Mouse move
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    const handleResize = () => {
      resizeCanvas(canvas);
      createParticles(canvas);
    };

    if (enableInteraction) {
      window.addEventListener("mousemove", handleMouseMove);
    }
    window.addEventListener("resize", handleResize);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [particleCount, speed, enableInteraction, colorScheme]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -1,
        background: "linear-gradient(135deg, #f8fafc, #e0f2fe)",
      }}
    />
  );
};

export default AnimatedBackground;
