import { useState } from "react";
import { useNavigate } from "react-router";
import { Search, MapPin, Home, DollarSign, SlidersHorizontal } from "lucide-react";
import {
  PROPERTY_TYPES,
  CITIES,
  ALL_PRICE_RANGES,
  BUY_PRICE_RANGES,
  RENT_PRICE_RANGES,
} from "../data/propertyOptions";

const PropertySearch = ({ className = "" }) => {
  const navigate = useNavigate();

  const [listingType, setListingType] = useState("all");
  const [city, setCity] = useState("all");
  const [propertyType, setPropertyType] = useState("all");
  const [priceRangeIndex, setPriceRangeIndex] = useState("0");
  const [searchQuery, setSearchQuery] = useState("");

  const currentPriceRanges =
    listingType === "Rent"
      ? RENT_PRICE_RANGES
      : listingType === "Buy"
      ? BUY_PRICE_RANGES
      : ALL_PRICE_RANGES;

  const handleSearch = (e) => {
    e.preventDefault();

    const params = new URLSearchParams();

    if (listingType && listingType !== "all" && listingType !== "All Statuses") {
      params.set("listingType", listingType);
    }
    if (city && city !== "all" && city !== "All Locations") {
      params.set("city", city);
    }
    if (propertyType && propertyType !== "all" && propertyType !== "All Types") {
      params.set("type", propertyType);
    }
    if (searchQuery.trim()) {
      params.set("q", searchQuery.trim());
    }

    const selectedRange = currentPriceRanges[parseInt(priceRangeIndex, 10)] || currentPriceRanges[0];
    if (selectedRange && selectedRange.min > 0) {
      params.set("minPrice", selectedRange.min.toString());
    }
    if (selectedRange && selectedRange.max && selectedRange.max !== Infinity) {
      params.set("maxPrice", selectedRange.max.toString());
    }

    navigate(`/properties?${params.toString()}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      className={`w-full max-w-6xl mx-auto bg-[#081514]/85 backdrop-blur-2xl rounded-2xl border border-white/15 p-4 sm:p-5 shadow-[0_25px_60px_rgba(0,0,0,0.85)] text-white transition-all ${className}`}
    >
      {/* Top Tabs: All / Buy / Rent Switch */}
      <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-3">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <button
            type="button"
            onClick={() => {
              setListingType("all");
              setPriceRangeIndex("0");
            }}
            className={`px-3.5 sm:px-5 py-1.5 text-xs uppercase tracking-wider font-semibold rounded-lg transition-all cursor-pointer ${
              listingType === "all"
                ? "bg-[#B87556] text-white shadow-xs"
                : "text-slate-300 hover:text-white hover:bg-white/10"
            }`}
          >
            All Portfolios
          </button>
          <button
            type="button"
            onClick={() => {
              setListingType("Buy");
              setPriceRangeIndex("0");
            }}
            className={`px-3.5 sm:px-5 py-1.5 text-xs uppercase tracking-wider font-semibold rounded-lg transition-all cursor-pointer ${
              listingType === "Buy"
                ? "bg-[#B87556] text-white shadow-xs"
                : "text-slate-300 hover:text-white hover:bg-white/10"
            }`}
          >
            Buy
          </button>
          <button
            type="button"
            onClick={() => {
              setListingType("Rent");
              setPriceRangeIndex("0");
            }}
            className={`px-3.5 sm:px-5 py-1.5 text-xs uppercase tracking-wider font-semibold rounded-lg transition-all cursor-pointer ${
              listingType === "Rent"
                ? "bg-[#B87556] text-white shadow-xs"
                : "text-slate-300 hover:text-white hover:bg-white/10"
            }`}
          >
            Rent
          </button>
        </div>

        <span className="hidden sm:inline-flex text-[11px] font-mono tracking-wider text-[#E5D2B8] items-center gap-1.5">
          <SlidersHorizontal className="w-3.5 h-3.5 text-[#B87556]" />
          PORTFOLIO CURATION ENGINE
        </span>
      </div>

      {/* Main Form Fields */}
      <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
        {/* Field 1: Keyword search */}
        <div className="flex flex-col">
          <label className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#E5D2B8] mb-1.5 flex items-center gap-1.5">
            <Search className="w-3.5 h-3.5 text-[#B87556]" />
            Estate / Keyword
          </label>
          <input
            type="text"
            placeholder="e.g. Bel-Air, Modernist..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-black/40 hover:bg-black/60 focus:bg-black/70 border border-white/15 focus:border-[#C5A46D] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none transition-all"
          />
        </div>

        {/* Field 2: Location */}
        <div className="flex flex-col">
          <label className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#E5D2B8] mb-1.5 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-[#B87556]" />
            Location
          </label>
          <select
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full appearance-none bg-black/40 hover:bg-black/60 focus:bg-black/70 border border-white/15 focus:border-[#C5A46D] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none transition-all cursor-pointer"
          >
            {CITIES.map((c) => (
              <option key={c} value={c === "All Locations" ? "all" : c} className="bg-[#0A1312] text-white">
                {c}
              </option>
            ))}
          </select>
        </div>

        {/* Field 3: Property Type */}
        <div className="flex flex-col">
          <label className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#E5D2B8] mb-1.5 flex items-center gap-1.5">
            <Home className="w-3.5 h-3.5 text-[#B87556]" />
            Property Type
          </label>
          <select
            value={propertyType}
            onChange={(e) => setPropertyType(e.target.value)}
            className="w-full appearance-none bg-black/40 hover:bg-black/60 focus:bg-black/70 border border-white/15 focus:border-[#C5A46D] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none transition-all cursor-pointer"
          >
            {PROPERTY_TYPES.map((t) => (
              <option key={t} value={t === "All Types" ? "all" : t} className="bg-[#0A1312] text-white">
                {t}
              </option>
            ))}
          </select>
        </div>

        {/* Field 4: Price Range */}
        <div className="flex flex-col">
          <label className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#E5D2B8] mb-1.5 flex items-center gap-1.5">
            <DollarSign className="w-3.5 h-3.5 text-[#B87556]" />
            Valuation Range
          </label>
          <select
            value={priceRangeIndex}
            onChange={(e) => setPriceRangeIndex(e.target.value)}
            className="w-full appearance-none bg-black/40 hover:bg-black/60 focus:bg-black/70 border border-white/15 focus:border-[#C5A46D] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none transition-all cursor-pointer"
          >
            {currentPriceRanges.map((range, index) => (
              <option key={range.label} value={index} className="bg-[#0A1312] text-white">
                {range.label}
              </option>
            ))}
          </select>
        </div>

        {/* Submit Button */}
        <div className="flex flex-col justify-end">
          <button
            type="submit"
            className="w-full inline-flex items-center justify-center gap-2 bg-[#B87556] hover:bg-[#A56346] text-white py-2.5 sm:py-3 px-6 rounded-xl text-xs uppercase tracking-[0.2em] font-semibold transition-all duration-300 shadow-md hover:shadow-xl focus:outline-none cursor-pointer"
          >
            <Search className="w-4 h-4" />
            <span>Search Portfolio</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default PropertySearch;
