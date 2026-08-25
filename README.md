# Harpreet Jakhar | Software / Full-Stack Engineer Portfolio

> Production-ready personal developer portfolio built with React 19, Vite, Tailwind CSS v4, Three.js, and Framer Motion. Engineered for recruiter clarity, technical credibility, and verifiable project evidence.

---

## 📌 Executive Summary

- **Candidate**: Harpreet Jakhar
- **Target Roles**: Software Development Engineer (SDE) / Full-Stack Developer
- **Education**: B.Tech in Computer Science & Engineering (Final Year, K.R. Mangalam University)
- **Core Specialization**: Full-Stack Web Development (MERN / Spring Boot / Java / JavaScript), RESTful APIs, Relational & NoSQL Databases, System Design Basics, Machine Learning Pipelines.

---

## 🚀 Key Highlights & Architectural Decisions

1. **Recruiter-Ready Technical Evidence**:
   - Project cards structured with clear **Problem Statements**, **Architecture & Implementation**, and **Key Engineering Highlights**.
   - Flagship **AI-Powered Predictive Maintenance System** highlighted with verifiable MERN architecture, dynamic Z-score statistical engine, and simulated IoT sensor streams.
2. **Zero Arbitrary Metrics**:
   - Replaced arbitrary proficiency percentages (e.g. `React 90%`) with verified technology categories (Languages, Frontend, Backend, Databases, Core CS, Tools, Concepts) and technical descriptions.
3. **Structured Credential Hierarchy**:
   - Clear separation between **Academic Background (B.Tech CSE)**, **Professional Certifications** (HackerRank, Coursera, IBM, AWS), and **Technical Workshops** (AI & Big Data).
4. **Performance & Visual Engineering**:
   - Multi-layered 3D background with deterministic particle generation via `@react-three/fiber` & `@react-three/drei`.
   - Physics-based interactive HUD skill orb arena with bound collisions, rotation, and soft breathing glows.
   - Dynamic radial cursor illumination and smooth section scrolling with zero layout thrashing.
5. **Robust Error Handling & Fallbacks**:
   - Conditional rendering for repository and demo links — gracefully hides missing external URLs without `#` dead links.
   - Fully typed/checked ESLint configuration with zero errors or warnings.

---

## 🛠 Tech Stack & Tooling

| Layer | Technologies |
| :--- | :--- |
| **Frontend Core** | React 19, JavaScript (ES6+), Vite |
| **Styling & Design** | Tailwind CSS v4, Modern Glassmorphism, CSS Custom Properties |
| **3D & Animation** | Three.js, `@react-three/fiber`, `@react-three/drei`, Framer Motion, GSAP, Lucide/React Icons |
| **Smooth Scrolling** | Lenis Scroll |
| **Communication** | EmailJS API with asynchronous error handling |
| **Quality & Tooling** | ESLint 9, Git, npm |

---

## 📂 Project Structure

```text
Portfolio/
├── public/
│   ├── resume.html         # Interactive clean HTML resume
│   └── vite.svg
├── src/
│   ├── assets/             # Profile images and visual assets
│   ├── components/
│   │   ├── common/         # SectionHeading, GlassCard, shared UI primitives
│   │   ├── effects/        # BackgroundGalaxy (3D Canvas), CustomCursor
│   │   └── layout/         # Navbar, Footer
│   ├── data/
│   │   └── portfolioData.js # Single source of truth for projects, skills, education, experience
│   ├── sections/
│   │   ├── Hero.jsx        # Headline, target role badge, quick CTAs
│   │   ├── About.jsx       # Narrative, engineering philosophy, profile cards
│   │   ├── Skills.jsx      # Interactive HUD orb simulation
│   │   ├── Projects.jsx    # Flagship & verified project cards with tech specs
│   │   ├── Experience.jsx  # Career timeline with quantifiable bullet points
│   │   ├── Certifications.jsx # Education, Certifications & Workshop credentials
│   │   └── Contact.jsx     # EmailJS interactive contact form + social links
│   ├── App.jsx             # Main application layout & scroll coordinator
│   ├── index.css           # Global design tokens, scrollbar, neon utilities
│   └── main.jsx            # Application entry point
├── eslint.config.js        # Strict ESLint 9 flat configuration
├── vite.config.js          # Vite build and development configuration
└── package.json
```

---

## ⚡ Getting Started

### Prerequisites
- Node.js (v18.0.0 or higher recommended)
- npm (v9.0.0 or higher)

### 1. Clone & Install
```bash
git clone https://github.com/harpreet012/Portfolio.git
cd Portfolio
npm install
```

### 2. Configure Environment Variables
Create a `.env` file in the root directory:
```bash
cp .env.example .env
```

*(On Windows PowerShell: `Copy-Item .env.example .env`)*

Configure your EmailJS credentials for contact form submissions:
```env
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

### 3. Start Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🧪 Quality & Verification

Run strict linting checks:
```bash
npm run lint
```

Build production distribution:
```bash
npm run build
```

Preview production build locally:
```bash
npm run preview
```

---

## 📄 License & Attribution

Designed and developed by **Harpreet Jakhar**. Released under the [MIT License](LICENSE).
