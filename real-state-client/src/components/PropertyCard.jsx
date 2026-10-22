import { useState } from "react";
import { Link } from "react-router";
import { Bed, Bath, Maximize2, MapPin, ArrowUpRight, Sparkles } from "lucide-react";

const PropertyCard = ({ property, priority = false }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  if (!property) return null;

  const fallbackImage =
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80";

  const isRent = property.listingType === "Rent";

  return (
    <div className="group relative flex flex-col bg-white rounded-xl overflow-hidden border border-[#E4E1D9] shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      {/* Property Image Container */}
      <Link
        to={`/properties/${property.id || property.slug || property._id}`}
        className="relative block aspect-[16/11] overflow-hidden bg-slate-100"
      >
        {/* Skeleton loader placeholder while image loads */}
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 bg-slate-200 animate-pulse" />
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
                  : "bg-[#173D3B] text-white border border-[#B87556]/40"
              }`}
            >
              {isRent ? "For Rent" : "For Sale"}
            </span>

            {/* Property Type Badge */}
            <span className="px-2.5 py-1 text-[11px] font-medium tracking-wide rounded-full bg-white/95 text-[#303B3A] shadow-sm backdrop-blur-md border border-[#E4E1D9]">
              {property.propertyType}
            </span>
          </div>

          {/* Featured Badge */}
          {property.featured && (
            <span className="flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold tracking-wide rounded-full bg-[#B87556] text-white shadow-sm">
              <Sparkles className="w-3 h-3" />
              <span>Curated</span>
            </span>
          )}
        </div>

        {/* Gradient Overlay for subtle bottom contrast */}
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />

        {/* Price on Image (bottom-left) */}
        <div className="absolute bottom-3 left-3 text-white pointer-events-none">
          <p className="font-serif text-xl sm:text-2xl font-bold tracking-tight drop-shadow-md">
            {property.priceDisplay}
          </p>
        </div>
      </Link>

      {/* Property Details Body */}
      <div className="flex flex-col flex-1 p-5">
        {/* Location */}
        <div className="flex items-center gap-1.5 text-xs text-[#6B7280] mb-2 font-medium">
          <MapPin className="w-3.5 h-3.5 text-[#B87556] flex-shrink-0" />
          <span className="truncate">{property.location}</span>
        </div>

        {/* Title */}
        <h3 className="font-serif text-lg font-semibold text-[#173D3B] line-clamp-1 group-hover:text-[#B87556] transition-colors mb-2">
          <Link to={`/properties/${property.id || property.slug || property._id}`}>{property.title}</Link>
        </h3>

        {/* Tagline / short description */}
        <p className="text-xs text-[#6B7280] line-clamp-2 leading-relaxed mb-4">
          {property.tagline || property.description}
        </p>

        {/* Specs Row */}
        <div className="grid grid-cols-3 gap-2 py-3 border-y border-[#E4E1D9] bg-[#F7F5EF]/50 rounded-lg px-2 text-center my-auto">
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-1 text-[#173D3B] font-semibold text-xs sm:text-sm">
              <Bed className="w-3.5 h-3.5 text-[#6B7280]" />
              <span>{property.bedrooms}</span>
            </div>
            <span className="text-[10px] text-[#6B7280] uppercase tracking-wider mt-0.5">
              Beds
            </span>
          </div>

          <div className="flex flex-col items-center border-x border-[#E4E1D9]">
            <div className="flex items-center gap-1 text-[#173D3B] font-semibold text-xs sm:text-sm">
              <Bath className="w-3.5 h-3.5 text-[#6B7280]" />
              <span>{property.bathrooms}</span>
            </div>
            <span className="text-[10px] text-[#6B7280] uppercase tracking-wider mt-0.5">
              Baths
            </span>
          </div>

          <div className="flex flex-col items-center">
            <div className="flex items-center gap-1 text-[#173D3B] font-semibold text-xs sm:text-sm">
              <Maximize2 className="w-3.5 h-3.5 text-[#6B7280]" />
              <span>{property.areaSqFt ? property.areaSqFt.toLocaleString() : "—"}</span>
            </div>
            <span className="text-[10px] text-[#6B7280] uppercase tracking-wider mt-0.5">
              Sq Ft
            </span>
          </div>
        </div>

        {/* Action Link Footer */}
        <div className="pt-4 mt-1 flex items-center justify-between">
          <span className="text-xs text-[#6B7280]">
            Ref: <span className="font-mono text-[#173D3B] uppercase">{property.id}</span>
          </span>

          <Link
            to={`/properties/${property.id || property.slug || property._id}`}
            className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-[#173D3B] group-hover:text-[#B87556] transition-colors"
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
