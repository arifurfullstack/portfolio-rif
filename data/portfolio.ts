export interface Project {
  id: string;
  title: string;
  tagline: string;
  role: string;
  period: string;
  bullets: string[];
  tech: string[];
  metrics: string;
  liveUrl?: string;
  codeUrl?: string;
}

export interface TimelineItem {
  id: string;
  year: string;
  title: string;
  organization: string;
  type: "experience" | "hackathon" | "education";
  description: string;
  badge?: string;
}

export interface Principle {
  number: string;
  title: string;
  description: string;
}

export interface PortfolioData {
  personal: {
    name: string;
    fullName: string;
    role: string;
    tagline: string;
    city: string;
    country: string;
    email: string;
    website: string;
    github: string;
    linkedin: string;
    twitter: string;
    instagram: string;
    resumeUrl: string;
  };
  heroStats: Array<{
    value: string;
    label: string;
    sublabel: string;
  }>;
  projects: Project[];
  stack: Array<{
    name: string;
    category: "Languages" | "Frameworks" | "AI & Cloud" | "Databases & Backend";
  }>;
  timeline: TimelineItem[];
  about: {
    paragraphs: [string, string];
    principles: Principle[];
    skillsGrid: Array<{
      category: string;
      items: string[];
    }>;
  };
}

export const portfolioData: PortfolioData = {
  personal: {
    name: "Arifur Rahman",
    fullName: "Md. Arifur Rahman",
    role: "Full-Stack Developer & Tech Entrepreneur",
    tagline:
      "Founder & CEO of Huipper. Engineering high-performance web applications, AI-powered SaaS platforms, and scalable digital products for global businesses.",
    city: "Dhaka",
    country: "Bangladesh",
    email: "contact@huipper.com",
    website: "https://huipper.com",
    github: "https://github.com/arifurfullstack",
    linkedin: "https://linkedin.com",
    twitter: "https://x.com",
    instagram: "https://instagram.com",
    resumeUrl: "/resume.pdf",
  },
  heroStats: [
    {
      value: "2+",
      label: "Ventures Founded",
      sublabel: "Huipper Agency & Jadubot AI SaaS",
    },
    {
      value: "50+",
      label: "Products Shipped",
      sublabel: "Websites, SaaS & custom software worldwide",
    },
    {
      value: "100%",
      label: "Custom Architecture",
      sublabel: "Tailored full-stack & AI workflows",
    },
  ],
  projects: [
    {
      id: "huipper",
      title: "Huipper Software Agency",
      tagline:
        "Global digital product agency crafting modern web applications, SaaS platforms, and enterprise solutions.",
      role: "Founder & CEO",
      period: "2024 - Present",
      bullets: [
        "Direct end-to-end delivery of custom digital products for international clients across e-commerce, marketplaces, and SaaS.",
        "Oversee full lifecycle execution: architectural planning, intuitive UX design, secure backend infrastructure, and deployment.",
        "Standardized agile workflows and modern component systems, cutting average client project delivery time by 35%.",
        "Lead technical decisions across Next.js, Node.js, NestJS, and cloud infrastructure with zero downtime track record.",
      ],
      tech: ["Next.js 15", "React", "TypeScript", "Node.js", "NestJS", "Tailwind CSS"],
      metrics: "Global Client Base",
      liveUrl: "https://huipper.com",
      codeUrl: "https://github.com/arifurfullstack",
    },
    {
      id: "jadubot",
      title: "Jadubot AI SaaS",
      tagline:
        "Autonomous AI-focused SaaS venture transforming business automation and intelligent customer workflows.",
      role: "Founder & Product Lead",
      period: "2024 - Present",
      bullets: [
        "Architected an intelligent automation suite allowing businesses to automate conversational support and operational tasks.",
        "Integrated modern AI APIs with custom structured context embeddings, providing instant, hallucination-free business answers.",
        "Engineered real-time analytics dashboards tracking customer interactions, sentiment score, and agent response latency.",
        "Built resilient webhook ingestion and multi-tenant security architecture on PostgreSQL with row-level security.",
      ],
      tech: ["Next.js 15", "TypeScript", "AI APIs", "PostgreSQL", "Tailwind CSS", "REST APIs"],
      metrics: "AI-Powered SaaS",
      liveUrl: "https://huipper.com",
      codeUrl: "https://github.com/arifurfullstack",
    },
    {
      id: "marketplace-platform",
      title: "Enterprise Multi-Vendor Commerce",
      tagline:
        "High-concurrency e-commerce marketplace with real-time stock sync, payment gateways, and vendor dashboards.",
      role: "Lead Full-Stack Architect",
      period: "2023 - 2024",
      bullets: [
        "Engineered modular multi-vendor marketplace handling catalog management, split payouts, and automated invoice dispatch.",
        "Integrated multiple international payment gateways with webhook idempotency and fraud verification checks.",
        "Optimized database indices and caching layers, cutting catalog query response times from 320ms to 42ms.",
        "Built responsive merchant portal with real-time sales telemetry, order tracking, and exportable financial reports.",
      ],
      tech: ["React.js", "Laravel", "Node.js", "PostgreSQL", "Tailwind CSS", "Redis"],
      metrics: "42ms query speed",
      liveUrl: "https://huipper.com",
      codeUrl: "https://github.com/arifurfullstack",
    },
    {
      id: "business-suite",
      title: "Custom ERP & Booking Engine",
      tagline:
        "Mission-critical booking and resource planning suite with calendar sync, audit trails, and role-based permissions.",
      role: "Full-Stack Engineer",
      period: "2023",
      bullets: [
        "Created end-to-end appointment scheduling engine with double-booking prevention and automated SMS/email reminders.",
        "Implemented fine-grained RBAC authorization matrices protecting sensitive customer data and operational logs.",
        "Deployed on hardened Linux VPS environments using Nginx reverse proxy, automated SSL renewal, and Cloudflare WAF.",
        "Designed accessible, mobile-first dashboards using Shadcn UI and Tailwind CSS for seamless on-the-go management.",
      ],
      tech: ["Next.js", "TypeScript", "Shadcn UI", "MongoDB", "Linux VPS", "Nginx"],
      metrics: "100% schedule reliability",
      liveUrl: "https://huipper.com",
      codeUrl: "https://github.com/arifurfullstack",
    },
  ],
  stack: [
    { name: "React.js", category: "Frameworks" },
    { name: "Next.js 15", category: "Frameworks" },
    { name: "TypeScript", category: "Languages" },
    { name: "JavaScript", category: "Languages" },
    { name: "Tailwind CSS", category: "Frameworks" },
    { name: "Shadcn UI", category: "Frameworks" },
    { name: "GSAP", category: "Frameworks" },
    { name: "Framer Motion", category: "Frameworks" },
    { name: "Node.js", category: "Databases & Backend" },
    { name: "NestJS", category: "Databases & Backend" },
    { name: "Laravel", category: "Databases & Backend" },
    { name: "REST APIs", category: "Databases & Backend" },
    { name: "PostgreSQL", category: "Databases & Backend" },
    { name: "MongoDB", category: "Databases & Backend" },
    { name: "AI Automation", category: "AI & Cloud" },
    { name: "Jadubot AI", category: "AI & Cloud" },
    { name: "Linux VPS", category: "AI & Cloud" },
    { name: "Nginx", category: "AI & Cloud" },
    { name: "Cloudflare", category: "AI & Cloud" },
    { name: "Payment Gateways", category: "Databases & Backend" },
    { name: "WebSockets", category: "Databases & Backend" },
    { name: "Docker", category: "AI & Cloud" },
    { name: "Vercel", category: "AI & Cloud" },
    { name: "Git & GitHub", category: "Languages" },
  ],
  timeline: [
    {
      id: "time-1",
      year: "2024 - PRESENT",
      title: "Founder & CEO",
      organization: "Huipper Software Agency",
      type: "experience",
      description:
        "Building modern websites, web apps, SaaS platforms, and AI-powered solutions for global clients. Leading engineering architecture, product strategy, and business growth.",
      badge: "Agency Founder",
    },
    {
      id: "time-2",
      year: "2024 - PRESENT",
      title: "Founder & Builder",
      organization: "Jadubot (AI SaaS)",
      type: "experience",
      description:
        "Pioneering an AI-focused SaaS venture automating intelligent customer support, business operations, and context-aware enterprise workflows.",
      badge: "AI Venture",
    },
    {
      id: "time-3",
      year: "2022 - PRESENT",
      title: "Innovation & Entrepreneurship",
      organization: "Daffodil International University",
      type: "education",
      description:
        "Pursuing academic studies focused on business models, startup scaling, strategic leadership, and digital innovation to bridge software engineering with business impact.",
      badge: "University",
    },
    {
      id: "time-4",
      year: "2021 - 2024",
      title: "Full-Stack Software Engineer",
      organization: "Independent & Client Ventures",
      type: "experience",
      description:
        "Delivered full-stack applications across e-commerce, educational platforms, booking systems, and creator tools using React, Next.js, Node.js, and Laravel.",
    },
  ],
  about: {
    paragraphs: [
      "I am Md. Arifur Rahman, a full-stack software developer, technology entrepreneur, and digital product builder based in Dhaka, Bangladesh. My work combines software engineering, product development, business strategy, and entrepreneurship. I enjoy being involved in the entire process of building a product—from understanding the initial idea and planning features to designing the user experience, engineering the architecture, and scaling it for real-world impact.",
      "As Founder & CEO of Huipper and founder of Jadubot, running technology ventures has shaped my approach to software. I don't just think about features or code; I prioritize real users, business goals, development efficiency, reliability, and long-term maintainability. I believe combining deep technical knowledge with business understanding is one of the most valuable skills a founder can develop.",
    ],
    principles: [
      {
        number: "01",
        title: "Useful & Purpose-Built",
        description:
          "Good software must be reliable, easy to understand, and enjoyable to use. A site shouldn't just look impressive—it must load quickly and help users achieve goals effortlessly.",
      },
      {
        number: "02",
        title: "Practicality over Complexity",
        description:
          "Keep architecture clean, focus on the details that matter, and choose technologies based on what the product actually needs rather than fleeting hype.",
      },
      {
        number: "03",
        title: "Code Meets Business Strategy",
        description:
          "Every technical choice impacts business viability. Balance development velocity, hosting economics, and user experience for sustainable long-term compounding.",
      },
      {
        number: "04",
        title: "Continuous Curiosity & Innovation",
        description:
          "Technology is a field where there is always something new to discover. Keep experimenting with AI, mastering modern platforms, and building with ambitious founders.",
      },
    ],
    skillsGrid: [
      {
        category: "Frontend Engineering",
        items: [
          "React.js & Next.js 15",
          "TypeScript & JavaScript",
          "Tailwind CSS & Shadcn UI",
          "GSAP & Framer Motion",
          "Responsive Mobile-First UX",
        ],
      },
      {
        category: "Backend & Architecture",
        items: [
          "Node.js & NestJS",
          "Laravel & PHP",
          "PostgreSQL & MongoDB",
          "REST APIs & WebSockets",
          "Payment Gateway Pipelines",
        ],
      },
      {
        category: "AI & Automation",
        items: [
          "Jadubot AI Architecture",
          "AI Automation Workflows",
          "LLM Integrations & Prompts",
          "Contextual Knowledge Retrieval",
          "Customer Service Agents",
        ],
      },
      {
        category: "DevOps & Production",
        items: [
          "Linux VPS Administration",
          "Nginx Reverse Proxy & SSL",
          "Cloudflare DNS & WAF",
          "Vercel & Docker Deploys",
          "Performance Optimization",
        ],
      },
    ],
  },
};
