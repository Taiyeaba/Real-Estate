import {
  Search,
  RotateCcw,
  MapPin,
  Home,
  Tag,
  Bed,
  ArrowUpDown,
} from "lucide-react";
import {
  PROPERTY_TYPES,
  LISTING_TYPES,
  CITIES,
  BEDROOM_OPTIONS,
  SORT_OPTIONS,
} from "../data/propertyOptions";

const PropertyFilters = ({
  filters,
  onFilterChange,
  onReset,
  totalResults,
  totalCount,
}) => {
  const isFiltered =
    filters.search ||
    filters.listingType !== "all" ||
    filters.propertyType !== "all" ||
    filters.city !== "all" ||
    filters.bedrooms !== "all" ||
    filters.minPrice > 0 ||
    filters.maxPrice < Infinity ||
    filters.sortBy !== "featured";

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
            className="w-full bg-[#F7F5EF] border border-[#E4E1D9] rounded-xl pl-10 pr-4 py-2.5 text-sm text-[#303B3A] placeholder-[#6B7280] focus:outline-none focus:ring-1 focus:ring-[#B87556] focus:border-[#B87556] transition-colors"
          />
          {filters.search && (
            <button
              onClick={() => onFilterChange("search", "")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#6B7280] hover:text-[#173D3B]"
            >
              Clear
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
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#6B7280] hover:text-[#173D3B] hover:underline cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5 text-[#B87556]" />
              <span>Reset Filters</span>
            </button>
          )}
        </div>
      </div>

      {/* Filter Controls Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5 pt-5">
        {/* Filter: Listing Type */}
        <div className="flex flex-col">
          <label className="text-[11px] uppercase tracking-wider font-semibold text-[#173D3B] mb-1.5 flex items-center gap-1">
            <Tag className="w-3.5 h-3.5 text-[#B87556]" />
            Listing Status
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

        {/* Filter: Property Type */}
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

        {/* Filter: Location */}
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

        {/* Filter: Bedrooms */}
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

        {/* Sort By */}
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
