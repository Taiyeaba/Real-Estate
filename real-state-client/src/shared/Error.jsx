import { Link, useRouteError } from "react-router";
import { AlertCircle, ArrowLeft, Home } from "lucide-react";
import ProLogo from "./ProLogo";

const Error = () => {
  const error = useRouteError();
  console.error(error);

  const errorMessage =
    error?.statusText || error?.message || "An unexpected error occurred while loading this page.";

  return (
    <div className="min-h-screen bg-[#F7F5EF] flex flex-col items-center justify-center p-6 text-center">
      <div className="mb-8">
        <ProLogo variant="dark" />
      </div>

      <div className="bg-white rounded-2xl border border-[#E4E1D9] p-8 sm:p-12 shadow-lg max-w-lg w-full">
        <div className="w-16 h-16 rounded-full bg-red-50 text-red-500 flex items-center justify-center mx-auto mb-5">
          <AlertCircle className="w-8 h-8" />
        </div>

        <span className="text-[11px] uppercase tracking-widest font-semibold text-[#B87556] block mb-1">
          {error?.status ? `Error ${error.status}` : "Experience Interrupted"}
        </span>

        <h1 className="font-serif text-2xl sm:text-3xl font-semibold text-[#173D3B] mb-3">
          Page Not Available
        </h1>

        <p className="text-sm text-[#6B7280] mb-8 leading-relaxed">
          {errorMessage}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[#173D3B] text-white text-xs uppercase tracking-widest font-semibold hover:bg-[#B87556] transition-colors shadow-sm"
          >
            <Home className="w-4 h-4" />
            <span>Return to Homepage</span>
          </Link>
          <Link
            to="/properties"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[#F7F5EF] text-[#173D3B] border border-[#E4E1D9] text-xs uppercase tracking-widest font-semibold hover:bg-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Browse Portfolio</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Error;