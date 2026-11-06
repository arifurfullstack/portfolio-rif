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
    role: string;
    tagline: string;
    city: string;
    email: string;
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
    category: "Languages" | "Frameworks" | "AI & Agents" | "Databases & Cloud";
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
    name: "Alex Rivera",
    role: "AI Systems & Full Stack Engineer",
    tagline:
      "Engineering resilient agentic architectures, distributed real-time platforms, and tactile digital products with sub-100ms precision.",
    city: "San Francisco, CA",
    email: "alex@rivera.dev",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    twitter: "https://x.com",
    instagram: "https://instagram.com/jai4z",
    resumeUrl: "/resume.pdf",
  },
  heroStats: [
    {
      value: "4.2M+",
      label: "Requests / Mo",
      sublabel: "Processed across agent pipelines",
    },
    {
      value: "99.98%",
      label: "System Uptime",
      sublabel: "Across distributed edge clusters",
    },
    {
      value: "14+",
      label: "Agents Shipped",
      sublabel: "Production autonomous workflows",
    },
  ],
  projects: [
    {
      id: "agent-os",
      title: "AgentOS Orchestrator",
      tagline: "Autonomous multi-agent execution framework with deterministic state machines and live rollback.",
      role: "Lead Systems Architect",
      period: "2024 - Present",
      bullets: [
        "Architected an event-driven agent orchestration mesh running 12+ concurrent LLM subagents with strict type contracts.",
        "Engineered real-time reactive scheduling and CRDT-based workspace sharing, slashing sync drift to under 12ms.",
        "Integrated dynamic telemetry, token cost budgeting, and autonomous self-healing retries reducing failure rates by 74%.",
        "Scaled architecture to handle 2.4M tool invocations per month with zero human intervention required.",
      ],
      tech: ["Next.js 15", "TypeScript", "Python", "LangGraph", "Redis Streams", "Tailwind CSS"],
      metrics: "74% failure reduction",
      liveUrl: "https://github.com",
      codeUrl: "https://github.com",
    },
    {
      id: "stream-forge",
      title: "StreamForge Realtime",
      tagline: "High-throughput binary streaming protocol for live agent-to-browser telemetry and visual artifacts.",
      role: "Core Infrastructure Engineer",
      period: "2023 - 2024",
      bullets: [
        "Constructed custom WebSocket/WebTransport binary multiplexer reducing P99 browser delivery latency from 180ms to 24ms.",
        "Built generative UI streaming render pipeline allowing interactive sandboxes to stream in as code generates.",
        "Implemented memory-efficient frame deduplication and backpressure flow control across 15,000 concurrent sockets.",
        "Wrote zero-allocation byte parsers in Rust compiled to WebAssembly for client-side cryptographic verification.",
      ],
      tech: ["WebSockets", "Rust", "WebAssembly", "TypeScript", "React 19", "Docker"],
      metrics: "24ms P99 latency",
      liveUrl: "https://github.com",
      codeUrl: "https://github.com",
    },
    {
      id: "vectormesh",
      title: "VectorMesh Hybrid RAG",
      tagline: "Sub-millisecond hybrid BM25 and dense embedding vector search engine with localized quantization.",
      role: "Founding Engineer",
      period: "2023",
      bullets: [
        "Designed hierarchical HNSW index partition algorithm cutting search cold-starts from 350ms to 18ms.",
        "Deployed recursive token chunking with semantic boundaries, improving recall accuracy on dense enterprise documents to 96.4%.",
        "Built distributed cache layer with LRU eviction and memory-mapped files supporting 50M+ vectors on modest RAM.",
        "Created an intuitive query inspector UI with interactive cosine distance graphs and citation tracking.",
      ],
      tech: ["Python", "FastAPI", "Qdrant", "PostgreSQL", "Next.js", "Tailwind CSS"],
      metrics: "96.4% recall accuracy",
      liveUrl: "https://github.com",
      codeUrl: "https://github.com",
    },
    {
      id: "pulse-ui",
      title: "Pulse Design System",
      tagline: "Hardware-accelerated design system and component micro-framework engineered for dark-mode AI tooling.",
      role: "Design Technologist",
      period: "2022 - 2023",
      bullets: [
        "Authored 45+ accessible, headless UI primitives tailored specifically for fast agent dashboards and IDE sidecars.",
        "Achieved 100% WCAG 2.1 AA compliance with comprehensive keyboard navigation, screen reader hints, and zero layout shift.",
        "Optimized GPU composite layers and CSS containment, maintaining a locked 120 FPS during heavy multi-cursor canvas renders.",
        "Published open-source library adopted by 3,800+ developers with 1.2k GitHub stars.",
      ],
      tech: ["TypeScript", "Tailwind CSS v4", "Radix Primitives", "CSS Houdini", "Storybook"],
      metrics: "120 FPS canvas render",
      liveUrl: "https://github.com",
      codeUrl: "https://github.com",
    },
  ],
  stack: [
    { name: "TypeScript", category: "Languages" },
    { name: "Python", category: "Languages" },
    { name: "Rust", category: "Languages" },
    { name: "Go", category: "Languages" },
    { name: "SQL", category: "Languages" },
    { name: "Next.js 15", category: "Frameworks" },
    { name: "React 19", category: "Frameworks" },
    { name: "Tailwind CSS v4", category: "Frameworks" },
    { name: "Node.js", category: "Frameworks" },
    { name: "FastAPI", category: "Frameworks" },
    { name: "Claude API", category: "AI & Agents" },
    { name: "Gemini 2.5", category: "AI & Agents" },
    { name: "OpenAI GPT-4o", category: "AI & Agents" },
    { name: "LangGraph", category: "AI & Agents" },
    { name: "LlamaIndex", category: "AI & Agents" },
    { name: "MCP Protocol", category: "AI & Agents" },
    { name: "PostgreSQL", category: "Databases & Cloud" },
    { name: "Redis", category: "Databases & Cloud" },
    { name: "Qdrant", category: "Databases & Cloud" },
    { name: "Docker", category: "Databases & Cloud" },
    { name: "Kubernetes", category: "Databases & Cloud" },
    { name: "Vercel", category: "Databases & Cloud" },
    { name: "AWS", category: "Databases & Cloud" },
    { name: "Cloudflare Workers", category: "Databases & Cloud" },
  ],
  timeline: [
    {
      id: "exp-1",
      year: "2024 - PRESENT",
      title: "Lead AI Systems Engineer",
      organization: "NeuralFlow Technologies",
      type: "experience",
      description:
        "Directing the core agent runtime team. Architected distributed agent consensus protocols serving 4.2M monthly tool calls with strict latency bounds.",
      badge: "Current Role",
    },
    {
      id: "hack-1",
      year: "2024",
      title: "1st Place Global Winner",
      organization: "World AI Agent Hackathon",
      type: "hackathon",
      description:
        "Built an autonomous multi-modal code debugger agent in 48 hours. Awarded 1st place out of 620 international teams for speed and deterministic safety.",
      badge: "Grand Prize",
    },
    {
      id: "exp-2",
      year: "2022 - 2024",
      title: "Senior Full-Stack Engineer",
      organization: "HyperScale Cloud Systems",
      type: "experience",
      description:
        "Spearheaded real-time streaming infrastructure. Re-engineered web socket architecture cutting connection drop rate by 92% across 200k daily active sessions.",
    },
    {
      id: "hack-2",
      year: "2023",
      title: "Best Systems Architecture",
      organization: "OpenAI Autonomous Systems Challenge",
      type: "hackathon",
      description:
        "Developed live self-correcting schema validator preventing agent hallucinations in structured database transactions.",
      badge: "Best Architecture",
    },
    {
      id: "edu-1",
      year: "2018 - 2022",
      title: "B.S. in Computer Science",
      organization: "University of California, Berkeley",
      type: "education",
      description:
        "Focused on Distributed Systems, Compilers, and Human-Computer Interaction. Graduated with Honors. Undergraduate researcher in edge computing.",
      badge: "Honors",
    },
  ],
  about: {
    paragraphs: [
      "I specialize in bridging the gap between raw machine intelligence and deterministic human software. My work centers on building autonomous systems, real-time streaming architectures, and high-performance interfaces where every millisecond and pixel is intentional.",
      "Over the past six years, I have engineered infrastructure processing billions of transactions, led distributed teams, and designed developer tools adopted globally. I believe the future belongs to software that feels alive—fast, tactile, transparent, and built with uncompromising taste.",
    ],
    principles: [
      {
        number: "01",
        title: "Deterministic over Fragile",
        description:
          "AI workflows must be bounded by strict typing, structured contracts, and rollback safeguards. Chaos is unacceptable in production.",
      },
      {
        number: "02",
        title: "The Sub-100ms Standard",
        description:
          "Performance is the highest form of respect for a user. Latency is not an afterthought; it is a fundamental architectural constraint.",
      },
      {
        number: "03",
        title: "Design is Code",
        description:
          "A great product is an unbroken continuum from the database schema to the spring physics of a cursor. Craft matters at every layer.",
      },
      {
        number: "04",
        title: "Ship, Measure, Compound",
        description:
          "Speculation is cheap; telemetry is truth. Ship small, instrument relentlessly, iterate on reality, and let momentum do the rest.",
      },
    ],
    skillsGrid: [
      {
        category: "Systems & Architecture",
        items: ["Multi-Agent Orchestration", "Event-Driven Pipelines", "Distributed State", "WebSockets / WebTransport", "Binary Serialization"],
      },
      {
        category: "Frontend & Performance",
        items: ["Next.js 15 App Router", "React 19 Canary", "Tailwind CSS v4", "Canvas & GPU Compositing", "WCAG 2.1 AA Accessibility"],
      },
      {
        category: "AI & Machine Learning",
        items: ["LLM Tool Calling / MCP", "Vector Embeddings & RAG", "Evaluation & Benchmarks", "Structured Output Parsing", "Prompt Engineering"],
      },
      {
        category: "Infra & Reliability",
        items: ["Docker & Edge Functions", "Postgres & Redis Tuning", "Prometheus & Tracing", "Zero-Downtime Deploys", "Security & RBAC"],
      },
    ],
  },
};
