# Harpreet Jakhar Portfolio

Modern, responsive personal portfolio website built with React + Vite, Tailwind CSS v4, Framer Motion, GSAP, Three.js, and EmailJS.

## Tech Stack

- React.js with Vite
- Tailwind CSS v4
- Framer Motion
- GSAP + ScrollTrigger
- Three.js via @react-three/fiber + @react-three/drei
- Lenis smooth scrolling
- EmailJS contact form integration

## Features

- Full-screen animated hero section with typing effect
- Interactive 3D background
- About, Skills, Projects, Experience, Education, Certifications sections
- Neon glassmorphism dark UI with light-mode toggle
- Card hover, tilt, glow, and scroll-triggered animations
- Custom cursor glow and loading animation
- SEO-ready metadata
- Responsive mobile-first layout

## Project Structure

src/
- components/
  - common/
  - effects/
  - layout/
- data/
- hooks/
- sections/
- App.jsx
- index.css
- main.jsx

## Installation

1. Clone the repository.
2. Install dependencies:

```bash
npm install
```

3. Copy environment template:

```bash
cp .env.example .env
```

On Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

4. Add your EmailJS values in .env:

- VITE_EMAILJS_SERVICE_ID
- VITE_EMAILJS_TEMPLATE_ID
- VITE_EMAILJS_PUBLIC_KEY

5. Start development server:

```bash
npm run dev
```

## Resume File

The hero section points to /resume.pdf.
Add your resume file at public/resume.pdf.

## Build

```bash
npm run build
```

## Deployment

### Vercel

1. Push project to GitHub.
2. Import repository in Vercel.
3. Framework preset: Vite.
4. Build command: npm run build
5. Output directory: dist
6. Add environment variables from .env.
7. Deploy.

### Netlify

1. Push project to GitHub.
2. New site from Git in Netlify.
3. Build command: npm run build
4. Publish directory: dist
5. Add environment variables from .env.
6. Deploy.

## Notes

- Replace placeholder project links and social links in src/data/portfolioData.js.
- Update timeline, certifications, and content as needed.
- For best performance, optimize project images or host them via CDN.
