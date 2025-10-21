import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
import { useState, useRef, type FormEvent, type ChangeEvent } from "react";
import { toast } from "sonner";

import { EarthCanvas } from "./canvas";
import ErrorBoundary from "./canvas/ErrorBoundary";
import { SectionWrapper } from "../hoc";
import { styles } from "../styles";
import { slideIn } from "../utils/motion";

// Contact
export const Contact = () => {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [activeTab, setActiveTab] = useState<'contact' | 'appointment'>('contact');
  
  // Contact form state
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  
  // Appointment form state
  const [appointmentForm, setAppointmentForm] = useState({
    name: "",
    email: "",
    phone: "",
    appointmentType: "phone",
    date: "",
    time: "",
    notes: "",
  });
  
  const [loading, setLoading] = useState(false);

  // Available time slots
  const timeSlots = [
    "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
    "12:00 PM", "12:30 PM", "01:00 PM", "01:30 PM", "02:00 PM", "02:30 PM",
    "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM", "05:00 PM", "05:30 PM"
  ];

  // handle contact form change
  const handleContactChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setContactForm({ ...contactForm, [name]: value });
  };

  // handle appointment form change
  const handleAppointmentChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setAppointmentForm({ ...appointmentForm, [name]: value });
  };

  // validate contact form
  const validateContactForm = () => {
    const { name, email, message } = contactForm;
    const nameError = document.querySelector("#contact-name-error")!;
    const emailError = document.querySelector("#contact-email-error")!;
    const messageError = document.querySelector("#contact-message-error")!;

    let isValid = true;

    // validate name
    if (name.trim().length < 3) {
      nameError.classList.remove("hidden");
      isValid = false;
    } else {
      nameError.classList.add("hidden");
    }

    // validate email
    const email_regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!email.trim().toLowerCase().match(email_regex)) {
      emailError.classList.remove("hidden");
      isValid = false;
    } else {
      emailError.classList.add("hidden");
    }

    // validate message
    if (message.trim().length < 5) {
      messageError.classList.remove("hidden");
      isValid = false;
    } else {
      messageError.classList.add("hidden");
    }

    return isValid;
  };

  // validate appointment form
  const validateAppointmentForm = () => {
    const { name, email, phone, date, time } = appointmentForm;
    const nameError = document.querySelector("#appointment-name-error")!;
    const emailError = document.querySelector("#appointment-email-error")!;
    const phoneError = document.querySelector("#appointment-phone-error")!;
    const dateError = document.querySelector("#appointment-date-error")!;
    const timeError = document.querySelector("#appointment-time-error")!;

    let isValid = true;

    // validate name
    if (name.trim().length < 3) {
      nameError.classList.remove("hidden");
      isValid = false;
    } else {
      nameError.classList.add("hidden");
    }

    // validate email
    const email_regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!email.trim().toLowerCase().match(email_regex)) {
      emailError.classList.remove("hidden");
      isValid = false;
    } else {
      emailError.classList.add("hidden");
    }

    // validate phone
    const phone_regex = /^[\+]?[1-9][\d]{0,15}$/;
    if (!phone.trim().match(phone_regex)) {
      phoneError.classList.remove("hidden");
      isValid = false;
    } else {
      phoneError.classList.add("hidden");
    }

    // validate date
    if (!date) {
      dateError.classList.remove("hidden");
      isValid = false;
    } else {
      dateError.classList.add("hidden");
    }

    // validate time
    if (!time) {
      timeError.classList.remove("hidden");
      isValid = false;
    } else {
      timeError.classList.add("hidden");
    }

    return isValid;
  };

  // handle contact form submit
  const handleContactSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateContactForm()) return;

    setLoading(true);

    try {
      const ipResponse = await fetch('https://api.ipify.org?format=json');
      const ipData = await ipResponse.json();
      const ipAddress = ipData.ip;
      
      const locationResponse = await fetch(`https://ipapi.co/${ipAddress}/json/`);
      const locationData = await locationResponse.json();
      
      const userInfo = getUserInfo();
      
      emailjs
        .send(
          import.meta.env.VITE_APP_SERVICE_ID || 'service_mrbmgus',
          import.meta.env.VITE_APP_TEMPLATE_ID || 'template_d16rk5m',
          {
            from_name: contactForm.name,
            from_email: contactForm.email.trim().toLowerCase(),
            message: contactForm.message,
            date: new Date().toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              timeZone: 'Africa/Cairo'
            }),
            time: new Date().toLocaleTimeString('en-US', {
              hour: '2-digit',
              minute: '2-digit',
              hour12: true,
              timeZone: 'Africa/Cairo'
            }),
            ip_address: ipAddress,
            location: `${locationData.city || 'Unknown'}, ${locationData.region || 'Unknown'}`,
            country: locationData.country_name || 'Unknown',
            city: locationData.city || 'Unknown',
            browser: userInfo.browser,
            device: userInfo.device,
            platform: userInfo.platform,
            referrer: userInfo.referrer,
          },
          import.meta.env.VITE_APP_EMAILJS_KEY || 'H4YFvBxDUh6YpVn0a',
        )
        .then(() => toast.success("Thanks for contacting me!"))
        .catch(() => {
          toast.error("Something went wrong.");
        })
        .finally(() => {
          setLoading(false);
          setContactForm({ name: "", email: "", message: "" });
        });
    } catch {
      toast.error("Something went wrong.");
      setLoading(false);
    }
  };

  // handle appointment form submit
  const handleAppointmentSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateAppointmentForm()) return;

    setLoading(true);

    try {
      const ipResponse = await fetch('https://api.ipify.org?format=json');
      const ipData = await ipResponse.json();
      const ipAddress = ipData.ip;
      
      const locationResponse = await fetch(`https://ipapi.co/${ipAddress}/json/`);
      const locationData = await locationResponse.json();
      
      const userInfo = getUserInfo();
      
      emailjs
        .send(
          import.meta.env.VITE_APP_SERVICE_ID || 'service_mrbmgus',
          import.meta.env.VITE_APP_TEMPLATE_ID || 'template_d16rk5m',
          {
            from_name: appointmentForm.name,
            from_email: appointmentForm.email.trim().toLowerCase(),
            message: `Appointment Request:
Type: ${appointmentForm.appointmentType}
Date: ${appointmentForm.date}
Time: ${appointmentForm.time}
Phone: ${appointmentForm.phone}
Notes: ${appointmentForm.notes || 'No additional notes'}`,
            date: new Date().toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              timeZone: 'Africa/Cairo'
            }),
            time: new Date().toLocaleTimeString('en-US', {
              hour: '2-digit',
              minute: '2-digit',
              hour12: true,
              timeZone: 'Africa/Cairo'
            }),
            ip_address: ipAddress,
            location: `${locationData.city || 'Unknown'}, ${locationData.region || 'Unknown'}`,
            country: locationData.country_name || 'Unknown',
            city: locationData.city || 'Unknown',
            browser: userInfo.browser,
            device: userInfo.device,
            platform: userInfo.platform,
            referrer: userInfo.referrer,
          },
          import.meta.env.VITE_APP_EMAILJS_KEY || 'H4YFvBxDUh6YpVn0a',
        )
        .then(() => toast.success("Appointment request sent successfully!"))
        .catch(() => {
          toast.error("Something went wrong.");
        })
        .finally(() => {
          setLoading(false);
          setAppointmentForm({
            name: "",
            email: "",
            phone: "",
            appointmentType: "phone",
            date: "",
            time: "",
            notes: "",
          });
        });
    } catch {
      toast.error("Something went wrong.");
      setLoading(false);
    }
  };

  // Get user information
  const getUserInfo = () => {
    const userAgent = navigator.userAgent;
    const platform = navigator.platform;
    const language = navigator.language;
    const referrer = document.referrer || 'Direct';
    
    let browser = 'Unknown';
    if (userAgent.includes('Chrome')) browser = 'Chrome';
    else if (userAgent.includes('Firefox')) browser = 'Firefox';
    else if (userAgent.includes('Safari')) browser = 'Safari';
    else if (userAgent.includes('Edge')) browser = 'Edge';
    else if (userAgent.includes('Opera')) browser = 'Opera';
    
    let device = 'Desktop';
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)) {
      device = 'Mobile';
    } else if (/iPad|Android/i.test(userAgent)) {
      device = 'Tablet';
    }
    
    let platformName = 'Unknown';
    if (platform.includes('Win')) platformName = 'Windows';
    else if (platform.includes('Mac')) platformName = 'macOS';
    else if (platform.includes('Linux')) platformName = 'Linux';
    else if (platform.includes('Android')) platformName = 'Android';
    else if (platform.includes('iOS')) platformName = 'iOS';
    
    return {
      browser,
      device,
      platform: platformName,
      language,
      referrer
    };
  };

  return (
    <SectionWrapper idName="contact">
      <div className="xl:mt-12 xl:flex-row flex-col-reverse flex gap-10 overflow-hidden">
        <motion.div
          variants={slideIn("left", "tween", 0.2, 1)}
          className="flex-[0.75] bg-gradient-to-br from-black/40 to-black/20 backdrop-blur-xl border border-white/10 p-6 rounded-3xl shadow-2xl"
        >
          {/* Title */}
          <div className="mb-6">
          <p className={styles.sectionSubText}>Get in touch</p>
          <h3 className={styles.sectionHeadText}>Contact.</h3>
          </div>
          
          {/* Contact Information */}
          <div className="mb-8 p-4 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-2xl border border-white/5">
            <h4 className="text-white font-semibold text-base mb-3 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"></span>
              Contact Information
            </h4>
            <div className="space-y-2 text-secondary text-[14px] leading-relaxed">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-lg flex items-center justify-center">
                  <svg className="w-3 h-3 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                  </svg>
                </div>
                <span><strong className="text-white">Email:</strong> omar-agha@engineer.com</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-gradient-to-r from-green-500/20 to-teal-500/20 rounded-lg flex items-center justify-center">
                  <svg className="w-3 h-3 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                  </svg>
                </div>
                <span><strong className="text-white">Phone:</strong> +201029752972</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-lg flex items-center justify-center">
                  <svg className="w-3 h-3 text-orange-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
                  </svg>
                </div>
                <span><strong className="text-white">Location:</strong> 6 October City, Giza, Egypt</span>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="mb-6">
            <div className="flex bg-black/30 rounded-xl p-1 border border-white/10">
              <button
                onClick={() => setActiveTab('contact')}
                className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all duration-300 ${
                  activeTab === 'contact'
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                    : 'text-secondary hover:text-white hover:bg-white/5'
                }`}
              >
                <div className="flex items-center justify-center gap-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                  </svg>
                  Contact
                </div>
              </button>
              <button
                onClick={() => setActiveTab('appointment')}
                className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all duration-300 ${
                  activeTab === 'appointment'
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                    : 'text-secondary hover:text-white hover:bg-white/5'
                }`}
              >
                <div className="flex items-center justify-center gap-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"/>
                  </svg>
                  Schedule Meeting
                </div>
              </button>
            </div>
          </div>

          {/* Contact Form */}
          {activeTab === 'contact' && (
            <motion.form
            ref={formRef}
              onSubmit={handleContactSubmit}
            className="space-y-5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
          >
            {/* Name */}
              <label htmlFor="contact-name" className="block">
              <span className="text-white font-medium mb-2 block flex items-center gap-2 text-sm">
                <span className="w-1 h-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"></span>
                Your Name*
              </span>
              <input
                type="text"
                name="name"
                  id="contact-name"
                  value={contactForm.name}
                  onChange={handleContactChange}
                placeholder="Ahmed Mohamed"
                title="What's your name?"
                disabled={loading}
                aria-disabled={loading}
                className="w-full bg-black/30 border border-white/10 py-3 px-4 placeholder:text-secondary text-white rounded-lg outline-none font-medium disabled:bg-black/20 disabled:text-white/60 transition-all duration-300 focus:border-purple-500/50 focus:bg-black/40 focus:ring-2 focus:ring-purple-500/20 text-sm"
              />
                <span className="text-red-400 mt-1 hidden text-xs" id="contact-name-error">
                Invalid Name!
              </span>
            </label>

            {/* Email */}
              <label htmlFor="contact-email" className="block">
              <span className="text-white font-medium mb-2 block flex items-center gap-2 text-sm">
                <span className="w-1 h-1 bg-gradient-to-r from-green-500 to-teal-500 rounded-full"></span>
                Your Email*
              </span>
              <input
                type="email"
                name="email"
                  id="contact-email"
                  value={contactForm.email}
                  onChange={handleContactChange}
                  placeholder="ahmed@email.com"
                title="What's your email?"
                disabled={loading}
                aria-disabled={loading}
                className="w-full bg-black/30 border border-white/10 py-3 px-4 placeholder:text-secondary text-white rounded-lg outline-none font-medium disabled:bg-black/20 disabled:text-white/60 transition-all duration-300 focus:border-green-500/50 focus:bg-black/40 focus:ring-2 focus:ring-green-500/20 text-sm"
              />
                <span className="text-red-400 mt-1 hidden text-xs" id="contact-email-error">
                Invalid E-mail!
              </span>
            </label>

            {/* Message */}
              <label htmlFor="contact-message" className="block">
              <span className="text-white font-medium mb-2 block flex items-center gap-2 text-sm">
                <span className="w-1 h-1 bg-gradient-to-r from-orange-500 to-red-500 rounded-full"></span>
                Your Message*
              </span>
              <textarea
                rows={5}
                name="message"
                  id="contact-message"
                  value={contactForm.message}
                  onChange={handleContactChange}
                placeholder="Hello there! I'd like to discuss..."
                title="What do you want to say?"
                disabled={loading}
                aria-disabled={loading}
                className="w-full bg-black/30 border border-white/10 py-3 px-4 placeholder:text-secondary text-white rounded-lg outline-none font-medium disabled:bg-black/20 disabled:text-white/60 transition-all duration-300 focus:border-orange-500/50 focus:bg-black/40 focus:ring-2 focus:ring-orange-500/20 resize-none text-sm"
              />
                <span className="text-red-400 mt-1 hidden text-xs" id="contact-message-error">
                Invalid Message!
              </span>
            </label>

            {/* Submit Button */}
            <motion.button
              type="submit"
              title={loading ? "Sending..." : "Send Message"}
              disabled={loading}
              aria-disabled={loading}
              className="relative inline-flex h-10 w-full overflow-hidden rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 p-[1px] focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
              <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-lg bg-slate-950 px-6 text-xs font-semibold text-white backdrop-blur-3xl transition-all duration-300 group-hover:bg-slate-900">
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Sending...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"/>
                    </svg>
                    Send Message
                  </div>
                )}
              </span>
            </motion.button>
            </motion.form>
          )}

          {/* Appointment Form */}
          {activeTab === 'appointment' && (
            <motion.form
              onSubmit={handleAppointmentSubmit}
              className="space-y-5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Appointment Type */}
              <div className="space-y-3">
                <span className="text-white font-medium block flex items-center gap-2 text-sm">
                  <span className="w-1 h-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"></span>
                  Meeting Type*
                </span>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { value: 'phone', label: 'Phone Call', icon: '📞' },
                    { value: 'zoom', label: 'Zoom Meeting', icon: '🎥' },
                    { value: 'whatsapp', label: 'WhatsApp Call', icon: '💬' },
                    { value: 'in-person', label: 'In-Person', icon: '🤝' }
                  ].map((type) => (
                    <label
                      key={type.value}
                      className={`relative cursor-pointer rounded-lg border-2 p-3 transition-all duration-300 ${
                        appointmentForm.appointmentType === type.value
                          ? 'border-purple-500 bg-purple-500/10'
                          : 'border-white/10 bg-black/30 hover:border-white/20 hover:bg-black/40'
                      }`}
                    >
                      <input
                        type="radio"
                        name="appointmentType"
                        value={type.value}
                        checked={appointmentForm.appointmentType === type.value}
                        onChange={handleAppointmentChange}
                        className="sr-only"
                      />
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{type.icon}</span>
                        <span className="text-white text-xs font-medium">{type.label}</span>
                      </div>
                      {appointmentForm.appointmentType === type.value && (
                        <div className="absolute top-1 right-1 w-2 h-2 bg-purple-500 rounded-full"></div>
                      )}
                    </label>
                  ))}
                </div>
              </div>

              {/* Name */}
              <label htmlFor="appointment-name" className="block">
                <span className="text-white font-medium mb-2 block flex items-center gap-2 text-sm">
                  <span className="w-1 h-1 bg-gradient-to-r from-green-500 to-teal-500 rounded-full"></span>
                  Your Name*
                </span>
                <input
                  type="text"
                  name="name"
                  id="appointment-name"
                  value={appointmentForm.name}
                  onChange={handleAppointmentChange}
                  placeholder="Ahmed Mohamed"
                  disabled={loading}
                  className="w-full bg-black/30 border border-white/10 py-3 px-4 placeholder:text-secondary text-white rounded-lg outline-none font-medium disabled:bg-black/20 disabled:text-white/60 transition-all duration-300 focus:border-green-500/50 focus:bg-black/40 focus:ring-2 focus:ring-green-500/20 text-sm"
                />
                <span className="text-red-400 mt-1 hidden text-xs" id="appointment-name-error">
                  Invalid Name!
                </span>
              </label>

              {/* Email */}
              <label htmlFor="appointment-email" className="block">
                <span className="text-white font-medium mb-2 block flex items-center gap-2 text-sm">
                  <span className="w-1 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"></span>
                  Your Email*
                </span>
                <input
                  type="email"
                  name="email"
                  id="appointment-email"
                  value={appointmentForm.email}
                  onChange={handleAppointmentChange}
                  placeholder="ahmed@email.com"
                  disabled={loading}
                  className="w-full bg-black/30 border border-white/10 py-3 px-4 placeholder:text-secondary text-white rounded-lg outline-none font-medium disabled:bg-black/20 disabled:text-white/60 transition-all duration-300 focus:border-blue-500/50 focus:bg-black/40 focus:ring-2 focus:ring-blue-500/20 text-sm"
                />
                <span className="text-red-400 mt-1 hidden text-xs" id="appointment-email-error">
                  Invalid E-mail!
                </span>
              </label>

              {/* Phone */}
              <label htmlFor="appointment-phone" className="block">
                <span className="text-white font-medium mb-2 block flex items-center gap-2 text-sm">
                  <span className="w-1 h-1 bg-gradient-to-r from-orange-500 to-red-500 rounded-full"></span>
                  Phone Number*
                </span>
                <input
                  type="tel"
                  name="phone"
                  id="appointment-phone"
                  value={appointmentForm.phone}
                  onChange={handleAppointmentChange}
                  placeholder="+201234567890"
                  disabled={loading}
                  className="w-full bg-black/30 border border-white/10 py-3 px-4 placeholder:text-secondary text-white rounded-lg outline-none font-medium disabled:bg-black/20 disabled:text-white/60 transition-all duration-300 focus:border-orange-500/50 focus:bg-black/40 focus:ring-2 focus:ring-orange-500/20 text-sm"
                />
                <span className="text-red-400 mt-1 hidden text-xs" id="appointment-phone-error">
                  Invalid Phone Number!
                </span>
              </label>

              {/* Date and Time */}
              <div className="grid grid-cols-2 gap-4">
                <label htmlFor="appointment-date" className="block">
                  <span className="text-white font-medium mb-2 block flex items-center gap-2 text-sm">
                    <span className="w-1 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></span>
                    Date*
                  </span>
                  <input
                    type="date"
                    name="date"
                    id="appointment-date"
                    value={appointmentForm.date}
                    onChange={handleAppointmentChange}
                    min={new Date().toISOString().split('T')[0]}
                    disabled={loading}
                    className="w-full bg-black/30 border border-white/10 py-3 px-4 text-white rounded-lg outline-none font-medium disabled:bg-black/20 disabled:text-white/60 transition-all duration-300 focus:border-purple-500/50 focus:bg-black/40 focus:ring-2 focus:ring-purple-500/20 text-sm"
                  />
                  <span className="text-red-400 mt-1 hidden text-xs" id="appointment-date-error">
                    Please select a date!
                  </span>
                </label>

                <label htmlFor="appointment-time" className="block">
                  <span className="text-white font-medium mb-2 block flex items-center gap-2 text-sm">
                    <span className="w-1 h-1 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full"></span>
                    Time*
                  </span>
                  <select
                    name="time"
                    id="appointment-time"
                    value={appointmentForm.time}
                    onChange={handleAppointmentChange}
                    disabled={loading}
                    className="w-full bg-black/30 border border-white/10 py-3 px-4 text-white rounded-lg outline-none font-medium disabled:bg-black/20 disabled:text-white/60 transition-all duration-300 focus:border-yellow-500/50 focus:bg-black/40 focus:ring-2 focus:ring-yellow-500/20 text-sm"
                  >
                    <option value="">Select Time</option>
                    {timeSlots.map((time) => (
                      <option key={time} value={time} className="bg-black text-white">
                        {time}
                      </option>
                    ))}
                  </select>
                  <span className="text-red-400 mt-1 hidden text-xs" id="appointment-time-error">
                    Please select a time!
                  </span>
                </label>
              </div>

              {/* Notes */}
              <label htmlFor="appointment-notes" className="block">
                <span className="text-white font-medium mb-2 block flex items-center gap-2 text-sm">
                  <span className="w-1 h-1 bg-gradient-to-r from-teal-500 to-green-500 rounded-full"></span>
                  Additional Notes
                </span>
                <textarea
                  rows={3}
                  name="notes"
                  id="appointment-notes"
                  value={appointmentForm.notes}
                  onChange={handleAppointmentChange}
                  placeholder="Any specific topics you'd like to discuss..."
                  disabled={loading}
                  className="w-full bg-black/30 border border-white/10 py-3 px-4 placeholder:text-secondary text-white rounded-lg outline-none font-medium disabled:bg-black/20 disabled:text-white/60 transition-all duration-300 focus:border-teal-500/50 focus:bg-black/40 focus:ring-2 focus:ring-teal-500/20 resize-none text-sm"
                />
              </label>

              {/* Submit Button */}
              <motion.button
                type="submit"
                title={loading ? "Scheduling..." : "Schedule Meeting"}
                disabled={loading}
                aria-disabled={loading}
                className="relative inline-flex h-10 w-full overflow-hidden rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 p-[1px] focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-lg bg-slate-950 px-6 text-xs font-semibold text-white backdrop-blur-3xl transition-all duration-300 group-hover:bg-slate-900">
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Scheduling...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"/>
                      </svg>
                      Schedule Meeting
                    </div>
                  )}
                </span>
              </motion.button>
            </motion.form>
          )}
        </motion.div>

        {/* Earth Model */}
        <motion.div
          variants={slideIn("right", "tween", 0.2, 1)}
          className="xl:flex-1 xl:h-auto md:h-[550px] h-[350px] relative"
        >
          <ErrorBoundary>
            <div className="w-full h-full min-h-[350px]">
              <EarthCanvas />
            </div>
          </ErrorBoundary>
        </motion.div>
      </div>
    </SectionWrapper>
  );
};
