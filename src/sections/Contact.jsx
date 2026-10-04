import { useState } from "react";
import emailjs from "@emailjs/browser";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaEnvelope,
  FaGithub,
  FaLinkedin,
  FaCheckCircle,
} from "react-icons/fa";
import SectionHeading from "../components/common/SectionHeading";
import { socialLinks } from "../data/portfolioData";

const initialForm = { name: "", email: "", message: "" };
const RECIPIENT_EMAIL = "jakharharpreet93@gmail.com";

/* ── Floating-label input ── */
const FloatingInput = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  multiline = false,
}) => {
  const [focused, setFocused] = useState(false);
  const filled = value.length > 0;
  const active = focused || filled;

  const sharedClass = `
    w-full bg-transparent pt-6 pb-2 px-4 text-sm text-gray-100 outline-none
    rounded-xl border transition-all duration-300 resize-none font-sans
    peer
    ${
      focused
        ? "border-amber-400/60 shadow-[0_0_0_1px_rgba(212,169,55,0.25),0_0_16px_rgba(212,169,55,0.12)]"
        : "border-white/8 hover:border-white/14"
    }
  `;

  return (
    <div className="relative">
      {multiline ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          rows={5}
          className={sharedClass}
          style={{ background: "rgba(255,255,255,0.02)" }}
        />
      ) : (
        <input
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={sharedClass}
          style={{ background: "rgba(255,255,255,0.02)" }}
        />
      )}

      {/* Floating label */}
      <label
        className="absolute left-4 pointer-events-none font-mono text-xs transition-all duration-200"
        style={{
          top: active ? "8px" : "50%",
          transform: multiline
            ? active
              ? "none"
              : "translateY(calc(1.5rem))"
            : active
              ? "none"
              : "translateY(-50%)",
          fontSize: active ? "10px" : "12px",
          letterSpacing: active ? "0.12em" : "0.06em",
          textTransform: "uppercase",
          color: focused ? "rgba(212,169,55,0.8)" : "rgba(156,163,175,0.6)",
        }}
      >
        {label}
      </label>
    </div>
  );
};

const Contact = () => {
  const [formData, setFormData] = useState(initialForm);
  const [status, setStatus] = useState({ type: "", message: "" });
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);

  const formGroup = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.08,
      },
    },
  };

  const formItem = {
    hidden: { opacity: 0, y: 18 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    if (!formData.name.trim()) return "Name is required.";
    if (!formData.email.includes("@")) return "Please enter a valid email.";
    if (formData.message.trim().length < 10)
      return "Message should be at least 10 characters.";
    return "";
  };

  const sendEmail = async (event) => {
    event.preventDefault();
    setStatus({ type: "", message: "" });

    const validationMessage = validate();
    if (validationMessage) {
      setStatus({ type: "error", message: validationMessage });
      return;
    }

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      const subject = encodeURIComponent(
        `Portfolio Contact from ${formData.name}`,
      );
      const body = encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`,
      );
      window.location.href = `mailto:${RECIPIENT_EMAIL}?subject=${subject}&body=${body}`;
      setSuccess(true);
      setFormData(initialForm);
      setTimeout(() => setSuccess(false), 4000);
      return;
    }

    try {
      setSending(true);
      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: formData.name,
          from_email: formData.email,
          to_email: RECIPIENT_EMAIL,
          message: formData.message,
        },
        publicKey,
      );
      setFormData(initialForm);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 4000);
    } catch {
      setStatus({
        type: "error",
        message: "Unable to send message right now.",
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative px-6 py-32 sm:px-10 overflow-hidden"
    >
      {/* Giant Background Text */}
      <div
        aria-hidden="true"
        className="absolute top-[20%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15vw] font-black text-white pointer-events-none select-none z-10 leading-none tracking-tighter whitespace-nowrap mix-blend-difference"
      >
        LET'S
      </div>
      <div
        aria-hidden="true"
        className="absolute top-[20%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15vw] font-black text-outline opacity-20 pointer-events-none select-none z-0 leading-none tracking-widest whitespace-nowrap ml-[30vw]"
      >
        TALK
      </div>

      <div className="mx-auto max-w-5xl relative z-10 mt-[10vw]">
        <div className="grid gap-12 lg:grid-cols-5">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-2 space-y-6"
          >
            <motion.h2
              variants={formItem}
              className="text-3xl font-semibold text-gray-100"
            >
              Let's connect
            </motion.h2>
            <motion.p
              variants={formItem}
              className="text-gray-400 text-sm leading-relaxed"
            >
              Whether you have a question, a project opportunity, or just want
              to say hi, I'll try my best to get back to you!
            </motion.p>

            <motion.div
              variants={formItem}
              className="pt-6 flex flex-col gap-4"
            >
              {socialLinks.map((link) => {
                const iconMap = {
                  LinkedIn: FaLinkedin,
                  GitHub: FaGithub,
                  Email: FaEnvelope,
                };
                const Icon = iconMap[link.label] || FaGithub;
                const isExternal = link.label !== "Email";
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target={isExternal ? "_blank" : "_self"}
                    rel={isExternal ? "noopener noreferrer" : undefined}
                    aria-label={isExternal ? `${link.label} profile (opens in a new tab)` : `Send email to Harpreet`}
                    className="flex items-center gap-3 text-sm font-mono text-gray-300 hover:text-amber-400 transition-colors duration-200"
                  >
                    <Icon size={18} className="text-amber-400" /> {link.label}
                  </a>
                );
              })}
            </motion.div>
          </motion.div>

          <motion.form
            variants={formGroup}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            onSubmit={sendEmail}
            className="lg:col-span-3 modern-card p-6 md:p-8 space-y-5"
          >
            <motion.div variants={formItem}>
              <FloatingInput
                label="Your Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </motion.div>
            <motion.div variants={formItem}>
              <FloatingInput
                label="Your Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
              />
            </motion.div>
            <motion.div variants={formItem}>
              <FloatingInput
                label="Your Message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                multiline
              />
            </motion.div>

            {/* Error message */}
            <AnimatePresence>
              {status.message && status.type === "error" && (
                <motion.p
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-sm text-red-400"
                >
                  {status.message}
                </motion.p>
              )}
            </AnimatePresence>

            {/* Send button with shimmer */}
            <motion.div variants={formItem}>
              <AnimatePresence mode="wait">
                {success ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ type: "spring", bounce: 0.4, duration: 0.5 }}
                    className="w-full flex items-center justify-center gap-3 py-3 rounded-xl border border-green-500/40 bg-green-500/10 text-green-400 text-sm font-mono"
                  >
                    <FaCheckCircle size={16} />
                    Message sent successfully!
                  </motion.div>
                ) : (
                  <motion.button
                    key="send"
                    type="submit"
                    disabled={sending}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className="relative w-full overflow-hidden py-3 rounded-xl border border-amber-400/50 bg-amber-400/10 text-amber-400 hover:text-white text-sm font-mono tracking-wider disabled:opacity-50 transition-colors duration-300 group"
                  >
                    {/* Shimmer sweep on hover */}
                    <span
                      className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"
                      style={{
                        background:
                          "linear-gradient(90deg, transparent 0%, rgba(212,169,55,0.18) 50%, transparent 100%)",
                      }}
                    />
                    <span className="relative z-10">
                      {sending ? "Sending..." : "Send Message"}
                    </span>
                  </motion.button>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
