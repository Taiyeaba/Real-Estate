import { useState, useEffect, useRef } from "react";
import { Link } from "react-router";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Bed,
  Bath,
  Maximize2,
  MapPin,
  ArrowRight,
  Sparkles,
  SearchX,
  RotateCcw,
} from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const fallbackImage =
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=80";

const ShowcasePropertyRow = ({ property, index }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  if (!property) return null;

  const isRent = property.listingType === "Rent";
  const isReversed = index % 2 !== 0;
  const propertyUrl = `/properties/${property.id || property.slug || property._id}`;
  const monographNumber = (index + 1).toString().padStart(2, "0");

  return (
    <article
      data-property-index={index}
      className={`showcase-row group relative w-full flex flex-col ${
        isReversed ? "lg:flex-row-reverse" : "lg:flex-row"
      } items-center gap-8 sm:gap-12 lg:gap-16 xl:gap-20 py-12 sm:py-16 lg:py-20 border-b border-[#E4E1D9]/70 last:border-b-0`}
    >
      {/* 1. Cinematic Photographic Frame */}
      <div className="w-full lg:w-[56%] xl:w-[58%] shrink-0">
        <Link
          to={propertyUrl}
          className="showcase-img-container relative block w-full aspect-[16/10] sm:aspect-[16/9] lg:aspect-[16/10] rounded-2xl sm:rounded-3xl overflow-hidden border border-[#E4E1D9] hover:border-[#B87556]/60 shadow-md hover:shadow-2xl group/img transition-all duration-700 bg-slate-900"
        >
          {/* Skeleton loader placeholder while loading */}
          {!imageLoaded && !imageError && (
            <div className="absolute inset-0 bg-[#E4E1D9]/40 animate-pulse z-0" />
          )}

          <img
            src={imageError ? fallbackImage : property.images?.[0] || fallbackImage}
            alt={property.title}
            loading={index < 2 ? "eager" : "lazy"}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
            className={`showcase-img w-full h-full object-cover transition-transform duration-1000 ease-out group-hover/img:scale-105 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
          />

          {/* Cinematic Vignette Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

          {/* Top Badges */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none z-10">
            <div className="flex items-center gap-2 flex-wrap">
              {/* Listing Status Badge */}
              <span
                className={`px-3 py-1 text-[11px] font-semibold tracking-wider uppercase rounded-full shadow-sm backdrop-blur-md ${
                  isRent
                    ? "bg-[#173D3B] text-white"
                    : "bg-[#173D3B] text-white"
                }`}
              >
                {isRent ? "For Rent" : "For Sale"}
              </span>

              {/* Property Type Badge */}
              <span className="px-3 py-1 text-[11px] font-medium tracking-wide rounded-full bg-white/95 text-[#303B3A] shadow-sm backdrop-blur-md border border-[#E4E1D9]">
                {property.propertyType}
              </span>
            </div>

            {/* Curated / Featured Badge */}
            {property.featured && (
              <span className="flex items-center gap-1.5 px-3 py-1 text-[11px] font-semibold tracking-wider uppercase rounded-full bg-[#B87556] text-white shadow-sm">
                <Sparkles className="w-3 h-3 fill-current" />
                <span>Curated</span>
              </span>
            )}
          </div>

          {/* Bottom Monograph Number Stamp */}
          <div className="absolute bottom-4 left-4 pointer-events-none z-10">
            <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-white bg-black/60 backdrop-blur-md px-3.5 py-1 rounded-full border border-white/20">
              № {monographNumber}
            </span>
          </div>
        </Link>
      </div>

      {/* 2. Editorial Narrative Panel (Lumière Signature Motif on Project Ivory Canvas) */}
      <div className="showcase-content w-full lg:w-[44%] xl:w-[42%] flex flex-col justify-center">
        {/* Monograph Reference Tag */}
        <div className="reveal-el flex items-center gap-3 mb-2.5">
          <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-[#B87556] font-semibold">
            RESIDENCE № {monographNumber}
          </span>
          <span className="w-1 h-1 rounded-full bg-[#D4CEC3]" />
          <span className="font-mono text-[10px] uppercase tracking-wider text-[#8A9292]">
            REF: #{property.id || property._id?.slice(-4) || "HAVEN"}
          </span>
        </div>

        {/* Title with Lumière Signature Horizontal Copper Line Motif */}
        {isReversed ? (
          // When Image is on the Right: Title First, followed by Horizontal Copper Line extending towards image
          <div className="reveal-el flex items-center gap-4 mb-3 flex-wrap sm:flex-nowrap">
            <h3 className="font-serif italic text-2xl sm:text-3xl lg:text-[40px] text-[#173D3B] font-normal leading-[1.18] group-hover:text-[#B87556] transition-colors">
              <Link to={propertyUrl}>{property.title}</Link>
            </h3>
            <span className="hidden sm:block flex-1 max-w-[140px] h-[1.5px] bg-[#B87556] shrink-0" />
          </div>
        ) : (
          // When Image is on the Left: Horizontal Copper Line First, followed by Title
          <div className="reveal-el flex items-center gap-3.5 mb-3">
            <span className="w-10 sm:w-16 h-[1.5px] bg-[#B87556] shrink-0" />
            <h3 className="font-serif italic text-2xl sm:text-3xl lg:text-[40px] text-[#173D3B] font-normal leading-[1.18] group-hover:text-[#B87556] transition-colors">
              <Link to={propertyUrl}>{property.title}</Link>
            </h3>
          </div>
        )}

        {/* Location with Minimal Pin */}
        <div className="reveal-el flex items-center gap-1.5 text-xs sm:text-sm text-[#555B57] font-normal mb-4">
          <MapPin className="w-3.5 h-3.5 text-[#B87556] shrink-0" />
          <span>{property.location}</span>
        </div>

        {/* Narrative Excerpt / Description */}
        <p className="reveal-el text-sm sm:text-base text-[#555B57] leading-relaxed font-light mb-6 max-w-xl line-clamp-3">
          {property.tagline || property.description}
        </p>

        {/* Price Valuation */}
        <div className="reveal-el mb-6">
          <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8A9292] block mb-1">
            {isRent ? "Monthly Lease Valuation" : "Acquisition Valuation"}
          </span>
          <div className="font-serif text-2xl sm:text-3xl lg:text-[34px] font-bold text-[#173D3B] tracking-tight">
            {property.priceDisplay ||
              (property.price
                ? `$${Number(property.price).toLocaleString()}`
                : "Valuation Upon Request")}
            {isRent && (
              <span className="text-xs sm:text-sm font-sans font-normal text-[#6B7280] ml-2">
                / month
              </span>
            )}
          </div>
        </div>

        {/* Architectural Specs Strip */}
        <div className="reveal-el flex items-center gap-4 sm:gap-6 py-2.5 px-4 rounded-xl bg-white border border-[#E4E1D9] shadow-xs w-fit mb-7 text-xs text-[#303B3A]">
          <div className="flex items-center gap-2">
            <Bed className="w-3.5 h-3.5 text-[#B87556]" />
            <span className="font-semibold">{property.bedrooms || "—"}</span>
            <span className="text-[#8A9292]">Beds</span>
          </div>

          <span className="w-[1px] h-3.5 bg-[#E4E1D9]" />

          <div className="flex items-center gap-2">
            <Bath className="w-3.5 h-3.5 text-[#B87556]" />
            <span className="font-semibold">{property.bathrooms || "—"}</span>
            <span className="text-[#8A9292]">Baths</span>
          </div>

          <span className="w-[1px] h-3.5 bg-[#E4E1D9]" />

          <div className="flex items-center gap-2">
            <Maximize2 className="w-3.5 h-3.5 text-[#B87556]" />
            <span className="font-semibold">
              {property.areaSqFt ? Number(property.areaSqFt).toLocaleString() : "—"}
            </span>
            <span className="text-[#8A9292]">Sq Ft</span>
          </div>
        </div>

        {/* Call to Action Link */}
        <div className="reveal-el">
          <Link
            to={propertyUrl}
            className="group/btn inline-flex items-center gap-3 text-xs uppercase tracking-[0.22em] font-semibold text-[#173D3B] hover:text-[#B87556] transition-colors"
          >
            <span>Explore Residence</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-2 text-[#B87556]" />
          </Link>
        </div>
      </div>
    </article>
  );
};

const PropertyGrid = ({ properties = [], onReset, emptyMessage }) => {
  const containerRef = useRef(null);

  // Smooth Scroll-Triggered Entrance Animations (reveals each Left-Right row smoothly as you scroll)
  useEffect(() => {
    if (typeof window === "undefined" || !containerRef.current) return;
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) return;

    const ctx = gsap.context(() => {
      const rows = containerRef.current.querySelectorAll(".showcase-row");

      rows.forEach((row) => {
        const img = row.querySelector(".showcase-img");
        const imgContainer = row.querySelector(".showcase-img-container");
        const revealItems = row.querySelectorAll(".reveal-el");

        // Master entrance timeline per Left-Right row
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: row,
            start: "top 80%",
            once: true,
          },
        });

        // 1. Photographic container unmask & smooth scale-in
        if (imgContainer && img) {
          tl.fromTo(
            imgContainer,
            { opacity: 0, y: 35 },
            { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" },
            0
          );
          tl.fromTo(
            img,
            { scale: 1.12 },
            { scale: 1, duration: 1.2, ease: "power2.out" },
            0
          );
        }

        // 2. Staggered reveal of narrative elements
        if (revealItems && revealItems.length > 0) {
          tl.fromTo(
            revealItems,
            { opacity: 0, y: 25 },
            {
              opacity: 1,
              y: 0,
              duration: 0.75,
              stagger: 0.07,
              ease: "power2.out",
            },
            0.12
          );
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, [properties]);

  if (!properties || properties.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-10 sm:p-14 text-center bg-white rounded-2xl border border-[#E4E1D9] shadow-sm max-w-xl mx-auto my-12">
        <div className="w-16 h-16 rounded-full bg-[#F7F5EF] border border-[#E4E1D9] flex items-center justify-center mb-4 text-[#B87556]">
          <SearchX className="w-8 h-8 stroke-[1.5]" />
        </div>
        <h3 className="font-serif italic text-2xl font-normal text-[#173D3B] mb-2">
          No Properties Found
        </h3>
        <p className="text-sm text-[#555B57] max-w-md mb-6 leading-relaxed font-light">
          {emptyMessage ||
            "We could not locate any residences matching your specific criteria. Please adjust your filters or reset to view our full collection."}
        </p>
        {onReset && (
          <button
            onClick={onReset}
            className="inline-flex items-center gap-2 px-6 py-3 text-xs uppercase tracking-[0.2em] font-semibold rounded-xl bg-[#173D3B] text-white hover:bg-[#B87556] transition-colors shadow-sm cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset All Filters</span>
          </button>
        )}
      </div>
    );
  }

  return (
    <div ref={containerRef} className="w-full flex flex-col pb-20">
      {properties.map((property, idx) => (
        <ShowcasePropertyRow
          key={property.id || property._id || idx}
          property={property}
          index={idx}
        />
      ))}
    </div>
  );
};

export default PropertyGrid;
