import { useState, useEffect, useRef } from "react";

const API_KEY_PLACEHOLDER = "";

// ── Data ──────────────────────────────────────────────────────────────────────
const SKILL_CATEGORIES = {
  "💻 Technical": [
    "JavaScript","TypeScript","Python","Java","C++","C#","Go","Rust","Swift","Kotlin",
    "React","Vue","Angular","Node.js","Django","Flask","Spring Boot","HTML/CSS",
    "SQL","MongoDB","PostgreSQL","Redis","Firebase","Supabase",
    "Docker","Kubernetes","AWS","Azure","GCP","Terraform","Linux","CI/CD","Git","REST APIs","GraphQL",
    "Machine Learning","Deep Learning","NLP","Computer Vision","Pandas","Scikit-learn","TensorFlow","PyTorch",
    "Data Visualization","Statistics","Spark","Tableau","Power BI",
    "Network Security","Penetration Testing","SIEM","Incident Response","Malware Analysis",
    "Figma","Wireframing","Prototyping","Design Systems","Framer","Motion Design",
    "Unity","Unreal Engine","Blender","3D Modelling","AR/VR",
    "Blockchain","Solidity","Web3","Smart Contracts",
    "SEO Tools","Google Analytics","Marketing Automation","CRM Software","Salesforce",
  ],
  "🧠 Non-Technical": [
    "Communication","Public Speaking","Presentation Skills","Storytelling","Technical Writing",
    "Leadership","Team Management","Conflict Resolution","Mentoring","Coaching",
    "Critical Thinking","Problem Solving","Decision Making","Analytical Thinking","Research",
    "Project Management","Agile","Scrum","Kanban","Roadmapping","OKRs","Strategic Planning",
    "Stakeholder Management","Client Relations","Negotiation","Networking","Relationship Building",
    "Creativity","Design Thinking","Innovation","Brainstorming","Ideation",
    "Emotional Intelligence","Empathy","Active Listening","Adaptability","Resilience",
    "Time Management","Prioritisation","Organisation","Attention to Detail","Multitasking",
    "Sales","Business Development","Market Research","Competitive Analysis","Go-to-Market Strategy",
    "Content Writing","Copywriting","Editing","Journalism","Social Media Management",
    "Financial Literacy","Budgeting","Forecasting","Accounting","Risk Management",
    "Teaching","Curriculum Design","Facilitation","Workshop Design","E-Learning",
    "Customer Service","User Interviews","Usability Testing","User Research","Feedback Analysis",
    "Event Planning","Community Building","Brand Strategy","PR & Communications",
    "Data Analysis","Excel","Business Analysis","Process Improvement","Operations Management",
  ],
};

const ALL_SKILLS = [
  ...SKILL_CATEGORIES["💻 Technical"],
  ...SKILL_CATEGORIES["🧠 Non-Technical"],
];

const CAREER_PATHS = {
  // ── Technical Careers ─────────────────────────────────────
  "Full-Stack Developer": {
    icon: "⚡",
    color: "#00D9FF",
    category: "Technology",
    demand: 94,
    salary: "$85K–$145K",
    timeline: "6–12 months",
    requiredSkills: ["JavaScript","React","Node.js","SQL","Git","REST APIs","HTML/CSS","TypeScript"],
    niceToHave: ["Docker","AWS","GraphQL","Redis","CI/CD"],
    description: "Build end-to-end web applications across frontend and backend systems.",
    mentors: [
      { name: "Priya Sharma", role: "Sr. Engineer @ Google", exp: "8 yrs", rating: 4.9, avatar: "PS" },
      { name: "Arjun Mehta", role: "Tech Lead @ Flipkart", exp: "10 yrs", rating: 4.8, avatar: "AM" },
    ],
    resources: [
      { title: "The Odin Project", type: "Free", url: "#", hours: 1000 },
      { title: "Full Stack Open (Helsinki)", type: "Free", url: "#", hours: 400 },
      { title: "AWS Certified Dev", type: "Paid", url: "#", hours: 60 },
    ],
  },
  "Data Scientist": {
    icon: "🧠",
    color: "#A855F7",
    category: "Data & AI",
    demand: 97,
    salary: "$90K–$160K",
    timeline: "8–14 months",
    requiredSkills: ["Python","Statistics","Machine Learning","SQL","Data Visualization","Pandas","Scikit-learn"],
    niceToHave: ["Deep Learning","Spark","Tableau","NLP","TensorFlow"],
    description: "Extract insights from complex datasets to drive data-informed decisions.",
    mentors: [
      { name: "Neha Gupta", role: "Data Scientist @ Microsoft", exp: "6 yrs", rating: 4.9, avatar: "NG" },
      { name: "Rahul Kapoor", role: "ML Engineer @ Amazon", exp: "9 yrs", rating: 4.7, avatar: "RK" },
    ],
    resources: [
      { title: "fast.ai Deep Learning", type: "Free", url: "#", hours: 300 },
      { title: "Kaggle Learn", type: "Free", url: "#", hours: 100 },
      { title: "Coursera ML Specialization", type: "Paid", url: "#", hours: 200 },
    ],
  },
  "UX Designer": {
    icon: "✦",
    color: "#FF6B6B",
    category: "Design",
    demand: 88,
    salary: "$70K–$125K",
    timeline: "4–8 months",
    requiredSkills: ["Figma","User Research","Wireframing","Prototyping","Usability Testing","Design Systems","Empathy"],
    niceToHave: ["Motion Design","HTML/CSS","Framer","Storytelling"],
    description: "Craft intuitive, beautiful user experiences that solve real human problems.",
    mentors: [
      { name: "Simran Bedi", role: "Lead UX @ Swiggy", exp: "7 yrs", rating: 4.8, avatar: "SB" },
      { name: "Vikram Nair", role: "Product Designer @ Razorpay", exp: "5 yrs", rating: 4.9, avatar: "VN" },
    ],
    resources: [
      { title: "Google UX Design Certificate", type: "Paid", url: "#", hours: 200 },
      { title: "Nielsen Norman UX Training", type: "Paid", url: "#", hours: 120 },
      { title: "Figma Academy", type: "Free", url: "#", hours: 40 },
    ],
  },
  "Cloud Architect": {
    icon: "☁",
    color: "#34D399",
    category: "Technology",
    demand: 96,
    salary: "$110K–$185K",
    timeline: "10–18 months",
    requiredSkills: ["AWS","Networking","Network Security","Docker","Kubernetes","Terraform","Linux"],
    niceToHave: ["Azure","GCP","CI/CD","Strategic Planning","Problem Solving"],
    description: "Design scalable, resilient cloud infrastructure for enterprise applications.",
    mentors: [
      { name: "Aditya Rao", role: "Cloud Architect @ Infosys", exp: "12 yrs", rating: 4.7, avatar: "AR" },
      { name: "Deepika Singh", role: "DevOps Lead @ TCS", exp: "8 yrs", rating: 4.8, avatar: "DS" },
    ],
    resources: [
      { title: "AWS Solutions Architect", type: "Paid", url: "#", hours: 150 },
      { title: "Linux Foundation CKA", type: "Paid", url: "#", hours: 100 },
      { title: "Terraform Up & Running", type: "Paid", url: "#", hours: 40 },
    ],
  },
  "Cybersecurity Analyst": {
    icon: "🔐",
    color: "#F59E0B",
    category: "Technology",
    demand: 99,
    salary: "$80K–$150K",
    timeline: "8–16 months",
    requiredSkills: ["Network Security","Linux","Python","Penetration Testing","SIEM","Incident Response","Analytical Thinking"],
    niceToHave: ["Malware Analysis","Problem Solving","Communication","Research"],
    description: "Protect organisations from cyber threats through proactive security strategies.",
    mentors: [
      { name: "Karan Joshi", role: "Security Lead @ CERT-In", exp: "11 yrs", rating: 4.9, avatar: "KJ" },
      { name: "Meera Pillai", role: "Ethical Hacker @ HackerOne", exp: "7 yrs", rating: 4.8, avatar: "MP" },
    ],
    resources: [
      { title: "TryHackMe", type: "Free/Paid", url: "#", hours: 500 },
      { title: "CompTIA Security+", type: "Paid", url: "#", hours: 100 },
      { title: "SANS Cyber Courses", type: "Paid", url: "#", hours: 200 },
    ],
  },
  "Product Manager": {
    icon: "◈",
    color: "#EC4899",
    category: "Business & Strategy",
    demand: 91,
    salary: "$95K–$170K",
    timeline: "6–12 months",
    requiredSkills: ["Roadmapping","Data Analysis","Stakeholder Management","Agile","User Research","Strategic Planning","Communication"],
    niceToHave: ["SQL","OKRs","Go-to-Market Strategy","Leadership","Empathy"],
    description: "Lead cross-functional teams to ship products that users love and businesses need.",
    mentors: [
      { name: "Anjali Mishra", role: "Senior PM @ Zomato", exp: "9 yrs", rating: 4.9, avatar: "AM" },
      { name: "Siddharth Patel", role: "Director of Product @ Paytm", exp: "13 yrs", rating: 4.8, avatar: "SP" },
    ],
    resources: [
      { title: "Reforge Growth Series", type: "Paid", url: "#", hours: 200 },
      { title: "PM School", type: "Free/Paid", url: "#", hours: 100 },
      { title: "Lenny's Newsletter", type: "Free", url: "#", hours: 50 },
    ],
  },
  // ── Non-Technical / Hybrid Careers ───────────────────────
  "Business Analyst": {
    icon: "📊",
    color: "#06B6D4",
    category: "Business & Strategy",
    demand: 89,
    salary: "$65K–$110K",
    timeline: "4–8 months",
    requiredSkills: ["Business Analysis","Data Analysis","Stakeholder Management","Communication","Excel","Process Improvement","Requirements Gathering"],
    niceToHave: ["SQL","Power BI","Agile","Project Management","Presentation Skills"],
    description: "Bridge the gap between business needs and technical solutions through data-driven analysis.",
    mentors: [
      { name: "Rohan Verma", role: "Sr. BA @ Deloitte", exp: "8 yrs", rating: 4.8, avatar: "RV" },
      { name: "Preethi Nair", role: "Business Analyst @ Accenture", exp: "6 yrs", rating: 4.7, avatar: "PN" },
    ],
    resources: [
      { title: "IIBA CBAP Certification", type: "Paid", url: "#", hours: 120 },
      { title: "Business Analysis Fundamentals (Udemy)", type: "Paid", url: "#", hours: 80 },
      { title: "Excel for Business Analytics", type: "Free", url: "#", hours: 40 },
    ],
  },
  "Digital Marketing Manager": {
    icon: "📣",
    color: "#F97316",
    category: "Marketing & Growth",
    demand: 87,
    salary: "$55K–$100K",
    timeline: "3–6 months",
    requiredSkills: ["Content Writing","Social Media Management","SEO Tools","Google Analytics","Market Research","Creativity","Communication"],
    niceToHave: ["Marketing Automation","Copywriting","Data Analysis","Brand Strategy","Go-to-Market Strategy"],
    description: "Drive brand growth and customer acquisition across digital channels using data and creativity.",
    mentors: [
      { name: "Divya Krishnan", role: "Growth Lead @ Meesho", exp: "7 yrs", rating: 4.9, avatar: "DK" },
      { name: "Sameer Jain", role: "Digital Marketing Head @ OYO", exp: "9 yrs", rating: 4.8, avatar: "SJ" },
    ],
    resources: [
      { title: "Google Digital Marketing Cert", type: "Free", url: "#", hours: 80 },
      { title: "HubSpot Inbound Marketing", type: "Free", url: "#", hours: 50 },
      { title: "Meta Blueprint", type: "Free", url: "#", hours: 60 },
    ],
  },
  "Project Manager": {
    icon: "🗂",
    color: "#8B5CF6",
    category: "Management & Operations",
    demand: 86,
    salary: "$70K–$130K",
    timeline: "4–8 months",
    requiredSkills: ["Project Management","Stakeholder Management","Risk Management","Communication","Leadership","Agile","Time Management"],
    niceToHave: ["Scrum","Kanban","OKRs","Budgeting","Negotiation","Strategic Planning"],
    description: "Plan, execute, and deliver projects on time and budget while managing diverse teams.",
    mentors: [
      { name: "Kavitha Rajan", role: "PMP Certified PM @ Wipro", exp: "11 yrs", rating: 4.8, avatar: "KR" },
      { name: "Nikhil Sharma", role: "Delivery Manager @ Cognizant", exp: "9 yrs", rating: 4.7, avatar: "NS" },
    ],
    resources: [
      { title: "PMP Certification Prep", type: "Paid", url: "#", hours: 150 },
      { title: "Google Project Management Cert", type: "Paid", url: "#", hours: 180 },
      { title: "Scrum Master Certification", type: "Paid", url: "#", hours: 60 },
    ],
  },
  "Content Strategist": {
    icon: "✍",
    color: "#14B8A6",
    category: "Media & Communications",
    demand: 82,
    salary: "$50K–$95K",
    timeline: "3–6 months",
    requiredSkills: ["Content Writing","Copywriting","Storytelling","SEO Tools","Research","Editing","Communication"],
    niceToHave: ["Social Media Management","Brand Strategy","Google Analytics","Creativity","Presentation Skills"],
    description: "Create and manage compelling content strategies that engage audiences and drive business goals.",
    mentors: [
      { name: "Aisha Bose", role: "Content Head @ Housing.com", exp: "8 yrs", rating: 4.9, avatar: "AB" },
      { name: "Rohit Menon", role: "Brand Strategist @ Wunderman", exp: "10 yrs", rating: 4.8, avatar: "RM" },
    ],
    resources: [
      { title: "Content Marketing Institute", type: "Free", url: "#", hours: 40 },
      { title: "Copyblogger Certification", type: "Paid", url: "#", hours: 60 },
      { title: "SEO Fundamentals (Semrush)", type: "Free", url: "#", hours: 30 },
    ],
  },
  "HR Business Partner": {
    icon: "🤝",
    color: "#F43F5E",
    category: "People & Culture",
    demand: 84,
    salary: "$60K–$110K",
    timeline: "4–8 months",
    requiredSkills: ["Communication","Emotional Intelligence","Conflict Resolution","Stakeholder Management","Leadership","Coaching","Active Listening"],
    niceToHave: ["Data Analysis","Negotiation","Strategic Planning","Mentoring","Facilitation"],
    description: "Partner with business leaders to align people strategy with organisational goals.",
    mentors: [
      { name: "Sunita Rao", role: "HRBP @ Infosys", exp: "12 yrs", rating: 4.8, avatar: "SR" },
      { name: "Tanvir Ahmed", role: "People Partner @ Swiggy", exp: "7 yrs", rating: 4.7, avatar: "TA" },
    ],
    resources: [
      { title: "SHRM Certification Prep", type: "Paid", url: "#", hours: 120 },
      { title: "HR Analytics (Coursera)", type: "Paid", url: "#", hours: 80 },
      { title: "Coaching Skills for Leaders", type: "Free", url: "#", hours: 30 },
    ],
  },
  "Sales Manager": {
    icon: "💼",
    color: "#EAB308",
    category: "Business & Strategy",
    demand: 85,
    salary: "$60K–$120K",
    timeline: "3–6 months",
    requiredSkills: ["Sales","Negotiation","Communication","Client Relations","Business Development","Relationship Building","Persuasion"],
    niceToHave: ["CRM Software","Market Research","Leadership","Data Analysis","Go-to-Market Strategy"],
    description: "Drive revenue growth by building customer relationships and leading high-performing sales teams.",
    mentors: [
      { name: "Rajesh Kumar", role: "VP Sales @ Freshworks", exp: "14 yrs", rating: 4.8, avatar: "RK" },
      { name: "Pooja Agarwal", role: "Sales Director @ Zoho", exp: "10 yrs", rating: 4.9, avatar: "PA" },
    ],
    resources: [
      { title: "Sandler Sales Training", type: "Paid", url: "#", hours: 60 },
      { title: "HubSpot Sales Certification", type: "Free", url: "#", hours: 40 },
      { title: "SPIN Selling Masterclass", type: "Paid", url: "#", hours: 30 },
    ],
  },
  "Learning & Development Specialist": {
    icon: "🎓",
    color: "#10B981",
    category: "Education & Training",
    demand: 80,
    salary: "$55K–$95K",
    timeline: "4–8 months",
    requiredSkills: ["Teaching","Curriculum Design","Facilitation","Communication","Coaching","E-Learning","Presentation Skills"],
    niceToHave: ["Instructional Design","Workshop Design","Data Analysis","Creativity","Empathy"],
    description: "Design and deliver learning programmes that upskill employees and drive organisational growth.",
    mentors: [
      { name: "Meenakshi Iyer", role: "L&D Head @ Tata Motors", exp: "13 yrs", rating: 4.9, avatar: "MI" },
      { name: "Aryan Bhat", role: "Learning Designer @ Byju's", exp: "6 yrs", rating: 4.7, avatar: "AB" },
    ],
    resources: [
      { title: "ATD Instructional Design", type: "Paid", url: "#", hours: 100 },
      { title: "Articulate Storyline Basics", type: "Free", url: "#", hours: 40 },
      { title: "Coaching Certification (ICF)", type: "Paid", url: "#", hours: 120 },
    ],
  },
  "Operations Manager": {
    icon: "⚙",
    color: "#6366F1",
    category: "Management & Operations",
    demand: 88,
    salary: "$65K–$120K",
    timeline: "5–10 months",
    requiredSkills: ["Operations Management","Process Improvement","Leadership","Decision Making","Stakeholder Management","Time Management","Analytical Thinking"],
    niceToHave: ["Agile","Budgeting","Risk Management","Excel","Data Analysis","Strategic Planning"],
    description: "Optimise business processes and lead operational teams to deliver efficiency and scale.",
    mentors: [
      { name: "Harsh Gupta", role: "COO @ Urban Company", exp: "15 yrs", rating: 4.8, avatar: "HG" },
      { name: "Lalitha Venkat", role: "Ops Head @ Ola", exp: "10 yrs", rating: 4.7, avatar: "LV" },
    ],
    resources: [
      { title: "Operations Management (Coursera)", type: "Paid", url: "#", hours: 100 },
      { title: "Lean Six Sigma Green Belt", type: "Paid", url: "#", hours: 80 },
      { title: "Business Process Management", type: "Free", url: "#", hours: 40 },
    ],
  },
  "Public Relations Specialist": {
    icon: "📢",
    color: "#FB7185",
    category: "Media & Communications",
    demand: 78,
    salary: "$45K–$85K",
    timeline: "3–6 months",
    requiredSkills: ["Communication","Storytelling","Writing","Editing","Networking","Relationship Building","PR & Communications"],
    niceToHave: ["Social Media Management","Brand Strategy","Crisis Communication","Journalism","Event Planning"],
    description: "Shape public perception and manage brand reputation through strategic communication.",
    mentors: [
      { name: "Natasha Pillai", role: "PR Director @ Weber Shandwick", exp: "11 yrs", rating: 4.8, avatar: "NP" },
      { name: "Vikram Doshi", role: "Comms Head @ Tata Group", exp: "14 yrs", rating: 4.9, avatar: "VD" },
    ],
    resources: [
      { title: "PRSA APR Certification", type: "Paid", url: "#", hours: 80 },
      { title: "Crisis Communication (LinkedIn Learning)", type: "Paid", url: "#", hours: 30 },
      { title: "Media Relations Masterclass", type: "Free", url: "#", hours: 25 },
    ],
  },
  "Financial Analyst": {
    icon: "📈",
    color: "#22D3EE",
    category: "Finance & Accounting",
    demand: 90,
    salary: "$70K–$130K",
    timeline: "5–10 months",
    requiredSkills: ["Financial Literacy","Budgeting","Forecasting","Excel","Data Analysis","Analytical Thinking","Accounting"],
    niceToHave: ["Power BI","SQL","Risk Management","Communication","Presentation Skills"],
    description: "Evaluate financial data to guide investment decisions and business strategy.",
    mentors: [
      { name: "Chirag Shah", role: "Financial Analyst @ Goldman Sachs", exp: "8 yrs", rating: 4.9, avatar: "CS" },
      { name: "Ritu Malhotra", role: "FP&A Lead @ HDFC", exp: "11 yrs", rating: 4.8, avatar: "RM" },
    ],
    resources: [
      { title: "CFA Level 1 Prep", type: "Paid", url: "#", hours: 300 },
      { title: "Financial Modeling (CFI)", type: "Paid", url: "#", hours: 100 },
      { title: "Excel for Finance", type: "Free", url: "#", hours: 30 },
    ],
  },
  "Game Developer": {
    icon: "🎮",
    color: "#7C3AED",
    category: "Creative Technology",
    demand: 85,
    salary: "$65K–$125K",
    timeline: "8–14 months",
    requiredSkills: ["Unity","C#","3D Modelling","Problem Solving","Creativity","Git","Game Design"],
    niceToHave: ["Unreal Engine","Blender","AR/VR","Python","Storytelling"],
    description: "Design and build interactive game experiences across mobile, PC, and emerging platforms.",
    mentors: [
      { name: "Arjun Das", role: "Senior Dev @ Nazara Games", exp: "9 yrs", rating: 4.8, avatar: "AD" },
      { name: "Sneha Kulkarni", role: "Unity Developer @ Dream11", exp: "6 yrs", rating: 4.7, avatar: "SK" },
    ],
    resources: [
      { title: "Unity Learn (Official)", type: "Free", url: "#", hours: 400 },
      { title: "Unreal Engine Beginner Course", type: "Free", url: "#", hours: 200 },
      { title: "Game Design Fundamentals (Coursera)", type: "Paid", url: "#", hours: 60 },
    ],
  },
};

// ── Helpers ───────────────────────────────────────────────────────────────────
// Case-insensitive skill match helper
function skillMatch(a, b) {
  return a.toLowerCase().trim() === b.toLowerCase().trim();
}

function computeMatch(userSkills, path) {
  const req = path.requiredSkills;
  const nice = path.niceToHave || [];
  // Count required matches (case-insensitive)
  const reqMatched = userSkills.filter(us => req.some(rs => skillMatch(us, rs)));
  const baseScore = (reqMatched.length / req.length) * 100;
  // Bonus for nice-to-have matches (up to 10 extra points)
  const niceMatched = userSkills.filter(us => nice.some(ns => skillMatch(us, ns)));
  const bonus = Math.min(10, (niceMatched.length / Math.max(nice.length, 1)) * 10);
  return Math.min(100, Math.round(baseScore + bonus));
}

function getGaps(userSkills, path) {
  return path.requiredSkills.filter(req => !userSkills.some(us => skillMatch(us, req)));
}

function getMatchedSkills(userSkills, path) {
  return path.requiredSkills.filter(req => userSkills.some(us => skillMatch(us, req)));
}

function getMatchedNiceToHave(userSkills, path) {
  return (path.niceToHave || []).filter(ns => userSkills.some(us => skillMatch(us, ns)));
}

// Identify custom/unrecognised skills not in any known path
function getCustomSkillsOnly(userSkills) {
  const allKnown = Object.values(CAREER_PATHS).flatMap(p => [...p.requiredSkills, ...(p.niceToHave || [])]);
  return userSkills.filter(us => !allKnown.some(ks => skillMatch(us, ks)));
}

// ── Sub-components ────────────────────────────────────────────────────────────
function RadarChart({ skills, pathSkills, color }) {
  const size = 200;
  const cx = size / 2, cy = size / 2, r = 75;
  const pts = pathSkills.slice(0, 7);
  const n = pts.length;

  const angle = (i) => (Math.PI * 2 * i) / n - Math.PI / 2;
  const toXY = (i, radius) => ({
    x: cx + radius * Math.cos(angle(i)),
    y: cy + radius * Math.sin(angle(i)),
  });

  const gridPoly = (rad) =>
    pts.map((_, i) => `${toXY(i, rad).x},${toXY(i, rad).y}`).join(" ");

  const userPoly = pts
    .map((skill, i) => {
      const has = skills.includes(skill);
      const rad = has ? r : r * 0.2;
      return `${toXY(i, rad).x},${toXY(i, rad).y}`;
    })
    .join(" ");

  return (
    <svg width={size} height={size} style={{ overflow: "visible" }}>
      {[0.25, 0.5, 0.75, 1].map((f) => (
        <polygon key={f} points={gridPoly(r * f)}
          fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
      ))}
      {pts.map((_, i) => {
        const outer = toXY(i, r);
        return <line key={i} x1={cx} y1={cy} x2={outer.x} y2={outer.y}
          stroke="rgba(255,255,255,0.08)" strokeWidth="1" />;
      })}
      <polygon points={userPoly} fill={color + "40"} stroke={color} strokeWidth="2" />
      {pts.map((skill, i) => {
        const pos = toXY(i, r + 18);
        const has = skills.includes(skill);
        return (
          <text key={i} x={pos.x} y={pos.y} textAnchor="middle" dominantBaseline="middle"
            fontSize="8" fill={has ? color : "rgba(255,255,255,0.35)"} fontFamily="'DM Sans', sans-serif">
            {skill.length > 9 ? skill.slice(0, 8) + "…" : skill}
          </text>
        );
      })}
    </svg>
  );
}

function ProgressBar({ value, color, label }) {
  const [w, setW] = useState(0);
  useEffect(() => { const t = setTimeout(() => setW(value), 100); return () => clearTimeout(t); }, [value]);
  return (
    <div style={{ marginBottom: 12 }}>
      {label && <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
        <span style={{ fontSize: 12, color: "rgba(255,255,255,0.55)" }}>{label}</span>
        <span style={{ fontSize: 12, color, fontWeight: 700 }}>{value}%</span>
      </div>}
      <div style={{ background: "rgba(255,255,255,0.07)", borderRadius: 99, height: 6, overflow: "hidden" }}>
        <div style={{ width: `${w}%`, height: "100%", background: `linear-gradient(90deg, ${color}88, ${color})`,
          borderRadius: 99, transition: "width 1.2s cubic-bezier(.4,0,.2,1)" }} />
      </div>
    </div>
  );
}

function SkillTag({ skill, selected, onClick, matchColor }) {
  return (
    <button onClick={() => onClick(skill)} style={{
      padding: "6px 14px", borderRadius: 99, border: selected ? `1.5px solid ${matchColor || "#00D9FF"}` : "1.5px solid rgba(255,255,255,0.12)",
      background: selected ? (matchColor || "#00D9FF") + "22" : "rgba(255,255,255,0.04)",
      color: selected ? (matchColor || "#00D9FF") : "rgba(255,255,255,0.55)",
      fontSize: 12, fontFamily: "'DM Sans', sans-serif", cursor: "pointer",
      transition: "all .2s", fontWeight: selected ? 600 : 400,
    }}>{skill}</button>
  );
}

// ── Main App ──────────────────────────────────────────────────────────────────
export default function App() {
  const [step, setStep] = useState("onboard"); // onboard | dashboard | path | mentor | ai-chat
  const [userName, setUserName] = useState("");
  const [userLevel, setUserLevel] = useState("");
  const [userGoal, setUserGoal] = useState("");
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [activePath, setActivePath] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [dashCatFilter, setDashCatFilter] = useState("All");
  const [customSkills, setCustomSkills] = useState([]);
  const [customInput, setCustomInput] = useState("");
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [activeSkillCat, setActiveSkillCat] = useState("💻 Technical");
  const customInputRef = useRef(null);

  function addCustomSkill() {
    const trimmed = customInput.trim();
    if (!trimmed) return;
    const formatted = trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
    if (!customSkills.includes(formatted) && !ALL_SKILLS.includes(formatted)) {
      setCustomSkills(function(prev) { return [...prev, formatted]; });
      setSelectedSkills(function(prev) { return [...prev, formatted]; });
    } else if (!selectedSkills.includes(formatted)) {
      setSelectedSkills(function(prev) { return [...prev, formatted]; });
    }
    setCustomInput("");
  }
  const chatEndRef = useRef(null);

  const sortedPaths = Object.entries(CAREER_PATHS)
    .map(([name, data]) => ({ name, ...data, match: computeMatch(selectedSkills, data) }))
    .sort((a, b) => b.match - a.match);

  const topPath = sortedPaths[0];

  function toggleSkill(skill) {
    setSelectedSkills(p => p.includes(skill) ? p.filter(s => s !== skill) : [...p, skill]);
  }

  async function sendChat(msg) {
    if (!msg.trim()) return;
    const userMsg = { role: "user", content: msg };
    const history = [...chatMessages, userMsg];
    setChatMessages(history);
    setChatInput("");
    setChatLoading(true);

    const customOnly = getCustomSkillsOnly(selectedSkills);
    const allScores = sortedPaths.map(p => p.name + " " + p.match + "% (" + p.category + ")").join(", ");
    const topNonTech = sortedPaths.filter(p => ["Business & Strategy","Management & Operations","People & Culture","Media & Communications","Finance & Accounting","Education & Training","Marketing & Growth"].includes(p.category))[0];
    const systemPrompt = `You are CareerIQ — an expert career counsellor for the Intelligent Career & Skill Mapping platform.
User: ${userName || "Learner"}, Level: ${userLevel}, Goal: ${userGoal || "not specified"}.
All skills: ${selectedSkills.join(", ") || "none listed"}.
Custom/unlisted skills: ${customOnly.length > 0 ? customOnly.join(", ") : "none"}.
Career match scores (name, match%, category): ${allScores}.
Top overall match: ${topPath && topPath.name} (${topPath && topPath.match}%).
Top non-technical career match: ${topNonTech ? topNonTech.name + " (" + topNonTech.match + "%)" : "none"}.
Skill gaps for top match: ${topPath ? getGaps(selectedSkills, topPath).join(", ") : "none"}.
The platform now covers both technical careers (Full-Stack, Data Science, Cloud, Security, etc.) and non-technical careers (Business Analyst, Digital Marketing, Project Manager, Content Strategist, HR, Sales, L&D, Operations, PR, Finance, Game Dev). 
Analyse ALL the user's skills holistically — technical AND soft/non-technical. Highlight if the user has strong non-technical skills that open specific non-technical career paths. If the user has custom skills, factor them in too. Be concise (3–5 sentences), warm, and specific. Use plain text, no markdown.`;

    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "anthropic-version": "2023-06-01",
          "anthropic-dangerous-direct-browser-access": "true",
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: systemPrompt,
          messages: history.map(function(m) { return { role: m.role, content: m.content }; }),
        }),
      });
      if (!res.ok) {
        const errData = await res.json().catch(function() { return {}; });
        throw new Error((errData.error && errData.error.message) || "API error " + res.status);
      }
      const data = await res.json();
      const textBlock = data.content && data.content.find(function(b) { return b.type === "text"; });
      const reply = (textBlock && textBlock.text) || "I'm here to help — ask me anything about your career path!";
      setChatMessages([...history, { role: "assistant", content: reply }]);
    } catch (err) {
      const errMsg = err && err.message ? err.message : "Something went wrong";
      setChatMessages([...history, { role: "assistant", content: "Sorry, I ran into an issue: " + errMsg + ". Please try again!" }]);
    }
    setChatLoading(false);
  }

  useEffect(() => { chatEndRef.current && chatEndRef.current.scrollIntoView({ behavior: "smooth" }); }, [chatMessages, chatLoading]);

  // ── Styles ──────────────────────────────────────────────────────────────────
  const S = {
    app: {
      minHeight: "100vh", background: "#080C14",
      fontFamily: "'DM Sans', sans-serif", color: "#fff",
      backgroundImage: `radial-gradient(ellipse 80% 50% at 50% -20%, rgba(0,217,255,0.07) 0%, transparent 70%)`,
    },
    nav: {
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "20px 40px", borderBottom: "1px solid rgba(255,255,255,0.06)",
      position: "sticky", top: 0, background: "rgba(8,12,20,0.92)", backdropFilter: "blur(20px)", zIndex: 100,
    },
    logo: { fontSize: 20, fontWeight: 800, letterSpacing: "-0.5px",
      background: "linear-gradient(135deg, #00D9FF, #A855F7)", WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent" },
    btn: (color = "#00D9FF", sm) => ({
      padding: sm ? "8px 20px" : "12px 28px", borderRadius: 10,
      background: `linear-gradient(135deg, ${color}22, ${color}11)`,
      border: `1px solid ${color}55`, color, fontWeight: 700, fontSize: sm ? 13 : 14,
      cursor: "pointer", transition: "all .2s", fontFamily: "'DM Sans', sans-serif",
    }),
    btnSolid: (color = "#00D9FF") => ({
      padding: "12px 28px", borderRadius: 10, background: color,
      border: "none", color: "#080C14", fontWeight: 800, fontSize: 14,
      cursor: "pointer", fontFamily: "'DM Sans', sans-serif", transition: "all .2s",
    }),
    card: (accent) => ({
      background: "rgba(255,255,255,0.03)", border: `1px solid ${accent ? accent + "30" : "rgba(255,255,255,0.08)"}`,
      borderRadius: 20, padding: 28, transition: "all .3s",
    }),
    input: {
      background: "rgba(255,255,255,0.05)", border: "1.5px solid rgba(255,255,255,0.1)",
      borderRadius: 12, padding: "14px 18px", color: "#fff", fontSize: 15,
      fontFamily: "'DM Sans', sans-serif", outline: "none", width: "100%", boxSizing: "border-box",
    },
    section: { maxWidth: 1100, margin: "0 auto", padding: "0 24px" },
    tag: (color) => ({
      display: "inline-flex", alignItems: "center", gap: 6,
      padding: "4px 12px", borderRadius: 99, fontSize: 11, fontWeight: 700,
      background: color + "22", color, border: `1px solid ${color}44`,
    }),
  };

  // ── Onboard ─────────────────────────────────────────────────────────────────
  if (step === "onboard") return (
    <div style={S.app}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=Syne:wght@700;800&display=swap" rel="stylesheet" />
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
        <div style={{ width: "100%", maxWidth: 560 }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: 3, color: "#00D9FF", marginBottom: 16, textTransform: "uppercase" }}>Intelligent Career Platform</div>
            <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(36px,6vw,56px)", fontWeight: 800, lineHeight: 1.1, margin: "0 0 16px",
              background: "linear-gradient(160deg, #fff 40%, rgba(255,255,255,0.4))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Map Your Path to<br />Your Dream Career
            </h1>
            <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 16, lineHeight: 1.7 }}>
              AI-powered skill analysis, personalised career pathways, and expert mentorship — all in one platform.
            </p>
          </div>

          <div style={{ ...S.card(), padding: 36, display: "flex", flexDirection: "column", gap: 20 }}>
            <div>
              <label style={{ fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: 1, display: "block", marginBottom: 8 }}>Your Name</label>
              <input style={S.input} placeholder="e.g. Priya Sharma" value={userName} onChange={e => setUserName(e.target.value)} />
            </div>
            <div>
              <label style={{ fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: 1, display: "block", marginBottom: 8 }}>Experience Level</label>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                {["Student", "Early Career (0–2 yrs)", "Mid-Level (3–6 yrs)", "Career Switch"].map(l => (
                  <button key={l} onClick={() => setUserLevel(l)} style={{
                    padding: "9px 18px", borderRadius: 10, fontSize: 13, fontWeight: 600, cursor: "pointer",
                    fontFamily: "'DM Sans', sans-serif", transition: "all .2s",
                    border: userLevel === l ? "1.5px solid #00D9FF" : "1.5px solid rgba(255,255,255,0.1)",
                    background: userLevel === l ? "#00D9FF22" : "rgba(255,255,255,0.04)",
                    color: userLevel === l ? "#00D9FF" : "rgba(255,255,255,0.5)",
                  }}>{l}</button>
                ))}
              </div>
            </div>
            <div>
              <label style={{ fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: 1, display: "block", marginBottom: 8 }}>Career Goal</label>
              <input style={S.input} placeholder="e.g. Become a Data Scientist at a product company" value={userGoal} onChange={e => setUserGoal(e.target.value)} />
            </div>
            <button
              disabled={!userName || !userLevel}
              onClick={() => setStep("skills")}
              style={{ ...S.btnSolid("#00D9FF"), padding: "16px", fontSize: 16, marginTop: 8, opacity: (!userName || !userLevel) ? 0.4 : 1 }}>
              Start Skill Mapping →
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // ── Skills Selection ─────────────────────────────────────────────────────────
  if (step === "skills") return (
    <div style={S.app}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=Syne:wght@700;800&display=swap" rel="stylesheet" />
      <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start", padding: "40px 24px 60px" }}>
        <div style={{ width: "100%", maxWidth: 820 }}>
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <div style={{ width: 52, height: 52, borderRadius: 14, background: "#00D9FF22", border: "1.5px solid #00D9FF44",
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, margin: "0 auto 16px" }}>⚡</div>
            <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 32, fontWeight: 800, margin: "0 0 8px" }}>Select Your Current Skills</h2>
            <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 15 }}>Pick everything you're comfortable with — technical and non-technical both count!</p>
          </div>

          {/* Category tabs */}
          <div style={{ display: "flex", gap: 8, marginBottom: 20, background: "rgba(255,255,255,0.04)", borderRadius: 14, padding: 5 }}>
            {Object.keys(SKILL_CATEGORIES).map(cat => {
              const count = SKILL_CATEGORIES[cat].filter(s => selectedSkills.includes(s)).length;
              return (
                <button key={cat} onClick={() => setActiveSkillCat(cat)} style={{
                  flex: 1, padding: "11px 16px", borderRadius: 10, border: "none", cursor: "pointer",
                  fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 14, transition: "all .2s",
                  background: activeSkillCat === cat ? (cat === "💻 Technical" ? "#00D9FF" : "#A855F7") : "transparent",
                  color: activeSkillCat === cat ? "#080C14" : "rgba(255,255,255,0.45)",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                }}>
                  {cat}
                  {count > 0 && <span style={{
                    background: activeSkillCat === cat ? "rgba(8,12,20,0.25)" : (cat === "💻 Technical" ? "#00D9FF22" : "#A855F722"),
                    color: activeSkillCat === cat ? "#080C14" : (cat === "💻 Technical" ? "#00D9FF" : "#A855F7"),
                    borderRadius: 99, fontSize: 11, fontWeight: 800, padding: "1px 8px",
                  }}>{count}</span>}
                </button>
              );
            })}
          </div>

          <div style={{ ...S.card(), padding: 28, marginBottom: 16 }}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {SKILL_CATEGORIES[activeSkillCat].map(s => (
                <SkillTag key={s} skill={s} selected={selectedSkills.includes(s)} onClick={toggleSkill}
                  matchColor={activeSkillCat === "💻 Technical" ? "#00D9FF" : "#A855F7"} />
              ))}
              {activeSkillCat === "🧠 Non-Technical" && customSkills.map(s => (
                <div key={s} style={{ position: "relative", display: "inline-flex", alignItems: "center" }}>
                  <SkillTag skill={s} selected={selectedSkills.includes(s)} onClick={toggleSkill} matchColor="#A855F7" />
                  <button onClick={() => { setCustomSkills(prev => prev.filter(c => c !== s)); setSelectedSkills(prev => prev.filter(c => c !== s)); }} style={{
                    position: "absolute", top: -6, right: -6, width: 16, height: 16, borderRadius: 99,
                    background: "#FF6B6B", border: "none", color: "#fff", fontSize: 9, fontWeight: 800,
                    cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", lineHeight: 1,
                  }}>✕</button>
                </div>
              ))}
            </div>
          </div>

          {/* Add custom skill */}
          <div style={{ ...S.card(), padding: 20, marginBottom: 16, border: "1.5px dashed rgba(168,85,247,0.35)", background: "rgba(168,85,247,0.04)" }}>
            {!showCustomInput ? (
              <button onClick={() => setShowCustomInput(true)} style={{
                display: "flex", alignItems: "center", gap: 10, background: "transparent", border: "none",
                color: "#A855F7", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 14,
              }}>
                <span style={{ width: 28, height: 28, borderRadius: 8, background: "#A855F722", border: "1.5px solid #A855F744",
                  display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>+</span>
                Add a skill not in the list
              </button>
            ) : (
              <div>
                <div style={{ fontSize: 12, fontWeight: 700, color: "rgba(168,85,247,0.8)", textTransform: "uppercase", letterSpacing: 1, marginBottom: 10 }}>Add Custom Skill</div>
                <div style={{ display: "flex", gap: 10 }}>
                  <input
                    ref={customInputRef}
                    autoFocus
                    style={{ flex: 1, background: "rgba(255,255,255,0.05)", border: "1.5px solid rgba(168,85,247,0.4)",
                      borderRadius: 10, padding: "10px 16px", color: "#fff", fontSize: 14,
                      fontFamily: "'DM Sans', sans-serif", outline: "none" }}
                    placeholder="e.g. Blender, AutoCAD, Solidity…"
                    value={customInput}
                    onChange={e => setCustomInput(e.target.value)}
                    onKeyDown={e => { if (e.key === "Enter") { addCustomSkill(); } if (e.key === "Escape") { setShowCustomInput(false); setCustomInput(""); } }}
                  />
                  <button onClick={addCustomSkill} style={{
                    padding: "10px 20px", borderRadius: 10, background: "#A855F7", border: "none",
                    color: "#fff", fontWeight: 700, fontSize: 14, cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
                  }}>Add</button>
                  <button onClick={() => { setShowCustomInput(false); setCustomInput(""); }} style={{
                    padding: "10px 16px", borderRadius: 10, background: "rgba(255,255,255,0.06)", border: "1.5px solid rgba(255,255,255,0.1)",
                    color: "rgba(255,255,255,0.4)", fontWeight: 600, fontSize: 13, cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
                  }}>Cancel</button>
                </div>
                {customSkills.length > 0 && (
                  <div style={{ marginTop: 12, display: "flex", flexWrap: "wrap", gap: 6 }}>
                    <span style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", alignSelf: "center" }}>Custom added:</span>
                    {customSkills.map(s => <span key={s} style={{ padding: "3px 10px", borderRadius: 99, fontSize: 11, fontWeight: 600, background: "#A855F722", color: "#A855F7", border: "1px solid #A855F744" }}>{s}</span>)}
                  </div>
                )}
              </div>
            )}
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 14 }}>{selectedSkills.length} skills selected</span>
              {customSkills.length > 0 && <span style={{ color: "#A855F7", fontSize: 12, fontWeight: 600 }}>+ {customSkills.length} custom skill{customSkills.length > 1 ? "s" : ""}</span>}
            </div>
            <button onClick={() => setStep("dashboard")} style={S.btnSolid("#00D9FF")}>
              Analyse My Career Fit →
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // ── Dashboard ────────────────────────────────────────────────────────────────
  const currentPath = activePath ? CAREER_PATHS[activePath] : null;

  return (
    <div style={S.app}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=Syne:wght@700;800&display=swap" rel="stylesheet" />

      {/* NAV */}
      <nav style={S.nav}>
        <div style={S.logo}>CareerIQ</div>
        <div style={{ display: "flex", gap: 8 }}>
          {["dashboard", "path", "mentor", "ai-chat"].map(s => (
            <button key={s} onClick={() => setStep(s)} style={{
              ...S.btn("#00D9FF", true),
              background: step === s ? "#00D9FF22" : "transparent",
              border: step === s ? "1px solid #00D9FF55" : "1px solid transparent",
              color: step === s ? "#00D9FF" : "rgba(255,255,255,0.4)",
            }}>
              {{ dashboard: "🗺 Overview", path: "🎯 Career Path", mentor: "👥 Mentors", "ai-chat": "✦ AI Advisor" }[s]}
            </button>
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 36, height: 36, borderRadius: 99, background: "linear-gradient(135deg, #00D9FF, #A855F7)",
            display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 800, color: "#080C14" }}>
            {(userName || "U")[0].toUpperCase()}
          </div>
          <button onClick={() => { setStep("onboard"); setSelectedSkills([]); setActivePath(null); }}
            style={{ ...S.btn("rgba(255,255,255,0.3)", true), fontSize: 11 }}>← Reset</button>
        </div>
      </nav>

      {/* ── OVERVIEW ── */}
      {step === "dashboard" && (
        <div style={{ ...S.section, paddingTop: 40, paddingBottom: 60 }}>
          {/* Hero */}
          <div style={{ marginBottom: 40 }}>
            <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(24px,3vw,38px)", fontWeight: 800, margin: "0 0 8px" }}>
              Welcome back, <span style={{ background: "linear-gradient(135deg,#00D9FF,#A855F7)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{userName}</span> ✦
            </h1>
            <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 15 }}>
              {userLevel} · {selectedSkills.length} skills mapped · Goal: {userGoal || "Explore career paths"}
            </p>
          </div>

          {/* Stats row */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 16, marginBottom: 36 }}>
            {[
              { label: "Skills Mapped", value: selectedSkills.length + (getCustomSkillsOnly(selectedSkills).length > 0 ? " (+" + getCustomSkillsOnly(selectedSkills).length + " custom)" : ""), color: "#00D9FF", icon: "⚡" },
              { label: "Top Match", value: `${topPath && topPath.match}%`, color: "#A855F7", icon: "🎯" },
              { label: "Best Fit Role", value: topPath && topPath.name && topPath.name.split(" ").slice(0,2).join(" "), color: "#34D399", icon: "✦" },
              { label: "Est. Salary", value: topPath && topPath.salary, color: "#F59E0B", icon: "◈" },
            ].map(stat => (
              <div key={stat.label} style={{ ...S.card(stat.color), textAlign: "center" }}>
                <div style={{ fontSize: 24, marginBottom: 8 }}>{stat.icon}</div>
                <div style={{ fontSize: "clamp(18px,2vw,26px)", fontWeight: 800, color: stat.color, fontFamily: "'Syne',sans-serif" }}>{stat.value}</div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", marginTop: 4 }}>{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Career Cards */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, flexWrap: "wrap", gap: 12 }}>
            <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: 22, fontWeight: 800, margin: 0 }}>Your Career Fit Ranking</h2>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {["All", ...Array.from(new Set(sortedPaths.map(p => p.category)))].map(cat => (
                <button key={cat} onClick={() => setDashCatFilter(cat)} style={{
                  padding: "6px 14px", borderRadius: 99, fontSize: 12, fontWeight: 700, cursor: "pointer",
                  fontFamily: "'DM Sans', sans-serif", border: "1.5px solid rgba(255,255,255,0.12)", transition: "all .2s",
                  background: dashCatFilter === cat ? "rgba(255,255,255,0.12)" : "transparent",
                  color: dashCatFilter === cat ? "#fff" : "rgba(255,255,255,0.4)",
                }}>{cat}</button>
              ))}
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: 16 }}>
            {sortedPaths.filter(p => dashCatFilter === "All" || p.category === dashCatFilter).map((path, idx) => (
              <div key={path.name} onClick={() => { setActivePath(path.name); setStep("path"); }}
                style={{ ...S.card(path.color), cursor: "pointer", position: "relative", overflow: "hidden" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ width: 44, height: 44, borderRadius: 12, background: path.color + "22", border: `1.5px solid ${path.color}44`,
                      display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>{path.icon}</div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 15, lineHeight: 1.3 }}>{path.name}</div>
                      <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", marginTop: 2 }}>{path.salary}</div>
                    </div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4, flexShrink: 0 }}>
                    {idx === 0 && dashCatFilter === "All" && <div style={{ ...S.tag(path.color), fontSize: 9 }}>🏆 Best</div>}
                    <span style={{ ...S.tag("rgba(255,255,255,0.3)"), fontSize: 9, color: "rgba(255,255,255,0.4)" }}>{path.category}</span>
                  </div>
                </div>
                <ProgressBar value={path.match} color={path.color} label="Skill Match" />
                <div style={{ display: "flex", gap: 6, marginTop: 10, flexWrap: "wrap" }}>
                  {getGaps(selectedSkills, path).slice(0, 2).map(g => (
                    <span key={g} style={{ ...S.tag("#FF6B6B"), fontSize: 10 }}>− {g}</span>
                  ))}
                  {getGaps(selectedSkills, path).length === 0 && <span style={{ ...S.tag(path.color), fontSize: 10 }}>✓ All matched!</span>}
                  {getMatchedNiceToHave(selectedSkills, path).length > 0 && (
                    <span style={{ ...S.tag("#F59E0B"), fontSize: 10 }}>⭐ +{getMatchedNiceToHave(selectedSkills, path).length} bonus</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── CAREER PATH ── */}
      {step === "path" && (
        <div style={{ ...S.section, paddingTop: 40, paddingBottom: 60 }}>
          {/* Selector grouped by category */}
          {Array.from(new Set(sortedPaths.map(p => p.category))).map(cat => (
            <div key={cat} style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase",
                color: "rgba(255,255,255,0.25)", marginBottom: 8 }}>{cat}</div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {sortedPaths.filter(p => p.category === cat).map(p => (
                  <button key={p.name} onClick={() => setActivePath(p.name)} style={{
                    ...S.btn(p.color, true),
                    background: activePath === p.name ? p.color + "22" : "transparent",
                    border: activePath === p.name ? `1.5px solid ${p.color}55` : "1.5px solid rgba(255,255,255,0.08)",
                    color: activePath === p.name ? p.color : "rgba(255,255,255,0.4)",
                    display: "flex", alignItems: "center", gap: 6,
                  }}>
                    {p.icon} {p.name}
                    <span style={{ fontSize: 10, fontWeight: 800, marginLeft: 2,
                      color: activePath === p.name ? p.color : (p.match >= 60 ? "#34D399" : p.match >= 30 ? "#F59E0B" : "rgba(255,255,255,0.25)") }}>
                      {p.match}%
                    </span>
                  </button>
                ))}
              </div>
            </div>
          ))}

          {currentPath && (() => {
            const path = { name: activePath, ...currentPath };
            const gaps = getGaps(selectedSkills, path);
            const match = computeMatch(selectedSkills, path);
            return (
              <div>
                {/* Header */}
                <div style={{ ...S.card(path.color), marginBottom: 24, display: "flex", flexWrap: "wrap", gap: 28, alignItems: "center" }}>
                  <div style={{ flex: 1, minWidth: 240 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                      <span style={{ fontSize: 32 }}>{path.icon}</span>
                      <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: 28, fontWeight: 800, margin: 0 }}>{path.name}</h2>
                    </div>
                    <p style={{ color: "rgba(255,255,255,0.55)", lineHeight: 1.7, marginBottom: 16 }}>{path.description}</p>
                    <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                      <span style={S.tag(path.color)}>💰 {path.salary}</span>
                      <span style={S.tag("#34D399")}>📈 {path.demand}% demand</span>
                      <span style={S.tag("#F59E0B")}>⏱ {path.timeline}</span>
                    </div>
                  </div>
                  <RadarChart skills={selectedSkills} pathSkills={path.requiredSkills} color={path.color} />
                </div>

                {/* Tabs */}
                <div style={{ display: "flex", gap: 4, marginBottom: 24, background: "rgba(255,255,255,0.04)", borderRadius: 12, padding: 4, width: "fit-content" }}>
                  {["Skills Gap", "Learning Path", "Roadmap"].map(t => (
                    <button key={t} onClick={() => setActiveTab(t.toLowerCase().replace(" ", "-"))} style={{
                      padding: "9px 20px", borderRadius: 9, border: "none", cursor: "pointer",
                      fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: 13, transition: "all .2s",
                      background: activeTab === t.toLowerCase().replace(" ", "-") ? path.color : "transparent",
                      color: activeTab === t.toLowerCase().replace(" ", "-") ? "#080C14" : "rgba(255,255,255,0.45)",
                    }}>{t}</button>
                  ))}
                </div>

                {activeTab === "skills-gap" && (() => {
                  const matchedReq = getMatchedSkills(selectedSkills, path);
                  const matchedNice = getMatchedNiceToHave(selectedSkills, path);
                  const customOnly = getCustomSkillsOnly(selectedSkills);
                  return (
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                    <div style={S.card()}>
                      <h3 style={{ margin: "0 0 16px", fontSize: 15, fontWeight: 700 }}>✅ Required Skills You Have ({matchedReq.length}/{path.requiredSkills.length})</h3>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                        {matchedReq.map(s => (
                          <span key={s} style={S.tag(path.color)}>{s}</span>
                        ))}
                        {matchedReq.length === 0 && <span style={{ color: "rgba(255,255,255,0.3)", fontSize: 13 }}>None yet — start learning!</span>}
                      </div>
                    </div>
                    <div style={S.card()}>
                      <h3 style={{ margin: "0 0 16px", fontSize: 15, fontWeight: 700 }}>⚡ Skills to Acquire ({gaps.length})</h3>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                        {gaps.map(s => <span key={s} style={S.tag("#FF6B6B")}>{s}</span>)}
                        {gaps.length === 0 && <span style={{ color: "#34D399", fontSize: 13, fontWeight: 700 }}>🎉 You have all required skills!</span>}
                      </div>
                    </div>
                    {matchedNice.length > 0 && (
                      <div style={S.card()}>
                        <h3 style={{ margin: "0 0 16px", fontSize: 15, fontWeight: 700 }}>⭐ Bonus Skills You Have ({matchedNice.length})</h3>
                        <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 12, margin: "0 0 10px" }}>Nice-to-have skills that boost your score</p>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                          {matchedNice.map(s => <span key={s} style={S.tag("#F59E0B")}>{s}</span>)}
                        </div>
                      </div>
                    )}
                    {customOnly.length > 0 && (
                      <div style={{ ...S.card(), ...(matchedNice.length > 0 ? {} : { gridColumn: "1/-1" }) }}>
                        <h3 style={{ margin: "0 0 8px", fontSize: 15, fontWeight: 700 }}>✨ Your Unique Skills ({customOnly.length})</h3>
                        <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 12, margin: "0 0 12px" }}>
                          These custom skills aren't in the standard list but may open adjacent or emerging career paths. Ask the AI Advisor how to leverage them!
                        </p>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                          {customOnly.map(s => <span key={s} style={S.tag("#A855F7")}>{s}</span>)}
                        </div>
                      </div>
                    )}
                    <div style={{ ...S.card(), gridColumn: "1/-1" }}>
                      <h3 style={{ margin: "0 0 16px", fontSize: 15, fontWeight: 700 }}>Overall Readiness</h3>
                      <ProgressBar value={match} color={path.color} label={`${path.name} Match`} />
                      {matchedNice.length > 0 && (
                        <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 12, margin: "8px 0 0" }}>
                          Includes +{Math.min(10, Math.round((matchedNice.length / Math.max((path.niceToHave || []).length, 1)) * 10))} bonus points for nice-to-have skills
                        </p>
                      )}
                    </div>
                  </div>
                  );
                })()}

                {activeTab === "learning-path" && (
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: 16 }}>
                    {path.resources.map((r, i) => (
                      <div key={i} style={S.card()}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                          <span style={{ fontWeight: 700, fontSize: 14 }}>{r.title}</span>
                          <span style={S.tag(r.type === "Free" ? "#34D399" : r.type === "Paid" ? "#F59E0B" : "#A855F7")}>{r.type}</span>
                        </div>
                        <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 13 }}>⏱ ~{r.hours} hours</div>
                        <button style={{ ...S.btn(path.color, true), marginTop: 14, width: "100%", textAlign: "center" }}>View Resource →</button>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === "roadmap" && (
                  <div style={S.card()}>
                    <div style={{ position: "relative" }}>
                      {[
                        { phase: "Foundation", desc: `Build core skills: ${path.requiredSkills.slice(0, 3).join(", ")}`, weeks: "Weeks 1–8", color: "#00D9FF" },
                        { phase: "Practice", desc: "Build 2–3 portfolio projects using your new skills", weeks: "Weeks 9–16", color: "#A855F7" },
                        { phase: "Specialise", desc: `Add advanced skills: ${path.niceToHave.slice(0, 2).join(", ")}`, weeks: "Weeks 17–24", color: path.color },
                        { phase: "Apply", desc: "Polish portfolio, network, and start applying for roles", weeks: "Weeks 25–32", color: "#34D399" },
                      ].map((phase, i) => (
                        <div key={i} style={{ display: "flex", gap: 20, marginBottom: i < 3 ? 0 : 0 }}>
                          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
                            <div style={{ width: 40, height: 40, borderRadius: 99, background: phase.color + "22", border: `2px solid ${phase.color}`,
                              display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 14, color: phase.color }}>
                              {i + 1}
                            </div>
                            {i < 3 && <div style={{ width: 2, height: 48, background: `linear-gradient(${phase.color}66, transparent)` }} />}
                          </div>
                          <div style={{ paddingBottom: 40 }}>
                            <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{phase.phase}</div>
                            <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 13, marginBottom: 4 }}>{phase.desc}</div>
                            <span style={S.tag(phase.color)}>{phase.weeks}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })()}
        </div>
      )}

      {/* ── MENTORS ── */}
      {step === "mentor" && (
        <div style={{ ...S.section, paddingTop: 40, paddingBottom: 60 }}>
          <div style={{ marginBottom: 32 }}>
            <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: 28, fontWeight: 800, margin: "0 0 8px" }}>Expert Mentors</h2>
            <p style={{ color: "rgba(255,255,255,0.45)" }}>Industry professionals matched to your career goals</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: 20 }}>
            {sortedPaths.flatMap(p => p.mentors.map(m => ({ ...m, pathName: p.name, pathColor: p.color, pathIcon: p.icon }))).map((m, i) => (
              <div key={i} style={{ ...S.card(m.pathColor) }}>
                <div style={{ display: "flex", gap: 14, alignItems: "center", marginBottom: 16 }}>
                  <div style={{ width: 52, height: 52, borderRadius: 99, background: `linear-gradient(135deg, ${m.pathColor}, ${m.pathColor}88)`,
                    display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 16, color: "#080C14", flexShrink: 0 }}>
                    {m.avatar}
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 15 }}>{m.name}</div>
                    <div style={{ fontSize: 12, color: "rgba(255,255,255,0.45)" }}>{m.role}</div>
                    <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
                      <span style={S.tag(m.pathColor)}>{m.pathIcon} {m.pathName.split(" ").slice(0, 2).join(" ")}</span>
                    </div>
                  </div>
                </div>
                <div style={{ display: "flex", gap: 16, marginBottom: 16 }}>
                  <div style={{ flex: 1, ...S.card(), padding: "10px 14px", textAlign: "center" }}>
                    <div style={{ fontSize: 18, fontWeight: 800, color: m.pathColor }}>{m.exp}</div>
                    <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)" }}>Experience</div>
                  </div>
                  <div style={{ flex: 1, ...S.card(), padding: "10px 14px", textAlign: "center" }}>
                    <div style={{ fontSize: 18, fontWeight: 800, color: "#F59E0B" }}>⭐ {m.rating}</div>
                    <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)" }}>Rating</div>
                  </div>
                </div>
                <button style={S.btnSolid(m.pathColor)}>Request Session →</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── AI CHAT ── */}
      {step === "ai-chat" && (
        <div style={{ ...S.section, paddingTop: 40, paddingBottom: 40 }}>
          <div style={{ marginBottom: 24 }}>
            <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: 28, fontWeight: 800, margin: "0 0 8px" }}>
              <span style={{ background: "linear-gradient(135deg,#00D9FF,#A855F7)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>AI Career Advisor</span>
            </h2>
            <p style={{ color: "rgba(255,255,255,0.45)" }}>Personalised guidance based on your skills and goals</p>
          </div>

          {/* Suggested prompts */}
          {chatMessages.length === 0 && (
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 24 }}>
              {[
                "What's my biggest skill gap?",
                "How long to reach my goal?",
                "What projects should I build?",
                "Which certification first?",
              ].map(q => (
                <button key={q} onClick={() => sendChat(q)} style={{ ...S.btn("#A855F7", true) }}>{q}</button>
              ))}
            </div>
          )}

          {/* Messages */}
          <div style={{ ...S.card(), minHeight: 400, maxHeight: 520, overflowY: "auto", marginBottom: 16, display: "flex", flexDirection: "column", gap: 16, padding: 24 }}>
            {chatMessages.length === 0 && (
              <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", color: "rgba(255,255,255,0.2)", textAlign: "center" }}>
                <div style={{ fontSize: 40, marginBottom: 12 }}>✦</div>
                <div style={{ fontSize: 14 }}>Ask me anything about your career journey</div>
              </div>
            )}
            {chatMessages.map((m, i) => (
              <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start" }}>
                <div style={{
                  maxWidth: "72%", padding: "14px 18px", borderRadius: m.role === "user" ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
                  background: m.role === "user" ? "linear-gradient(135deg,#00D9FF22,#A855F722)" : "rgba(255,255,255,0.06)",
                  border: m.role === "user" ? "1px solid #00D9FF44" : "1px solid rgba(255,255,255,0.08)",
                  fontSize: 14, lineHeight: 1.7, color: m.role === "user" ? "#fff" : "rgba(255,255,255,0.85)",
                }}>
                  {m.content}
                </div>
              </div>
            ))}
            {chatLoading && (
              <div style={{ display: "flex", gap: 6, alignItems: "center", padding: "12px 18px", width: "fit-content",
                background: "rgba(255,255,255,0.06)", borderRadius: "18px 18px 18px 4px" }}>
                {[0, 1, 2].map(i => (
                  <div key={i} style={{ width: 7, height: 7, borderRadius: 99, background: "#A855F7",
                    animation: "pulse 1.4s ease-in-out infinite", animationDelay: `${i * 0.2}s` }} />
                ))}
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          <div style={{ display: "flex", gap: 12 }}>
            <input style={{ ...S.input, flex: 1 }} placeholder="Ask about your career path, skills, resources…"
              value={chatInput} onChange={e => setChatInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && !e.shiftKey && sendChat(chatInput)} />
            <button onClick={() => sendChat(chatInput)} disabled={chatLoading || !chatInput.trim()} style={{
              ...S.btnSolid("#A855F7"), padding: "14px 24px", opacity: (chatLoading || !chatInput.trim()) ? 0.4 : 1,
            }}>Send</button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes pulse { 0%,100%{opacity:.3;transform:scale(.9)} 50%{opacity:1;transform:scale(1.1)} }
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 4px; } ::-webkit-scrollbar-track { background: transparent; } ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 99px; }
      `}</style>
    </div>
  );
}
