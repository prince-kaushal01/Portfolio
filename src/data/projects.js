export const PROJECTS = [
  {
    id: 1,
    name: "Neon Commerce",
    tagline: "Full-stack e-commerce with real-time payments",
    stack: ["Next.js", "Stripe", "PostgreSQL"],
    live: "#",
    github: "#",
    preview: "/projects/neon-commerce.svg",
    role: "Full-Stack Developer",
    year: "2024",
    slides: [
      {
        label: "Homepage",
        bg: "linear-gradient(135deg,#0d0d1a 0%,#1a0533 50%,#0d1a33 100%)",
        accent: "#a855f7",
        desc: "Hero section with animated product showcase",
      },
      {
        label: "Product Listing",
        bg: "linear-gradient(135deg,#0a0f1e 0%,#0f2040 60%,#1a0533 100%)",
        accent: "#38bdf8",
        desc: "Filter & sort with instant client-side search",
      },
      {
        label: "Checkout Flow",
        bg: "linear-gradient(135deg,#001a0d 0%,#003320 50%,#001a33 100%)",
        accent: "#39FF6A",
        desc: "Stripe-powered one-click checkout experience",
      },
      {
        label: "Order Dashboard",
        bg: "linear-gradient(135deg,#1a0d00 0%,#331a00 50%,#1a1a00 100%)",
        accent: "#f59e0b",
        desc: "Real-time order tracking & inventory management",
      },
    ],
    description: `Neon Commerce is a production-ready e-commerce platform built to handle high-traffic storefronts with a focus on performance and seamless payment experiences.

The storefront leverages Next.js App Router with Server-Side Rendering and Incremental Static Regeneration so product pages load near-instantly while staying fresh. Stripe Checkout handles the entire payment lifecycle — subscriptions, one-time purchases, webhooks, and refunds — with full PCI compliance out of the box.

On the backend, a PostgreSQL database with Prisma ORM manages products, inventory, and orders. The admin dashboard provides real-time stock levels, order fulfillment queues, and revenue analytics without any third-party BI tools.

The UI was designed with a dark neon aesthetic, using Tailwind CSS and custom GSAP transitions to create a premium feel that drives conversion.`,
    techDetails: [
      { name: "Next.js", note: "App Router, SSR, ISR for blazing-fast product pages" },
      { name: "Stripe", note: "Checkout, webhooks, subscription billing" },
      { name: "PostgreSQL", note: "Relational data for products, orders, users" },
      { name: "Prisma ORM", note: "Type-safe database queries and migrations" },
      { name: "Tailwind CSS", note: "Utility-first styling with dark neon theme" },
      { name: "GSAP", note: "Page transitions and micro-interactions" },
    ],
  },
  {
    id: 2,
    name: "Flowboard",
    tagline: "Real-time collaborative project management tool",
    stack: ["React", "Redux", "Tailwind CSS"],
    live: "#",
    github: "#",
    preview: "/projects/flowboard.svg",
    role: "Frontend Developer",
    year: "2024",
    slides: [
      {
        label: "Kanban Board",
        bg: "linear-gradient(135deg,#0a1628 0%,#0d2040 55%,#1a0f28 100%)",
        accent: "#60a5fa",
        desc: "Drag-and-drop cards across configurable swim lanes",
      },
      {
        label: "Timeline View",
        bg: "linear-gradient(135deg,#0f0a1e 0%,#1e0f3d 55%,#0a1628 100%)",
        accent: "#a78bfa",
        desc: "Gantt-style timeline with dependency tracking",
      },
      {
        label: "Team Activity",
        bg: "linear-gradient(135deg,#001a1a 0%,#003333 55%,#001a0d 100%)",
        accent: "#34d399",
        desc: "Live feed of team actions with real-time updates",
      },
    ],
    description: `Flowboard is a collaborative project management application inspired by the best parts of Linear and Notion, built entirely on the frontend with React and Redux Toolkit.

The Kanban board supports unlimited columns, custom labels, priority flags, and nested sub-tasks. Cards can be reordered with smooth drag-and-drop powered by a custom DnD implementation — no bloated libraries.

Redux Toolkit manages all application state with normalized entity adapters, making the data layer predictable and fully serializable. Optimistic updates ensure the UI never feels sluggish — changes appear instantly and sync in the background.

The Timeline view renders a Gantt-style chart purely in SVG, calculating dependency arrows and critical-path highlighting in real time. Tailwind CSS drives the entire design system with a custom dark theme and configurable accent colors per workspace.`,
    techDetails: [
      { name: "React", note: "Component architecture with custom hooks" },
      { name: "Redux Toolkit", note: "Normalized state, optimistic updates" },
      { name: "Tailwind CSS", note: "Design system with workspace theming" },
      { name: "SVG Canvas", note: "Custom Gantt chart with dependency arrows" },
      { name: "Custom DnD", note: "Zero-dependency drag-and-drop engine" },
      { name: "WebSockets", note: "Real-time activity feed and presence" },
    ],
  },
  {
    id: 3,
    name: "Resume Roaster",
    tagline: "AI-powered resume critique and rewrite engine",
    stack: ["GPT-4", "Next.js", "PostgreSQL"],
    live: "#",
    github: "#",
    preview: "/projects/resume-roaster.svg",
    role: "Full-Stack & AI Engineer",
    year: "2024",
    slides: [
      {
        label: "Upload & Parse",
        bg: "linear-gradient(135deg,#1a0000 0%,#330d0d 55%,#1a0d00 100%)",
        accent: "#f87171",
        desc: "PDF parsing with structured section extraction",
      },
      {
        label: "AI Critique",
        bg: "linear-gradient(135deg,#0f0000 0%,#200505 55%,#0f0a00 100%)",
        accent: "#fb923c",
        desc: "GPT-4 critique streamed line-by-line in real time",
      },
      {
        label: "Rewritten Draft",
        bg: "linear-gradient(135deg,#00100a 0%,#001a10 55%,#001010 100%)",
        accent: "#39FF6A",
        desc: "One-click improved version ready to download",
      },
    ],
    description: `Resume Roaster uses GPT-4 to give job seekers brutally honest, line-by-line feedback on their resumes — then rewrites the entire document in a stronger voice.

Users upload a PDF resume which is parsed server-side into structured sections: summary, experience, education, and skills. Each section is evaluated independently by GPT-4 with a custom system prompt tuned for ATS optimisation, impact language, and recruiter psychology.

The critique streams back token-by-token so users see feedback appear in real time rather than waiting for a full response. After review, GPT-4 generates a fully rewritten version that users can download as a polished PDF.

All sessions are stored in PostgreSQL so users can track their resume evolution over time and compare versions side-by-side. The application handles 500+ resumes per day with server-side rate limiting and usage quotas per account.`,
    techDetails: [
      { name: "GPT-4", note: "Custom system prompts for ATS & recruiter optimisation" },
      { name: "Next.js", note: "API routes with streaming response support" },
      { name: "PostgreSQL", note: "Session storage, version history, user accounts" },
      { name: "PDF Parser", note: "Server-side extraction of structured resume sections" },
      { name: "OpenAI SDK", note: "Streaming token delivery for real-time critique" },
      { name: "Tailwind CSS", note: "Clean reading UI with syntax-highlight-style critique" },
    ],
  },
  {
    id: 4,
    name: "Estate Finder",
    tagline: "Property search platform with map-first UX",
    stack: ["React", "Node.js", "MongoDB"],
    live: "#",
    github: "#",
    preview: "/projects/estate-finder.svg",
    role: "Full-Stack Developer",
    year: "2023",
    slides: [
      {
        label: "Map View",
        bg: "linear-gradient(135deg,#001a0d 0%,#003320 55%,#001428 100%)",
        accent: "#4ade80",
        desc: "Interactive map with clustering and price overlays",
      },
      {
        label: "Property Detail",
        bg: "linear-gradient(135deg,#0a0f1e 0%,#0d1a33 55%,#1a0f0a 100%)",
        accent: "#38bdf8",
        desc: "Photo gallery, floor plans, and virtual tour embed",
      },
      {
        label: "Saved Search",
        bg: "linear-gradient(135deg,#0f0a1e 0%,#1e1040 55%,#0a0a0a 100%)",
        accent: "#c084fc",
        desc: "Email alerts when new listings match your criteria",
      },
    ],
    description: `Estate Finder is a map-first property search platform that puts location context front and centre, letting buyers understand a neighbourhood before they read a single listing description.

The map interface is built on Mapbox GL with custom clustering that groups nearby properties into price-averaged bubbles. Zooming in splits clusters into individual pins with instant property card previews on hover — no page navigation required.

The backend is a Node.js/Express REST API connected to MongoDB Atlas. Geospatial queries use MongoDB's $geoWithin and $geoNear operators to find properties within arbitrary polygon boundaries drawn by the user directly on the map.

Saved searches emit email alerts via SendGrid whenever a new listing lands within the user's criteria. The system processes 200+ new listings daily from a scraped and normalised MLS feed.`,
    techDetails: [
      { name: "React", note: "Map-centric UI with Mapbox GL integration" },
      { name: "Node.js + Express", note: "REST API with geospatial query support" },
      { name: "MongoDB", note: "$geoWithin / $geoNear for polygon property search" },
      { name: "Mapbox GL", note: "Custom clustering, polygon drawing, price overlays" },
      { name: "SendGrid", note: "Automated email alerts for saved searches" },
      { name: "MLS Scraper", note: "Daily feed normalisation pipeline" },
    ],
  },
  {
    id: 5,
    name: "Insight Finance",
    tagline: "Personal finance dashboard with predictive analytics",
    stack: ["Vue.js", "Express.js", "MySQL"],
    live: "#",
    github: "#",
    preview: "/projects/insight-finance.svg",
    role: "Full-Stack Developer",
    year: "2023",
    slides: [
      {
        label: "Spending Overview",
        bg: "linear-gradient(135deg,#00081a 0%,#001040 55%,#000d28 100%)",
        accent: "#38bdf8",
        desc: "Category breakdown with month-over-month trends",
      },
      {
        label: "Budget Planner",
        bg: "linear-gradient(135deg,#001a00 0%,#003300 55%,#001400 100%)",
        accent: "#39FF6A",
        desc: "Drag-to-set budget limits with live progress bars",
      },
      {
        label: "Forecast",
        bg: "linear-gradient(135deg,#0a0a00 0%,#1a1400 55%,#0a0500 100%)",
        accent: "#fbbf24",
        desc: "ML-based 90-day spending forecast with confidence bands",
      },
    ],
    description: `Insight Finance connects to bank accounts via Plaid and turns raw transaction data into actionable financial intelligence, giving users a clear picture of where their money goes and where it's headed.

Transactions are automatically categorised using a rule-based classifier trained on 50,000 labelled transactions. The spending overview breaks down categories with month-over-month comparison charts built in Vue.js with a custom SVG charting layer — no Chart.js overhead.

The budget planner lets users drag sliders to allocate monthly limits per category. As real transactions arrive throughout the month, progress bars fill with a traffic-light system (green → amber → red) to surface overspending early.

The forecast engine runs a lightweight linear regression on 6 months of history to project 90-day spending with upper/lower confidence bands. Alerts are sent via push notification when a user is on track to exceed a budget category before month-end.`,
    techDetails: [
      { name: "Vue.js", note: "Reactive dashboard with custom SVG charts" },
      { name: "Express.js", note: "API layer with Plaid webhook processing" },
      { name: "MySQL", note: "Normalised transaction schema with full history" },
      { name: "Plaid API", note: "Bank account connection and transaction sync" },
      { name: "Linear Regression", note: "90-day spending forecast model" },
      { name: "Web Push API", note: "Budget overspend alerts" },
    ],
  },
  {
    id: 6,
    name: "Agent Studio",
    tagline: "No-code platform for building and deploying AI agents",
    stack: ["OpenAI API", "LangChain", "n8n"],
    live: "#",
    github: "#",
    preview: "/projects/agent-studio.svg",
    role: "AI Engineer & Full-Stack Developer",
    year: "2024",
    slides: [
      {
        label: "Agent Builder",
        bg: "linear-gradient(135deg,#0a0015 0%,#14002b 55%,#001a14 100%)",
        accent: "#a855f7",
        desc: "Visual node editor for chaining LLM tools and APIs",
      },
      {
        label: "Live Execution",
        bg: "linear-gradient(135deg,#00100a 0%,#001f14 55%,#0a0015 100%)",
        accent: "#39FF6A",
        desc: "Real-time thought trace and tool call inspector",
      },
      {
        label: "Deploy & Monitor",
        bg: "linear-gradient(135deg,#0f0a00 0%,#1f1400 55%,#0f0015 100%)",
        accent: "#f59e0b",
        desc: "One-click deploy with latency and cost dashboards",
      },
    ],
    description: `Agent Studio is a no-code platform that lets non-technical teams build, test, and deploy production-grade AI agents through a visual node editor — without writing a single line of code.

The node editor renders an interactive canvas where users connect trigger nodes (webhooks, schedules, chat inputs) to LLM nodes (GPT-4, Claude, Gemini), tool nodes (web search, code execution, database queries), and output nodes (email, Slack, HTTP response).

Under the hood, each graph is compiled into a LangChain LCEL chain at runtime. The execution engine streams intermediate steps — tool calls, LLM reasoning, and errors — back to the UI as a live thought trace, making debugging transparent.

n8n handles the automation layer: scheduling agents on cron triggers, routing webhook payloads, and connecting to 400+ third-party integrations without custom code. Deployed agents are containerised and served behind an auto-scaling API gateway with per-agent latency, token usage, and cost dashboards.`,
    techDetails: [
      { name: "OpenAI API", note: "GPT-4 backbone with function calling and vision" },
      { name: "LangChain", note: "LCEL chains compiled from visual node graphs" },
      { name: "n8n", note: "Automation triggers, scheduling, 400+ integrations" },
      { name: "React Flow", note: "Interactive node canvas for agent building" },
      { name: "Docker", note: "Containerised agent deployment and scaling" },
      { name: "LangGraph", note: "Multi-agent orchestration with shared memory" },
    ],
  },
];
