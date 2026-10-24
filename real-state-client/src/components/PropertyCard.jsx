import { useState } from "react";
import { Link } from "react-router";
import { Bed, Bath, Maximize2, MapPin, ArrowUpRight, Sparkles } from "lucide-react";

const PropertyCard = ({ property, priority = false, dark = false }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  if (!property) return null;

  const fallbackImage =
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80";

  const isRent = property.listingType === "Rent";

  return (
    <div
      className={`group relative flex flex-col rounded-2xl overflow-hidden transition-all duration-300 transform hover:-translate-y-1.5 ${
        dark
          ? "bg-[#0A1312]/90 backdrop-blur-xl border border-white/10 hover:border-[#C5A46D]/50 shadow-[0_16px_40px_rgba(0,0,0,0.5)] text-[#E5E0D8]"
          : "bg-white border border-[#E4E1D9] shadow-sm hover:shadow-xl text-[#303B3A]"
      }`}
    >
      {/* Property Image Container */}
      <Link
        to={`/properties/${property.id || property.slug || property._id}`}
        className="relative block aspect-[16/11] overflow-hidden bg-slate-900"
      >
        {/* Skeleton loader placeholder while image loads */}
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 bg-white/[0.05] animate-pulse" />
        )}

        <img
          src={imageError ? fallbackImage : property.images?.[0] || fallbackImage}
          alt={property.title}
          loading={priority ? "eager" : "lazy"}
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageError(true)}
          className={`w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          <div className="flex items-center gap-1.5 flex-wrap">
            {/* Listing Type Badge */}
            <span
              className={`px-2.5 py-1 text-[11px] font-semibold tracking-wider uppercase rounded-full shadow-sm backdrop-blur-md ${
                isRent
                  ? "bg-[#173D3B]/90 text-white border border-white/20"
                  : "bg-[#173D3B] text-white border border-[#C5A46D]/40"
              }`}
            >
              {isRent ? "For Rent" : "For Sale"}
            </span>

            {/* Property Type Badge */}
            <span
              className={`px-2.5 py-1 text-[11px] font-medium tracking-wide rounded-full shadow-sm backdrop-blur-md border ${
                dark
                  ? "bg-black/60 text-white/90 border-white/15"
                  : "bg-white/95 text-[#303B3A] border-[#E4E1D9]"
              }`}
            >
              {property.propertyType}
            </span>
          </div>

          {/* Featured Badge */}
          {property.featured && (
            <span className="flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold tracking-wide rounded-full bg-[#C5A46D] text-black shadow-sm">
              <Sparkles className="w-3 h-3 fill-current" />
              <span>Curated</span>
            </span>
          )}
        </div>

        {/* Gradient Overlay for subtle bottom contrast */}
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />

        {/* Price on Image (bottom-left) */}
        <div className="absolute bottom-3 left-3 text-white pointer-events-none">
          <p className="font-serif text-xl sm:text-2xl font-bold tracking-tight drop-shadow-md text-[#E6C594]">
            {property.priceDisplay}
          </p>
        </div>
      </Link>

      {/* Property Details Body */}
      <div className="flex flex-col flex-1 p-5 sm:p-6">
        {/* Location */}
        <div
          className={`flex items-center gap-1.5 text-xs mb-2 font-medium ${
            dark ? "text-[#C5A46D]" : "text-[#6B7280]"
          }`}
        >
          <MapPin className="w-3.5 h-3.5 text-[#C5A46D] shrink-0" />
          <span className="truncate">{property.location}</span>
        </div>

        {/* Title */}
        <h3
          className={`font-serif text-lg font-medium line-clamp-1 transition-colors mb-2 ${
            dark
              ? "text-white group-hover:text-[#C5A46D]"
              : "text-[#173D3B] group-hover:text-[#B87556]"
          }`}
        >
          <Link to={`/properties/${property.id || property.slug || property._id}`}>
            {property.title}
          </Link>
        </h3>

        {/* Tagline / short description */}
        <p
          className={`text-xs line-clamp-2 leading-relaxed mb-4 font-light ${
            dark ? "text-[#A39E93]" : "text-[#6B7280]"
          }`}
        >
          {property.tagline || property.description}
        </p>

        {/* Specs Row */}
        <div
          className={`grid grid-cols-3 gap-2 py-3 rounded-xl px-2 text-center my-auto border ${
            dark
              ? "bg-white/[0.04] border-white/10"
              : "bg-[#F7F5EF]/50 border-[#E4E1D9]"
          }`}
        >
          <div className="flex flex-col items-center">
            <div
              className={`flex items-center gap-1 font-semibold text-xs sm:text-sm ${
                dark ? "text-white" : "text-[#173D3B]"
              }`}
            >
              <Bed className="w-3.5 h-3.5 text-[#C5A46D]" />
              <span>{property.bedrooms}</span>
            </div>
            <span
              className={`text-[10px] uppercase tracking-wider mt-0.5 ${
                dark ? "text-white/40" : "text-[#6B7280]"
              }`}
            >
              Beds
            </span>
          </div>

          <div
            className={`flex flex-col items-center border-x ${
              dark ? "border-white/10" : "border-[#E4E1D9]"
            }`}
          >
            <div
              className={`flex items-center gap-1 font-semibold text-xs sm:text-sm ${
                dark ? "text-white" : "text-[#173D3B]"
              }`}
            >
              <Bath className="w-3.5 h-3.5 text-[#C5A46D]" />
              <span>{property.bathrooms}</span>
            </div>
            <span
              className={`text-[10px] uppercase tracking-wider mt-0.5 ${
                dark ? "text-white/40" : "text-[#6B7280]"
              }`}
            >
              Baths
            </span>
          </div>

          <div className="flex flex-col items-center">
            <div
              className={`flex items-center gap-1 font-semibold text-xs sm:text-sm ${
                dark ? "text-white" : "text-[#173D3B]"
              }`}
            >
              <Maximize2 className="w-3.5 h-3.5 text-[#C5A46D]" />
              <span>{property.areaSqFt ? property.areaSqFt.toLocaleString() : "—"}</span>
            </div>
            <span
              className={`text-[10px] uppercase tracking-wider mt-0.5 ${
                dark ? "text-white/40" : "text-[#6B7280]"
              }`}
            >
              Sq Ft
            </span>
          </div>
        </div>

        {/* Action Link Footer */}
        <div className="pt-4 mt-2 flex items-center justify-between border-t border-white/[0.08]">
          <span className={`text-xs ${dark ? "text-white/40" : "text-[#6B7280]"}`}>
            Ref: <span className="font-mono uppercase text-[#C5A46D]">{property.id}</span>
          </span>

          <Link
            to={`/properties/${property.id || property.slug || property._id}`}
            className={`inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider transition-colors ${
              dark
                ? "text-[#C5A46D] group-hover:text-white"
                : "text-[#173D3B] group-hover:text-[#B87556]"
            }`}
          >
            <span>View Residence</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
