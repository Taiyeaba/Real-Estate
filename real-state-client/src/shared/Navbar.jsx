import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import {
  Menu,
  X,
  ArrowRight,
  Phone,
  Compass,
  ChevronDown,
  Building2,
  CheckCircle2,
} from "lucide-react";
import ProLogo from "./ProLogo";
import { siteConfig } from "../data/siteConfig";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Subtle scroll listener for elevated shadow without layout shifts
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile drawer on route change
  const closeMobileMenu = () => setMobileMenuOpen(false);

  const handleSectionScroll = (sectionId) => {
    if (location.pathname === "/") {
      const elem = document.getElementById(sectionId);
      if (elem) {
        elem.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      navigate(`/#${sectionId}`);
    }
    setDropdownOpen(false);
    setMobileMenuOpen(false);
  };

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

  const isHome = location.pathname === "/";
  const isTransparent = isHome && !scrolled;

  return (
    <header
      className={`transition-all duration-500 z-50 ${
        isTransparent
          ? "absolute top-0 inset-x-0 bg-gradient-to-b from-black/80 via-black/30 to-transparent border-b border-white/10 text-white"
          : scrolled
          ? "sticky top-0 bg-[#F7F5EF]/98 shadow-md border-b border-[#E4E1D9]/90 backdrop-blur-lg text-[#303B3A]"
          : "sticky top-0 bg-[#F7F5EF]/95 shadow-none border-b border-[#E4E1D9] backdrop-blur-md text-[#303B3A]"
      }`}
    >
      {/* Upper subtle contact bar for desktop */}
      <div
        className={`hidden lg:block text-[11px] py-1.5 px-6 border-b transition-colors duration-300 ${
          isTransparent
            ? "bg-black/30 text-white/80 border-white/10"
            : "bg-[#173D3B] text-white/80 border-white/10"
        }`}
      >
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
            <ProLogo variant={isTransparent ? "light" : "dark"} />
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navItems.map((item) => {
              const active = isLinkActive(item.to);
              const isProperties = item.label === "Properties";

              if (isProperties) {
                return (
                  <div
                    key={item.label}
                    className="relative group"
                    onMouseEnter={() => setDropdownOpen(true)}
                    onMouseLeave={() => setDropdownOpen(false)}
                  >
                    <div className="flex items-center">
                      <Link
                        to={item.to}
                        className={`px-3 py-2 text-xs uppercase tracking-widest font-semibold transition-all relative flex items-center gap-1.5 cursor-pointer ${
                          isTransparent
                            ? active
                              ? "text-white font-bold"
                              : "text-white/80 hover:text-[#B87556]"
                            : active
                            ? "text-[#173D3B] font-bold"
                            : "text-[#6B7280] hover:text-[#173D3B]"
                        }`}
                      >
                        <span>{item.label}</span>
                        <ChevronDown className="w-3.5 h-3.5 transition-transform duration-300 group-hover:rotate-180" />
                        {active && (
                          <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-[#B87556]" />
                        )}
                      </Link>
                    </div>

                    {/* Luxury Dropdown Container */}
                    <div
                      className={`absolute left-0 top-full pt-2 w-56 transition-all duration-300 z-50 ${
                        dropdownOpen
                          ? "opacity-100 visible translate-y-0"
                          : "opacity-0 invisible -translate-y-2 pointer-events-none"
                      }`}
                    >
                      <div
                        className={`rounded-2xl p-2 shadow-2xl border backdrop-blur-xl ${
                          isTransparent
                            ? "bg-[#071312]/95 border-white/15 text-white"
                            : "bg-[#F7F5EF]/98 border-[#E4E1D9] text-[#173D3B]"
                        }`}
                      >
                        <Link
                          to="/properties"
                          onClick={() => setDropdownOpen(false)}
                          className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs uppercase tracking-wider font-semibold transition-colors ${
                            isTransparent
                              ? "hover:bg-white/10 text-white"
                              : "hover:bg-white text-[#173D3B] hover:text-[#B87556]"
                          }`}
                        >
                          <Building2 className="w-3.5 h-3.5 text-[#B87556]" />
                          <span>All Properties</span>
                        </Link>

                        <button
                          type="button"
                          onClick={() => handleSectionScroll("ongoing-projects")}
                          className={`w-full text-left flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs uppercase tracking-wider font-semibold transition-colors cursor-pointer ${
                            isTransparent
                              ? "hover:bg-white/10 text-white"
                              : "hover:bg-white text-[#173D3B] hover:text-[#B87556]"
                          }`}
                        >
                          <span className="w-2 h-2 rounded-full bg-[#B87556] animate-pulse" />
                          <span>Ongoing Projects</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleSectionScroll("recent-completed")}
                          className={`w-full text-left flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs uppercase tracking-wider font-semibold transition-colors cursor-pointer ${
                            isTransparent
                              ? "hover:bg-white/10 text-white"
                              : "hover:bg-white text-[#173D3B] hover:text-[#B87556]"
                          }`}
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#C5A46D]" />
                          <span>Recent Completed</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <Link
                  key={item.label}
                  to={item.to}
                  className={`px-3 py-2 text-xs uppercase tracking-widest font-semibold transition-all relative ${
                    isTransparent
                      ? active
                        ? "text-white font-bold"
                        : "text-white/80 hover:text-[#B87556]"
                      : active
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
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs uppercase tracking-widest font-semibold transition-all duration-200 shadow-sm hover:shadow cursor-pointer ${
                isTransparent
                  ? "bg-[#B87556] hover:bg-[#A56346] text-white"
                  : "bg-[#173D3B] hover:bg-[#B87556] text-white"
              }`}
            >
              <span>Explore Properties</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Mobile Menu Hamburger Button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 rounded-lg focus:outline-none cursor-pointer ${
                isTransparent
                  ? "text-white hover:bg-white/10"
                  : "text-[#173D3B] hover:bg-black/5"
              }`}
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
              const isProperties = item.label === "Properties";
              return (
                <div key={item.label} className="flex flex-col">
                  <Link
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

                  {isProperties && (
                    <div className="pl-4 pr-2 py-1 space-y-1 bg-black/5 rounded-lg my-1">
                      <button
                        type="button"
                        onClick={() => handleSectionScroll("ongoing-projects")}
                        className="w-full text-left flex items-center gap-2.5 px-3 py-2 text-xs uppercase tracking-wider font-semibold text-[#173D3B] hover:text-[#B87556] transition-colors cursor-pointer"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#B87556] animate-pulse" />
                        <span>Ongoing Projects</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleSectionScroll("recent-completed")}
                        className="w-full text-left flex items-center gap-2.5 px-3 py-2 text-xs uppercase tracking-wider font-semibold text-[#173D3B] hover:text-[#B87556] transition-colors cursor-pointer"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#C5A46D]" />
                        <span>Recent Completed</span>
                      </button>
                    </div>
                  )}
                </div>
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