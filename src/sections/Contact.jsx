import { useState } from 'react'
import emailjs from '@emailjs/browser'
import { motion } from 'framer-motion'
import { FaEnvelope, FaGithub, FaLinkedin } from 'react-icons/fa'
import SectionHeading from '../components/common/SectionHeading'
import { socialLinks } from '../data/portfolioData'

const initialForm = { name: '', email: '', message: '' }
const RECIPIENT_EMAIL = 'jakharharpreet93@gmail.com'

const Contact = () => {
  const [formData, setFormData] = useState(initialForm)
  const [status, setStatus] = useState({ type: '', message: '' })
  const [sending, setSending] = useState(false)

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const validate = () => {
    if (!formData.name.trim()) return 'Name is required.'
    if (!formData.email.includes('@')) return 'Please enter a valid email.'
    if (formData.message.trim().length < 10) return 'Message should be at least 10 characters.'
    return ''
  }

  const sendEmail = async (event) => {
    event.preventDefault()
    setStatus({ type: '', message: '' })

    const validationMessage = validate()
    if (validationMessage) {
      setStatus({ type: 'error', message: validationMessage })
      return
    }

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

    if (!serviceId || !templateId || !publicKey) {
      const subject = encodeURIComponent(`Portfolio Contact from ${formData.name}`)
      const body = encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`,
      )

      window.location.href = `mailto:${RECIPIENT_EMAIL}?subject=${subject}&body=${body}`
      setStatus({
        type: 'success',
        message: `Opening your email app to send this message.`,
      })
      return
    }

    try {
      setSending(true)
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
      )
      setFormData(initialForm)
      setStatus({ type: 'success', message: 'Message sent successfully. Thank you!' })
    } catch {
      setStatus({ type: 'error', message: 'Unable to send message right now.' })
    } finally {
      setSending(false)
    }
  }

  return (
    <section id="contact" className="relative px-6 py-32 sm:px-10 overflow-hidden">
      {/* Giant Background Text */}
      <div className="absolute top-[20%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15vw] font-black text-white pointer-events-none select-none z-10 leading-none tracking-tighter whitespace-nowrap mix-blend-difference">
        LET'S
      </div>
      <div className="absolute top-[20%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15vw] font-black text-outline opacity-20 pointer-events-none select-none z-0 leading-none tracking-widest whitespace-nowrap ml-[30vw]">
        TALK
      </div>

      <div className="mx-auto max-w-5xl relative z-10 mt-[10vw]">

        <div className="grid gap-12 lg:grid-cols-5">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            className="lg:col-span-2 space-y-6"
          >
            <h3 className="text-3xl font-semibold text-gray-100">Let's connect</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Whether you have a question, a project opportunity, or just want to say hi, I'll try my best to get back to you!
            </p>

            <div className="pt-6 flex flex-col gap-4">
              {socialLinks.map((link) => {
                const iconMap = {
                  LinkedIn: FaLinkedin,
                  GitHub: FaGithub,
                  Email: FaEnvelope,
                }
                const Icon = iconMap[link.label] || FaGithub
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target={link.label === 'Email' ? '_self' : '_blank'}
                    rel="noreferrer"
                    className="flex items-center gap-3 text-sm font-mono text-gray-300 hover:text-amber-400 transition"
                  >
                    <Icon size={18} className="text-amber-400"/> {link.label}
                  </a>
                )
              })}
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            onSubmit={sendEmail}
            className="lg:col-span-3 modern-card p-6 md:p-8 space-y-5"
          >
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="modern-input w-full px-5 py-4 text-sm"
            />
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email"
              className="modern-input w-full px-5 py-4 text-sm"
            />
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={5}
              placeholder="Your Message"
              className="modern-input w-full px-5 py-4 text-sm resize-none"
            />

            {status.message && (
              <p className={`text-sm ${status.type === 'success' ? 'text-amber-400' : 'text-red-400'}`}>
                {status.message}
              </p>
            )}

            <button
              type="submit"
              disabled={sending}
              className="minimal-btn w-full bg-amber-400/10 hover:bg-amber-400/20 text-amber-400 border-amber-400/50 py-3 disabled:opacity-50"
            >
              {sending ? 'Sending...' : 'Send Message'}
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  )
}

export default Contact
