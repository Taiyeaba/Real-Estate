import { useState } from "react";
import { CheckCircle2, Send, ShieldCheck, Calendar, Phone, Mail, User } from "lucide-react";
import useAxios from "../hooks/useAxios";

const PropertyInquiryForm = ({ property, className = "", dark = false }) => {
  const axiosInstance = useAxios();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    tourDate: "",
    inquiryType: "Private Buyer",
    message: property
      ? `I am interested in scheduling a private showing for ${property.title} (Ref: ${property.id || property._id}). Please provide further acquisition materials.`
      : "I would like to consult with an advisor regarding your current real estate portfolio.",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = "Full name is required.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = "Please provide a valid email address.";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Please write a brief inquiry message.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);

    try {
      await axiosInstance.post("/inquiries", {
        propertyId: property ? (property.id || property._id) : "general",
        propertyTitle: property ? property.title : "General Inquiry",
        ...formData,
      });
    } catch (err) {
      console.warn("Could not save inquiry to server:", err);
    } finally {
      setSubmitting(false);
      setIsSubmitted(true);
    }
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setFormData({
      name: "",
      email: "",
      phone: "",
      tourDate: "",
      inquiryType: "Private Buyer",
      message: property
        ? `I am interested in scheduling a private showing for ${property.title} (Ref: ${property.id}).`
        : "",
    });
  };

  if (isSubmitted) {
    return (
      <div
        className={`rounded-2xl p-6 sm:p-8 transition-all ${
          dark
            ? "bg-[#173D3B] text-white border border-[#B87556]/20 shadow-lg"
            : "bg-white border border-[#E4E1D9] shadow-sm text-[#303B3A]"
        } ${className}`}
      >
        <div className="flex flex-col items-center text-center">
          <div
            className={`w-14 h-14 rounded-full flex items-center justify-center mb-4 ${
              dark
                ? "bg-white/10 text-[#B87556] border border-white/10"
                : "bg-[#F7EFEA] text-[#B87556]"
            }`}
          >
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <span
            className={`text-[11px] font-semibold uppercase tracking-widest mb-1 ${
              dark ? "text-[#B87556]" : "text-[#B87556]"
            }`}
          >
            Inquiry Registered
          </span>

          <h3
            className={`font-serif text-xl sm:text-2xl font-semibold mb-2 ${
              dark ? "text-white" : "text-[#173D3B]"
            }`}
          >
            Consultation Request Confirmed
          </h3>

          <p
            className={`text-sm max-w-md mb-4 leading-relaxed font-light ${
              dark ? "text-slate-300" : "text-[#6B7280]"
            }`}
          >
            Thank you, <strong className={dark ? "text-white font-medium" : "text-[#173D3B]"}>{formData.name}</strong>. Your inquiry regarding{" "}
            {property ? (
              <strong className={dark ? "text-white font-medium" : "text-[#173D3B]"}>{property.title}</strong>
            ) : (
              "our portfolio"
            )}{" "}
            has been received by our private advisory desk.
          </p>

          <div
            className={`w-full rounded-xl p-4 text-left text-xs mb-6 border ${
              dark
                ? "bg-black/20 border-white/10 text-slate-300"
                : "bg-[#F7F5EF] border-[#E4E1D9] text-[#6B7280]"
            }`}
          >
            <div className={`flex items-center gap-1.5 font-semibold mb-1 ${dark ? "text-white" : "text-[#173D3B]"}`}>
              <ShieldCheck className="w-4 h-4 text-[#B87556]" />
              <span>Private Client Protection</span>
            </div>
            <p className="leading-relaxed font-light">
              This communication is managed confidentially under Havenstone fiduciary representation protocols.
            </p>
          </div>

          <button
            onClick={handleReset}
            className={`px-6 py-2.5 rounded-xl text-xs uppercase tracking-widest font-semibold transition-all cursor-pointer ${
              dark
                ? "bg-[#B87556] text-white hover:bg-[#A56346] shadow-sm"
                : "bg-[#173D3B] text-white hover:bg-[#B87556]"
            }`}
          >
            Submit Another Inquiry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`rounded-2xl p-6 sm:p-8 transition-all ${
        dark
          ? "bg-[#173D3B] text-white border border-[#B87556]/20 shadow-lg"
          : "bg-white border border-[#E4E1D9] shadow-sm text-[#303B3A]"
      } ${className}`}
    >
      <div className={`mb-6 border-b pb-4 ${dark ? "border-white/15" : "border-[#E4E1D9]"}`}>
        <span
          className={`text-[10px] uppercase tracking-widest font-semibold ${
            dark ? "text-[#B87556]" : "text-[#B87556]"
          }`}
        >
          Private Consultation
        </span>
        <h3
          className={`font-serif text-xl sm:text-2xl font-semibold mt-1 ${
            dark ? "text-white" : "text-[#173D3B]"
          }`}
        >
          {property ? "Inquire About This Property" : "Connect with an Advisor"}
        </h3>
        <p
          className={`text-xs mt-1.5 leading-relaxed font-light ${
            dark ? "text-slate-300" : "text-[#6B7280]"
          }`}
        >
          {property
            ? `Connect directly with our dedicated advisory desk representing ${property.title}.`
            : "Receive bespoke market analysis or schedule a confidential advisory consultation."}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Full Name */}
        <div>
          <label
            className={`block text-[11px] uppercase tracking-wider font-semibold mb-1 ${
              dark ? "text-slate-200" : "text-[#173D3B]"
            }`}
          >
            Full Name <span className="text-red-400">*</span>
          </label>
          <div className="relative">
            <User className={`w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 ${dark ? "text-slate-400" : "text-[#6B7280]"}`} />
            <input
              type="text"
              name="name"
              placeholder="e.g. Eleanor Vance"
              value={formData.name}
              onChange={handleChange}
              className={`w-full rounded-xl pl-10 pr-3.5 py-2.5 text-sm focus:outline-none transition-colors ${
                dark
                  ? "bg-white/10 border border-white/20 text-white placeholder-white/40 focus:border-[#B87556]"
                  : "bg-[#F7F5EF] border border-[#E4E1D9] text-[#303B3A] focus:border-[#B87556]"
              } ${errors.name ? "border-red-400" : ""}`}
            />
          </div>
          {errors.name && <p className="text-xs text-red-400 mt-1">{errors.name}</p>}
        </div>

        {/* Email Address */}
        <div>
          <label
            className={`block text-[11px] uppercase tracking-wider font-semibold mb-1 ${
              dark ? "text-slate-200" : "text-[#173D3B]"
            }`}
          >
            Email Address <span className="text-red-400">*</span>
          </label>
          <div className="relative">
            <Mail className={`w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 ${dark ? "text-slate-400" : "text-[#6B7280]"}`} />
            <input
              type="email"
              name="email"
              placeholder="e.g. eleanor.vance@familyoffice.com"
              value={formData.email}
              onChange={handleChange}
              className={`w-full rounded-xl pl-10 pr-3.5 py-2.5 text-sm focus:outline-none transition-colors ${
                dark
                  ? "bg-white/10 border border-white/20 text-white placeholder-white/40 focus:border-[#B87556]"
                  : "bg-[#F7F5EF] border border-[#E4E1D9] text-[#303B3A] focus:border-[#B87556]"
              } ${errors.email ? "border-red-400" : ""}`}
            />
          </div>
          {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email}</p>}
        </div>

        {/* Phone Number */}
        <div>
          <label
            className={`block text-[11px] uppercase tracking-wider font-semibold mb-1 ${
              dark ? "text-slate-200" : "text-[#173D3B]"
            }`}
          >
            Phone Number <span className={dark ? "text-slate-400 font-normal lowercase" : "text-[#6B7280] font-normal lowercase"}>(optional)</span>
          </label>
          <div className="relative">
            <Phone className={`w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 ${dark ? "text-slate-400" : "text-[#6B7280]"}`} />
            <input
              type="tel"
              name="phone"
              placeholder="+1 (555) 019-2834"
              value={formData.phone}
              onChange={handleChange}
              className={`w-full rounded-xl pl-10 pr-3.5 py-2.5 text-sm focus:outline-none transition-colors ${
                dark
                  ? "bg-white/10 border border-white/20 text-white placeholder-white/40 focus:border-[#B87556]"
                  : "bg-[#F7F5EF] border border-[#E4E1D9] text-[#303B3A] focus:border-[#B87556]"
              }`}
            />
          </div>
        </div>

        {/* Preferred Date & Inquirer Type */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label
              className={`block text-[11px] uppercase tracking-wider font-semibold mb-1 ${
                dark ? "text-slate-200" : "text-[#173D3B]"
              }`}
            >
              Tour Date
            </label>
            <div className="relative">
              <Calendar className={`w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 ${dark ? "text-slate-400" : "text-[#6B7280]"}`} />
              <input
                type="date"
                name="tourDate"
                value={formData.tourDate}
                onChange={handleChange}
                className={`w-full rounded-xl pl-9 pr-2 py-2 text-xs focus:outline-none ${
                  dark
                    ? "bg-white/10 border border-white/20 text-white focus:border-[#B87556]"
                    : "bg-[#F7F5EF] border border-[#E4E1D9] text-[#303B3A] focus:border-[#B87556]"
                }`}
              />
            </div>
          </div>

          <div>
            <label
              className={`block text-[11px] uppercase tracking-wider font-semibold mb-1 ${
                dark ? "text-slate-200" : "text-[#173D3B]"
              }`}
            >
              Representation
            </label>
            <select
              name="inquiryType"
              value={formData.inquiryType}
              onChange={handleChange}
              className={`w-full rounded-xl px-3 py-2 text-xs focus:outline-none cursor-pointer ${
                dark
                  ? "bg-white/10 border border-white/20 text-white focus:border-[#B87556]"
                  : "bg-[#F7F5EF] border border-[#E4E1D9] text-[#303B3A] focus:border-[#B87556]"
              }`}
            >
              <option value="Private Buyer" className="bg-[#173D3B] text-white">Private Buyer</option>
              <option value="Family Office / Trust" className="bg-[#173D3B] text-white">Family Office / Trust</option>
              <option value="Licensed Broker" className="bg-[#173D3B] text-white">Licensed Broker</option>
              <option value="Architect / Designer" className="bg-[#173D3B] text-white">Architect / Designer</option>
            </select>
          </div>
        </div>

        {/* Message */}
        <div>
          <label
            className={`block text-[11px] uppercase tracking-wider font-semibold mb-1 ${
              dark ? "text-slate-200" : "text-[#173D3B]"
            }`}
          >
            Message <span className="text-red-400">*</span>
          </label>
          <textarea
            rows="3"
            name="message"
            value={formData.message}
            onChange={handleChange}
            className={`w-full rounded-xl p-3 text-sm focus:outline-none resize-none transition-colors ${
              dark
                ? "bg-white/10 border border-white/20 text-white placeholder-white/40 focus:border-[#B87556]"
                : "bg-[#F7F5EF] border border-[#E4E1D9] text-[#303B3A] focus:border-[#B87556]"
            } ${errors.message ? "border-red-400" : ""}`}
          />
          {errors.message && <p className="text-xs text-red-400 mt-1">{errors.message}</p>}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={submitting}
          className={`w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl text-xs uppercase tracking-widest font-semibold transition-all duration-200 shadow-sm cursor-pointer disabled:opacity-75 ${
            dark
              ? "bg-[#B87556] hover:bg-[#A56346] text-white"
              : "bg-[#173D3B] hover:bg-[#B87556] text-white"
          }`}
        >
          {submitting ? (
            <span>Processing Request...</span>
          ) : (
            <>
              <Send className="w-4 h-4" />
              <span>Send Private Inquiry</span>
            </>
          )}
        </button>

        <p className={`text-[11px] text-center leading-normal font-light ${dark ? "text-slate-300" : "text-[#6B7280]"}`}>
          Confidential advisory service for verified principals and family offices.
        </p>
      </form>
    </div>
  );
};

export default PropertyInquiryForm;
