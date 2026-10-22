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
      className={`w-full max-w-5xl mx-auto bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-[#E4E1D9] p-4 sm:p-6 transition-all ${className}`}
    >
      {/* Top Tabs: All / Buy / Rent Switch */}
      <div className="flex items-center justify-between mb-4 border-b border-[#E4E1D9] pb-3">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <button
            type="button"
            onClick={() => {
              setListingType("all");
              setPriceRangeIndex("0");
            }}
            className={`px-3.5 sm:px-5 py-2 text-xs uppercase tracking-wider font-semibold rounded-lg transition-all ${
              listingType === "all"
                ? "bg-[#173D3B] text-white shadow-sm"
                : "text-[#6B7280] hover:text-[#173D3B] hover:bg-[#F7F5EF]"
            }`}
          >
            All Portfolio
          </button>
          <button
            type="button"
            onClick={() => {
              setListingType("Buy");
              setPriceRangeIndex("0");
            }}
            className={`px-3.5 sm:px-5 py-2 text-xs uppercase tracking-wider font-semibold rounded-lg transition-all ${
              listingType === "Buy"
                ? "bg-[#173D3B] text-white shadow-sm"
                : "text-[#6B7280] hover:text-[#173D3B] hover:bg-[#F7F5EF]"
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
            className={`px-3.5 sm:px-5 py-2 text-xs uppercase tracking-wider font-semibold rounded-lg transition-all ${
              listingType === "Rent"
                ? "bg-[#173D3B] text-white shadow-sm"
                : "text-[#6B7280] hover:text-[#173D3B] hover:bg-[#F7F5EF]"
            }`}
          >
            Rent
          </button>
        </div>

        <span className="hidden sm:inline-flex text-xs text-[#6B7280] font-medium items-center gap-1">
          <SlidersHorizontal className="w-3.5 h-3.5 text-[#B87556]" />
          Instant Portfolio Search
        </span>
      </div>

      {/* Main Form Fields */}
      <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
        {/* Field 1: Keyword search */}
        <div className="flex flex-col">
          <label className="text-[11px] uppercase tracking-wider font-semibold text-[#173D3B] mb-1.5 flex items-center gap-1.5">
            <Search className="w-3.5 h-3.5 text-[#B87556]" />
            Keyword / Estate
          </label>
          <input
            type="text"
            placeholder="e.g. Bel-Air, Penthouse..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#F7F5EF] border border-[#E4E1D9] rounded-lg px-3.5 py-2.5 text-sm text-[#303B3A] placeholder-[#6B7280] focus:outline-none focus:ring-1 focus:ring-[#B87556] focus:border-[#B87556] transition-colors"
          />
        </div>

        {/* Field 2: Location */}
        <div className="flex flex-col">
          <label className="text-[11px] uppercase tracking-wider font-semibold text-[#173D3B] mb-1.5 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-[#B87556]" />
            Location
          </label>
          <select
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full bg-[#F7F5EF] border border-[#E4E1D9] rounded-lg px-3.5 py-2.5 text-sm text-[#303B3A] focus:outline-none focus:ring-1 focus:ring-[#B87556] focus:border-[#B87556] transition-colors cursor-pointer"
          >
            {CITIES.map((c) => (
              <option key={c} value={c === "All Locations" ? "all" : c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        {/* Field 3: Property Type */}
        <div className="flex flex-col">
          <label className="text-[11px] uppercase tracking-wider font-semibold text-[#173D3B] mb-1.5 flex items-center gap-1.5">
            <Home className="w-3.5 h-3.5 text-[#B87556]" />
            Property Type
          </label>
          <select
            value={propertyType}
            onChange={(e) => setPropertyType(e.target.value)}
            className="w-full bg-[#F7F5EF] border border-[#E4E1D9] rounded-lg px-3.5 py-2.5 text-sm text-[#303B3A] focus:outline-none focus:ring-1 focus:ring-[#B87556] focus:border-[#B87556] transition-colors cursor-pointer"
          >
            {PROPERTY_TYPES.map((t) => (
              <option key={t} value={t === "All Types" ? "all" : t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        {/* Field 4: Price Range */}
        <div className="flex flex-col">
          <label className="text-[11px] uppercase tracking-wider font-semibold text-[#173D3B] mb-1.5 flex items-center gap-1.5">
            <DollarSign className="w-3.5 h-3.5 text-[#B87556]" />
            Budget / Range
          </label>
          <select
            value={priceRangeIndex}
            onChange={(e) => setPriceRangeIndex(e.target.value)}
            className="w-full bg-[#F7F5EF] border border-[#E4E1D9] rounded-lg px-3.5 py-2.5 text-sm text-[#303B3A] focus:outline-none focus:ring-1 focus:ring-[#B87556] focus:border-[#B87556] transition-colors cursor-pointer"
          >
            {currentPriceRanges.map((range, index) => (
              <option key={range.label} value={index}>
                {range.label}
              </option>
            ))}
          </select>
        </div>

        {/* Submit Button */}
        <div className="flex flex-col justify-end">
          <button
            type="submit"
            className="w-full inline-flex items-center justify-center gap-2 bg-[#173D3B] hover:bg-[#B87556] text-white py-3 px-6 rounded-lg text-xs uppercase tracking-widest font-semibold transition-all duration-200 shadow-md hover:shadow-lg focus:outline-none cursor-pointer"
          >
            <Search className="w-4 h-4" />
            <span>Search Estates</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default PropertySearch;
