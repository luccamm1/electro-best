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
      className={`mb-12 ${
        align === "center" ? "text-center" : "text-left"
      } ${className}`}
    >
      <h2 className="text-3xl md:text-4xl font-bold text-text mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="text-text-muted text-lg max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
      <div
        className={`w-20 h-1 bg-secondary rounded-full mt-4 ${
          align === "center" ? "mx-auto" : ""
        }`}
      />
    </div>
  );
}
