import { Link } from "react-router";

const ProLogo = ({ variant = "dark", className = "", withLink = true }) => {
  const isLight = variant === "light";

  const content = (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Architectural Monogram Icon */}
      <div className="relative w-10 h-10 flex items-center justify-center">
        <svg
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-10 h-10 transition-transform duration-300 group-hover:scale-105"
        >
          {/* Outer diamond / architectural pavilion border */}
          <rect
            x="24"
            y="3"
            width="29.7"
            height="29.7"
            rx="2"
            transform="rotate(45 24 3)"
            stroke={isLight ? "#FFFFFF" : "#173D3B"}
            strokeWidth="1.75"
            strokeOpacity={isLight ? "0.9" : "1"}
            className="transition-colors"
          />
          {/* Inner terracotta accent diamond */}
          <rect
            x="24"
            y="8.5"
            width="21.9"
            height="21.9"
            rx="1"
            transform="rotate(45 24 8.5)"
            stroke="#B87556"
            strokeWidth="1.25"
          />
          {/* Architectural 'H' Monogram */}
          <path
            d="M18 16V32M30 16V32M18 24H30"
            stroke={isLight ? "#FFFFFF" : "#173D3B"}
            strokeWidth="2"
            strokeLinecap="round"
          />
          {/* Subtle terracotta center dot */}
          <circle cx="24" cy="24" r="1.5" fill="#B87556" />
        </svg>
      </div>

      {/* Brand Typography */}
      <div className="flex flex-col">
        <span
          className={`font-serif text-lg tracking-[0.16em] uppercase font-semibold leading-tight ${
            isLight ? "text-white" : "text-[#173D3B]"
          }`}
        >
          Havenstone
        </span>
        <span
          className={`text-[9px] tracking-[0.32em] uppercase font-medium ${
            isLight ? "text-[#B87556]" : "text-[#B87556]"
          }`}
        >
          Realty &bull; Estates
        </span>
      </div>
    </div>
  );

  if (withLink) {
    return (
      <Link to="/" className="group inline-flex items-center focus:outline-none">
        {content}
      </Link>
    );
  }

  return content;
};

export default ProLogo;