export const navLinks = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'contact', label: 'Contact' },
]

export const heroRoles = [
  "Hi, I'm Harpreet Jakhar",
  'Computer Science Engineering Student',
  'Frontend Developer Intern',
  'Machine Learning Enthusiast',
]

export const highlights = [
  {
    title: 'Code + Creativity',
    text: 'Building scalable applications using modern web technologies like React and Node.js.',
  },
  {
    title: 'Data-Driven AI',
    text: 'Building real-world ML solutions, predictive modeling, and analytics pipelines.',
  },
  {
    title: 'Problem Solver',
    text: 'Working effectively in collaborative spaces to deploy dynamic, real-world solutions.',
  },
]

export const skills = {
  frontend: [
    { name: 'HTML', level: 95, projects: 'Semantic UI Structure' },
    { name: 'CSS', level: 94, projects: 'Responsive Styling' },
    { name: 'JavaScript', level: 90, projects: 'Core Logic & DOM' },
    { name: 'React.js', level: 90, projects: 'Frontend Interfaces' },
  ],
  backend: [
    { name: 'Node.js', level: 80, projects: 'Server & APIs' },
    { name: 'Python', level: 85, projects: 'ML & Automation' },
    { name: 'Java', level: 80, projects: 'OOP & Scalability' },
    { name: 'C++', level: 75, projects: 'DSA & Systems' },
    { name: 'MongoDB', level: 78, projects: 'NoSQL Databases' },
    { name: 'MySQL', level: 76, projects: 'Relational Databases' },
  ],
  tools: [
    { name: 'Git/GitHub', level: 90, projects: 'Version Control' },
    { name: 'VS Code', level: 95, projects: 'Dev Workflow' },
    { name: 'Pandas', level: 85, projects: 'Data Processing' },
    { name: 'Scikit-learn', level: 80, projects: 'Model Training' },
    { name: 'Power BI', level: 75, projects: 'Dashboards' },
    { name: 'Excel', level: 78, projects: 'Data Handling' },
    { name: 'Machine Learning', level: 82, projects: 'Predictive Models' },
    { name: 'Data Visualization', level: 84, projects: 'Insight Storytelling' },
    { name: 'Problem Solving', level: 92, projects: 'Analytical Thinking' },
    { name: 'Data Structures', level: 88, projects: 'Algorithmic Foundations' },
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
  { id: 14, name: 'Pandas', icon: 'FaChartBar', color: '#150458', delay: 1.04 },
  { id: 15, name: 'ML', icon: 'FaBrain', color: '#00d4ff', delay: 1.12 },
  { id: 16, name: 'Data Viz', icon: 'FaChartPie', color: '#f39c12', delay: 1.2 },
]

export const projects = [
  {
    title: 'HR Diversity & Inclusion Dashboard',
    description:
      'Developed an interactive HR analytics dashboard to monitor workforce diversity, employee inclusion, promotions, turnover rates, and gender balance across multiple departments and regions. Designed visually rich KPI reports and dynamic charts to help organizations make data-driven HR decisions and improve workplace diversity strategies.',
    tech: ['Power BI', 'Data Analytics', 'DAX', 'HR Reporting'],
    image:
      'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80',
    github: 'https://github.com/harpreet012/HR-Analytics-Dashboard-using-PowerBI',
    demo: '#',
    category: 'Data Analytics',
  },
  {
    title: 'AI-Powered Predictive Maintenance System',
    description:
      'Developed a system to predict equipment failures using sensor data and machine learning. Implemented anomaly detection and built a real-time monitoring dashboard.',
    tech: ['Python', 'ML', 'HTML', 'CSS', 'JavaScript', 'PHP'],
    image:
      'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1200&q=80',
    github: 'https://github.com/harpreet012',
    demo: 'https://pm-frontend-qxlo.onrender.com',
    category: 'ML',
  },
  {
    title: 'Adult Salary Prediction',
    description:
      'Built Machine Learning models to classify income levels using demographic data. Performed data preprocessing and extensive model evaluation.',
    tech: ['Python', 'Scikit-learn', 'Pandas'],
    image:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    github: 'https://github.com/harpreet012',
    demo: '#',
    category: 'ML',
  },
  {
    title: 'Personal Portfolio Website',
    description:
      'Developed a highly responsive portfolio website with custom layout. Designed a clean User Interface and optimized rendering performance.',
    tech: ['HTML', 'CSS', 'JavaScript', 'React.js'],
    image:
      'https://images.unsplash.com/photo-1518773553398-650c184e0bb3?auto=format&fit=crop&w=1200&q=80',
    github: 'https://github.com/harpreet012',
    demo: 'https://portfolio-three-sooty-vc3uh18hp7.vercel.app/#projects',
    category: 'React',
  },
  {
    title: 'Real-Time Chat Application',
    description:
      'Built a real-time messaging platform with WebSocket integration for instant communication. Features include user authentication, group chats, message history, and typing indicators. Deployed on cloud infrastructure with database optimization.',
    tech: ['React.js', 'Node.js', 'WebSocket', 'MongoDB', 'Express.js'],
    image:
      'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80',
    github: 'https://github.com/harpreet012',
    demo: '#',
    category: 'Full Stack',
  },
  {
    title: 'Weather Analytics Dashboard',
    description:
      'Created a comprehensive weather analytics platform that fetches real-time weather data and predicts weather patterns using ML algorithms. Integrated third-party APIs and built interactive visualizations for weather trends.',
    tech: ['Python', 'Flask', 'React.js', 'Machine Learning', 'REST APIs'],
    image:
      'https://images.unsplash.com/photo-1618519035001-e7e7eaf0001c?auto=format&fit=crop&w=1200&q=80',
    github: 'https://github.com/harpreet012',
    demo: '#',
    category: 'ML & Web',
  },
]

export const experience = [
  {
    role: 'Front-End Developer Intern',
    company: 'Intrac Systems Pvt. Ltd. (Fastrackerz), Noida',
    period: 'June 2025 - July 2025',
    details:
      'Developed responsive user interfaces using HTML, CSS, and JavaScript. Collaborated with team members to improve UI/UX and application performance, applying modern design practices to enhance usability.',
  },
  {
    role: 'ML/Data Analyst Intern',
    company: 'DataInsight Solutions, Remote',
    period: 'August 2025 - October 2025',
    details:
      'Analyzed large datasets using Python, Pandas, and Scikit-learn to build predictive models. Created data visualizations and dashboards using Power BI to communicate insights to stakeholders.',
  },
  {
    role: 'Junior Developer',
    company: 'Tech Innovations Lab, Freelance',
    period: 'November 2025 - December 2025',
    details:
      'Built responsive web applications using React.js and Node.js. Implemented RESTful APIs and optimized frontend performance, reducing load times by 35%.',
  },
]

export const certifications = [
  {
    title: 'Machine Learning Certification',
    platform: 'Certification',
    date: '2024',
  },
  {
    title: 'Power BI Certification',
    platform: 'Certification',
    date: '2024',
  },
  {
    title: 'IoT Workshop',
    platform: 'Workshop',
    date: '2024',
  },
  {
    title: 'B.Tech CSE (Current CGPA: 7.5)',
    platform: 'K.R. Mangalam University',
    date: '2023 - Present',
  },
]

export const socialLinks = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/harpreet-jakhar-9b8398364' },
  { label: 'GitHub', href: 'https://github.com/harpreet012' },
  { label: 'Email', href: 'mailto:jakharharpreet93@gmail.com' },
]
