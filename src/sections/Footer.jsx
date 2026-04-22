const Footer = () => {
  const year = new Date().getFullYear()

  return (
    <footer className="px-6 pb-10 pt-6 text-center sm:px-10">
      <div className="mx-auto max-w-6xl rounded-2xl border border-white/10 bg-white/5 px-6 py-5 text-sm text-white/70 backdrop-blur">
        <p className="text-white/85">Harpreet Jakhar Portfolio</p>
        <p className="mt-1 text-white/60">Copyright {year} Harpreet Jakhar. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer
