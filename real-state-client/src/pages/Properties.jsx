import { useMemo } from "react";
import { useSearchParams } from "react-router";
import SectionHeading from "../components/SectionHeading";
import PropertyFilters from "../components/PropertyFilters";
import PropertyGrid from "../components/PropertyGrid";
import { properties, filterProperties } from "../data/properties";

const Properties = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Extract filters from URL query parameters
  const currentFilters = useMemo(() => {
    return {
      search: searchParams.get("q") || searchParams.get("search") || "",
      listingType: searchParams.get("listingType") || "all",
      propertyType: searchParams.get("type") || searchParams.get("propertyType") || "all",
      city: searchParams.get("city") || "all",
      bedrooms: searchParams.get("bedrooms") || "all",
      minPrice: Number(searchParams.get("minPrice")) || 0,
      maxPrice: searchParams.get("maxPrice") ? Number(searchParams.get("maxPrice")) : Infinity,
      sortBy: searchParams.get("sortBy") || "featured",
    };
  }, [searchParams]);

  // Execute filtering using centralized pure helper
  const filteredList = useMemo(() => {
    return filterProperties(currentFilters);
  }, [currentFilters]);

  // Handler to update a specific filter and synchronize with URL search params
  const handleFilterChange = (key, value) => {
    const nextParams = new URLSearchParams(searchParams);

    if (key === "search") {
      if (value && value.trim()) {
        nextParams.set("q", value.trim());
      } else {
        nextParams.delete("q");
        nextParams.delete("search");
      }
    } else if (key === "listingType") {
      if (value && value !== "all" && value !== "All Statuses") {
        nextParams.set("listingType", value);
      } else {
        nextParams.delete("listingType");
      }
    } else if (key === "propertyType") {
      if (value && value !== "all" && value !== "All Types") {
        nextParams.set("type", value);
      } else {
        nextParams.delete("type");
        nextParams.delete("propertyType");
      }
    } else if (key === "city") {
      if (value && value !== "all" && value !== "All Locations") {
        nextParams.set("city", value);
      } else {
        nextParams.delete("city");
      }
    } else if (key === "bedrooms") {
      if (value && value !== "all") {
        nextParams.set("bedrooms", value);
      } else {
        nextParams.delete("bedrooms");
      }
    } else if (key === "sortBy") {
      if (value && value !== "featured") {
        nextParams.set("sortBy", value);
      } else {
        nextParams.delete("sortBy");
      }
    } else if (key === "minPrice") {
      if (Number(value) > 0) {
        nextParams.set("minPrice", value.toString());
      } else {
        nextParams.delete("minPrice");
      }
    } else if (key === "maxPrice") {
      if (Number(value) > 0 && Number(value) !== Infinity) {
        nextParams.set("maxPrice", value.toString());
      } else {
        nextParams.delete("maxPrice");
      }
    }

    setSearchParams(nextParams, { replace: true });
  };

  // Reset all filters to show entire collection
  const handleResetFilters = () => {
    setSearchParams(new URLSearchParams(), { replace: true });
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      {/* Page Header */}
      <div className="mb-10 text-center sm:text-left">
        <SectionHeading
          align="left"
          overline="Complete Portfolio"
          title="Exceptional Estates & Residences"
          description="Browse our curated collection of architectural homes, waterfront compounds, and skyline penthouses available for acquisition and luxury lease."
        />
      </div>

      {/* Interactive Filters Panel */}
      <PropertyFilters
        filters={currentFilters}
        onFilterChange={handleFilterChange}
        onReset={handleResetFilters}
        totalResults={filteredList.length}
        totalCount={properties.length}
      />

      {/* Results Grid */}
      <PropertyGrid
        properties={filteredList}
        onReset={handleResetFilters}
        emptyMessage="No properties in our portfolio match the selected combination of criteria. Try adjusting your filters, location, or budget parameters."
      />
    </div>
  );
};

export default Properties;
