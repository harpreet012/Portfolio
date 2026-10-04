import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaCode,
  FaTools,
  FaReact,
  FaJs,
  FaHtml5,
  FaCss3Alt,
  FaPython,
  FaJava,
  FaNode,
  FaGithub,
  FaDatabase,
  FaChartPie,
  FaSitemap,
  FaBootstrap,
  FaNetworkWired,
  FaLayerGroup,
  FaTerminal,
  FaLaptop,
  FaSyncAlt,
  FaDocker,
  FaServer,
  FaBrain,
} from "react-icons/fa";
import {
  SiTailwindcss,
  SiExpress,
  SiSpring,
  SiApachekafka,
  SiMongodb,
  SiMysql,
  SiPostman,
  SiVercel,
  SiRender,
  SiJsonwebtokens,
  SiCplusplus,
} from "react-icons/si";

// ─── Skills data with official brand colors ─────────────────────────────────
const ALL_SKILLS = [
  {
    name: "Java",
    icon: FaJava,
    color: "#f89820",
    cat: "Languages",
    rel: "Spring Boot, OOP, Backend Services",
    desc: "Object-oriented software development, enterprise backend architecture, and multi-threading.",
  },
  {
    name: "JavaScript",
    icon: FaJs,
    color: "#f7df1e",
    cat: "Languages",
    rel: "ES6+, Async, DOM, React",
    desc: "Modern JavaScript, event loop handling, asynchronous promises, and client-side logic.",
  },
  {
    name: "SQL",
    icon: FaDatabase,
    color: "#00aff0",
    cat: "Databases",
    rel: "MySQL, Schema Design, Query Optimization",
    desc: "Relational queries, ACID transactions, data normalization, and schema indexing.",
  },
  {
    name: "C++",
    icon: SiCplusplus,
    color: "#00599c",
    cat: "Languages",
    rel: "DSA, Algorithms, System Concepts",
    desc: "Low-level system controls, memory management, and algorithmic problem solving.",
  },
  {
    name: "Python",
    icon: FaPython,
    color: "#3776ab",
    cat: "Languages",
    rel: "Scikit-learn, Pandas, ML Pipelines",
    desc: "Machine learning workflows, data preprocessing pipelines, and automation scripting.",
  },
  {
    name: "React.js",
    icon: FaReact,
    color: "#61dafb",
    cat: "Frontend",
    rel: "Hooks, Context, Component Design",
    desc: "Modern React architecture, custom hooks, reusable components, and virtual DOM efficiency.",
  },
  {
    name: "HTML5",
    icon: FaHtml5,
    color: "#e34c26",
    cat: "Frontend",
    rel: "Semantic DOM, Accessibility, Web Standards",
    desc: "Accessible layout structure, semantic HTML elements, and SEO-friendly document hierarchy.",
  },
  {
    name: "CSS3",
    icon: FaCss3Alt,
    color: "#1572b6",
    cat: "Frontend",
    rel: "Flexbox, CSS Grid, Responsive Design",
    desc: "Fluid responsive layouts, Flexbox/Grid systems, CSS animations, and UI transitions.",
  },
  {
    name: "Tailwind CSS",
    icon: SiTailwindcss,
    color: "#06b6d4",
    cat: "Frontend",
    rel: "Utility-First, Design Tokens, Responsive",
    desc: "Utility-first CSS styling for consistent, scalable, and responsive component design.",
  },
  {
    name: "Bootstrap",
    icon: FaBootstrap,
    color: "#7952b3",
    cat: "Frontend",
    rel: "Grid Systems, UI Components, Prototypes",
    desc: "Responsive grid layouts, pre-styled UI components, and rapid responsive prototyping.",
  },
  {
    name: "Node.js",
    icon: FaNode,
    color: "#3c9c3c",
    cat: "Backend",
    rel: "Express, REST APIs, V8 Runtime",
    desc: "Asynchronous event-driven server runtime and scalable backend script execution.",
  },
  {
    name: "Express.js",
    icon: SiExpress,
    color: "#ffffff",
    cat: "Backend",
    rel: "REST APIs, Middleware, Routing",
    desc: "RESTful API routes, request-response lifecycles, and backend service middleware.",
  },
  {
    name: "Spring Boot",
    icon: SiSpring,
    color: "#6db33f",
    cat: "Backend",
    rel: "Java MVC, Dependency Injection, APIs",
    desc: "Java enterprise MVC patterns, dependency injection, and scalable service endpoints.",
  },
  {
    name: "Kafka",
    icon: SiApachekafka,
    color: "#ffffff",
    cat: "Backend",
    rel: "Event Streaming, Message Brokers",
    desc: "Distributed event streaming, publish-subscribe queues, and pipeline communication.",
  },
  {
    name: "MongoDB",
    icon: SiMongodb,
    color: "#47a248",
    cat: "Databases",
    rel: "NoSQL, Document Model, Aggregation",
    desc: "NoSQL document storage, flexible schema design, and aggregation pipelines.",
  },
  {
    name: "MySQL",
    icon: SiMysql,
    color: "#00758f",
    cat: "Databases",
    rel: "Relational DB, Foreign Keys, Indexing",
    desc: "Relational table modeling, foreign key relations, constraints, and SQL transactions.",
  },
  {
    name: "DSA",
    icon: FaSitemap,
    color: "#facc15",
    cat: "Core CS",
    rel: "Trees, Graphs, Sorting, Complexity",
    desc: "Algorithm analysis, time/space complexity, sorting/searching, and data structures.",
  },
  {
    name: "OOP",
    icon: FaLayerGroup,
    color: "#fb923c",
    cat: "Core CS",
    rel: "Encapsulation, Polymorphism, Design",
    desc: "Encapsulation, inheritance, polymorphism, and modular software architecture.",
  },
  {
    name: "DBMS",
    icon: FaDatabase,
    color: "#a78bfa",
    cat: "Core CS",
    rel: "Normalization, ACID, Transactions",
    desc: "Relational database theory, ACID properties, normalization, and concurrency control.",
  },
  {
    name: "OS",
    icon: FaTerminal,
    color: "#34d399",
    cat: "Core CS",
    rel: "CPU Scheduling, Memory, Processes",
    desc: "Process management, CPU scheduling, thread synchronization, and virtual memory.",
  },
  {
    name: "Networks",
    icon: FaNetworkWired,
    color: "#60a5fa",
    cat: "Core CS",
    rel: "TCP/IP, HTTP/HTTPS, Sockets, DNS",
    desc: "TCP/IP layer models, HTTP contracts, DNS resolution, and client-server communication.",
  },
  {
    name: "Git",
    icon: FaTools,
    color: "#f05032",
    cat: "Tools",
    rel: "Branching, Merging, Rebase, Commits",
    desc: "Distributed version control, branching strategies, and repository synchronization.",
  },
  {
    name: "GitHub",
    icon: FaGithub,
    color: "#ffffff",
    cat: "Tools",
    rel: "Pull Requests, Code Review, CI/CD",
    desc: "Collaborative code reviews, pull requests, repository management, and automation.",
  },
  {
    name: "Docker",
    icon: FaDocker,
    color: "#2496ed",
    cat: "Tools",
    rel: "Containers, Dockerfiles, Compose",
    desc: "Application containerization, reproducible builds, and isolated local runtime environments.",
  },
  {
    name: "VS Code",
    icon: FaCode,
    color: "#007acc",
    cat: "Tools",
    rel: "Extensions, Debugging, Tooling",
    desc: "Integrated development environment, debugging workflows, and editor productivity extensions.",
  },
  {
    name: "Postman",
    icon: SiPostman,
    color: "#ff6c37",
    cat: "Tools",
    rel: "API Testing, Collections, Validation",
    desc: "REST API endpoint validation, environment variables, and automated request collections.",
  },
  {
    name: "Vercel",
    icon: SiVercel,
    color: "#ffffff",
    cat: "Tools",
    rel: "Frontend Deployment, CI/CD, CDN",
    desc: "Continuous deployment workflows, frontend hosting, and serverless infrastructure.",
  },
  {
    name: "Render",
    icon: SiRender,
    color: "#46e3b7",
    cat: "Tools",
    rel: "Web Services, Backend Hosting, DBs",
    desc: "Cloud web services, automatic Git-based deployments, and backend server hosting.",
  },
  {
    name: "Power BI",
    icon: FaChartPie,
    color: "#f2c811",
    cat: "Tools",
    rel: "DAX Measures, Data Modeling, KPIs",
    desc: "Interactive business intelligence dashboards, DAX calculations, and KPI reporting.",
  },
  {
    name: "RESTful APIs",
    icon: FaServer,
    color: "#a855f7",
    cat: "Concepts",
    rel: "HTTP Verbs, JSON Contracts, Status",
    desc: "Stateless REST architectural constraints, standard HTTP status codes, and JSON schemas.",
  },
  {
    name: "JWT Auth",
    icon: SiJsonwebtokens,
    color: "#d63aff",
    cat: "Concepts",
    rel: "Stateless Auth, Tokens, Signatures",
    desc: "Stateless user authentication, token signing, expiration, and authorization middleware.",
  },
  {
    name: "MVC",
    icon: FaSitemap,
    color: "#e879f9",
    cat: "Concepts",
    rel: "Model, View, Controller Architecture",
    desc: "Separation of concerns between business logic, data models, and presentation views.",
  },
  {
    name: "Responsive Design",
    icon: FaLaptop,
    color: "#38bdf8",
    cat: "Concepts",
    rel: "Mobile-First, Viewports, Adaptive",
    desc: "Mobile-first responsive architecture, fluid grids, and multi-device usability.",
  },
  {
    name: "Agile",
    icon: FaSyncAlt,
    color: "#4ade80",
    cat: "Concepts",
    rel: "Scrum, Sprints, Team Collaboration",
    desc: "Iterative sprint cycles, user stories, daily standups, and collaborative code delivery.",
  },
];

// ─── Visual Constants ───────────────────────────────────────────────────────
const ORB_SIZE = 68;

// ─── Tooltip Panel (floats in sync inside the translated parent wrapper) ───
const TooltipPanel = ({ skill, p, containerWidth, containerHeight }) => {
  if (!skill) return null;
  const Icon = skill.icon;
  const panelWidth = 240;
  const panelHeight = 155;

  // Base positions are already in pixels
  const baseRx = p.x;
  const baseRy = p.y;

  // Flip tooltip above the orb if too close to bottom boundary
  const flip = baseRy + 42 + panelHeight > containerHeight - 15;

  // Compute horizontal clamping offsets to keep the tooltip fully inside HUD bounds
  let shiftX = 0;
  const halfWidth = panelWidth / 2;
  const margin = 15;
  if (baseRx < halfWidth + margin) {
    shiftX = halfWidth + margin - baseRx;
  } else if (baseRx > containerWidth - (halfWidth + margin)) {
    shiftX = containerWidth - (halfWidth + margin) - baseRx;
  }

  return (
    <AnimatePresence>
      <motion.div
        key={skill.name}
        initial={{ opacity: 0, y: flip ? -8 : 8, scale: 0.94 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, scale: 0.94 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        style={{
          position: "absolute",
          left: "50%",
          top: flip ? -panelHeight - 12 : ORB_SIZE + 12,
          transform: `translateX(calc(-50% + ${shiftX}px))`,
          width: panelWidth,
          zIndex: 80,
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            background: "rgba(10, 10, 15, 0.96)",
            border: `1px solid ${skill.color}45`,
            borderRadius: 14,
            padding: "12px 14px 10px",
            boxShadow: `0 16px 40px rgba(0,0,0,0.85), 0 0 24px ${skill.color}15`,
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
          }}
        >
          {/* Header row */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 8,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <Icon
                size={18}
                style={{
                  color: skill.color,
                  filter: `drop-shadow(0 0 5px ${skill.color})`,
                }}
              />
              <span
                style={{
                  color: "#fff",
                  fontWeight: 700,
                  fontSize: 13,
                  letterSpacing: "0.02em",
                }}
              >
                {skill.name}
              </span>
            </div>
            <span
              style={{
                fontSize: 11,
                fontFamily: "monospace",
                color: skill.color,
                background: `${skill.color}12`,
                border: `1px solid ${skill.color}30`,
                borderRadius: 4,
                padding: "1.5px 6px",
                textTransform: "uppercase",
                fontWeight: 600,
              }}
            >
              {skill.cat}
            </span>
          </div>

          {/* Description */}
          <p
            style={{
              color: "rgba(255,255,255,0.75)",
              fontSize: 12,
              lineHeight: 1.55,
              margin: "0 0 10px",
            }}
          >
            {skill.desc}
          </p>

          {/* Related Tech */}
          <div
            style={{
              borderTop: "1px solid rgba(255,255,255,0.08)",
              paddingTop: 8,
              display: "flex",
              flexDirection: "column",
              gap: 3,
            }}
          >
            <span
              style={{
                fontSize: 11,
                fontFamily: "monospace",
                color: "rgba(255,255,255,0.4)",
                letterSpacing: "0.08em",
              }}
            >
              CORE FOCUS & ASSOCIATED TECH
            </span>
            <span
              style={{
                fontSize: 12,
                fontFamily: "monospace",
                color: "rgba(255,255,255,0.85)",
              }}
            >
              {skill.rel}
            </span>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

// Helper to generate particle physics configuration
const initParticles = (width, height) => {
  const ps = [];
  const minDistance = 0.125;

  for (let i = 0; i < ALL_SKILLS.length; i++) {
    let x = 0,
      y = 0,
      valid = false;
    let attempts = 0;

    while (!valid && attempts < 300) {
      x = 0.12 + Math.random() * 0.76;
      y = 0.12 + Math.random() * 0.76;
      valid = true;

      for (let j = 0; j < ps.length; j++) {
        const q = ps[j];
        const dx = x - q.x;
        const dy = y - q.y;
        if (Math.sqrt(dx * dx + dy * dy) < minDistance) {
          valid = false;
          break;
        }
      }
      attempts++;
    }

    const half = ORB_SIZE / 2;
    const speed = 12 + Math.random() * 12;
    const angle = Math.random() * Math.PI * 2;
    const vx = Math.cos(angle) * speed;
    const vy = Math.sin(angle) * speed;

    const rotSpeed = 0.003 + Math.random() * 0.004;
    const breathSpeed = 0.015 + Math.random() * 0.015;

    ps.push({
      id: i,
      x: Math.min(Math.max(x * width, half), Math.max(half, width - half)),
      y: Math.min(Math.max(y * height, half), Math.max(half, height - half)),
      vx,
      vy,
      rotAngle: Math.random() * Math.PI * 2,
      rotSpeed,
      breathAngle: Math.random() * Math.PI * 2,
      breathSpeed,
    });
  }
  return ps;
};

// ─── Main Skills component ──────────────────────────────────────────────────
const Skills = () => {
  const arenaRef = useRef(null);
  const rafRef = useRef(null);
  const lastTickRef = useRef(null);
  const iconRefs = useRef([]);
  const stageTimersRef = useRef([]);

  const [hoveredIdx, setHoveredIdx] = useState(null);
  const [arenaStage, setArenaStage] = useState("idle");
  const [dimensions, setDimensions] = useState({ width: 800, height: 545 });
  const [particles] = useState(() => initParticles(800, 545));
  const particlesRef = useRef(particles);

  // Keep ref in sync with state
  useEffect(() => {
    particlesRef.current = particles;
  }, [particles]);

  useEffect(() => {
    const timers = stageTimersRef;
    return () => {
      timers.current.forEach((timer) => clearTimeout(timer));
    };
  }, []);

  // ─── Handlers ────────────────────────────────────────────────────────────
  const handleIconEnter = useCallback((idx) => {
    setHoveredIdx(idx);
  }, []);

  const handleIconLeave = useCallback(() => setHoveredIdx(null), []);

  const w = dimensions.width;
  const h = dimensions.height;

  const tickRef = useRef();

  // ─── Animation loop updating translation, rotation and breathing ──────────
  const tick = useCallback((timestamp) => {
    const arena = arenaRef.current;
    if (!arena) return;
    const arenaW = arena.offsetWidth;
    const arenaH = arena.offsetHeight;
    const ps = particlesRef.current;
    const half = ORB_SIZE / 2;
    const minX = half;
    const maxX = Math.max(half, arenaW - half);
    const minY = half;
    const maxY = Math.max(half, arenaH - half);
    const minDistance = ORB_SIZE * 0.98;
    const boundaryBounce = 0.82;
    const drag = 0.992;

    const lastTimestamp = lastTickRef.current;
    lastTickRef.current = timestamp;
    const dt = lastTimestamp
      ? Math.min(0.033, Math.max(0.008, (timestamp - lastTimestamp) / 1000))
      : 0.016;

    for (let i = 0; i < ps.length; i++) {
      const p = ps[i];

      p.rotAngle += p.rotSpeed;
      p.breathAngle += p.breathSpeed;

      p.x += p.vx * dt;
      p.y += p.vy * dt;

      if (p.x <= minX) {
        p.x = minX;
        p.vx = Math.abs(p.vx) * boundaryBounce;
      } else if (p.x >= maxX) {
        p.x = maxX;
        p.vx = -Math.abs(p.vx) * boundaryBounce;
      }

      if (p.y <= minY) {
        p.y = minY;
        p.vy = Math.abs(p.vy) * boundaryBounce;
      } else if (p.y >= maxY) {
        p.y = maxY;
        p.vy = -Math.abs(p.vy) * boundaryBounce;
      }

      p.vx *= drag;
      p.vy *= drag;
    }

    for (let i = 0; i < ps.length; i++) {
      for (let j = i + 1; j < ps.length; j++) {
        const p = ps[i];
        const q = ps[j];
        const dx = q.x - p.x;
        const dy = q.y - p.y;
        const distSq = dx * dx + dy * dy;

        if (distSq === 0 || distSq >= minDistance * minDistance) continue;

        const dist = Math.sqrt(distSq);
        const overlap = minDistance - dist;
        const nx = dx / dist;
        const ny = dy / dist;
        const separation = overlap * 0.04;
        const impulse = overlap * 0.7;

        p.x -= nx * separation;
        p.y -= ny * separation;
        q.x += nx * separation;
        q.y += ny * separation;

        p.vx -= nx * impulse * 0.5;
        p.vy -= ny * impulse * 0.5;
        q.vx += nx * impulse * 0.5;
        q.vy += ny * impulse * 0.5;
      }
    }

    for (let i = 0; i < ps.length; i++) {
      const p = ps[i];

      if (p.x < minX) {
        p.x = minX;
        p.vx = Math.abs(p.vx) * boundaryBounce;
      } else if (p.x > maxX) {
        p.x = maxX;
        p.vx = -Math.abs(p.vx) * boundaryBounce;
      }

      if (p.y < minY) {
        p.y = minY;
        p.vy = Math.abs(p.vy) * boundaryBounce;
      } else if (p.y > maxY) {
        p.y = maxY;
        p.vy = -Math.abs(p.vy) * boundaryBounce;
      }

      const rot = Math.sin(p.rotAngle) * 2;

      const el = iconRefs.current[i];
      if (el) {
        el.style.transform = `translate3d(${p.x - half}px, ${p.y - half}px, 0) rotate(${rot}deg)`;
        const breath = 0.8 + Math.sin(p.breathAngle) * 0.2;
        el.style.setProperty("--glow-breath", breath.toFixed(3));
      }
    }

    rafRef.current = requestAnimationFrame((ts) => {
      if (tickRef.current) tickRef.current(ts);
    });
  }, []);

  useEffect(() => {
    tickRef.current = tick;
  }, [tick]);

  // ─── Setup resize bounds observer ──────────
  useEffect(() => {
    const arena = arenaRef.current;
    if (!arena) return;
    if (arenaStage !== "float") return;
    const currentW = arena.offsetWidth;
    const currentH = arena.offsetHeight;
    setDimensions({ width: currentW, height: currentH });

    lastTickRef.current = null;
    rafRef.current = requestAnimationFrame(tick);

    const ro = new ResizeObserver(() => {
      const nw = arena.offsetWidth;
      const nh = arena.offsetHeight;
      setDimensions({ width: nw, height: nh });
    });
    ro.observe(arena);

    return () => {
      ro.disconnect();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [tick, arenaStage]);

  const handleArenaEnter = useCallback(() => {
    if (arenaStage !== "idle") return;

    setArenaStage("border");

    const orbTimer = setTimeout(() => setArenaStage("orbs"), 460);
    const floatTimer = setTimeout(() => setArenaStage("float"), 980);
    stageTimersRef.current.push(orbTimer, floatTimer);
  }, [arenaStage]);

  const borderDraw = arenaStage !== "idle";
  const orbVisible = arenaStage === "orbs" || arenaStage === "float";

  return (
    <section
      id="skills"
      className="relative min-h-screen overflow-hidden px-6 py-20 sm:px-10"
    >
      {/* Background space elements */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 55% 35% at 50% 0%, rgba(212,169,55,0.04) 0%, transparent 70%)",
        }}
      />

      <div className="mx-auto max-w-6xl relative z-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.65 }}
          className="mx-auto mb-12 max-w-3xl text-center"
        >
          <p className="mb-3 text-xs font-mono tracking-wide text-amber-200/70">
            Professional Toolbox
          </p>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
            Technical Skills
          </h2>
          <div className="mx-auto mt-4 h-px w-32 bg-linear-to-r from-transparent via-amber-300/35 to-transparent" />
          <p className="mt-5 text-xs text-white/20 font-light tracking-widest uppercase">
            Hover to view telemetry & details
          </p>
        </motion.div>

        {/* Style block for HUD Line Animation & Glass Orb Crescent Highlight */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
          .hud-glow-line {
            animation: hudFlow 12s linear infinite;
            filter: drop-shadow(0 0 3px rgba(212,169,55,0.6));
          }
          @keyframes hudFlow {
            from { stroke-dashoffset: 0; }
            to { stroke-dashoffset: 800; }
          }
          .orb-container {
            width: ${ORB_SIZE}px;
            height: ${ORB_SIZE}px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            background: radial-gradient(circle at 30% 25%, #18181b 0%, #0d0d0f 75%, #050507 100%);
            box-shadow: 
              inset 0 1.5px 3px rgba(255, 255, 255, 0.08), 
              inset 0 -2px 6px rgba(0, 0, 0, 0.95),
              0 6px 16px rgba(0, 0, 0, 0.55);
            transition: background 0.3s, border-color 0.3s, box-shadow 0.3s, transform 0.3s;
          }
          .orb-container::before {
            content: '';
            position: absolute;
            top: 1.5px;
            left: 8%;
            right: 8%;
            height: 38%;
            border-radius: 50% 50% 35% 35% / 80% 80% 20% 20%;
            background: linear-gradient(to bottom, rgba(255, 255, 255, 0.14) 0%, rgba(255, 255, 255, 0) 100%);
            pointer-events: none;
            z-index: 2;
          }
          .orb-container::after {
            content: '';
            position: absolute;
            bottom: 4px;
            left: 20%;
            right: 20%;
            height: 8px;
            background: radial-gradient(ellipse at bottom, rgba(255,255,255,0.03), transparent);
            filter: blur(1px);
            pointer-events: none;
          }
        `,
          }}
        />

        {/* ── Futuristic HUD Skills Arena ─────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          onViewportEnter={handleArenaEnter}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          ref={arenaRef}
          style={{
            position: "relative",
            width: "100%",
            height: 545,
            overflow: "visible", // allows tooltips to escape limits if needed
            cursor: "default",
            background: "transparent",
          }}
        >
          {/* Custom Futuristic HUD Frame SVG */}
          <motion.svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ zIndex: 0 }}
          >
              {/* Sci-fi cropped frame outline */}
              <path
                d={`M 16 0 L ${w - 16} 0 L ${w} 16 L ${w} ${h - 16} L ${w - 16} ${h} L 16 ${h} L 0 ${h - 16} L 0 16 Z`}
                fill="none"
                stroke="rgba(212, 169, 55, 0.12)"
                strokeWidth="1.2"
              />

              {/* Glowing Corner Accents */}
              <path
                d="M 0 32 L 0 16 L 16 0 L 32 0"
                fill="none"
                stroke="#d4a937"
                strokeWidth="2.5"
                style={{ filter: "drop-shadow(0 0 4px rgba(212,169,55,0.7))" }}
              />
              <path
                d={`M ${w - 32} 0 L ${w - 16} 0 L ${w} 16 L ${w} 32`}
                fill="none"
                stroke="#d4a937"
                strokeWidth="2.5"
                style={{ filter: "drop-shadow(0 0 4px rgba(212,169,55,0.7))" }}
              />
              <path
                d={`M 0 ${h - 32} L 0 ${h - 16} L 16 ${h} L 32 ${h}`}
                fill="none"
                stroke="#d4a937"
                strokeWidth="2.5"
                style={{ filter: "drop-shadow(0 0 4px rgba(212,169,55,0.7))" }}
              />
              <path
                d={`M ${w - 32} ${h} L ${w - 16} ${h} L ${w} ${h - 16} L ${w} ${h - 32}`}
                fill="none"
                stroke="#d4a937"
                strokeWidth="2.5"
                style={{ filter: "drop-shadow(0 0 4px rgba(212,169,55,0.7))" }}
              />

              {/* Crosshair accents */}
              <line
                x1={w / 2 - 20}
                y1={2}
                x2={w / 2 + 20}
                y2={2}
                stroke="rgba(212,169,55,0.3)"
                strokeWidth="1"
              />
              <line
                x1={w / 2}
                y1={0}
                x2={w / 2}
                y2={5}
                stroke="rgba(212,169,55,0.3)"
                strokeWidth="1"
              />
              <line
                x1={w / 2 - 20}
                y1={h - 2}
                x2={w / 2 + 20}
                y2={h - 2}
                stroke="rgba(212,169,55,0.3)"
                strokeWidth="1"
              />
              <line
                x1={w / 2}
                y1={h}
                x2={w / 2}
                y2={h - 5}
                stroke="rgba(212,169,55,0.3)"
                strokeWidth="1"
              />

              {/* Animated Light Beams running border */}
              <motion.path
                d={`M 16 0 L ${w - 16} 0 L ${w} 16 L ${w} ${h - 16} L ${w - 16} ${h} L 16 ${h} L 0 ${h - 16} L 0 16 Z`}
                fill="none"
                stroke="#d4a937"
                strokeWidth="1.5"
                strokeDasharray="90 310"
                className="hud-glow-line"
                initial={{ pathLength: 0, opacity: 0.18 }}
                animate={
                  borderDraw
                    ? { pathLength: 1, opacity: 1 }
                    : { pathLength: 0, opacity: 0.18 }
                }
                transition={{ duration: 1.05, ease: [0.22, 1, 0.36, 1] }}
              />
            </motion.svg>

          {/* Floating skill icons */}
          {ALL_SKILLS.map((skill, idx) => {
            const Icon = skill.icon;
            const isHov = hoveredIdx === idx;
            const isAnyHov = hoveredIdx !== null;

            // Highlight hovered, dim others slightly
            const iconOpacity = isHov ? 1 : isAnyHov ? 0.35 : 0.85;
            const iconScale = isHov ? 1.08 : isAnyHov ? 0.95 : 1.0;
            const p = particles[idx];

            return (
              <div
                key={skill.name}
                ref={(el) => {
                  iconRefs.current[idx] = el;
                }}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: ORB_SIZE,
                  height: ORB_SIZE + 20,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  cursor: "pointer",
                  willChange: "transform",
                  zIndex: isHov ? 50 : 10,
                }}
              >
                {/* ── Inner container (handles opacity, scale, and hover transitions) ── */}
                <div
                  onMouseEnter={() => handleIconEnter(idx)}
                  onMouseLeave={handleIconLeave}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 6,
                    width: "100%",
                    height: "100%",
                    opacity: orbVisible ? iconOpacity : 0,
                    transform: `scale(${iconScale})`,
                    transition: "opacity 0.35s ease, transform 0.35s ease",
                  }}
                >
                  {/* Outer ambient glow matching icon color (breathing in sync) */}
                  <div
                    style={{
                      position: "absolute",
                      top: -14,
                      left: -14,
                      width: ORB_SIZE + 28,
                      height: ORB_SIZE + 28,
                      borderRadius: "50%",
                      background: `radial-gradient(circle, ${skill.color}28 0%, transparent 68%)`,
                      pointerEvents: "none",
                      opacity: isHov
                        ? 1
                        : "calc(var(--glow-breath, 0.9) * 0.45)",
                      transition: "background 0.3s ease, opacity 0.2s ease",
                    }}
                  />

                  {/* ── Circular dark glass orb (permanent premium glass look) ── */}
                  <div
                    className="orb-container"
                    style={{
                      border: isHov
                        ? `1.5px solid ${skill.color}85`
                        : "1px solid rgba(212, 169, 55, 0.15)",
                      boxShadow: isHov
                        ? `inset 0 1.5px 3px rgba(255, 255, 255, 0.15), 
                           inset 0 -2px 6px rgba(0, 0, 0, 0.95),
                           0 0 24px ${skill.color}45, 
                           0 8px 24px rgba(0, 0, 0, 0.65)`
                        : `inset 0 1.5px 3px rgba(255, 255, 255, 0.08), 
                           inset 0 -2px 6px rgba(0, 0, 0, 0.95),
                           0 0 calc(var(--glow-breath, 0.9) * 12px) ${skill.color}15,
                           0 6px 16px rgba(0, 0, 0, 0.55)`,
                    }}
                  >
                    {/* Inner illuminated light source (glow from inside, breathing) */}
                    <div
                      style={{
                        position: "absolute",
                        inset: 6,
                        borderRadius: "50%",
                        background: `radial-gradient(circle, ${skill.color}${isHov ? "3f" : "15"} 0%, transparent 70%)`,
                        opacity: isHov ? 1 : "var(--glow-breath, 0.9)",
                        pointerEvents: "none",
                        transition: "background 0.3s ease, opacity 0.2s ease",
                      }}
                    />

                    {/* Icon glows permanently with official color */}
                    <Icon
                      size={24}
                      style={{
                        color: isHov ? skill.color : `${skill.color}b8`,
                        filter: `drop-shadow(0 0 ${isHov ? "10px" : "5px"} ${skill.color}cc)`,
                        zIndex: 3,
                        transition: "color 0.3s ease, filter 0.3s ease",
                      }}
                    />
                  </div>

                  {/* Label text */}
                  <span
                    style={{
                      fontSize: 12,
                      fontFamily: "monospace",
                      color: isHov
                        ? "rgba(255,255,255,0.9)"
                        : "rgba(255,255,255,0.45)",
                      letterSpacing: "0.02em",
                      pointerEvents: "none",
                      transition: "color 0.3s ease",
                      textAlign: "center",
                      wordBreak: "break-word",
                    }}
                  >
                    {skill.name}
                  </span>
                </div>

                {/* Glassmorphic Tooltip below hovered item (inherits translation so it floats seamlessly) */}
                {isHov && p && (
                  <TooltipPanel
                    skill={skill}
                    p={p}
                    containerWidth={w}
                    containerHeight={h}
                  />
                )}
              </div>
            );
          })}

          {/* Badge count info */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              bottom: 14,
              right: 18,
              zIndex: 5,
              pointerEvents: "none",
              fontSize: 10,
              fontFamily: "monospace",
              color: "rgba(255,255,255,0.2)",
              letterSpacing: "0.08em",
            }}
          >
            SYSTEM: {ALL_SKILLS.length} MODULES DETECTED
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
