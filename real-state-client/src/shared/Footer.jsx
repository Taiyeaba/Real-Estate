import { Link } from "react-router";
import { MapPin, Phone, Mail, Clock, ArrowUpRight } from "lucide-react";
import ProLogo from "./ProLogo";
import { siteConfig } from "../data/siteConfig";

const Footer = () => {
  return (
    <footer className="bg-[#173D3B] text-white pt-16 pb-12 border-t border-[#B87556]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Section: Brand + Links Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-white/10">
          {/* Column 1 & 2: Brand & Overview */}
          <div className="lg:col-span-2 flex flex-col items-start pr-0 lg:pr-8">
            <ProLogo variant="light" className="mb-4" />
            <p className="text-slate-300 text-sm leading-relaxed mb-6 max-w-sm">
              {siteConfig.brand.description}
            </p>
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 w-full max-w-sm">
              <span className="text-[10px] uppercase tracking-widest text-[#B87556] font-semibold block mb-1">
                Advisory Credentials
              </span>
              <p className="text-xs text-slate-400 font-mono">
                {siteConfig.brand.licenseNumber}
              </p>
            </div>
          </div>

          {/* Column 3: Portfolio Links */}
          <div>
            <h4 className="font-serif text-sm uppercase tracking-wider text-[#B87556] font-semibold mb-4">
              Portfolio
            </h4>
            <ul className="space-y-2.5">
              {siteConfig.footerLinks.portfolio.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.path}
                    className="text-xs text-slate-300 hover:text-white transition-colors flex items-center gap-1 group"
                  >
                    <span>{item.label}</span>
                    <ArrowUpRight className="w-3 h-3 text-[#B87556] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Key Locations */}
          <div>
            <h4 className="font-serif text-sm uppercase tracking-wider text-[#B87556] font-semibold mb-4">
              Key Markets
            </h4>
            <ul className="space-y-2.5">
              {siteConfig.footerLinks.locations.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.path}
                    className="text-xs text-slate-300 hover:text-white transition-colors flex items-center gap-1 group"
                  >
                    <span>{item.label}</span>
                    <ArrowUpRight className="w-3 h-3 text-[#B87556] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 5: Private Client Desk */}
          <div>
            <h4 className="font-serif text-sm uppercase tracking-wider text-[#B87556] font-semibold mb-4">
              Private Desk
            </h4>
            <ul className="space-y-3 text-xs text-slate-300">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#B87556] flex-shrink-0 mt-0.5" />
                <span>{siteConfig.contact.fullAddress}</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#B87556] flex-shrink-0" />
                <a
                  href={`tel:${siteConfig.contact.phone}`}
                  className="hover:text-white transition-colors"
                >
                  {siteConfig.contact.phone}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#B87556] flex-shrink-0" />
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="hover:text-white transition-colors"
                >
                  {siteConfig.contact.email}
                </a>
              </li>
              <li className="flex items-start gap-2 pt-1 border-t border-white/10 text-slate-400">
                <Clock className="w-4 h-4 text-[#B87556] flex-shrink-0 mt-0.5" />
                <span>{siteConfig.contact.officeHours}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section: Copyright & Disclaimer */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>
            &copy; {new Date().getFullYear()} {siteConfig.brand.name}. All rights reserved. Client Evaluation Prototype.
          </p>

          <div className="flex items-center space-x-6 text-xs text-slate-400">
            <Link to="/about" className="hover:text-white transition-colors">
              About Advisory
            </Link>
            <Link to="/contact" className="hover:text-white transition-colors">
              Contact Desk
            </Link>
            <Link to="/properties" className="hover:text-white transition-colors">
              Browse All
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;