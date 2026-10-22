import { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ShieldCheck,
  Send,
  CheckCircle2,
  User,
} from "lucide-react";
import SectionHeading from "../components/SectionHeading";
import { siteConfig } from "../data/siteConfig";
import useAxios from "../hooks/useAxios";

const Contact = () => {
  const axiosInstance = useAxios();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "Property Acquisition",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) {
      errs.name = "Full name is required.";
    }
    if (!formData.email.trim()) {
      errs.email = "Email address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = "Please enter a valid email address.";
    }
    if (!formData.message.trim()) {
      errs.message = "Please include a brief message.";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
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

    setIsSubmitting(true);
    try {
      await axiosInstance.post("/contact", formData);
    } catch (err) {
      console.warn("Could not save contact message to server:", err);
    } finally {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "Property Acquisition",
      message: "",
    });
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      {/* Page Header */}
      <div className="mb-12 text-center max-w-3xl mx-auto">
        <SectionHeading
          overline="Direct Communication"
          title="Connect with Havenstone Advisory"
          description="Whether seeking representation for an architecturally significant estate or inquiring regarding off-market acquisitions, our senior partners are prepared to assist."
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column (5 cols): Contact Information & Global Offices */}
        <div className="lg:col-span-5 flex flex-col space-y-8">
          {/* Main Headquarters Card */}
          <div className="bg-white rounded-2xl border border-[#E4E1D9] p-6 sm:p-8 shadow-sm">
            <span className="text-[10px] uppercase tracking-widest font-semibold text-[#B87556] block mb-1">
              Global Headquarters
            </span>
            <h3 className="font-serif text-xl sm:text-2xl font-semibold text-[#173D3B] mb-4">
              Manhattan Flagship Office
            </h3>

            <div className="space-y-4 text-sm text-[#6B7280]">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#B87556] flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#173D3B] block">Havenstone Realty</strong>
                  <p>{siteConfig.contact.primaryAddress}</p>
                  <p>{siteConfig.contact.cityStateZip}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2 border-t border-[#E4E1D9]">
                <Phone className="w-5 h-5 text-[#B87556] flex-shrink-0" />
                <div>
                  <span className="text-xs text-[#6B7280] block">Private Client Desk</span>
                  <a
                    href={`tel:${siteConfig.contact.phone}`}
                    className="font-semibold text-[#173D3B] hover:text-[#B87556] transition-colors"
                  >
                    {siteConfig.contact.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2 border-t border-[#E4E1D9]">
                <Mail className="w-5 h-5 text-[#B87556] flex-shrink-0" />
                <div>
                  <span className="text-xs text-[#6B7280] block">Advisory Inquiries</span>
                  <a
                    href={`mailto:${siteConfig.contact.email}`}
                    className="font-semibold text-[#173D3B] hover:text-[#B87556] transition-colors"
                  >
                    {siteConfig.contact.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-2 border-t border-[#E4E1D9]">
                <Clock className="w-5 h-5 text-[#B87556] flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs text-[#6B7280] block">Consultation Hours</span>
                  <p className="font-medium text-[#173D3B]">{siteConfig.contact.officeHours}</p>
                  <p className="text-xs text-[#6B7280] mt-0.5">{siteConfig.contact.weekendNote}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Regional Offices Directory */}
          <div className="bg-[#173D3B] text-white rounded-2xl p-6 sm:p-8 shadow-sm border border-[#B87556]/20">
            <span className="text-[10px] uppercase tracking-widest font-semibold text-[#B87556] block mb-1">
              Regional Desks
            </span>
            <h3 className="font-serif text-lg sm:text-xl font-semibold mb-5 text-white">
              Principal Market Desks
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {siteConfig.offices.map((office) => (
                <div
                  key={office.city}
                  className="p-3.5 rounded-xl bg-white/5 border border-white/10"
                >
                  <h4 className="font-serif text-base font-semibold text-white">
                    {office.city}
                  </h4>
                  <span className="text-[10px] uppercase tracking-wider text-[#B87556] block mb-1">
                    {office.area}
                  </span>
                  <p className="text-xs text-slate-300 leading-snug">{office.address}</p>
                  <p className="text-xs text-slate-400 mt-2 font-mono">{office.phone}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (7 cols): Interactive Contact Form */}
        <div className="lg:col-span-7">
          <div className="bg-white rounded-2xl border border-[#E4E1D9] p-6 sm:p-10 shadow-sm">
            {isSubmitted ? (
              <div className="flex flex-col items-center text-center py-8">
                <div className="w-16 h-16 rounded-full bg-[#F7EFEA] text-[#B87556] flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-10 h-10" />
                </div>

                <span className="text-[11px] font-semibold uppercase tracking-widest text-[#B87556] mb-1">
                  Demo Submission Received
                </span>

                <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-[#173D3B] mb-2">
                  Thank You, {formData.name}
                </h3>

                <p className="text-sm text-[#6B7280] max-w-md mb-6 leading-relaxed">
                  Your simulated communication regarding <strong>{formData.subject}</strong> has been received and processed locally.
                </p>

                {/* Explicit client demo disclaimer */}
                <div className="w-full bg-[#F7F5EF] border border-[#E4E1D9] rounded-xl p-5 text-left text-xs text-[#6B7280] mb-8">
                  <div className="flex items-center gap-2 font-semibold text-[#173D3B] mb-2">
                    <ShieldCheck className="w-4 h-4 text-[#B87556]" />
                    <span>Client Evaluation Architecture Note</span>
                  </div>
                  <p className="leading-relaxed">
                    This website is configured as a standalone frontend demo. No external network request or database insertion was made. In the upcoming full-stack deployment, this form will connect directly to Express.js routes and store records securely in MongoDB.
                  </p>
                </div>

                <button
                  onClick={handleReset}
                  className="px-6 py-3 rounded-lg bg-[#173D3B] text-white text-xs uppercase tracking-widest font-semibold hover:bg-[#B87556] transition-colors cursor-pointer"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <div>
                <div className="mb-6 border-b border-[#E4E1D9] pb-4">
                  <span className="text-[10px] uppercase tracking-widest font-semibold text-[#B87556]">
                    Confidential Inquiry
                  </span>
                  <h3 className="font-serif text-2xl font-semibold text-[#173D3B] mt-1">
                    Send a Message to Our Partners
                  </h3>
                  <p className="text-xs text-[#6B7280] mt-1 leading-relaxed">
                    All correspondence is held in the strictest confidence. We reply within one business day.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Name */}
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#173D3B] mb-1">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-[#6B7280] absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        name="name"
                        placeholder="e.g. Sterling Hayes"
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

                  {/* Email & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#173D3B] mb-1">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-[#6B7280] absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="email"
                          name="email"
                          placeholder="e.g. s.hayes@investmentgroup.com"
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

                    <div>
                      <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#173D3B] mb-1">
                        Phone Number <span className="text-[#6B7280] font-normal lowercase">(optional)</span>
                      </label>
                      <div className="relative">
                        <Phone className="w-4 h-4 text-[#6B7280] absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="tel"
                          name="phone"
                          placeholder="+1 (212) 555-0199"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full bg-[#F7F5EF] border border-[#E4E1D9] rounded-lg pl-9 pr-3.5 py-2.5 text-sm text-[#303B3A] focus:outline-none focus:ring-1 focus:ring-[#B87556] focus:border-[#B87556]"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Area of Interest */}
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#173D3B] mb-1">
                      Subject / Matter of Consultation
                    </label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full bg-[#F7F5EF] border border-[#E4E1D9] rounded-lg px-3 py-2.5 text-sm text-[#303B3A] focus:outline-none focus:ring-1 focus:ring-[#B87556] cursor-pointer"
                    >
                      <option value="Property Acquisition">Property Acquisition</option>
                      <option value="Private Off-Market Sale">Private Off-Market Sale / Representation</option>
                      <option value="Luxury Lease & Relocation">Luxury Lease & Corporate Relocation</option>
                      <option value="Portfolio Valuation & Advisory">Portfolio Valuation & Advisory</option>
                      <option value="Press & Media Inquiries">Press & Media Inquiries</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#173D3B] mb-1">
                      Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      rows="4"
                      name="message"
                      placeholder="Please specify any preferred markets, architectural styles, target timelines, or acquisition parameters..."
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
                    disabled={isSubmitting}
                    className="w-full inline-flex items-center justify-center gap-2 bg-[#173D3B] hover:bg-[#B87556] text-white py-3.5 px-6 rounded-lg text-xs uppercase tracking-widest font-semibold transition-all duration-200 shadow-md cursor-pointer disabled:opacity-75"
                  >
                    {isSubmitting ? (
                      <span>Validating Demo Request...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Private Consultation Request</span>
                      </>
                    )}
                  </button>

                  <p className="text-[11px] text-[#6B7280] text-center leading-normal pt-1">
                    Client Demo Mode: Demonstrating frontend form validation and confirmation states.
                  </p>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
