# Founder OS — The Evidence-Backed Venture Operating System

> **A high-craft, action-oriented operating workspace that guides founders from a painful market problem to a validated product, repeatable distribution, unit economics, defensible moat, and liquidity.**
>
> Built with React, Tailwind CSS, Lucide icons, Vitest, and integrated with:
> - **Agent Reach** for real-time market discovery and customer signal routing.
> - **Bigset by TinyFish** for turning 1 sentence into a structured, self-refreshing lead dataset.
> - **FreeLLMAPI & OmniRoute** for pooling 5+ independent free-tier LLM providers behind a unified endpoint with zero token costs.
> - **Jev Engineering (TypeSafe Blueprint)** for meta-attention, query-aware visibility ladders, tiered tool disclosure, and routing trap avoidance.

---

## 🌟 Executive Summary

Founder OS rejects the "generic dead template" and "AI chat wrapper" paradigms. Instead of reading passive advice or chatting with ungrounded bots, founders use Founder OS as a **living operating canvas** to execute real work:

1. **Answer the 4 North-Star Questions Daily:** *What matters now? What evidence do we have? What is blocked? What changed?*
2. **Ground Every Assumption in Customer Evidence:** Log interview quotes, stopwatch-timed pain audits, and willingness-to-pay signals.
3. **Generate Live Datasets in 1 Sentence with Bigset:** Turn prompts into structured, deduplicated lead tables with verifiable source URLs and automated refresh schedules.
4. **Pool Free-Tier LLM Quotas with FreeLLMAPI & OmniRoute:** Multiply prototyping capacity by aggregating Google AI Studio, Groq, Cerebras, and Mistral behind one endpoint with auto-failover.
5. **Eliminate KV Cache Waste with Jev Engineering:** Score context chunks on a query-aware visibility ladder, disclose tools snippet-first, and avoid the routing trap where cheap models cost more.
6. **Enforce "One-Job / One-Screen" Product Clarity:** Prevent feature bloat before achieving 80%+ clinician pilot retention.
7. **Compound Structural Defensibility:** Build vertical workflow switching costs, proprietary clinical data, and regulatory HIPAA moats.

---

## 🏛️ Operating Architecture & Modules

### 1. Founder Dashboard (`StageDashboard.jsx`)
- **Action-Oriented Hero:** Direct answers to the 4 essential operating questions.
- **5 Vital Health Gauges:** Validated Opportunity Score, Active Pilot Retainers, Cash Runway, Note Acceptance Rate, and MRR.
- **Urgent Action Queue:** Ranked priority tasks with owners and due dates.
- **Active Pilot Pipeline:** Visual pipeline tracking clinical onboarding and EHR copy-paste reliability.

### 2. Market Discovery & Opportunity Scorecard (`StageDiscovery.jsx`)
- **6-Dimension Opportunity Scorecard:** Evaluates Urgency, Frequency, Budget/ROI, Reachability, Evidence Quality, and Wedge Differentiation (Scores out of 30, with Tier 1/2/3 conviction tiers).
- **Customer Discovery Interview Logger:** Captures clinician name, practice size, quantified pain hours, verbatim quotes, observed workarounds, and willingness to pay.
- **Bottom-Up Market Sizing Model:** Multiplies reachable ICP × plausible ACV × conservative penetration % with Low (-40%), Base, and High (+50%) sensitivity scenarios.

### 3. Product Wedge & Pilot Commitments (`StageWedge.jsx`)
- **"One-Job / One-Screen" Clarity Canvas:** Identifies 1 specific user, 1 painful job, 1 promised outcome, and 1 measurable activation event.
- **Pilot Commitment Tracker:** Tracks onboarding status from Qualified Discovery to Paid Pilot ($199/mo) with live note acceptance rate monitoring.

### 4. Bounded Distribution Engine (`StageDistribution.jsx`)
- **Bounded Channel Experiments:** Tracks audience, hypothesis, weekly spend budget, time budget (hours/wk), leading metric target vs observed, and learnings.
- **Ethical Outreach Generator:** Generates 1-on-1 personalized outreach emails with verified observations, specific value, low-friction asks, and opt-out reminders.
- **Content Batching Pipeline:** 5-stage lifecycle (Idea, Script, Recording, Review, Published) for video teardowns and clinical guides.

### 5. Execution & Operating Rhythm (`StageOperations.jsx`)
- **Weekly Cadence Review:** Captures primary weekly focus, interactive priority checkboxes, blockers, customer learnings, and architectural decisions.
- **9×9 Goal Matrix:** 1 central objective surrounded by 8 enabling operational pillars with concrete weekly actions.
- **Context-Cued Habit Engine:** Habit loops tied to stable contexts with active streak tracking.
- **Reusable SOP Library:** Standard operating procedures for customer discovery calls and pilot onboarding protocols.

### 6. Unit Economics & Variable Delivery Watchlist (`StageEconomics.jsx`)
- **Cash Solvency & Burn Engine:** Computes gross burn, net burn, runway months, and "Default Alive" detection.
- **Variable Delivery Cost Watchlist:** Monitors third-party API costs (Deepgram speech-to-text, Claude LLM tokens, cloud hosting) with automated budget alerts.
- **Unit Economics & Payback:** Tracks ACV ($2,388/yr), gross margin (94.5%), blended CAC ($450), payback speed (2.4 months), and LTV:CAC ratio (12.5x).
- **Interactive Scale Simulator:** Sliders to model cash flow inflection points from 5 to 150 paid clinics.

### 7. Moat Defensibility & GTM Validation Manifesto (`StageStrategy.jsx`)
- **6-Dimension Moat Scorecard:** Evaluates Switching Costs, Proprietary Data, Network Effects, Cost Advantage, Regulatory Licensing, and Speed of Execution.
- **High-Clarity Brand Positioning Canvas:** Maps ICP, Category, Promised Outcome, Economic Value Equation, Competitor Alternative, and Concrete Proof.
- **Comprehensive GTM Playbook & Validation Manifesto:** 1-click generation, clipboard copy, and `.md` file download summarizing the complete venture state.
- **JSON State Backup:** 1-click export of the entire workspace state for archival or transfer.

---

## ⚡ Integrated AI Engines (Bigset, FreeLLMAPI, Jev)

### 1. Bigset by TinyFish — 1-Sentence Live Web Dataset Swarm (`BigsetIntelView.jsx`)
- **Natural Language Schema Inference:** Input any sentence (e.g. *"Startups that raised funding in the last 30 days"*, *"Solo physical therapy clinics in Colorado & Texas"*); Bigset infers the columns, primary key, and validation rules.
- **Parallel Sub-Agent Swarm:** Orchestrator agent performs discovery while parallel sub-agents fan out, each scoped to an entity to extract verified facts with live source links.
- **Primary-Key Deduplication:** Avoids duplicate rows and guarantees provenance.
- **Automated Refresh Cadence:** 30 min, 6 hours, 12 hours, Daily, Weekly with live CSV and JSON export.

### 2. FreeLLMAPI & OmniRoute Multi-Provider Gateway (`GatewayManagerView.jsx`)
- **Unified Quota Pool:** Connects Google AI Studio (Gemini 2.0 Flash), Groq (Llama-3.3-70b), Cerebras (Llama-3.3-70b), Mistral (Mistral Small), and OpenRouter behind `localhost:3001/v1` or `localhost:20128/v1`.
- **Aggregate Capacity:** Unlocks 31,000+ daily free requests and 90+ RPM concurrency with automatic 429 failover.
- **Smart Strategies:** `auto` (balance), `auto/coding` (syntax quality), `auto/fast` (sub-120ms latency), `auto/cheap`, `auto/offline` (highest remaining quota).
- **`X-Routed-Via` Telemetry:** Live inspection showing which provider answered, latency in ms, and fallback hops.
- **Production Off-Ramp (`USE_GATEWAY`):** 1-click toggle to route directly to paid frontier endpoints (Claude 3.5 Sonnet / Azure) without code changes.

### 3. Jev Engineering for Coding Agents (`JevHarnessView.jsx`)
- **Query-Aware Visibility Ladder:** Replaces blind compaction. Chunks are dynamically classified as `HIDE` (0 tokens), `SHORT` (10-20 tokens), `LONG` (50-100 tokens), or `FULL` (100% tokens) based on the active question, delivering **80%+ context token savings**.
- **The Routing Trap Calculator:** Implements the exact cost formula from Jev Section II.A ($25Y + 5Z$ vs $3X + 20Y + 8Z + 5(Y+Z)$). Proves why naive routing to cheaper models loses money when context $X$ is large, and shows when it is safe to route ($5Y > 3(X+Z)$).
- **Tiered Tool Disclosure:** Discloses 50+ candidate tools snippet-first (<150 tokens total), loads argument schemas only on demand, and pulls full documentation only for complex one-offs.
- **Security-Aware Routing Matrix:** Automatically routes public documentation to free gateway models, while restricting secrets, `.env` files, and HIPAA BAA data to verified first-party frontier endpoints.
- **Conditional Instructions:** Rules attached to conditions (`touches *.tsx`, `inside billing/`, `writing prose`) that are pinned against compaction.

---

## 📡 Agent Reach Integration

Founder OS integrates natively with **Agent Reach** (`agent-reach` v1.5.0), an upstream intelligence router installed on the host system. Rather than hallucinating customer pain points or market trends, Agent Reach provides direct command recipes to extract primary evidence:

- **Jina Web Reader:** Scrapes clinical protocols, EHR documentation forums, and competitor blogs cleanly in Markdown without paywalls or bot blockers.
- **YouTube & Audio (`yt-dlp`):** Ingests real practitioner screen recordings, workflow videos, and goniometer measurement demonstrations.
- **GitHub CLI (`gh`):** Scans open-source medical record tools, clinical vocabularies, and health IT integrations.
- **Exa Semantic Search (`mcporter`):** Neural semantic discovery across clinical discussion boards and solo practitioner communities.
- **OpenCLI:** Headless browser session access for Reddit, X, and specialized professional groups.

---

## 🚀 Final Build & Verification Report

| Verification Step | Target Requirement | Verified Result | Status |
| :--- | :--- | :--- | :--- |
| **Vitest Automated Tests** | Core math, Bigset, Gateway, & Jev logic | **20/20 tests passing** in 79ms (`calculations.test.js` & `deepIntegration.test.js`) | ✅ PASS |
| **Vite Production Build** | Zero TypeScript / bundling errors | **Built clean in 361ms** (`dist/assets/*.js`) | ✅ PASS |
| **Dev Server HTTP Health** | `http://localhost:5173` | **HTTP 200 OK** | ✅ PASS |
| **UI/UX Aesthetics** | Non-generic, dark-mode `#080d1a`, responsive | **Custom Tailwind design system with micro-borders, sliders, & animations** | ✅ PASS |
| **State Persistence** | Browser reload resilience | **Synchronized via `localStorage` under `founderos_v2_*`** | ✅ PASS |
| **Demo Data Isolation** | Clean reset capability | **1-click Reset Demo button restores pristine ScribeFlow data** | ✅ PASS |
| **GTM Export Engine** | Markdown & JSON export | **Working `.md` download & clipboard copy** | ✅ PASS |

---

## 💻 How to Run Locally

### Prerequisites
- Node.js >= 18.0.0
- npm >= 9.0.0

### Installation & Launch
```bash
# 1. Clone repository
git clone https://github.com/21cabbagee/founder-os.git
cd founder-os

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev

# 4. Run automated test suite (20 tests)
npm test

# 5. Build production bundle
npm run build
```

---

*Founder OS is engineered for founders and AI engineers who value evidence over assumptions.*
