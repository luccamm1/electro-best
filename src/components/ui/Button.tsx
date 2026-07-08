"use client";

import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
  loading?: boolean;
  href?: string;
}

export default function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  onClick,
  type = "button",
  disabled = false,
  loading = false,
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";

  const sizes = {
    sm: "px-4 py-2 text-sm gap-1.5",
    md: "px-6 py-3 text-base gap-2",
    lg: "px-8 py-4 text-lg gap-2.5",
  };

  const variants = {
    primary:
      "bg-primary text-white hover:bg-primary-light focus:ring-primary shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30",
    secondary:
      "bg-secondary text-black hover:bg-secondary-light focus:ring-secondary shadow-lg shadow-secondary/25 hover:shadow-xl hover:shadow-secondary/30 font-bold",
    outline:
      "border-2 border-white text-white hover:bg-white/10 focus:ring-white",
    ghost:
      "text-text hover:bg-bg-alt focus:ring-primary",
    danger:
      "bg-error text-white hover:bg-red-600 focus:ring-error",
  };

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${base} ${sizes[size]} ${variants[variant]} ${
        disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
      } ${className}`}
      whileHover={disabled ? {} : { scale: 1.03 }}
      whileTap={disabled ? {} : { scale: 0.97 }}
    >
      {loading && <Loader2 className="w-5 h-5 animate-spin" />}
      {children}
    </motion.button>
  );
}
