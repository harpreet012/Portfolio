import { motion } from 'framer-motion'
import { heroRoles } from '../data/portfolioData'

const Hero = () => {

  return (
    <section
      id="hero"
      className="relative min-h-screen px-6 pt-32 pb-20 sm:px-10 flex flex-col items-center justify-center text-center overflow-hidden"
    >
      <div className="mx-auto max-w-7xl flex flex-col items-center z-10 w-full relative">
        
        {/* Large Overlapping Text */}
        <div className="relative w-full flex flex-col items-center justify-center mb-16">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-7xl sm:text-8xl md:text-[150px] font-black leading-none tracking-tight text-white z-20 relative mix-blend-difference"
              style={{ letterSpacing: '-0.04em' }}
            >
              HARPREET
            </motion.h1>
            
            <motion.h1
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="text-7xl sm:text-8xl md:text-[180px] font-black leading-none tracking-tight text-outline absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[20%] w-full whitespace-nowrap z-10"
              style={{ letterSpacing: '0.02em' }}
            >
              JAKHAR
            </motion.h1>
        </div>

        {/* Subtitles */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 flex flex-wrap justify-center gap-4 text-xs sm:text-sm font-mono tracking-[0.3em] uppercase text-gray-400"
        >
          <span>Computer Science Engineer</span>
          <span className="hidden sm:inline">/</span>
          <span>Web Developer</span>
          <span className="hidden sm:inline">/</span>
          <span>Machine Learning</span>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-12 flex flex-wrap justify-center gap-6"
        >
          <a
            href="#projects"
            className="px-8 py-3 border border-white/20 rounded-full text-xs font-mono uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300"
          >
            Explore Projects
          </a>
        </motion.div>

        {/* Tech Symbols */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-16 flex justify-center gap-8 flex-wrap max-w-2xl"
        >
        {/* Bottom Left Status */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="absolute bottom-10 left-0 flex flex-col items-start gap-2"
        >
           <div className="flex items-center gap-3 text-xs font-mono tracking-widest font-bold">
               <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.8)]"></span>
               AVAILABLE FOR WORK
           </div>
           <span className="text-[10px] text-gray-500 font-mono tracking-widest ml-5">ROHTAK, INDIA</span>
        </motion.div>
        
        {/* Bottom Right Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="absolute bottom-10 right-0 hidden sm:flex items-center gap-4 text-[10px] font-mono tracking-[0.25em] text-gray-500"
        >
           SCROLL TO EXPLORE
           <div className="w-12 h-[1px] bg-white/20"></div>
        </motion.div>

      </div>
    </section>
  )
}

export default Hero
