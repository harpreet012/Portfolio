export const navLinks = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'certifications', label: 'Education & Certs' },
  { id: 'contact', label: 'Contact' },
]

export const heroRoles = [
  'Software Engineer',
  'Full-Stack Developer',
  'Backend Developer',
]

export const highlights = [
  {
    title: 'Full-Stack Development',
    text: 'Building responsive interfaces and scalable backend services with React, Node.js, and modern databases.',
  },
  {
    title: 'Backend & API Engineering',
    text: 'Designing RESTful services, middleware layers, and database-backed systems with Express and Spring Boot.',
  },
  {
    title: 'Core Engineering',
    text: 'Applying strong computer science fundamentals in data structures, OOP design, and clean software architecture.',
  },
]

// Professional skill categorization without arbitrary numerical percentages
export const skillCategories = [
  {
    category: 'Languages',
    skills: [
      { name: 'Java', desc: 'Object-Oriented Programming, Spring Boot, systems development' },
      { name: 'JavaScript', desc: 'ES6+, async programming, client & server runtimes' },
      { name: 'Python', desc: 'Data processing, scripting, ML model workflows' },
      { name: 'C++', desc: 'Data structures, algorithm design, system fundamentals' },
      { name: 'SQL', desc: 'Relational querying, schema design, database management' },
    ],
  },
  {
    category: 'Frontend',
    skills: [
      { name: 'React.js', desc: 'Component architecture, hooks, state management, SPA routing' },
      { name: 'HTML5', desc: 'Semantic layout structure, accessible DOM, web standards' },
      { name: 'CSS3', desc: 'Flexbox, CSS Grid, animations, modern responsive design' },
      { name: 'Tailwind CSS', desc: 'Utility-first styling, design tokens, responsive layouts' },
      { name: 'Bootstrap', desc: 'Responsive grid systems, rapid UI prototyping' },
    ],
  },
  {
    category: 'Backend',
    skills: [
      { name: 'Node.js', desc: 'Asynchronous event-driven server runtime and scripting' },
      { name: 'Express.js', desc: 'RESTful API routing, middleware architecture, request handling' },
      { name: 'Spring Boot', desc: 'Java MVC architecture, dependency injection, microservices' },
      { name: 'Kafka', desc: 'Distributed event streaming and message-driven architectures' },
    ],
  },
  {
    category: 'Databases',
    skills: [
      { name: 'MySQL', desc: 'Relational data modeling, foreign keys, indexing, ACID transactions' },
      { name: 'MongoDB', desc: 'NoSQL document modeling, flexible schemas, aggregation pipelines' },
    ],
  },
  {
    category: 'Core CS',
    skills: [
      { name: 'Data Structures & Algorithms', desc: 'Problem solving, search/sort algorithms, optimization' },
      { name: 'OOP', desc: 'Encapsulation, inheritance, polymorphism, design patterns' },
      { name: 'DBMS', desc: 'Database design, normalization theory, transactional integrity' },
      { name: 'Operating Systems', desc: 'Process management, concurrency, memory allocation, file systems' },
      { name: 'Computer Networks', desc: 'TCP/IP protocols, HTTP/HTTPS, DNS, client-server models' },
    ],
  },
  {
    category: 'Tools & DevOps',
    skills: [
      { name: 'Git', desc: 'Distributed version control, branching workflows, rebase/merge' },
      { name: 'GitHub', desc: 'Repository management, pull requests, collaboration' },
      { name: 'Docker', desc: 'Containerization, Dockerfile configuration, containerized environments' },
      { name: 'VS Code', desc: 'Development environment, extensions, debugging tools' },
      { name: 'Postman', desc: 'API testing, request collection management, endpoint validation' },
      { name: 'Vercel', desc: 'Frontend deployment workflows and continuous integration' },
      { name: 'Render', desc: 'Web service hosting and backend application deployments' },
      { name: 'Power BI', desc: 'Interactive business intelligence dashboards and KPI reports' },
    ],
  },
  {
    category: 'Concepts',
    skills: [
      { name: 'RESTful APIs', desc: 'Stateless resource design, standard HTTP verbs, JSON contracts' },
      { name: 'JWT Authentication', desc: 'Stateless user authentication and secure token handling' },
      { name: 'MVC Architecture', desc: 'Separation of concerns across Model, View, and Controller layers' },
      { name: 'Responsive Web Design', desc: 'Mobile-first layouts, adaptive viewports, cross-device usability' },
      { name: 'Agile Methodology', desc: 'Iterative development, sprint collaboration, task estimation' },
    ],
  },
]

// Flat skills array for interactive HUD visualization
export const skills = {
  languages: [
    { name: 'Java', category: 'Languages', projects: 'OOP & Backend Architecture', desc: 'Object-Oriented Programming, Spring Boot, systems development' },
    { name: 'JavaScript', category: 'Languages', projects: 'Core Logic & DOM Manipulation', desc: 'ES6+, async programming, client & server runtimes' },
    { name: 'Python', category: 'Languages', projects: 'Data Scripting & ML Pipelines', desc: 'Data processing, scripting, ML model workflows' },
    { name: 'C++', category: 'Languages', projects: 'DSA & Systems Programming', desc: 'Data structures, algorithm design, system fundamentals' },
    { name: 'SQL', category: 'Languages', projects: 'Query & Schema Design', desc: 'Relational querying, schema design, database management' },
  ],
  frontend: [
    { name: 'React.js', category: 'Frontend', projects: 'Interactive Web Applications', desc: 'Component architecture, hooks, state management, SPA routing' },
    { name: 'HTML5', category: 'Frontend', projects: 'Semantic UI Structure', desc: 'Semantic layout structure, accessible DOM, web standards' },
    { name: 'CSS3', category: 'Frontend', projects: 'Responsive Styling & Layouts', desc: 'Flexbox, CSS Grid, animations, modern responsive design' },
    { name: 'Tailwind CSS', category: 'Frontend', projects: 'Utility-First Design Systems', desc: 'Utility-first styling, design tokens, responsive layouts' },
    { name: 'Bootstrap', category: 'Frontend', projects: 'Grid Layouts & Components', desc: 'Responsive grid systems, rapid UI prototyping' },
  ],
  backend: [
    { name: 'Node.js', category: 'Backend', projects: 'Server Environments & APIs', desc: 'Asynchronous event-driven server runtime and scripting' },
    { name: 'Express.js', category: 'Backend', projects: 'REST API Services & Middleware', desc: 'RESTful API routing, middleware architecture, request handling' },
    { name: 'Spring Boot', category: 'Backend', projects: 'Java Enterprise Services', desc: 'Java MVC architecture, dependency injection, microservices' },
    { name: 'Kafka', category: 'Backend', projects: 'Event Streaming & Pipelines', desc: 'Distributed event streaming and message-driven architectures' },
  ],
  databases: [
    { name: 'MySQL', category: 'Databases', projects: 'Relational Schemas & Queries', desc: 'Relational data modeling, foreign keys, indexing, ACID transactions' },
    { name: 'MongoDB', category: 'Databases', projects: 'NoSQL Document Storage', desc: 'NoSQL document modeling, flexible schemas, aggregation pipelines' },
  ],
  coreCs: [
    { name: 'Data Structures & Algorithms', category: 'Core CS', projects: 'Problem Solving & Optimization', desc: 'Problem solving, search/sort algorithms, optimization' },
    { name: 'OOP', category: 'Core CS', projects: 'Class Hierarchy & Design Patterns', desc: 'Encapsulation, inheritance, polymorphism, design patterns' },
    { name: 'DBMS', category: 'Core CS', projects: 'Relational Theory & Normalization', desc: 'Database design, normalization theory, transactional integrity' },
    { name: 'Operating Systems', category: 'Core CS', projects: 'Process Scheduling & Memory', desc: 'Process management, concurrency, memory allocation, file systems' },
    { name: 'Computer Networks', category: 'Core CS', projects: 'Network Protocols & Layers', desc: 'TCP/IP protocols, HTTP/HTTPS, DNS, client-server models' },
  ],
  tools: [
    { name: 'Git', category: 'Tools & DevOps', projects: 'Version Control & Workflows', desc: 'Distributed version control, branching workflows, rebase/merge' },
    { name: 'GitHub', category: 'Tools & DevOps', projects: 'Collaboration & Repositories', desc: 'Repository management, pull requests, collaboration' },
    { name: 'Docker', category: 'Tools & DevOps', projects: 'Containerized Environments', desc: 'Containerization, Dockerfile configuration, containerized environments' },
    { name: 'VS Code', category: 'Tools & DevOps', projects: 'Development & Debugging', desc: 'Development environment, extensions, debugging tools' },
    { name: 'Postman', category: 'Tools & DevOps', projects: 'API Testing & Validation', desc: 'API testing, request collection management, endpoint validation' },
    { name: 'Vercel', category: 'Tools & DevOps', projects: 'Frontend Deployments', desc: 'Frontend deployment workflows and continuous integration' },
    { name: 'Render', category: 'Tools & DevOps', projects: 'Cloud Web Hosting', desc: 'Web service hosting and backend application deployments' },
    { name: 'Power BI', category: 'Tools & DevOps', projects: 'Analytics Dashboards', desc: 'Interactive business intelligence dashboards and KPI reports' },
  ],
  concepts: [
    { name: 'RESTful APIs', category: 'Concepts', projects: 'Service API Integration', desc: 'Stateless resource design, standard HTTP verbs, JSON contracts' },
    { name: 'JWT Authentication', category: 'Concepts', projects: 'Stateless Sessions & Security', desc: 'Stateless user authentication and secure token handling' },
    { name: 'MVC Architecture', category: 'Concepts', projects: 'Software Separation of Concerns', desc: 'Separation of concerns across Model, View, and Controller layers' },
    { name: 'Responsive Web Design', category: 'Concepts', projects: 'Mobile-First Layouts', desc: 'Mobile-first layouts, adaptive viewports, cross-device usability' },
    { name: 'Agile Methodology', category: 'Concepts', projects: 'Iterative Sprint Workflows', desc: 'Iterative development, sprint collaboration, task estimation' },
  ],
}

export const techIcons = [
  { id: 1, name: 'React', icon: 'FaReact', color: '#61dafb', delay: 0 },
  { id: 2, name: 'Python', icon: 'FaPython', color: '#3776ab', delay: 0.08 },
  { id: 3, name: 'Node.js', icon: 'FaNode', color: '#68a063', delay: 0.16 },
  { id: 4, name: 'Git', icon: 'FaGitAlt', color: '#f1502f', delay: 0.24 },
  { id: 5, name: 'Java', icon: 'FaJava', color: '#007396', delay: 0.32 },
  { id: 6, name: 'JavaScript', icon: 'FaJs', color: '#f7df1e', delay: 0.4 },
  { id: 7, name: 'HTML5', icon: 'FaHtml5', color: '#e34c26', delay: 0.48 },
  { id: 8, name: 'CSS3', icon: 'FaCss3Alt', color: '#563d7c', delay: 0.56 },
  { id: 9, name: 'C++', icon: 'FaCube', color: '#00599c', delay: 0.64 },
  { id: 10, name: 'MongoDB', icon: 'FaLeaf', color: '#13aa52', delay: 0.72 },
  { id: 11, name: 'MySQL', icon: 'FaDatabase', color: '#0052cc', delay: 0.8 },
  { id: 12, name: 'GitHub', icon: 'FaGithub', color: '#ffffff', delay: 0.88 },
  { id: 13, name: 'VS Code', icon: 'FaCode', color: '#0078d4', delay: 0.96 },
  { id: 14, name: 'Docker', icon: 'FaDocker', color: '#2496ed', delay: 1.04 },
  { id: 15, name: 'Spring Boot', icon: 'SiSpring', color: '#6db33f', delay: 1.12 },
  { id: 16, name: 'Power BI', icon: 'FaChartPie', color: '#f39c12', delay: 1.2 },
]

/**
 * Centralized Project Repository Configuration.
 * 
 * Note on links:
 * - Empty string ("") indicates placeholder waiting for final verified URL.
 * - The UI automatically checks for non-empty values and will NOT render broken '#' links.
 */
export const projects = [
  {
    title: 'AI-Powered Predictive Maintenance System',
    category: 'Full Stack / AI & ML',
    featured: true,
    problem: 'Industrial equipment downtime from unexpected mechanical and thermal wear.',
    description:
      'Engineered a full-stack predictive maintenance application that monitors industrial equipment telemetry in real time, detects sensor anomalies, and evaluates equipment health indices.',
    implementation:
      'Built a React (Vite) dashboard communicating via REST APIs and WebSockets with an Express/Node.js backend, MongoDB storage, and statistical anomaly detection engines.',
    highlights: [
      'Modular REST API routes for equipment management, alert logs, and sensor histories',
      'Real-time IoT telemetry simulation with configurable multi-sensor feeds and fault injection',
      'Z-score anomaly detection algorithms coupled with multi-sensor health scoring',
      'Interactive dashboard featuring live sensor trend charts and equipment condition metrics',
    ],
    tech: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Socket.io', 'Chart.js', 'Tailwind CSS'],
    image:
      'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1200&q=80',
    links: {
      github: '', // Placeholder: set to your GitHub repo URL when ready
      demo: '',   // Placeholder: set to your live deployment URL when ready
      documentation: '',
    },
  },
  {
    title: 'HR Diversity & Inclusion Dashboard',
    category: 'Data Analytics / BI',
    featured: false,
    problem: 'Lack of consolidated visibility into workforce diversity metrics, turnover patterns, and promotion distribution.',
    description:
      'Developed an analytical Business Intelligence dashboard to model and visualize workforce demographics, retention rates, and departmental inclusion metrics.',
    implementation:
      'Structured relational data models, built calculated measures and KPIs with DAX, and designed interactive analytical views in Microsoft Power BI.',
    highlights: [
      'Data modeling and DAX measures for diversity ratio and turnover metrics',
      'Departmental and regional workforce demographic breakdown',
      'Executive KPI reporting for data-driven human resource decision making',
      'Interactive visual filters for multi-dimensional workforce segment exploration',
    ],
    tech: ['Power BI', 'DAX', 'Data Modeling', 'Excel', 'Data Visualization'],
    image:
      'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80',
    links: {
      github: '', // Placeholder: set to your PowerBI repository URL when ready
      demo: '',   // Power BI dashboard file / published report URL
      documentation: '',
    },
  },
  {
    title: 'Adult Salary Prediction Model',
    category: 'Machine Learning',
    featured: false,
    problem: 'Predicting individual income tiers (<=50K vs >50K) based on multi-attribute census demographic records.',
    description:
      'Built a supervised classification pipeline in Python to preprocess demographic census data, evaluate multiple classification algorithms, and predict income brackets.',
    implementation:
      'Handled missing data, performed categorical encoding and feature scaling, and trained benchmark classifiers using Scikit-learn and Pandas.',
    highlights: [
      'Data preprocessing pipeline handling missing values, encoding, and scaling',
      'Exploratory data analysis identifying primary demographic salary predictors',
      'Model training and evaluation across classification performance metrics',
      'Structured experimentation pipeline using Pandas, NumPy, and Scikit-learn',
    ],
    tech: ['Python', 'Scikit-learn', 'Pandas', 'NumPy', 'Machine Learning'],
    image:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    links: {
      github: '', // Placeholder: set to your ML repository URL when ready
      demo: '',
      documentation: '',
    },
  },
  {
    title: 'Developer Portfolio Website',
    category: 'Frontend Engineering',
    featured: false,
    problem: 'Presenting software engineering projects, technical skillsets, and interactive proofs in a responsive, performant format.',
    description:
      'Designed and engineered a modern developer portfolio highlighting interactive HUD components, smooth animations, and recruiter-focused technical evidence.',
    implementation:
      'Architected using React and Vite with Tailwind CSS v4, Framer Motion animations, GSAP scroll triggers, and Three.js background canvas rendering.',
    highlights: [
      'Modular React architecture with centralized data structures and configuration',
      'Interactive custom physics HUD skills canvas and responsive 3D card tilt effects',
      'Theme customization, smooth Lenis scrolling, and accessible form handling',
      'Optimized production bundle with responsive mobile-first design',
    ],
    tech: ['React.js', 'Vite', 'Tailwind CSS', 'Framer Motion', 'GSAP', 'Three.js'],
    image:
      'https://images.unsplash.com/photo-1518773553398-650c184e0bb3?auto=format&fit=crop&w=1200&q=80',
    links: {
      github: '', // Placeholder: set to this portfolio repo URL when ready
      demo: '',   // Placeholder: set to live portfolio URL when ready
      documentation: '',
    },
  },
]

export const experience = [
  {
    role: 'Front-End Developer Intern',
    company: 'Intrac Systems Pvt. Ltd. (Fastrackerz), Noida',
    period: 'June 2025 – July 2025',
    highlights: [
      'Developed and refined responsive user interface components using HTML, CSS, and modern JavaScript.',
      'Collaborated closely with development team members to enhance frontend UI/UX workflows and usability across client-facing interfaces.',
      'Applied clean component structures and modern styling techniques to improve page responsiveness and layout consistency.',
      'Participated in code reviews, bug fixes, and performance optimization for web dashboard modules.',
    ],
  },
]

export const education = [
  {
    degree: 'B.Tech in Computer Science & Engineering',
    institution: 'K.R. Mangalam University',
    period: '2023 – Present',
    details: 'Final-year undergraduate student focusing on software engineering, backend systems, and data-driven applications.',
    score: 'Current CGPA: 7.68',
  },
]

export const certifications = [
  {
    title: 'Machine Learning Certification',
    issuer: 'Professional Certification',
    date: '2024',
    type: 'Certification',
    skills: 'Supervised Learning, Model Evaluation, Python',
  },
  {
    title: 'Power BI Certification',
    issuer: 'Professional Certification',
    date: '2024',
    type: 'Certification',
    skills: 'DAX, Data Modeling, KPI Reporting',
  },
]

export const workshops = [
  {
    title: 'IoT Workshop',
    issuer: 'Technical Workshop',
    date: '2024',
    type: 'Workshop',
    skills: 'Sensor Integration, IoT Fundamentals',
  },
]

export const socialLinks = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/harpreet-jakhar-9b8398364' },
  { label: 'GitHub', href: 'https://github.com/harpreet012' },
  { label: 'Email', href: 'mailto:jakharharpreet93@gmail.com' },
]