interface SectionTitleProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}

export default function SectionTitle({
  title,
  subtitle,
  align = "center",
  className = "",
}: SectionTitleProps) {
  return (
    <div
      className={`mb-14 ${
        align === "center" ? "text-center" : "text-left"
      } ${className}`}
    >
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-text mb-4 tracking-tight leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="text-text-muted text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
      <div
        className={`w-24 h-1.5 bg-gradient-to-r from-secondary to-secondary-light rounded-full mt-5 ${
          align === "center" ? "mx-auto" : ""
        }`}
      />
    </div>
  );
}