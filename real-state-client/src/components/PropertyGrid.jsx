import PropertyCard from "./PropertyCard";
import { SearchX, RotateCcw } from "lucide-react";

const PropertyGrid = ({ properties = [], onReset, emptyMessage, columns = 3 }) => {
  if (!properties || properties.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 my-8 text-center bg-white rounded-2xl border border-[#E4E1D9] shadow-sm max-w-2xl mx-auto">
        <div className="w-16 h-16 rounded-full bg-[#F7F5EF] flex items-center justify-center mb-4 text-[#B87556]">
          <SearchX className="w-8 h-8" />
        </div>
        <h3 className="font-serif text-xl sm:text-2xl font-semibold text-[#173D3B] mb-2">
          No Properties Found
        </h3>
        <p className="text-sm text-[#6B7280] max-w-md mb-6 leading-relaxed">
          {emptyMessage ||
            "We could not locate any residences matching your specific criteria. Please adjust your filters or reset to view our full collection."}
        </p>
        {onReset && (
          <button
            onClick={onReset}
            className="inline-flex items-center gap-2 px-6 py-3 text-xs uppercase tracking-widest font-semibold rounded-lg bg-[#173D3B] text-white hover:bg-[#B87556] transition-all shadow-sm cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset All Filters</span>
          </button>
        )}
      </div>
    );
  }

  const gridColsClass =
    columns === 4
      ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
      : columns === 2
      ? "grid-cols-1 md:grid-cols-2"
      : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";

  return (
    <div className={`grid gap-6 sm:gap-8 ${gridColsClass}`}>
      {properties.map((property, idx) => (
        <PropertyCard
          key={property.id || property._id || idx}
          property={property}
          priority={idx < 3}
        />
      ))}
    </div>
  );
};

export default PropertyGrid;
