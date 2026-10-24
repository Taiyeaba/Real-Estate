import {
  Search,
  RotateCcw,
  MapPin,
  Home,
  Bed,
  ArrowUpDown,
  DollarSign,
  ChevronDown,
  X,
  SlidersHorizontal,
} from "lucide-react";
import {
  PROPERTY_TYPES,
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
    <div className="relative w-full bg-white rounded-2xl border border-[#E4E1D9] shadow-sm p-4 sm:p-6 mb-14 transition-all">
      {/* 1. Main Row: Search Input, Quick Status Tabs, Results Count */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-[#E4E1D9]">
        {/* Search Input */}
        <div className="relative flex-1 max-w-lg">
          <Search className="w-4 h-4 text-[#8A9292] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search by residence title, neighborhood, architect..."
            value={filters.search}
            onChange={(e) => onFilterChange("search", e.target.value)}
            className="w-full bg-[#F7F5EF] hover:bg-[#FAF8F5] focus:bg-white border border-[#E4E1D9] focus:border-[#B87556] focus:ring-1 focus:ring-[#B87556]/30 rounded-xl pl-10 pr-10 py-2.5 text-xs sm:text-sm text-[#303B3A] placeholder-[#8A9292] font-normal transition-all outline-none"
          />
          {filters.search && (
            <button
              onClick={() => onFilterChange("search", "")}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#8A9292] hover:text-[#B87556] p-1 transition-colors"
              title="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Quick Status Tabs: All, For Sale, For Rent */}
        <div className="flex items-center gap-1 p-1 rounded-xl bg-[#F7F5EF] border border-[#E4E1D9] self-start sm:self-center">
          <button
            onClick={() => onFilterChange("listingType", "all")}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold tracking-wider uppercase transition-all cursor-pointer ${
              filters.listingType === "all" || !filters.listingType
                ? "bg-[#173D3B] text-white shadow-xs"
                : "text-[#555B57] hover:text-[#173D3B] hover:bg-white/80"
            }`}
          >
            All Portfolios
          </button>
          <button
            onClick={() => onFilterChange("listingType", "Buy")}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold tracking-wider uppercase transition-all cursor-pointer ${
              filters.listingType === "Buy"
                ? "bg-[#173D3B] text-white shadow-xs"
                : "text-[#555B57] hover:text-[#173D3B] hover:bg-white/80"
            }`}
          >
            For Sale
          </button>
          <button
            onClick={() => onFilterChange("listingType", "Rent")}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold tracking-wider uppercase transition-all cursor-pointer ${
              filters.listingType === "Rent"
                ? "bg-[#173D3B] text-white shadow-xs"
                : "text-[#555B57] hover:text-[#173D3B] hover:bg-white/80"
            }`}
          >
            For Rent
          </button>
        </div>

        {/* Counter & Reset Action */}
        <div className="flex items-center justify-between lg:justify-end gap-4 shrink-0">
          <div className="text-xs sm:text-sm text-[#555B57]">
            Showing <span className="font-semibold text-[#173D3B]">{totalResults}</span> of{" "}
            <span className="font-semibold text-[#173D3B]">{totalCount}</span> Residences
          </div>

          {isFiltered && (
            <button
              onClick={onReset}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider text-[#B87556] hover:text-[#173D3B] hover:bg-[#F7F5EF] border border-[#B87556]/30 transition-all cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>

      {/* 2. Secondary Refinement Controls Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 pt-5">
        {/* Filter 1: Property Type */}
        <div className="relative">
          <label className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#173D3B] mb-1.5 flex items-center gap-1">
            <Home className="w-3.5 h-3.5 text-[#B87556]" />
            <span>Type</span>
          </label>
          <div className="relative">
            <select
              value={filters.propertyType}
              onChange={(e) => onFilterChange("propertyType", e.target.value)}
              className="w-full appearance-none bg-[#F7F5EF] hover:bg-[#FAF8F5] focus:bg-white border border-[#E4E1D9] focus:border-[#B87556] rounded-xl pl-3.5 pr-8 py-2 text-xs sm:text-sm text-[#303B3A] font-medium transition-colors cursor-pointer outline-none"
            >
              {PROPERTY_TYPES.map((t) => (
                <option key={t} value={t === "All Types" ? "all" : t}>
                  {t}
                </option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-[#8A9292] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Filter 2: Location */}
        <div className="relative">
          <label className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#173D3B] mb-1.5 flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-[#B87556]" />
            <span>Location</span>
          </label>
          <div className="relative">
            <select
              value={filters.city}
              onChange={(e) => onFilterChange("city", e.target.value)}
              className="w-full appearance-none bg-[#F7F5EF] hover:bg-[#FAF8F5] focus:bg-white border border-[#E4E1D9] focus:border-[#B87556] rounded-xl pl-3.5 pr-8 py-2 text-xs sm:text-sm text-[#303B3A] font-medium transition-colors cursor-pointer outline-none"
            >
              {CITIES.map((c) => (
                <option key={c} value={c === "All Locations" ? "all" : c}>
                  {c}
                </option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-[#8A9292] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Filter 3: Budget Range */}
        <div className="relative">
          <label className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#173D3B] mb-1.5 flex items-center gap-1">
            <DollarSign className="w-3.5 h-3.5 text-[#B87556]" />
            <span>Budget</span>
          </label>
          <div className="relative">
            <select
              value={activePriceIndex >= 0 ? activePriceIndex : "0"}
              onChange={handlePriceChange}
              className="w-full appearance-none bg-[#F7F5EF] hover:bg-[#FAF8F5] focus:bg-white border border-[#E4E1D9] focus:border-[#B87556] rounded-xl pl-3.5 pr-8 py-2 text-xs sm:text-sm text-[#303B3A] font-medium transition-colors cursor-pointer outline-none"
            >
              {currentPriceRanges.map((range, idx) => (
                <option key={range.label} value={idx}>
                  {range.label}
                </option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-[#8A9292] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Filter 4: Bedrooms */}
        <div className="relative">
          <label className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#173D3B] mb-1.5 flex items-center gap-1">
            <Bed className="w-3.5 h-3.5 text-[#B87556]" />
            <span>Bedrooms</span>
          </label>
          <div className="relative">
            <select
              value={filters.bedrooms}
              onChange={(e) => onFilterChange("bedrooms", e.target.value)}
              className="w-full appearance-none bg-[#F7F5EF] hover:bg-[#FAF8F5] focus:bg-white border border-[#E4E1D9] focus:border-[#B87556] rounded-xl pl-3.5 pr-8 py-2 text-xs sm:text-sm text-[#303B3A] font-medium transition-colors cursor-pointer outline-none"
            >
              {BEDROOM_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-[#8A9292] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Filter 5: Sort By */}
        <div className="relative">
          <label className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#173D3B] mb-1.5 flex items-center gap-1">
            <ArrowUpDown className="w-3.5 h-3.5 text-[#B87556]" />
            <span>Sort By</span>
          </label>
          <div className="relative">
            <select
              value={filters.sortBy}
              onChange={(e) => onFilterChange("sortBy", e.target.value)}
              className="w-full appearance-none bg-[#F7F5EF] hover:bg-[#FAF8F5] focus:bg-white border border-[#E4E1D9] focus:border-[#B87556] rounded-xl pl-3.5 pr-8 py-2 text-xs sm:text-sm text-[#303B3A] font-medium transition-colors cursor-pointer outline-none"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-[#8A9292] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* 3. Active Filters Chips Strip */}
      {isFiltered && (
        <div className="flex items-center gap-2 flex-wrap pt-4 mt-4 border-t border-[#E4E1D9]">
          <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#6B7280] mr-1 flex items-center gap-1">
            <SlidersHorizontal className="w-3 h-3 text-[#B87556]" />
            <span>Active:</span>
          </span>

          {filters.search && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs bg-[#F7F5EF] border border-[#E4E1D9] text-[#173D3B] font-medium group hover:border-[#B87556]/50 transition-colors">
              <span>&ldquo;{filters.search}&rdquo;</span>
              <button
                onClick={() => onFilterChange("search", "")}
                className="text-[#8A9292] group-hover:text-[#B87556] transition-colors"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {filters.listingType && filters.listingType !== "all" && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs bg-[#F7F5EF] border border-[#E4E1D9] text-[#173D3B] font-medium group hover:border-[#B87556]/50 transition-colors">
              <span>Status: {filters.listingType}</span>
              <button
                onClick={() => onFilterChange("listingType", "all")}
                className="text-[#8A9292] group-hover:text-[#B87556] transition-colors"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {filters.propertyType && filters.propertyType !== "all" && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs bg-[#F7F5EF] border border-[#E4E1D9] text-[#173D3B] font-medium group hover:border-[#B87556]/50 transition-colors">
              <span>Type: {filters.propertyType}</span>
              <button
                onClick={() => onFilterChange("propertyType", "all")}
                className="text-[#8A9292] group-hover:text-[#B87556] transition-colors"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {filters.city && filters.city !== "all" && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs bg-[#F7F5EF] border border-[#E4E1D9] text-[#173D3B] font-medium group hover:border-[#B87556]/50 transition-colors">
              <span>Location: {filters.city}</span>
              <button
                onClick={() => onFilterChange("city", "all")}
                className="text-[#8A9292] group-hover:text-[#B87556] transition-colors"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {filters.bedrooms && filters.bedrooms !== "all" && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs bg-[#F7F5EF] border border-[#E4E1D9] text-[#173D3B] font-medium group hover:border-[#B87556]/50 transition-colors">
              <span>{filters.bedrooms}+ Bedrooms</span>
              <button
                onClick={() => onFilterChange("bedrooms", "all")}
                className="text-[#8A9292] group-hover:text-[#B87556] transition-colors"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {(filters.minPrice > 0 || (filters.maxPrice && filters.maxPrice < Infinity)) && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs bg-[#F7F5EF] border border-[#E4E1D9] text-[#173D3B] font-medium group hover:border-[#B87556]/50 transition-colors">
              <span>Budget Filtered</span>
              <button
                onClick={() => onFilterChange("priceRange", { min: 0, max: Infinity })}
                className="text-[#8A9292] group-hover:text-[#B87556] transition-colors"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default PropertyFilters;
