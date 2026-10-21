import { useState } from "react";
import { CheckCircle2, Send, ShieldCheck, Calendar, Phone, Mail, User } from "lucide-react";

const PropertyInquiryForm = ({ property, className = "" }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    tourDate: "",
    inquiryType: "Private Buyer",
    message: property
      ? `I am interested in scheduling a private showing for ${property.title} (Ref: ${property.id}). Please provide further acquisition materials.`
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);

    // Client-side simulation of inquiry processing
    setTimeout(() => {
      setSubmitting(false);
      setIsSubmitted(true);
    }, 600);
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
      <div className={`bg-white rounded-2xl border border-[#E4E1D9] p-6 sm:p-8 shadow-sm ${className}`}>
        <div className="flex flex-col items-center text-center">
          <div className="w-14 h-14 rounded-full bg-[#F7EFEA] text-[#B87556] flex items-center justify-center mb-4">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <span className="text-[11px] font-semibold uppercase tracking-widest text-[#B87556] mb-1">
            Demo Submission Confirmed
          </span>

          <h3 className="font-serif text-xl sm:text-2xl font-semibold text-[#173D3B] mb-2">
            Inquiry Simulated Successfully
          </h3>

          <p className="text-sm text-[#6B7280] max-w-md mb-4 leading-relaxed">
            Thank you, <strong className="text-[#173D3B]">{formData.name}</strong>. Your inquiry regarding{" "}
            {property ? (
              <strong className="text-[#173D3B]">{property.title}</strong>
            ) : (
              "our portfolio"
            )}{" "}
            has been validated.
          </p>

          {/* Explicit client demo disclosure banner */}
          <div className="w-full bg-[#F7F5EF] border border-[#E4E1D9] rounded-xl p-4 text-left text-xs text-[#6B7280] mb-6">
            <div className="flex items-center gap-1.5 font-semibold text-[#173D3B] mb-1">
              <ShieldCheck className="w-4 h-4 text-[#B87556]" />
              <span>Demo Environment Notice</span>
            </div>
            <p className="leading-relaxed">
              This frontend demo operates without a live server connection. In the production deployment, this inquiry will route directly to Havenstone's private client desk and sync with MongoDB.
            </p>
          </div>

          <button
            onClick={handleReset}
            className="px-6 py-2.5 rounded-lg bg-[#173D3B] text-white text-xs uppercase tracking-widest font-semibold hover:bg-[#B87556] transition-colors cursor-pointer"
          >
            Submit Another Inquiry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-2xl border border-[#E4E1D9] p-6 sm:p-8 shadow-sm ${className}`}>
      <div className="mb-6 border-b border-[#E4E1D9] pb-4">
        <span className="text-[10px] uppercase tracking-widest font-semibold text-[#B87556]">
          Private Consultation
        </span>
        <h3 className="font-serif text-xl sm:text-2xl font-semibold text-[#173D3B] mt-1">
          {property ? "Inquire About This Property" : "Connect with an Advisor"}
        </h3>
        <p className="text-xs text-[#6B7280] mt-1.5 leading-relaxed">
          {property
            ? `Connect directly with our dedicated advisory desk representing ${property.title}.`
            : "Receive bespoke market analysis or schedule a confidential advisory consultation."}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Full Name */}
        <div>
          <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#173D3B] mb-1">
            Full Name <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <User className="w-4 h-4 text-[#6B7280] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              name="name"
              placeholder="e.g. Eleanor Vance"
              value={formData.name}
              onChange={handleChange}
              className={`w-full bg-[#F7F5EF] border rounded-lg pl-9 pr-3.5 py-2.5 text-sm text-[#303B3A] focus:outline-none transition-colors ${
                errors.name
                  ? "border-red-400 focus:ring-1 focus:ring-red-400"
                  : "border-[#E4E1D9] focus:ring-1 focus:ring-[#B87556] focus:border-[#B87556]"
              }`}
            />
          </div>
          {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
        </div>

        {/* Email Address */}
        <div>
          <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#173D3B] mb-1">
            Email Address <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 text-[#6B7280] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="email"
              name="email"
              placeholder="e.g. eleanor.vance@familyoffice.com"
              value={formData.email}
              onChange={handleChange}
              className={`w-full bg-[#F7F5EF] border rounded-lg pl-9 pr-3.5 py-2.5 text-sm text-[#303B3A] focus:outline-none transition-colors ${
                errors.email
                  ? "border-red-400 focus:ring-1 focus:ring-red-400"
                  : "border-[#E4E1D9] focus:ring-1 focus:ring-[#B87556] focus:border-[#B87556]"
              }`}
            />
          </div>
          {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
        </div>

        {/* Phone Number (Optional) */}
        <div>
          <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#173D3B] mb-1">
            Phone Number <span className="text-[#6B7280] font-normal lowercase">(optional)</span>
          </label>
          <div className="relative">
            <Phone className="w-4 h-4 text-[#6B7280] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="tel"
              name="phone"
              placeholder="+1 (555) 019-2834"
              value={formData.phone}
              onChange={handleChange}
              className="w-full bg-[#F7F5EF] border border-[#E4E1D9] rounded-lg pl-9 pr-3.5 py-2.5 text-sm text-[#303B3A] focus:outline-none focus:ring-1 focus:ring-[#B87556] focus:border-[#B87556] transition-colors"
            />
          </div>
        </div>

        {/* Preferred Date & Inquirer Type */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#173D3B] mb-1">
              Preferred Tour Date
            </label>
            <div className="relative">
              <Calendar className="w-4 h-4 text-[#6B7280] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="date"
                name="tourDate"
                value={formData.tourDate}
                onChange={handleChange}
                className="w-full bg-[#F7F5EF] border border-[#E4E1D9] rounded-lg pl-9 pr-3 py-2 text-xs text-[#303B3A] focus:outline-none focus:ring-1 focus:ring-[#B87556]"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#173D3B] mb-1">
              Representation
            </label>
            <select
              name="inquiryType"
              value={formData.inquiryType}
              onChange={handleChange}
              className="w-full bg-[#F7F5EF] border border-[#E4E1D9] rounded-lg px-3 py-2.5 text-xs text-[#303B3A] focus:outline-none focus:ring-1 focus:ring-[#B87556] cursor-pointer"
            >
              <option value="Private Buyer">Private Buyer</option>
              <option value="Family Office / Trust">Family Office / Trust</option>
              <option value="Licensed Broker">Licensed Broker</option>
              <option value="Architect / Designer">Architect / Designer</option>
            </select>
          </div>
        </div>

        {/* Message */}
        <div>
          <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#173D3B] mb-1">
            Message <span className="text-red-500">*</span>
          </label>
          <textarea
            rows="3"
            name="message"
            value={formData.message}
            onChange={handleChange}
            className={`w-full bg-[#F7F5EF] border rounded-lg p-3 text-sm text-[#303B3A] focus:outline-none transition-colors resize-none ${
              errors.message
                ? "border-red-400 focus:ring-1 focus:ring-red-400"
                : "border-[#E4E1D9] focus:ring-1 focus:ring-[#B87556] focus:border-[#B87556]"
            }`}
          />
          {errors.message && <p className="text-xs text-red-500 mt-1">{errors.message}</p>}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={submitting}
          className="w-full inline-flex items-center justify-center gap-2 bg-[#173D3B] hover:bg-[#B87556] text-white py-3.5 px-6 rounded-lg text-xs uppercase tracking-widest font-semibold transition-all duration-200 shadow-md cursor-pointer disabled:opacity-75"
        >
          {submitting ? (
            <span>Simulating Demo Request...</span>
          ) : (
            <>
              <Send className="w-4 h-4" />
              <span>Send Private Inquiry</span>
            </>
          )}
        </button>

        <p className="text-[11px] text-[#6B7280] text-center leading-normal">
          Client Demo: Inquiries are simulated locally without external server transmission.
        </p>
      </form>
    </div>
  );
};

export default PropertyInquiryForm;
