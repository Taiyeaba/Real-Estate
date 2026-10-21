import { useState } from "react";
import { Link, useLocation } from "react-router";
import { Menu, X, ArrowRight, Phone, Compass } from "lucide-react";
import ProLogo from "./ProLogo";
import { siteConfig } from "../data/siteConfig";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Close mobile drawer on route change
  const closeMobileMenu = () => setMobileMenuOpen(false);

  const navItems = [
    { label: "Home", to: "/" },
    { label: "Properties", to: "/properties" },
    { label: "Buy", to: "/properties?listingType=Buy" },
    { label: "Rent", to: "/properties?listingType=Rent" },
    { label: "About", to: "/about" },
    { label: "Contact", to: "/contact" },
  ];

  const isLinkActive = (to) => {
    if (to === "/") {
      return location.pathname === "/" && !location.search;
    }
    if (to.includes("?")) {
      const [path, query] = to.split("?");
      return location.pathname === path && location.search.includes(query);
    }
    return location.pathname === to;
  };

  return (
    <header className="sticky top-0 z-50 bg-[#F7F5EF]/95 backdrop-blur-md border-b border-[#E4E1D9] transition-all">
      {/* Upper subtle contact bar for desktop */}
      <div className="hidden lg:block bg-[#173D3B] text-white/80 text-[11px] py-1.5 px-6 border-b border-white/10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5">
              <Phone className="w-3 h-3 text-[#B87556]" />
              <span>Private Client Desk: {siteConfig.contact.phone}</span>
            </span>
            <span className="text-white/40">&bull;</span>
            <span>{siteConfig.contact.officeHours}</span>
          </div>
          <div className="flex items-center gap-4 text-[#B87556] font-medium tracking-wider">
            <span>New York</span>
            <span className="text-white/30">&bull;</span>
            <span>Beverly Hills</span>
            <span className="text-white/30">&bull;</span>
            <span>Miami</span>
            <span className="text-white/30">&bull;</span>
            <span>London</span>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <ProLogo variant="dark" />
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navItems.map((item) => {
              const active = isLinkActive(item.to);
              return (
                <Link
                  key={item.label}
                  to={item.to}
                  className={`px-3 py-2 text-xs uppercase tracking-widest font-semibold transition-all relative ${
                    active
                      ? "text-[#173D3B] font-bold"
                      : "text-[#6B7280] hover:text-[#173D3B]"
                  }`}
                >
                  {item.label}
                  {active && (
                    <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-[#B87556]" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action CTA (Desktop) */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/properties"
              className="inline-flex items-center gap-2 bg-[#173D3B] hover:bg-[#B87556] text-white px-5 py-2.5 rounded-lg text-xs uppercase tracking-widest font-semibold transition-all duration-200 shadow-sm hover:shadow cursor-pointer"
            >
              <span>Explore Properties</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Mobile Menu Hamburger Button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-[#173D3B] hover:bg-black/5 focus:outline-none cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#F7F5EF] border-b border-[#E4E1D9] px-4 pt-2 pb-6 space-y-2 shadow-lg animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col space-y-1 pt-2">
            {navItems.map((item) => {
              const active = isLinkActive(item.to);
              return (
                <Link
                  key={item.label}
                  to={item.to}
                  onClick={closeMobileMenu}
                  className={`block px-3 py-2.5 text-sm uppercase tracking-wider font-semibold rounded-lg transition-colors ${
                    active
                      ? "bg-[#173D3B] text-white"
                      : "text-[#173D3B] hover:bg-black/5"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          <div className="pt-4 border-t border-[#E4E1D9]">
            <Link
              to="/properties"
              onClick={closeMobileMenu}
              className="w-full flex items-center justify-center gap-2 bg-[#173D3B] hover:bg-[#B87556] text-white py-3 px-4 rounded-lg text-xs uppercase tracking-widest font-semibold transition-colors cursor-pointer"
            >
              <Compass className="w-4 h-4 text-[#B87556]" />
              <span>Explore Properties</span>
            </Link>
          </div>

          <div className="pt-2 text-center text-xs text-[#6B7280]">
            <p>Private Desk: {siteConfig.contact.phone}</p>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;