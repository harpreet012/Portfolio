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
        message: `Opening your email app to send this message to ${RECIPIENT_EMAIL}.`,
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
      setStatus({ type: 'error', message: 'Unable to send message right now. Please try again later.' })
    } finally {
      setSending(false)
    }
  }

  return (
    <section id="contact" className="px-6 py-20 sm:px-10">
      <div className="mx-auto max-w-6xl">
        <SectionHeading title="Contact" subtitle="Let us Build Something" />

        <div className="grid gap-8 lg:grid-cols-2">
          <motion.div
            data-reveal="card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            className="modern-card rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur"
          >
            <h3 className="text-2xl font-semibold text-white">Get in Touch</h3>
            <p className="mt-3 text-white/70">
              Open to internships, collaborations, and impactful product opportunities.
            </p>

            <div className="mt-8 flex gap-3">
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
                    className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm text-white transition hover:border-cyan-300/60"
                  >
                    <Icon /> {link.label}
                  </a>
                )
              })}
            </div>
          </motion.div>

          <motion.form
            data-reveal="card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            onSubmit={sendEmail}
            className="modern-card space-y-4 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur"
          >
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="w-full rounded-xl border border-white/15 bg-slate-900/70 px-4 py-3 text-sm text-white outline-none placeholder:text-white/40 focus:border-cyan-300/60"
            />
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email"
              className="w-full rounded-xl border border-white/15 bg-slate-900/70 px-4 py-3 text-sm text-white outline-none placeholder:text-white/40 focus:border-cyan-300/60"
            />
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={5}
              placeholder="Your Message"
              className="w-full rounded-xl border border-white/15 bg-slate-900/70 px-4 py-3 text-sm text-white outline-none placeholder:text-white/40 focus:border-cyan-300/60"
            />

            {status.message ? (
              <p className={`text-sm ${status.type === 'success' ? 'text-emerald-300' : 'text-rose-300'}`}>
                {status.message}
              </p>
            ) : null}

            <button
              type="submit"
              disabled={sending}
              className="w-full rounded-xl bg-gradient-to-r from-fuchsia-500 via-blue-500 to-cyan-400 px-5 py-3 text-sm font-semibold text-white transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-70"
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
