"use client";

import { motion } from "framer-motion";
import { ReactNode, MouseEvent, useState, useRef } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface ButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  href?: string;
  onClick?: (e: MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
  magnetic?: boolean;
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  className,
  href,
  onClick,
  magnetic = false,
}: ButtonProps) {
  const buttonRef = useRef<HTMLButtonElement | HTMLAnchorElement | null>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: MouseEvent) => {
    if (!magnetic || !buttonRef.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = buttonRef.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.15, y: middleY * 0.15 });
  };

  const handleMouseLeave = () => {
    if (!magnetic) return;
    setPosition({ x: 0, y: 0 });
  };

  const variants = {
    primary:
      "bg-[var(--accent)] text-white hover:bg-[var(--accent-hover)] shadow-[0_0_24px_var(--accent-glow)] hover:shadow-[0_0_40px_var(--accent-glow)]",
    secondary:
      "bg-transparent border border-[rgba(255,255,255,0.12)] text-[var(--text-primary)] hover:border-[var(--glow)] hover:text-[var(--glow)] hover:shadow-[0_0_20px_rgba(0,229,255,0.1)]",
    ghost:
      "bg-transparent text-[var(--text-secondary)] hover:text-[var(--accent)]",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3",
    lg: "px-8 py-4 text-lg",
  };

  const commonClasses = cn(
    "inline-flex items-center justify-center font-bold rounded-[var(--radius-md)] transition-all duration-500",
    variants[variant],
    sizes[size],
    className
  );

  const MotionLink = motion.create(Link);

  if (href) {
    return (
      <MotionLink
        href={href}
        ref={buttonRef as any}
        className={commonClasses}
        whileHover={{ scale: 1.04, y: -2 }}
        whileTap={{ scale: 0.96 }}
        animate={{ x: position.x, y: position.y }}
        transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
        onMouseMove={handleMouseMove as any}
        onMouseLeave={handleMouseLeave}
        onClick={onClick as any}
      >
        {children}
      </MotionLink>
    );
  }

  return (
    <motion.button
      ref={buttonRef as any}
      className={commonClasses}
      whileHover={{ scale: 1.04, y: -2 }}
      whileTap={{ scale: 0.96 }}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      onMouseMove={handleMouseMove as any}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      {children}
    </motion.button>
  );
}
