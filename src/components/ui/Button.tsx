interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
  loading?: boolean;
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
    sm: "px-5 py-3 text-sm gap-1.5",
    md: "px-6 py-3.5 text-sm gap-2",
    lg: "px-8 py-4 text-base gap-2.5",
  };

  const variants = {
    primary:
      "bg-primary text-white hover:bg-primary-light focus:ring-primary shadow-sm hover:shadow-md",
    secondary:
      "bg-secondary text-black hover:bg-secondary-light focus:ring-secondary shadow-sm hover:shadow-md",
    outline:
      "border border-primary/20 text-primary hover:bg-primary/5 hover:border-primary/40 focus:ring-primary",
    ghost:
      "text-text-muted hover:text-text hover:bg-bg-alt focus:ring-primary",
    danger:
      "bg-error text-white hover:bg-red-600 focus:ring-error shadow-sm hover:shadow-md",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${base} ${sizes[size]} ${variants[variant]} active:scale-[0.97] ${
        disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
      } ${className}`}
    >
      {loading && (
        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
      )}
      {children}
    </button>
  );
}
