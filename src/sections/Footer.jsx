const Footer = () => {
  return (
    <footer className="w-full border-t border-white/5 py-8 mt-12 bg-transparent backdrop-blur-sm">
      <div className="mx-auto max-w-6xl px-6 text-center text-xs font-mono text-gray-500">
        <p>
          &copy; {new Date().getFullYear()}{' '}
          <span className="text-amber-400">Harpreet Jakhar</span>. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer
