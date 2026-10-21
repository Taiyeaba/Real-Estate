const SectionHeading = ({
  overline,
  title,
  description,
  align = "center",
  className = "",
  titleClassName = "",
  light = false,
}) => {
  const alignmentClass =
    align === "left"
      ? "text-left items-start"
      : align === "right"
      ? "text-right items-end"
      : "text-center items-center mx-auto";

  return (
    <div className={`flex flex-col max-w-3xl ${alignmentClass} ${className}`}>
      {overline && (
        <div className="flex items-center gap-2 mb-2.5">
          <span className="w-6 h-[1px] bg-[#B87556]" />
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#B87556]">
            {overline}
          </span>
          {align === "center" && <span className="w-6 h-[1px] bg-[#B87556]" />}
        </div>
      )}

      {title && (
        <h2
          className={`font-serif text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight leading-tight ${
            light ? "text-white" : "text-[#173D3B]"
          } ${titleClassName}`}
        >
          {title}
        </h2>
      )}

      {description && (
        <p
          className={`mt-3 text-sm sm:text-base leading-relaxed ${
            light ? "text-slate-300" : "text-[#6B7280]"
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
};

export default SectionHeading;
