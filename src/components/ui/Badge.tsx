interface BadgeProps {
  children: React.ReactNode;
  variant?: "offer" | "new" | "sale" | "info";
  className?: string;
}

export default function Badge({ children, variant = "offer", className = "" }: BadgeProps) {
  const variants = {
    offer: "bg-secondary text-black font-bold",
    new: "bg-success text-white font-bold",
    sale: "bg-error text-white font-bold",
    info: "bg-primary text-white font-bold",
  };

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-lg text-xs ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
