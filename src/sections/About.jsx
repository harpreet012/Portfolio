import { motion } from 'framer-motion'
import { FaDownload } from 'react-icons/fa'
import SectionHeading from '../components/common/SectionHeading'
import profileImage from '../assets/WhatsApp Image 2026-04-24 at 9.59.40 PM.jpeg'

const aboutStats = ['1+ Years Experience', '10+ Projects Built', '5+ Technologies']

const About = () => {
  return (
    <section id="about" className="relative px-6 py-24 sm:px-10 overflow-hidden">
      {/* Giant Background Number */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[40vw] font-black text-outline opacity-[0.03] pointer-events-none select-none z-0 leading-none">
        01
      </div>

      <div className="mx-auto max-w-6xl relative z-10">
        <SectionHeading
          title="About Me"
          subtitle="Who I Am"
          titleClassName="about-premium-heading"
        />

        <div className="grid gap-12 lg:grid-cols-2 items-center">
          {/* Left Area */}
          <motion.div
            initial={{ opacity: 0, y: 50, rotateX: -15, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, type: 'spring', bounce: 0.4 }}
            className="about-copy order-2 lg:order-1"
          >
            <p className="text-lg text-gray-400">
              What started as curiosity for web development evolved into a passion for building scalable and impactful digital experiences.
            </p>
            <p className="text-lg text-gray-400">
              I’m currently pursuing a B.Tech in Computer Science with a strong focus on{' '}
              <span className="about-highlight font-medium">Full Stack Development</span>,{' '}
              <span className="about-highlight font-medium">Data Analytics</span>, and{' '}
              <span className="about-highlight font-medium">Machine Learning</span>. I enjoy developing modern web applications, designing intuitive user interfaces, and transforming complex data into meaningful insights through interactive dashboards.
            </p>
            <p className="text-lg text-gray-400">
              My experience includes building end-to-end applications, working with data-driven solutions, and creating products that combine performance, creativity, and seamless user experiences.
            </p>
            <p className="text-lg text-gray-300">
              I’m passionate about continuously learning new technologies and building innovative solutions that create real-world impact.
            </p>

            <div className="mb-7 flex flex-wrap gap-3">
              {aboutStats.map((item) => (
                <span key={item} className="about-stat-badge">
                  {item}
                </span>
              ))}
            </div>

            <div className="pt-2">
              <a
                href="/resume.html"
                download="Harpreet_Jakhar_Resume.html"
                className="minimal-btn inline-flex gap-2 border-amber-400/60 text-amber-300 hover:text-amber-200"
              >
                <FaDownload className="text-sm" />
                Download Resume
              </a>
            </div>
          </motion.div>

          {/* Right Area - Profile Image */}
          <motion.div
            initial={{ opacity: 0, x: 40, scale: 0.96 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="order-1 lg:order-2 flex justify-center lg:justify-end"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 6, ease: 'easeInOut', repeat: Infinity }}
              whileHover={{ scale: 1.03 }}
              className="relative w-full max-w-[340px] sm:max-w-[380px]"
            >
              <div className="absolute -inset-8 rounded-full bg-[radial-gradient(circle,rgba(250,204,21,0.28),rgba(250,204,21,0.08)_45%,transparent_75%)] blur-2xl" />
              <div className="about-image-card modern-card relative border border-amber-300/35 bg-white/[0.04] p-3 transition-all duration-500 hover:border-amber-300/60 hover:shadow-[0_20px_50px_rgba(0,0,0,0.55),0_0_38px_rgba(250,204,21,0.38)]">
                <div className="overflow-hidden rounded-[1.6rem] border border-white/10">
                  <img
                    src={profileImage}
                    alt="Harpreet Jakhar profile"
                    className="h-[360px] w-full object-cover transition-transform duration-500 hover:scale-[1.04] sm:h-[420px]"
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Core Expertise below About section */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12 modern-card p-8 lg:p-10"
        >
          <h3 className="mb-8 text-2xl font-bold text-gray-100">Core Expertise</h3>
          <div className="space-y-6">
            {[
              { name: 'Frontend Engineering', level: 90 },
              { name: 'Backend Development', level: 84 },
              { name: 'Machine Learning', level: 82 },
              { name: 'Problem Solving', level: 93 },
            ].map((skillItem, i) => (
              <div key={skillItem.name} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-mono text-gray-300">{skillItem.name}</span>
                  <span className="text-amber-400 font-mono">{skillItem.level}%</span>
                </div>
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skillItem.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: i * 0.15 + 0.2, ease: 'easeOut' }}
                    className="h-full bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.6)]"
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}


export default About
