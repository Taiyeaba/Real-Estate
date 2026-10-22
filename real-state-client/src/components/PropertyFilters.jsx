import {
  Search,
  RotateCcw,
  MapPin,
  Home,
  Tag,
  Bed,
  ArrowUpDown,
  DollarSign,
  X,
} from "lucide-react";
import {
  PROPERTY_TYPES,
  LISTING_TYPES,
  CITIES,
  BEDROOM_OPTIONS,
  SORT_OPTIONS,
  ALL_PRICE_RANGES,
  BUY_PRICE_RANGES,
  RENT_PRICE_RANGES,
} from "../data/propertyOptions";

const PropertyFilters = ({
  filters,
  onFilterChange,
  onReset,
  totalResults,
  totalCount,
}) => {
  const currentPriceRanges =
    filters.listingType === "Rent"
      ? RENT_PRICE_RANGES
      : filters.listingType === "Buy"
      ? BUY_PRICE_RANGES
      : ALL_PRICE_RANGES;

  // Determine current active price range index
  const activePriceIndex = currentPriceRanges.findIndex(
    (r) =>
      (r.min === filters.minPrice || (!filters.minPrice && r.min === 0)) &&
      (r.max === filters.maxPrice || (!filters.maxPrice && r.max === Infinity))
  );

  const isFiltered =
    filters.search ||
    filters.listingType !== "all" ||
    filters.propertyType !== "all" ||
    filters.city !== "all" ||
    filters.bedrooms !== "all" ||
    filters.minPrice > 0 ||
    (filters.maxPrice && filters.maxPrice < Infinity) ||
    filters.sortBy !== "featured";

  const handlePriceChange = (e) => {
    const idx = parseInt(e.target.value, 10);
    const range = currentPriceRanges[idx] || currentPriceRanges[0];
    onFilterChange("priceRange", {
      min: range.min || 0,
      max: range.max || Infinity,
    });
  };

  return (
    <div className="bg-white rounded-2xl border border-[#E4E1D9] shadow-sm p-4 sm:p-6 mb-8">
      {/* Top Bar: Search input & Status count & Reset */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-[#E4E1D9]">
        {/* Search Input */}
        <div className="relative flex-1 max-w-lg">
          <Search className="w-4 h-4 text-[#6B7280] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by residence title, neighborhood, architect..."
            value={filters.search}
            onChange={(e) => onFilterChange("search", e.target.value)}
            className="w-full bg-[#F7F5EF] border border-[#E4E1D9] rounded-xl pl-10 pr-10 py-2.5 text-sm text-[#303B3A] placeholder-[#6B7280] focus:outline-none focus:ring-1 focus:ring-[#B87556] focus:border-[#B87556] transition-colors"
          />
          {filters.search && (
            <button
              onClick={() => onFilterChange("search", "")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#6B7280] hover:text-[#173D3B] p-1"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Results Counter & Reset Action */}
        <div className="flex items-center justify-between lg:justify-end gap-4">
          <div className="text-xs sm:text-sm text-[#6B7280]">
            Showing{" "}
            <span className="font-semibold text-[#173D3B]">{totalResults}</span>{" "}
            of <span className="font-semibold text-[#173D3B]">{totalCount}</span>{" "}
            properties
          </div>

          {isFiltered && (
            <button
              onClick={onReset}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#B87556] hover:text-[#173D3B] hover:underline cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Filters</span>
            </button>
          )}
        </div>
      </div>

      {/* Active Filter Chips / Pills */}
      {isFiltered && (
        <div className="flex items-center gap-2 flex-wrap pt-4 pb-1 border-b border-[#E4E1D9]/60">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-[#6B7280] mr-1">
            Active:
          </span>

          {filters.search && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs bg-[#F7F5EF] border border-[#E4E1D9] text-[#173D3B] font-medium">
              &ldquo;{filters.search}&rdquo;
              <button
                onClick={() => onFilterChange("search", "")}
                className="hover:text-[#B87556]"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {filters.listingType && filters.listingType !== "all" && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs bg-[#F7F5EF] border border-[#E4E1D9] text-[#173D3B] font-medium">
              Status: {filters.listingType}
              <button
                onClick={() => onFilterChange("listingType", "all")}
                className="hover:text-[#B87556]"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {filters.propertyType && filters.propertyType !== "all" && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs bg-[#F7F5EF] border border-[#E4E1D9] text-[#173D3B] font-medium">
              Type: {filters.propertyType}
              <button
                onClick={() => onFilterChange("propertyType", "all")}
                className="hover:text-[#B87556]"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {filters.city && filters.city !== "all" && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs bg-[#F7F5EF] border border-[#E4E1D9] text-[#173D3B] font-medium">
              Location: {filters.city}
              <button
                onClick={() => onFilterChange("city", "all")}
                className="hover:text-[#B87556]"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {filters.bedrooms && filters.bedrooms !== "all" && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs bg-[#F7F5EF] border border-[#E4E1D9] text-[#173D3B] font-medium">
              {filters.bedrooms}+ Bedrooms
              <button
                onClick={() => onFilterChange("bedrooms", "all")}
                className="hover:text-[#B87556]"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {(filters.minPrice > 0 || (filters.maxPrice && filters.maxPrice < Infinity)) && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs bg-[#F7F5EF] border border-[#E4E1D9] text-[#173D3B] font-medium">
              Budget Filtered
              <button
                onClick={() => onFilterChange("priceRange", { min: 0, max: Infinity })}
                className="hover:text-[#B87556]"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
        </div>
      )}

      {/* Filter Controls Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5 pt-5">
        {/* Filter 1: Listing Type */}
        <div className="flex flex-col">
          <label className="text-[11px] uppercase tracking-wider font-semibold text-[#173D3B] mb-1.5 flex items-center gap-1">
            <Tag className="w-3.5 h-3.5 text-[#B87556]" />
            Status
          </label>
          <select
            value={filters.listingType}
            onChange={(e) => onFilterChange("listingType", e.target.value)}
            className="w-full bg-[#F7F5EF] border border-[#E4E1D9] rounded-lg px-3 py-2 text-xs sm:text-sm text-[#303B3A] focus:outline-none focus:ring-1 focus:ring-[#B87556] cursor-pointer"
          >
            {LISTING_TYPES.map((t) => (
              <option key={t} value={t === "All Statuses" ? "all" : t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        {/* Filter 2: Property Type */}
        <div className="flex flex-col">
          <label className="text-[11px] uppercase tracking-wider font-semibold text-[#173D3B] mb-1.5 flex items-center gap-1">
            <Home className="w-3.5 h-3.5 text-[#B87556]" />
            Property Type
          </label>
          <select
            value={filters.propertyType}
            onChange={(e) => onFilterChange("propertyType", e.target.value)}
            className="w-full bg-[#F7F5EF] border border-[#E4E1D9] rounded-lg px-3 py-2 text-xs sm:text-sm text-[#303B3A] focus:outline-none focus:ring-1 focus:ring-[#B87556] cursor-pointer"
          >
            {PROPERTY_TYPES.map((t) => (
              <option key={t} value={t === "All Types" ? "all" : t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        {/* Filter 3: Location */}
        <div className="flex flex-col">
          <label className="text-[11px] uppercase tracking-wider font-semibold text-[#173D3B] mb-1.5 flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-[#B87556]" />
            Location
          </label>
          <select
            value={filters.city}
            onChange={(e) => onFilterChange("city", e.target.value)}
            className="w-full bg-[#F7F5EF] border border-[#E4E1D9] rounded-lg px-3 py-2 text-xs sm:text-sm text-[#303B3A] focus:outline-none focus:ring-1 focus:ring-[#B87556] cursor-pointer"
          >
            {CITIES.map((c) => (
              <option key={c} value={c === "All Locations" ? "all" : c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        {/* Filter 4: Price / Budget */}
        <div className="flex flex-col">
          <label className="text-[11px] uppercase tracking-wider font-semibold text-[#173D3B] mb-1.5 flex items-center gap-1">
            <DollarSign className="w-3.5 h-3.5 text-[#B87556]" />
            Budget Range
          </label>
          <select
            value={activePriceIndex >= 0 ? activePriceIndex : "0"}
            onChange={handlePriceChange}
            className="w-full bg-[#F7F5EF] border border-[#E4E1D9] rounded-lg px-3 py-2 text-xs sm:text-sm text-[#303B3A] focus:outline-none focus:ring-1 focus:ring-[#B87556] cursor-pointer"
          >
            {currentPriceRanges.map((range, idx) => (
              <option key={range.label} value={idx}>
                {range.label}
              </option>
            ))}
          </select>
        </div>

        {/* Filter 5: Bedrooms */}
        <div className="flex flex-col">
          <label className="text-[11px] uppercase tracking-wider font-semibold text-[#173D3B] mb-1.5 flex items-center gap-1">
            <Bed className="w-3.5 h-3.5 text-[#B87556]" />
            Bedrooms
          </label>
          <select
            value={filters.bedrooms}
            onChange={(e) => onFilterChange("bedrooms", e.target.value)}
            className="w-full bg-[#F7F5EF] border border-[#E4E1D9] rounded-lg px-3 py-2 text-xs sm:text-sm text-[#303B3A] focus:outline-none focus:ring-1 focus:ring-[#B87556] cursor-pointer"
          >
            {BEDROOM_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* Filter 6: Sort By */}
        <div className="flex flex-col">
          <label className="text-[11px] uppercase tracking-wider font-semibold text-[#173D3B] mb-1.5 flex items-center gap-1">
            <ArrowUpDown className="w-3.5 h-3.5 text-[#B87556]" />
            Sort By
          </label>
          <select
            value={filters.sortBy}
            onChange={(e) => onFilterChange("sortBy", e.target.value)}
            className="w-full bg-[#F7F5EF] border border-[#E4E1D9] rounded-lg px-3 py-2 text-xs sm:text-sm text-[#303B3A] focus:outline-none focus:ring-1 focus:ring-[#B87556] cursor-pointer"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default PropertyFilters;
