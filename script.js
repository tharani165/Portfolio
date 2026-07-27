'use strict';

/* â”€â”€ PRELOADER â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
function dismissPreloader() {
  const el = document.getElementById('preloader');
  if (el) el.classList.add('done');
}
// Try on load, but also fire after 2s no matter what
window.addEventListener('load', () => setTimeout(dismissPreloader, 800));
setTimeout(dismissPreloader, 2000);

/* â”€â”€ SCROLL PROGRESS + NAV â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
const nav = document.getElementById('nav');
const sp = document.getElementById('scrollProgress');
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  nav.classList.toggle('scrolled', y > 32);
  const h = document.documentElement.scrollHeight - window.innerHeight;
  sp.style.width = (y / h * 100) + '%';
}, { passive: true });

/* â”€â”€ BURGER â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
const burgerBtn = document.getElementById('burgerBtn');
const mobileMenu = document.getElementById('mobileMenu');
burgerBtn.addEventListener('click', () => {
  const open = mobileMenu.classList.toggle('open');
  burgerBtn.classList.toggle('open', open);
  burgerBtn.setAttribute('aria-expanded', open);
});
document.querySelectorAll('#mobileMenu a').forEach(a => a.addEventListener('click', () => {
  mobileMenu.classList.remove('open');
  burgerBtn.classList.remove('open');
  burgerBtn.setAttribute('aria-expanded', 'false');
}));

/* â”€â”€ THEME TOGGLE â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
document.getElementById('themeToggle').addEventListener('click', () => document.documentElement.classList.toggle('light'));

/* â”€â”€ MOUSE AURA â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
const aura = document.getElementById('mouseAura');
let at;
window.addEventListener('mousemove', e => {
  aura.style.opacity = '1';
  aura.style.left = e.clientX + 'px';
  aura.style.top = e.clientY + 'px';
  clearTimeout(at);
  at = setTimeout(() => aura.style.opacity = '0', 220);
}, { passive: true });

/* â”€â”€ REVEAL ON SCROLL â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
const revObs = new IntersectionObserver(entries => {
  entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add('in'); revObs.unobserve(en.target); } });
}, { threshold: 0.09 });
document.querySelectorAll('.reveal').forEach(el => revObs.observe(el));

/* â”€â”€ COUNT-UP â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
const countObs = new IntersectionObserver(entries => {
  entries.forEach(en => {
    if (!en.isIntersecting) return;
    const el = en.target, target = parseInt(el.dataset.count, 10);
    const start = performance.now();
    const step = now => {
      const t = Math.min(1, (now - start) / 1400);
      const ease = 1 - Math.pow(1 - t, 3);
      el.textContent = Math.round(ease * target);
      if (t < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
    countObs.unobserve(el);
  });
}, { threshold: 0.5 });
document.querySelectorAll('[data-count]').forEach(el => countObs.observe(el));

/* â”€â”€ SKILLS DATA â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
const skillCategories = [
  {
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`,
    colorClass: 'violet',
    title: 'Programming',
    skills: ['Python', 'SQL', 'HTML', 'CSS', 'Arduino']
  },
  {
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18"/></svg>`,
    colorClass: 'cyan',
    title: 'Data Engineering',
    skills: ['ETL', 'Data Pipelines', 'Data Ingestion', 'Data Transformation', 'Data Validation', 'Workflow Automation', 'Workflow Orchestration']
  },
  {
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>`,
    colorClass: 'violet',
    title: 'Databases',
    skills: ['PostgreSQL']
  },
  {
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>`,
    colorClass: 'violet',
    title: 'Libraries',
    skills: ['Pandas (Basic)', 'NumPy (Basic)', 'Plotly (Basic)']
  },
  {
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14.5 10c-.83 0-1.5-.67-1.5-1.5v-5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5v5c0 .83-.67 1.5-1.5 1.5z"/><path d="M20.5 10H19V8.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/><path d="M9.5 14c.83 0 1.5.67 1.5 1.5v5c0 .83-.67 1.5-1.5 1.5S8 21.33 8 20.5v-5c0-.83.67-1.5 1.5-1.5z"/><path d="M3.5 14H5v1.5c0 .83-.67 1.5-1.5 1.5S2 16.33 2 15.5 2.67 14 3.5 14z"/><path d="M14 14.5c0-.83.67-1.5 1.5-1.5h5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-5c-.83 0-1.5-.67-1.5-1.5z"/><path d="M15.5 19H14v1.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5-.67-1.5-1.5-1.5z"/><path d="M10 9.5C10 8.67 9.33 8 8.5 8h-5C2.67 8 2 8.67 2 9.5S2.67 11 3.5 11h5c.83 0 1.5-.67 1.5-1.5z"/><path d="M8.5 5H10V3.5C10 2.67 9.33 2 8.5 2S7 2.67 7 3.5 7.67 5 8.5 5z"/></svg>`,
    colorClass: 'cyan',
    title: 'Tools',
    skills: ['Docker', 'Git', 'GitHub', 'Prefect', 'Jupyter Notebook']
  },
  {
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="5" cy="6" r="2.5"/><circle cx="19" cy="6" r="2.5"/><circle cx="12" cy="12" r="2.5"/><circle cx="5" cy="18" r="2.5"/><circle cx="19" cy="18" r="2.5"/><path d="M7.2 7.4 9.9 10.4M16.8 7.4 14.1 10.4M9.9 13.6 7.2 16.6M14.1 13.6 16.8 16.6"/></svg>`,
    colorClass: 'violet',
    title: 'Machine Learning',
    skills: ['Data Preprocessing', 'Predictive Modeling']
  },
  {
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>`,
    colorClass: 'violet',
    title: 'Other',
    skills: ['REST APIs', 'IoT', 'Arduino', 'Data Analytics']
  }
];

const skillTagClass = { cyan: 'tag-cyan', violet: 'tag-violet' };

const skillsGrid = document.getElementById('skillsGrid');
skillCategories.forEach((cat, ci) => {
  const card = document.createElement('div');
  card.className = `skill-card reveal${ci % 3 === 1 ? ' d1' : ci % 3 === 2 ? ' d2' : ''}`;
  card.innerHTML = `
    <div class="skill-head">
      <div class="skill-icon ${cat.colorClass}" aria-hidden="true">${cat.icon}</div>
      <div class="skill-card-title">${cat.title}</div>
    </div>
    <div class="skill-tags">
      ${cat.skills.map(s => `<span class="tag ${skillTagClass[cat.colorClass] || ''}">${s}</span>`).join('')}
    </div>`;
  skillsGrid.appendChild(card);
  revObs.observe(card);
});

/* â”€â”€ PROJECTS DATA â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
const projects = [
  {
    id: 'fred', cat: 'data', catLabel: 'Data Engineering· ETL Platform', year: '2025',
    title: 'FRED Macroeconomic ETL Platform',
    subtitle: 'Config-driven ingestion of macroeconomic datasets into PostgreSQL.',
    desc: 'Python ETL platform that automates ingestion of US Treasury macroeconomic data from the FRED API. Fetch/Validate/Load architecture with parallel execution, schema drift detection, idempotent upserts, and Prefect 3 orchestration.',
    tags: ['Python', 'Pandas', 'PostgreSQL', 'Prefect 3', 'REST API', 'NumPy'],
    kpis: [{ l: '4 Pipelines', c: 'orange' }, { l: 'Parallel Exec', c: 'cyan' }, { l: 'Idempotent', c: 'violet' }, { l: 'Config-Driven', c: 'green' }],
    problem: 'Macroeconomic datasets update frequently and have inconsistent schemas over time. Manual ingestion is error-prone, non-reproducible, and cannot handle pagination, retries, or schema changes without breaking downstream analytics.',
    solution: 'A Python ETL platform structured around a Fetch/Validate/Load architecture. Each of the four pipelines â€” Securities Outstanding, Auction Results, Upcoming Auctions, and Buyback Operations â€” is independently deployable and config-driven. Parallel execution via ThreadPoolExecutor improves throughput. Idempotent upserts ensure safe re-runs without duplicating data.',
    metrics: [{ k: '4', l: 'Pipelines' }, { k: 'Parallel', l: 'ThreadPoolExecutor' }, { k: 'Idempotent', l: 'Upserts' }],
    features: [
      'Config-driven ingestion new endpoints added via configuration, not code changes',
      'Metadata-driven architecture with schema drift validation on every run',
      'Parallel fetch execution using ThreadPoolExecutor across all four pipelines',
      'Retry logic with exponential backoff for transient API failures',
      'Idempotent upserts to PostgreSQL safe to re-run without duplicating data',
      'Structured logging and error handling at every pipeline stage',
      'Prefect 3 orchestration for scheduling, observability, and run history',
      'Jupyter/Plotly analytics notebooks for surfacing insights from loaded data'
    ],
    color1: '#7CC4FF', color2: '#A78BFA'
  },
  {
    id: 'traffic', cat: 'ai', catLabel: 'AI & Computer Vision · Pipeline Automation', year: '2025',
    title: 'AI-Based Traffic Management System',
    subtitle: 'Computer vision vehicle detection feeding adaptive traffic signal control.',
    desc: 'An AI-based traffic management system that ingests live video streams, detects and classifies vehicle events using computer vision, and outputs structured traffic density data to a real-time analytics dashboard for adaptive signal control. Shortlisted at Smart India Hackathon 2024.',
    github: 'https://github.com/tharani165/AI-Based-Traffic-Management',
    image: 'images/traffic.png',
    tags: ['Python', 'YOLOv5', 'OpenCV', 'Firebase', 'JSON'],
    kpis: [{ l: 'SIH 2024', c: 'orange' }, { l: 'Real-Time', c: 'cyan' }, { l: 'Structured Output', c: 'violet' }, { l: 'Firebase', c: '' }],
    problem: 'Urban intersections generate continuous, unstructured video data. Extracting structured, actionable traffic metrics from raw video streams requires a reliable detection and processing pipeline, not just a model.',
    solution: 'A Python pipeline that ingests CCTV video streams, runs vehicle detection to extract structured per-lane density metrics, and routes the output to a Firebase Realtime Database for live dashboard consumption. The focus was on data flow architecture: reliable ingestion, structured transformation, and consistent output — the detection model is one component in a larger processing system.',
    metrics: [{ k: 'Real-Time', l: 'Structured output' }, { k: '4 Classes', l: 'Vehicle types' }, { k: 'SIH 2024', l: 'Shortlisted' }],
    features: [
      'Video stream ingestion and frame-by-frame processing pipeline',
      'Vehicle detection and classification to extract structured density data',
      'Per-lane density estimation and metric aggregation',
      'Adaptive timing algorithm consuming structured density output',
      'Firebase Realtime Database integration for live analytics delivery',
      'Emergency vehicle detection with signal pre-emption logic',
      'Structured JSON output format for downstream dashboard consumption'
    ],
    color1: '#FF6B35', color2: '#FF3D8B'
  },
  {
    id: 'medicine', cat: 'data', catLabel: 'Data Engineering · Workflow Automation', year: '2024',
    title: 'Smart Medicine Dispenser  Reminder Ecosystem',
    subtitle: 'QR-verified prescription backend with automated dispensing workflows.',
    desc: 'Backend-driven healthcare automation system with QR-based prescription verification, automated dose scheduling, caregiver notification workflows, and a Flask REST API for schedule management. IEEE YESIST 2024 international finalist â€” top 3 from batch.',
    github: 'https://github.com/tharani165/Drug-Dispenser',
    image: 'images/DrugD.png',
    tags: ['Python', 'Flask', 'REST API', 'QR Code', 'JSON DB'],
    kpis: [{ l: 'IEEE YESIST 2024', c: 'orange' }, { l: 'Top 3 Team', c: 'cyan' }, { l: 'REST API', c: 'violet' }, { l: 'QR Verified', c: 'green' }],
    problem: 'Medication non-adherence is a significant healthcare risk. A reliable system needs to verify the correct prescription is dispensed, schedule doses accurately, and escalate missed doses to caregivers without relying on the patient to actively manage the process.',
    solution: 'A Python/Flask backend handling QR code-based prescription verification, automated dose scheduling, and escalation logic for missed doses via SMS/email caregiver notifications. A JSON-based prescription database tracks prescription state and maintains an audit trail. The REST API enables external integrations and schedule updates without modifying the core system.',
    metrics: [{ k: 'Top 3', l: 'Selected among 250+ teams' }, { k: 'IEEE', l: 'YESIST 2024' }, { k: 'QR', l: 'Prescription verification' }],
    features: [
      'QR-based prescription verification and patient identity check',
      'Automated dose scheduling engine with configurable intervals',
      'Missed dose detection and escalation to caregiver contacts',
      'Flask REST API for schedule management and status queries',
      'JSON-based prescription database with complete audit trail',
      'SMS/email notification integration for caregiver alerts',
      'Selected as Top 3 teams for IEEE YESIST 2024 International Competition, Tunisia'
    ],
    color1: '#00FF94', color2: '#00D4FF'
  },
  {
    id: 'vigilant', cat: 'ai', catLabel: 'AI & Computer Vision · Edge Systems', year: '2024',
    title: 'Vigilant Edge AI Fall Detection System',
    subtitle: "Patent-accepted research for wearable-free elder-care fall detection.",
    desc: 'Patent-accepted research project proposing a privacy-preserving fall detection architecture for elder-care environments using RPLIDAR and edge AI. No cloud dependency, no wearable required.',
    github: 'https://github.com/tharani165/Vigilant-Fall-Detection-with-Embedded-LiDAR-Technology',
    image: 'images/fall.png',
    tags: ['RPLIDAR A1', 'Edge AI', 'OpenPose', 'YOLO', 'OpenCV'],
    kpis: [{ l: 'Patent Filed', c: 'orange' }, { l: 'Edge AI', c: 'cyan' }, { l: 'Wearable-Free', c: 'violet' }, { l: 'Privacy-First', c: 'green' }],
    problem: 'Fall incidents in elder-care settings often go undetected for critical minutes. Wearables require patient compliance; cloud-based cameras raise privacy concerns and introduce latency.',
    solution: 'A research and innovation proposal for an edge-deployed detection system combining RPLIDAR spatial sensing with on-device inference. Camera activation is event-triggered to preserve privacy. The architecture is designed for zero cloud dependency. Patent application submitted and accepted.',
    metrics: [{ k: 'Patent', l: 'Application accepted' }, { k: 'Edge', l: 'On-device inference' }, { k: 'Zero', l: 'Cloud dependency' }],
    features: [
      'Wearable-free detection no patient compliance required',
      'Privacy-preserving camera activation on motion event only',
      'On-device edge inference with zero cloud dependency',
      'Emergency alert generation for caregiver notification',
      'Real-time patient monitoring architecture design',
      'Patent application submitted and accepted application number issued'
    ],
    color1: '#00D4FF', color2: '#7C3AFF'
  },
  {
    id: 'caremate', cat: 'iot', catLabel: 'IoT & Robotics · IoT Systems', year: '2024',
    title: 'CareMate IoT Elder Care Platform',
    subtitle: 'Voice-enabled health monitoring with smart home IoT integration.',
    desc: 'Edge AI elder-care companion system integrating voice interaction, medication reminders, health monitoring, and smart home device control via IoT connectivity.',
    github: 'https://github.com/tharani165/MediBot---Medicine-Reminder-Bot',
    image: 'images/medicine_reminder.png',
    tags: ['Voice Assistant', 'IoT', 'Health Monitoring', 'Flask'],
    kpis: [{ l: 'Voice Enabled', c: 'orange' }, { l: 'IoT Connected', c: 'cyan' }, { l: 'Health Monitor', c: 'violet' }, { l: 'Emergency Alert', c: 'green' }],
    problem: 'Elderly individuals living alone face risk from medication non-compliance, undetected health events, and isolation. Traditional alert systems require active engagement from the user.',
    solution: 'An edge AI companion platform with natural voice interaction for medication reminders, passive health parameter monitoring, emergency notification to family contacts, and smart home device control all unified in a conversational interface accessible to non-technical users.',
    metrics: [{ k: 'Voice', l: 'Interaction' }, { k: 'IoT', l: 'Integration' }, { k: 'Real-Time', l: 'Monitoring' }],
    features: [
      'Natural language voice interaction and response system',
      'Scheduled medication reminder with escalation logic',
      'Continuous health parameter monitoring with anomaly detection',
      'Emergency notification to family contacts via SMS',
      'Smart home device control through unified voice interface'
    ],
    color1: '#FF6B35', color2: '#7C3AFF'
  },
  {
    id: 'medibot', cat: 'iot', catLabel: 'IoT & Robotics · Embedded Systems', year: '2024',
    title: 'MediBot Autonomous Medicine Delivery Robot',
    subtitle: 'ESP32-based autonomous navigation for hospital pharmacy logistics.',
    desc: 'ESP32-based autonomous line-following robot for hospital pharmacy-to-ward medicine delivery with IoT cloud monitoring and smart hospital logistics integration.',
    image: 'images/medibot.png',
    tags: ['ESP32', 'IoT', 'Line Following', 'Cloud Monitoring'],
    kpis: [{ l: 'Autonomous', c: 'orange' }, { l: 'ESP32 Core', c: 'cyan' }, { l: 'Cloud Monitor', c: 'violet' }, { l: 'Hospital Grade', c: 'green' }],
    problem: 'Manual medicine transport in hospitals is time-intensive and error-prone. Staff are diverted from clinical duties to logistics tasks that can be automated.',
    solution: 'An ESP32-powered autonomous robot navigating hospital corridors via line-following, carrying prescription deliveries from pharmacy to wards. Cloud monitoring via IoT integration provides real-time delivery status and route analytics for facility managers.',
    metrics: [{ k: 'Autonomous', l: 'Navigation' }, { k: 'IoT', l: 'Cloud monitoring' }, { k: 'ESP32', l: 'Controller' }],
    features: [
      'Autonomous line-following navigation with obstacle handling',
      'ESP32-based control with real-time IoT telemetry',
      'Cloud dashboard for delivery status and route monitoring',
      'Prescription confirmation protocol at delivery point',
      'Smart hospital logistics analytics integration'
    ],
    color1: '#00D4FF', color2: '#00FF94'
  },
  {
    id: 'library', cat: 'iot', catLabel: 'IoT & Robotics', year: '2024',
    title: 'Intelligent Library Assistance Robot',
    subtitle: 'QR-navigated robotic arm for autonomous book retrieval.',
    desc: 'ESP32 robotic system with QR-based autonomous navigation and a computer vision-guided robotic arm for intelligent book retrieval and inventory management.',
    github: 'https://github.com/tharani165/Intelligent-Library-Assistance-Bot',
    image: 'images/libbot.png',
    tags: ['ESP32', 'OpenCV', 'QR Navigation', 'Servo Control'],
    kpis: [{ l: 'QR Navigation', c: 'orange' }, { l: 'Robotic Arm', c: 'cyan' }, { l: 'CV Guided', c: 'violet' }, { l: 'Inventory', c: 'green' }],
    problem: 'Library staff spend disproportionate time retrieving specific books from large collections. Manual inventory updates are slow and error-prone under high request volumes.',
    solution: 'A robotic system using OpenCV-based QR code navigation for precise positioning between shelving rows, while a servo-driven robotic arm handles book pick-and-place operations. Inventory database updates automatically upon each retrieval.',
    metrics: [{ k: 'QR', l: 'Navigation system' }, { k: 'CV', l: 'Arm guidance' }, { k: 'Auto', l: 'Inventory sync' }],
    features: [
      'QR-code based autonomous navigation to precise shelf coordinates',
      'Computer vision-guided robotic arm for book retrieval',
      'Automated inventory database synchronisation per transaction',
      'Multi-book request queue management'
    ],
    color1: '#7C3AFF', color2: '#FF6B35'
  },
  {
    id: 'gps', cat: 'iot', catLabel: 'IoT & Robotics · Smart Infrastructure', year: '2023',
    title: 'GPS Power Theft Detection System',
    subtitle: 'IEEE-published embedded system for real-time grid anomaly detection.',
    github: 'https://github.com/tharani165/GPS-based-power-theft-detection-and-alert-system-using-GSM',
    image: 'images/power theft.png',
    desc: 'IEEE conference-published smart grid monitoring solution. Arduino-based ACS712 current sensing with GPS theft localisation and GSM instant alert dispatch. Functional hardware prototype validated.',
    tags: ['Arduino UNO', 'GSM', 'GPS', 'ACS712', 'Embedded C'],
    kpis: [{ l: 'IEEE Published', c: 'orange' }, { l: 'GPS Tracking', c: 'cyan' }, { l: 'GSM Alerts', c: 'violet' }, { l: 'Hardware Prototype', c: 'green' }],
    problem: 'Electricity theft causes significant infrastructure revenue loss and grid instability globally. Manual detection is reactive, slow, and cannot pinpoint theft location in real time.',
    solution: 'An embedded system integrating an ACS712 current sensor to detect consumption anomalies, GPS to identify theft location, and a GSM module to dispatch instant SMS alerts to utility operators. A relay module enables automatic power isolation. Hardware prototype validated under simulated theft scenarios. Published as an IEEE conference paper.',
    metrics: [{ k: 'IEEE', l: 'Conference published' }, { k: 'Real-Time', l: 'Anomaly detection' }, { k: 'GPS', l: 'Theft localisation' }],
    features: [
      'Real-time current anomaly detection via ACS712 sensor',
      'GPS-enabled theft location identification',
      'GSM-based instant SMS alert to utility operations centre',
      'Relay-controlled automatic power isolation on detection',
      'LCD local status display with buzzer notification',
      'IEEE conference paper peer-reviewed and published'
    ],
    color1: '#00FF94', color2: '#00D4FF'
  }
];

/* â”€â”€ PROJECT THUMBNAILS â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
function projThumb(p) {
  if (p.image) return `<img src="${p.image}" alt="${p.title}" style="width:100%;height:100%;object-fit:cover;display:block"/>`;
  const thumbs = {
    fred: `
      <rect width="400" height="250" fill="#060810"/>
      <defs><linearGradient id="fg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#7CC4FF" stop-opacity=".2"/><stop offset="100%" stop-color="#A78BFA" stop-opacity=".08"/></linearGradient></defs>
      <rect width="400" height="250" fill="url(#fg)"/>
      <rect x="24" y="60" width="80" height="130" rx="8" fill="rgba(124,196,255,.07)" stroke="rgba(124,196,255,.3)" stroke-width="1"/>
      <text x="64" y="90" text-anchor="middle" font-family="DM Mono,monospace" font-size="7" fill="#7CC4FF">FETCH</text>
      <rect x="30" y="100" width="68" height="7" rx="2" fill="rgba(124,196,255,.2)"/>
      <rect x="30" y="114" width="60" height="7" rx="2" fill="rgba(124,196,255,.15)"/>
      <rect x="30" y="128" width="64" height="7" rx="2" fill="rgba(124,196,255,.1)"/>
      <rect x="30" y="142" width="56" height="7" rx="2" fill="rgba(124,196,255,.08)"/>
      <rect x="160" y="60" width="80" height="130" rx="8" fill="rgba(167,139,250,.07)" stroke="rgba(167,139,250,.3)" stroke-width="1"/>
      <text x="200" y="90" text-anchor="middle" font-family="DM Mono,monospace" font-size="7" fill="#A78BFA">VALIDATE</text>
      <rect x="166" y="100" width="68" height="7" rx="2" fill="rgba(167,139,250,.2)"/>
      <rect x="166" y="114" width="52" height="7" rx="2" fill="rgba(167,139,250,.15)"/>
      <rect x="166" y="128" width="60" height="7" rx="2" fill="rgba(167,139,250,.1)"/>
      <rect x="296" y="60" width="80" height="130" rx="8" fill="rgba(124,255,180,.07)" stroke="rgba(124,255,180,.3)" stroke-width="1"/>
      <text x="336" y="90" text-anchor="middle" font-family="DM Mono,monospace" font-size="7" fill="#7CFFB4">LOAD</text>
      <rect x="302" y="100" width="68" height="7" rx="2" fill="rgba(124,255,180,.2)"/>
      <rect x="302" y="114" width="56" height="7" rx="2" fill="rgba(124,255,180,.15)"/>
      <rect x="302" y="128" width="64" height="7" rx="2" fill="rgba(124,255,180,.1)"/>
      <line x1="104" y1="125" x2="158" y2="125" stroke="rgba(167,139,250,.5)" stroke-width="1.5" stroke-dasharray="4 3"/>
      <line x1="240" y1="125" x2="294" y2="125" stroke="rgba(124,255,180,.5)" stroke-width="1.5" stroke-dasharray="4 3"/>
      <text x="200" y="220" text-anchor="middle" font-family="DM Mono,monospace" font-size="8" fill="rgba(124,196,255,.5)">PostgreSQL Â· Prefect 3 Â· Pandas</text>
      <text x="12" y="24" font-family="DM Mono,monospace" font-size="9" fill="#7CC4FF" letter-spacing="1">FRED ETL Â· MACROECONOMIC DATA</text>`,
    traffic: `
      <rect width="400" height="250" fill="#080810"/>
      <defs><linearGradient id="tg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#FF6B35" stop-opacity=".25"/><stop offset="100%" stop-color="#7C3AFF" stop-opacity=".1"/></linearGradient></defs>
      <rect width="400" height="250" fill="url(#tg)"/>
      <rect x="0" y="108" width="400" height="32" fill="rgba(255,255,255,.04)"/>
      <rect x="0" y="152" width="400" height="32" fill="rgba(255,255,255,.03)"/>
      <line x1="0" y1="140" x2="400" y2="140" stroke="rgba(255,255,255,.07)" stroke-width="1" stroke-dasharray="18 10"/>
      <rect x="28" y="113" width="44" height="20" rx="2" fill="none" stroke="#FF6B35" stroke-width="1.5"/>
      <rect x="28" y="108" width="34" height="8" rx="2" fill="#FF6B35"/>
      <text x="45" y="115" text-anchor="middle" font-family="DM Mono,monospace" font-size="6" fill="white" font-weight="500">CAR 0.97</text>
      <rect x="95" y="113" width="50" height="24" rx="2" fill="none" stroke="#7C3AFF" stroke-width="1.5"/>
      <rect x="95" y="108" width="36" height="8" rx="2" fill="#7C3AFF"/>
      <text x="113" y="115" text-anchor="middle" font-family="DM Mono,monospace" font-size="6" fill="white" font-weight="500">BUS 0.94</text>
      <rect x="170" y="110" width="38" height="20" rx="2" fill="none" stroke="#FF6B35" stroke-width="1.5"/>
      <rect x="170" y="104" width="30" height="9" rx="2" fill="#FF6B35"/>
      <text x="185" y="112" text-anchor="middle" font-family="DM Mono,monospace" font-size="6" fill="white" font-weight="500">CAR 0.91</text>
      <rect x="232" y="156" width="46" height="22" rx="2" fill="none" stroke="#00D4FF" stroke-width="1.5"/>
      <rect x="232" y="150" width="38" height="9" rx="2" fill="#00D4FF"/>
      <text x="255" y="158" text-anchor="middle" font-family="DM Mono,monospace" font-size="6" fill="#080810" font-weight="500">TRUCK 0.88</text>
      <rect x="0" y="0" width="400" height="24" fill="rgba(5,5,7,.88)"/>
      <text x="12" y="15" font-family="DM Mono,monospace" font-size="9" fill="#FF6B35" letter-spacing="1">LIVE DETECT</text>
      <text x="155" y="15" font-family="DM Mono,monospace" font-size="9" fill="rgba(255,107,53,.55)">fps=24.3</text>
      <text x="240" y="15" font-family="DM Mono,monospace" font-size="9" fill="#00FF94">SIHÂ·2024</text>
      <text x="330" y="15" font-family="DM Mono,monospace" font-size="9" fill="rgba(255,107,53,.4)">det=4</text>`,
    vigilant: `
      <rect width="400" height="250" fill="#050510"/>
      <defs><radialGradient id="vg" cx="50%" cy="50%" r="55%"><stop offset="0%" stop-color="#00D4FF" stop-opacity=".12"/><stop offset="100%" stop-color="#7C3AFF" stop-opacity=".04"/></radialGradient></defs>
      <rect width="400" height="250" fill="url(#vg)"/>
      <circle cx="200" cy="125" r="70" fill="none" stroke="rgba(0,212,255,.15)" stroke-width="1" stroke-dasharray="8 4"/>
      <circle cx="200" cy="125" r="48" fill="none" stroke="rgba(0,212,255,.25)" stroke-width="1.5"/>
      <circle cx="200" cy="90" r="18" fill="none" stroke="rgba(0,212,255,.5)" stroke-width="1.5"/>
      <line x1="200" y1="108" x2="200" y2="162" stroke="rgba(0,212,255,.4)" stroke-width="2"/>
      <line x1="168" y1="130" x2="232" y2="130" stroke="rgba(0,212,255,.4)" stroke-width="2"/>
      <text x="200" y="200" text-anchor="middle" font-family="DM Mono,monospace" font-size="10" fill="rgba(0,212,255,.6)" letter-spacing="2">SKELETON DETECTED</text>
      <text x="12" y="24" font-family="DM Mono,monospace" font-size="9" fill="#00D4FF" letter-spacing="1">EDGE AI Â· JETSON NANO</text>
      <text x="280" y="24" font-family="DM Mono,monospace" font-size="9" fill="rgba(124,58,255,.7)">PATENT FILED</text>`,
    medicine: `
      <rect width="400" height="250" fill="#060810"/>
      <defs><linearGradient id="mg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#00FF94" stop-opacity=".14"/><stop offset="100%" stop-color="#00D4FF" stop-opacity=".06"/></linearGradient></defs>
      <rect width="400" height="250" fill="url(#mg)"/>
      <rect x="50" y="50" width="120" height="150" rx="12" fill="rgba(0,255,148,.06)" stroke="rgba(0,255,148,.3)" stroke-width="1.5"/>
      <text x="110" y="95" text-anchor="middle" font-family="DM Mono,monospace" font-size="10" fill="#00FF94">DISPENSER</text>
      <rect x="70" y="108" width="80" height="8" rx="3" fill="rgba(0,255,148,.2)"/>
      <rect x="70" y="124" width="80" height="8" rx="3" fill="rgba(0,255,148,.15)"/>
      <rect x="70" y="140" width="80" height="8" rx="3" fill="rgba(0,255,148,.1)"/>
      <rect x="230" y="70" width="120" height="60" rx="10" fill="rgba(0,212,255,.07)" stroke="rgba(0,212,255,.3)" stroke-width="1.5"/>
      <text x="290" y="94" text-anchor="middle" font-family="DM Mono,monospace" font-size="9" fill="#00D4FF">QR VERIFIED</text>
      <text x="290" y="112" text-anchor="middle" font-family="DM Mono,monospace" font-size="8" fill="rgba(0,212,255,.5)">DOSE CONFIRMED</text>
      <rect x="230" y="150" width="120" height="60" rx="10" fill="rgba(255,107,53,.06)" stroke="rgba(255,107,53,.3)" stroke-width="1.5"/>
      <text x="290" y="174" text-anchor="middle" font-family="DM Mono,monospace" font-size="9" fill="#FF6B35">ALERT SENT</text>
      <text x="290" y="192" text-anchor="middle" font-family="DM Mono,monospace" font-size="8" fill="rgba(255,107,53,.5)">CAREGIVER NOTIFIED</text>
      <text x="12" y="24" font-family="DM Mono,monospace" font-size="9" fill="#00FF94" letter-spacing="1">IEEE YESIST 2024</text>
      <text x="260" y="24" font-family="DM Mono,monospace" font-size="9" fill="rgba(0,255,148,.5)">TOP 3 FINALIST</text>`,
    caremate: `
      <rect width="400" height="250" fill="#080610"/>
      <defs><radialGradient id="cmg" cx="50%" cy="40%" r="50%"><stop offset="0%" stop-color="#7C3AFF" stop-opacity=".12"/><stop offset="100%" stop-color="#FF6B35" stop-opacity=".04"/></radialGradient></defs>
      <rect width="400" height="250" fill="url(#cmg)"/>
      <circle cx="200" cy="110" r="52" fill="rgba(124,58,255,.08)" stroke="rgba(124,58,255,.3)" stroke-width="1.5"/>
      <circle cx="200" cy="90" r="20" fill="rgba(124,58,255,.1)" stroke="rgba(124,58,255,.4)" stroke-width="1.5"/>
      <path d="M168 130 Q200 160 232 130" fill="none" stroke="rgba(124,58,255,.4)" stroke-width="2"/>
      <rect x="50" y="170" width="80" height="36" rx="8" fill="rgba(255,107,53,.08)" stroke="rgba(255,107,53,.25)" stroke-width="1"/>
      <text x="90" y="193" text-anchor="middle" font-family="DM Mono,monospace" font-size="9" fill="#FF6B35">REMINDER</text>
      <rect x="270" y="170" width="80" height="36" rx="8" fill="rgba(0,212,255,.07)" stroke="rgba(0,212,255,.25)" stroke-width="1"/>
      <text x="310" y="193" text-anchor="middle" font-family="DM Mono,monospace" font-size="9" fill="#00D4FF">MONITOR</text>
      <text x="12" y="24" font-family="DM Mono,monospace" font-size="9" fill="#A78BFA" letter-spacing="1">CARE AI Â· VOICE ENABLED</text>`,
    medibot: `
      <rect width="400" height="250" fill="#06080E"/>
      <defs><linearGradient id="mbg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#00D4FF" stop-opacity=".12"/><stop offset="100%" stop-color="#00FF94" stop-opacity=".06"/></linearGradient></defs>
      <rect width="400" height="250" fill="url(#mbg)"/>
      <line x1="50" y1="180" x2="350" y2="180" stroke="rgba(0,212,255,.2)" stroke-width="2"/>
      <line x1="50" y1="180" x2="50" y2="190" stroke="rgba(0,212,255,.3)" stroke-width="2"/>
      <line x1="350" y1="180" x2="350" y2="190" stroke="rgba(0,212,255,.3)" stroke-width="2"/>
      <rect x="160" y="100" width="80" height="80" rx="10" fill="rgba(0,212,255,.08)" stroke="rgba(0,212,255,.4)" stroke-width="1.5"/>
      <circle cx="200" cy="185" r="14" fill="rgba(0,212,255,.1)" stroke="rgba(0,212,255,.4)" stroke-width="1.5"/>
      <circle cx="150" cy="185" r="10" fill="rgba(0,212,255,.1)" stroke="rgba(0,212,255,.3)" stroke-width="1"/>
      <circle cx="250" cy="185" r="10" fill="rgba(0,212,255,.1)" stroke="rgba(0,212,255,.3)" stroke-width="1"/>
      <text x="200" y="148" text-anchor="middle" font-family="DM Mono,monospace" font-size="9" fill="#00D4FF">MEDIBOT</text>
      <text x="12" y="24" font-family="DM Mono,monospace" font-size="9" fill="#00D4FF" letter-spacing="1">AUTONOMOUS Â· ESP32</text>
      <text x="260" y="24" font-family="DM Mono,monospace" font-size="9" fill="rgba(0,212,255,.5)">HOSPITAL GRADE</text>`,
    library: `
      <rect width="400" height="250" fill="#080610"/>
      <defs><radialGradient id="lg" cx="50%" cy="50%" r="55%"><stop offset="0%" stop-color="#7C3AFF" stop-opacity=".12"/><stop offset="100%" stop-color="#FF6B35" stop-opacity=".04"/></radialGradient></defs>
      <rect width="400" height="250" fill="url(#lg)"/>
      <rect x="40" y="80" width="20" height="100" rx="3" fill="rgba(124,58,255,.4)"/>
      <rect x="66" y="95" width="20" height="85" rx="3" fill="rgba(124,58,255,.3)"/>
      <rect x="92" y="70" width="20" height="110" rx="3" fill="rgba(124,58,255,.35)"/>
      <rect x="118" y="88" width="20" height="92" rx="3" fill="rgba(124,58,255,.25)"/>
      <rect x="240" y="80" width="20" height="100" rx="3" fill="rgba(255,107,53,.35)"/>
      <rect x="266" y="90" width="20" height="90" rx="3" fill="rgba(255,107,53,.25)"/>
      <rect x="292" y="75" width="20" height="105" rx="3" fill="rgba(255,107,53,.3)"/>
      <rect x="318" y="92" width="20" height="88" rx="3" fill="rgba(255,107,53,.2)"/>
      <rect x="175" y="90" width="50" height="30" rx="6" fill="rgba(0,212,255,.15)" stroke="rgba(0,212,255,.5)" stroke-width="1.5"/>
      <text x="200" y="110" text-anchor="middle" font-family="DM Mono,monospace" font-size="8" fill="#00D4FF">QR SCAN</text>
      <text x="12" y="24" font-family="DM Mono,monospace" font-size="9" fill="#A78BFA" letter-spacing="1">ROBOT ARM Â· QR NAV</text>`,
    gps: `
      <rect width="400" height="250" fill="#060A08"/>
      <defs><linearGradient id="gg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#00FF94" stop-opacity=".12"/><stop offset="100%" stop-color="#00D4FF" stop-opacity=".06"/></linearGradient></defs>
      <rect width="400" height="250" fill="url(#gg)"/>
      <circle cx="200" cy="115" r="70" fill="none" stroke="rgba(0,255,148,.1)" stroke-width="1"/>
      <circle cx="200" cy="115" r="40" fill="none" stroke="rgba(0,255,148,.15)" stroke-width="1"/>
      <circle cx="200" cy="115" r="15" fill="rgba(0,255,148,.15)" stroke="rgba(0,255,148,.5)" stroke-width="1.5"/>
      <circle cx="260" cy="80" r="8" fill="rgba(255,107,53,.3)" stroke="rgba(255,107,53,.7)" stroke-width="1.5"/>
      <line x1="254" y1="86" x2="214" y2="110" stroke="rgba(255,107,53,.5)" stroke-width="1.5" stroke-dasharray="4 3"/>
      <text x="200" y="200" text-anchor="middle" font-family="DM Mono,monospace" font-size="9" fill="#00FF94">THEFT DETECTED Â· GPS LOCK</text>
      <text x="12" y="24" font-family="DM Mono,monospace" font-size="9" fill="#00FF94" letter-spacing="1">IEEE PUBLISHED Â· SMART GRID</text>`
  };
  return `<svg viewBox="0 0 400 250" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${thumbs[p.id] || `<rect width="400" height="250" fill="#0A0A14"/>`}</svg>`;
}

function tagColor(c) {
  const m = { orange: 'tag-orange', cyan: 'tag-cyan', violet: 'tag-violet', green: 'tag-green' };
  return 'tag ' + (m[c] || '');
}

function renderProjects(filter = 'all') {
  const grid = document.getElementById('projGrid');
  grid.innerHTML = '';
  const list = filter === 'all' ? projects : projects.filter(p => p.cat === filter);
  list.forEach((p, i) => {
    const card = document.createElement('div');
    card.className = 'proj-card';
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'article');
    card.setAttribute('aria-label', `${p.title} â€” ${p.catLabel}`);
    card.innerHTML = `
      <div class="proj-thumb">
        ${projThumb(p)}
        <div class="proj-year">${p.year}</div>
      </div>
      <div class="proj-body">
        <div class="proj-cat-label">${p.catLabel}</div>
        <div class="proj-title">${p.title}</div>
        ${p.subtitle ? `<div class="proj-subtitle">${p.subtitle}</div>` : ''}
        <div class="proj-desc">${p.desc}</div>
        <div class="proj-kpis">${p.kpis.map(k => `<span class="${tagColor(k.c)}">${k.l}</span>`).join('')}</div>
        <div class="proj-tags">${p.tags.map(t => `<span class="tag">${t}</span>`).join('')}</div>
      </div>`;
    const open = () => openModal(p);
    card.addEventListener('click', open);
    card.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); } });
    grid.appendChild(card);
    requestAnimationFrame(() => revObs.observe(card));
  });
}
renderProjects();

document.querySelectorAll('.pf-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.pf-btn').forEach(b => { b.classList.remove('active'); b.setAttribute('aria-pressed', 'false'); });
    btn.classList.add('active');
    btn.setAttribute('aria-pressed', 'true');
    renderProjects(btn.dataset.filter);
  });
});

/* â”€â”€ MODAL â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
const modalBackdrop = document.getElementById('modalBackdrop');
let lastFocused;
function openModal(p) {
  lastFocused = document.activeElement;
  document.getElementById('modalHero').innerHTML = projThumb(p);
  document.getElementById('modalBody').innerHTML = `
    <div class="modal-cat">${p.catLabel} Â· ${p.year}</div>
    <h2 class="modal-title" id="modalTitle">${p.title}</h2>
    ${p.metrics ? `<div class="modal-metrics">${p.metrics.map(m => `<div class="modal-kpi"><div class="mk">${m.k}</div><div class="ml">${m.l}</div></div>`).join('')}</div>` : ''}
    <div class="modal-section"><h4>The Problem</h4><p>${p.problem}</p></div>
    <div class="modal-section"><h4>The Engineering Approach</h4><p>${p.solution}</p></div>
    <div class="modal-section"><h4>Key Technical Features</h4><ul>${p.features.map(f => `<li>${f}</li>`).join('')}</ul></div>
    <div class="modal-section"><h4>Technology Stack</h4><div class="proj-tags" style="margin-top:0">${p.tags.map(t => `<span class="tag">${t}</span>`).join('')}</div></div>
    <div class="modal-actions">
      <a href="${p.github || 'https://github.com/'}" target="_blank" rel="noopener" class="btn btn-primary btn-sm">
        <svg viewBox="0 0 24 24" fill="currentColor" style="width:14px;height:14px" aria-hidden="true"><path d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2.2c-3.3.7-4-1.4-4-1.4-.5-1.4-1.3-1.8-1.3-1.8-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-6 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.7.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .3"/></svg>
        View Repository
      </a>
      <a href="#contact" onclick="closeModal()" class="btn btn-ghost btn-sm">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:14px;height:14px" aria-hidden="true"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><path d="M15 3h6v6M10 14 21 3"/></svg>
        Get in Touch
      </a>
    </div>`;
  modalBackdrop.classList.add('open');
  document.body.style.overflow = 'hidden';
  setTimeout(() => document.getElementById('modalClose')?.focus(), 100);
}
function closeModal() {
  modalBackdrop.classList.remove('open');
  document.body.style.overflow = '';
  lastFocused?.focus();
}
document.getElementById('modalClose').addEventListener('click', closeModal);
modalBackdrop.addEventListener('click', e => { if (e.target === modalBackdrop) closeModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

/* â”€â”€ GITHUB CONTRIBUTION GRAPH â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
(function buildGhGraph() {
  const grid = document.getElementById('ghGrid');
  if (!grid) return;
  const cells = 52 * 7;
  const cols = 52;
  for (let c = 0; c < cols; c++) {
    const col = document.createElement('div');
    col.className = 'gh-col';
    for (let r = 0; r < 7; r++) {
      const cell = document.createElement('div');
      const lvl = Math.random() < 0.35 ? 0 : Math.floor(Math.random() * 4) + 1;
      cell.className = `gh-cell l${lvl}`;
      col.appendChild(cell);
    }
    grid.appendChild(col);
  }
})();

/* â”€â”€ CERTIFICATIONS â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
const certs = [
  { org: 'Google', title: 'Data Analytics Professional Certificate', date: 'Feb 2025' },
  { org: 'IBM', title: 'Python for Data Science & AI', date: 'Nov 2024' },
  { org: 'Coursera', title: 'SQL for Data Science', date: 'Aug 2024' },
  { org: 'Microsoft', title: 'Power BI Data Analyst Associate', date: 'May 2024' },
  { org: 'AWS', title: 'Cloud Practitioner Essentials', date: 'Mar 2024' },
  { org: 'NPTEL', title: 'IoT & Embedded Systems', date: 'Dec 2023' }
];
const certGrid = document.getElementById('certGrid');
const badgeSVG = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="8" r="6"/><path d="m9 14-2 8 5-3 5 3-2-8"/></svg>`;
certs.forEach((c, i) => {
  const el = document.createElement('div');
  el.className = `cert-card reveal${i % 3 === 1 ? ' d1' : i % 3 === 2 ? ' d2' : ''}`;
  el.innerHTML = `
    <div class="cert-top">
      <span class="cert-org">${c.org}</span>
      <span class="cert-badge">${badgeSVG}</span>
    </div>
    <h4>${c.title}</h4>
    <div class="cert-date">Issued Â· ${c.date.toUpperCase()}</div>`;
  certGrid.appendChild(el);
  revObs.observe(el);
});

/* â”€â”€ CONTACT FORM â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
document.getElementById('contactForm').addEventListener('submit', async e => {
  e.preventDefault();
  const note = document.getElementById('formNote');
  const btn = e.target.querySelector('button[type="submit"]');
  btn.disabled = true;
  btn.textContent = 'Sendingâ€¦';
  const action = e.target.action;
  if (action && !action.includes('YOUR_FORMSPREE_ID')) {
    try {
      const res = await fetch(action, { method: 'POST', body: new FormData(e.target), headers: { 'Accept': 'application/json' } });
      if (res.ok) {
        note.innerHTML = '<span class="form-note-dot" style="background:var(--a4)"></span>Message sent â€” I\'ll reply within 24h';
        e.target.reset();
      } else { throw new Error(); }
    } catch {
      note.innerHTML = '<span class="form-note-dot" style="background:var(--a1)"></span>Something went wrong â€” please email directly';
    }
  } else {
    note.innerHTML = '<span class="form-note-dot" style="background:var(--a4)"></span>Connect Formspree for live form submissions';
    e.target.reset();
  }
  btn.disabled = false;
  btn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:15px;height:15px"><path d="M22 2 11 13M22 2l-7 20-4-9-9-4z"/></svg> Send Message`;
  setTimeout(() => { note.innerHTML = '<span class="form-note-dot"></span>Usually replies within 24h Â· IST'; }, 5000);
});
