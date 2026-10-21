import { Link } from "react-router";
import { Compass, Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-[75vh] flex flex-col items-center justify-center p-6 text-center max-w-lg mx-auto">
      <div className="w-16 h-16 rounded-full bg-white border border-[#E4E1D9] text-[#B87556] flex items-center justify-center mb-5 shadow-sm">
        <Compass className="w-8 h-8" />
      </div>

      <span className="text-[11px] uppercase tracking-widest font-semibold text-[#B87556] mb-1">
        Error 404 &bull; Page Not Found
      </span>

      <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#173D3B] mb-3">
        Page Not Found
      </h1>

      <p className="text-sm text-[#6B7280] mb-8 leading-relaxed">
        The destination you are attempting to access does not exist or has been relocated within our portfolio.
      </p>

      <div className="flex flex-col sm:flex-row items-center gap-3 w-full justify-center">
        <Link
          to="/"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[#173D3B] text-white text-xs uppercase tracking-widest font-semibold hover:bg-[#B87556] transition-colors shadow-sm"
        >
          <Home className="w-4 h-4" />
          <span>Return Home</span>
        </Link>
        <Link
          to="/properties"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-white border border-[#E4E1D9] text-[#173D3B] text-xs uppercase tracking-widest font-semibold hover:bg-[#F7F5EF] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Browse Properties</span>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
