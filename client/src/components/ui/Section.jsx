export function Section({ children, className = "", id }) {
  return (
    <section id={id} className={`py-20 md:py-28 ${className}`}>
      <div className="container-page">{children}</div>
    </section>
  );
}

export function SectionHeading({ eyebrow, title, description, align = "left" }) {
  const alignClass = align === "center" ? "text-center mx-auto" : "";
  return (
    <div className={`max-w-2xl ${alignClass} mb-12`}>
      {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
      <h2 className="font-display text-3xl md:text-4xl font-semibold tracking-tight text-[var(--color-text)]">
        {title}
      </h2>
      {description && <p className="mt-4 text-[var(--color-text-muted)] text-lg leading-relaxed">{description}</p>}
    </div>
  );
}
