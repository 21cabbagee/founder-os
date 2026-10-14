/**
 * Jev Engineering for Coding Agents — Harness & Meta-Attention Engine
 * Based on design notes by Diogo Almeida (TypeSafe).
 * 
 * Core thesis: "The loop is not where the leverage is. The leverage is in what the harness feeds the model each time it turns."
 * Replaces append-only transcripts and blind compaction with:
 * 1. Typed Decision Layer (Choices, Scores, Noul decisions with probabilities)
 * 2. Query-Aware Visibility Ladder (Hide, Short, Long, Full)
 * 3. Routing Trap Arithmetic (Pricing per context rebuild vs per token)
 * 4. Tiered Tool Disclosure (Snippets -> Schema on Demand -> Docs)
 * 5. Conditional Instructions (AGENTS.md pinned against compaction)
 * 6. Sensitivity-Aware Model Routing (Public -> Free Gateway, Restricted -> Frontier Only)
 */

export const VISIBILITY_LEVELS = {
  HIDE: { id: 'HIDE', label: 'Don\'t Show', tokenFactor: 0, desc: '0 tokens in context. Completely hidden for current query.' },
  SHORT: { id: 'SHORT', label: 'Short Summary', tokenFactor: 0.05, desc: '10-20 tokens. Captures existence and 1-line key result.' },
  LONG: { id: 'LONG', label: 'Long Summary', tokenFactor: 0.20, desc: '50-100 tokens. Detailed summary, trace, and causes.' },
  FULL: { id: 'FULL', label: 'Full Verbatim', tokenFactor: 1.0, desc: '100% tokens. Verbatim file content or raw grep output.' }
};

export const INITIAL_CONTEXT_CHUNKS = [
  {
    id: 'chunk-1',
    label: 'grep output: WebPT SOAP export handlers',
    originalTokens: 2400,
    type: 'grep_search',
    relevanceQuery: 'How does clipboard copy format goniometer degrees?',
    recommendedVisibility: 'SHORT',
    contentPreview: '2,400 lines of regex logs and AST grep hits across 18 files',
    shortSummary: '12 relevant hits in src/handlers/webptClipboard.ts line 45-80 formatting ROM angles.',
    longSummary: 'WebPT clipboard exports require plain text tab-separated format with specific ROM degree characters. Found 12 exact matching regex handlers in src/handlers/webptClipboard.ts.',
    fullContent: '[... 2,400 lines of grep results ...]'
  },
  {
    id: 'chunk-2',
    label: 'Test log: Failing unit test for Medicare Part B',
    originalTokens: 1600,
    type: 'test_log',
    relevanceQuery: 'Why is Part B functional goal syntax failing?',
    recommendedVisibility: 'LONG',
    contentPreview: 'Vitest failure trace on test_medicare_goals.ts',
    shortSummary: 'Assertion failed: expected 3 functional goals, received 2.',
    longSummary: 'Vitest assertion failed at test_medicare_goals.ts:42. Claude output missed the secondary ambulation endurance goal because time was reported in minutes instead of feet.',
    fullContent: '[... 1,600 lines of Vitest stack traces and runner output ...]'
  },
  {
    id: 'chunk-3',
    label: 'File: src/auth/session.ts',
    originalTokens: 850,
    type: 'source_file',
    relevanceQuery: 'Inspect token refresh expiration logic',
    recommendedVisibility: 'FULL',
    contentPreview: 'Core session manager and encrypted cookie storage',
    shortSummary: 'Session authentication helper exporting verifySession() and refreshJWT().',
    longSummary: 'Full implementation of encrypted session cookie handling with 14-day rolling refresh and HIPAA audit log emission.',
    fullContent: 'export async function verifySession(req) { /* 850 lines of session verification code */ }'
  },
  {
    id: 'chunk-4',
    label: 'Old planning notes: Superseded v1 architectural roadmap',
    originalTokens: 1900,
    type: 'superseded_plan',
    relevanceQuery: 'What was the previous proposal for local WebSockets?',
    recommendedVisibility: 'HIDE',
    contentPreview: 'Old draft written 3 weeks ago proposing electron desktop sidecar',
    shortSummary: 'Superseded architectural plan proposing Electron sidecar (abandoned in favor of web audio).',
    longSummary: 'Draft plan from Sept 2026 detailing abandoned Electron desktop architecture. Superseded by browser web audio listener.',
    fullContent: '[... 1,900 lines of superseded planning notes ...]'
  }
];

export const TIERED_TOOL_CATALOG = [
  {
    id: 'ast_grep',
    name: 'ast_grep',
    tier1Snippet: 'ast_grep: Structural AST code search across syntax tree (functions, classes, imports)',
    tier2Schema: {
      tool: 'ast_grep',
      arguments: {
        pattern: { type: 'string', description: 'AST pattern to match (e.g. function $NAME($$$ARGS) { $$$BODY })' },
        lang: { type: 'string', enum: ['typescript', 'javascript', 'python', 'rust'] },
        path: { type: 'string', description: 'Target directory or file path' }
      }
    },
    tier3Docs: 'Structural search uses tree-sitter AST nodes rather than naive string regex. Replaces grep for code refactoring and syntax-aware symbol hunting.'
  },
  {
    id: 'headroom',
    name: 'headroom',
    tier1Snippet: 'headroom: Semantic context compressor that classifies and keeps only essential facts',
    tier2Schema: {
      tool: 'headroom',
      arguments: {
        targetTokens: { type: 'number', description: 'Target token budget' },
        preserveDirectives: { type: 'array', items: { type: 'string' } }
      }
    },
    tier3Docs: 'Headroom applies classifier-backed distillation. Preserves variable names, exact line numbers, and error traces while stripping boilerplate logs.'
  },
  {
    id: 'rtk',
    name: 'rtk',
    tier1Snippet: 'rtk: High-ratio tool-output compressor for massive CLI logs and stack traces',
    tier2Schema: {
      tool: 'rtk',
      arguments: {
        rawOutput: { type: 'string' },
        compressionRatio: { type: 'number', default: 0.1 }
      }
    },
    tier3Docs: 'RTK extracts the actionable kernel of large command outputs (e.g. compiler outputs with 500 warnings to top 3 actual errors).'
  },
  {
    id: 'fff',
    name: 'fff',
    tier1Snippet: 'fff: In-memory frequency-ranked path and file content search, faster than ripgrep',
    tier2Schema: {
      tool: 'fff',
      arguments: {
        query: { type: 'string' },
        maxResults: { type: 'number', default: 10 }
      }
    },
    tier3Docs: 'Maintains an in-memory ngram index of the repo for sub-millisecond retrieval during long coding turns.'
  }
];

export const CONDITIONAL_RULES = [
  {
    id: 'cond-1',
    condition: 'touches *.tsx or *.jsx',
    directiveName: 'Frontend Design & Accessibility Standard',
    fragment: 'Ensure high contrast (>4.5:1), visible focus rings, aria-modal on dialogs, and no generic gray dead-template aesthetics. Use curated dark slate palette.',
    pinnedAgainstCompaction: true
  },
  {
    id: 'cond-2',
    condition: 'touches *billing* or *payment* or *hipaa*',
    directiveName: 'HIPAA & Financial Invariant Policy',
    fragment: 'Never log raw audio waveforms or unmasked PHI. Emit audit event to secure log and verify signed Business Associate Agreement (BAA) before data processing.',
    pinnedAgainstCompaction: true
  },
  {
    id: 'cond-3',
    condition: 'writing prose or outreach',
    directiveName: 'Ethical Outreach & Verifiable Value',
    fragment: 'Never use fake familiarity or fabricated mutual friends. State verified observation, verifiable value, and include low-friction opt-out.',
    pinnedAgainstCompaction: true
  }
];

/**
 * Calculates the exact cost of naive routing vs pure frontier model
 * From Jev Section II.A (The Routing Trap)
 * 
 * Path 1 (Pure Frontier - Opus): 25*Y + 5*Z
 * Path 2 (Opus -> Sonnet -> Opus): 3*X + 20*Y + 8*Z + 5*(Y+Z)
 * 
 * Where:
 * X = Context tokens (millions)
 * Y = Generated output tokens (millions)
 * Z = Additional tokens read during work (millions)
 */
export function calculateRoutingTrap(X_context, Y_gen, Z_read) {
  const X = Number(X_context) || 0;
  const Y = Number(Y_gen) || 0;
  const Z = Number(Z_read) || 0;

  // Path 1: Pure Frontier (e.g. Opus @ $5 in / $25 out)
  const path1Cost = 25 * Y + 5 * Z;

  // Path 2: Naive Routing (Opus -> Sonnet -> Opus reload)
  // Sonnet loads context (3*X) + generates (15*Y) + reads (3*Z)
  // Opus reloads what changed: 5*(Y + Z)
  const sonnetLoadContext = 3 * X;
  const sonnetGenerate = 15 * Y;
  const sonnetRead = 3 * Z;
  const opusReloadChanged = 5 * (Y + Z);
  const path2Cost = sonnetLoadContext + sonnetGenerate + sonnetRead + opusReloadChanged;

  const costDifference = path2Cost - path1Cost;
  const isRoutingTrap = path2Cost > path1Cost;
  const percentageOverhead = path1Cost > 0 ? Math.round((costDifference / path1Cost) * 100) : 0;

  return {
    path1Cost: Number(path1Cost.toFixed(2)),
    path2Cost: Number(path2Cost.toFixed(2)),
    isRoutingTrap,
    costDifference: Number(costDifference.toFixed(2)),
    percentageOverhead,
    verdict: isRoutingTrap
      ? `Routing Trap Detected: Delegating to the cheaper model costs ${percentageOverhead}% MORE because reloading context (3X) and returning changed state to the frontier model (5(Y+Z)) outweighs the per-token discount.`
      : `Safe to Route: Purpose-built small context enables ${Math.abs(percentageOverhead)}% net cost savings.`
  };
}

/**
 * Evaluates the sensitivity of a file path and determines the security routing policy
 * From Jev Section IX (Security-Aware Routing)
 */
export function evaluateSecurityPolicy(filePath) {
  const path = filePath.toLowerCase();

  if (path.includes('.env') || path.includes('secret') || path.includes('id_rsa') || path.includes('.ssh') || path.includes('cert')) {
    return {
      policy: 'RESTRICTED',
      eligibleModels: 'First-party frontier only (Claude 3.5 Sonnet / GPT-4o)',
      canEgressToExternalGateway: false,
      reason: 'Contains credentials, private keys, or cloud secrets. Never route through free or third-party proxy endpoints.'
    };
  }

  if (path.includes('patient') || path.includes('hipaa') || path.includes('phi') || path.includes('financial') || path.includes('billing')) {
    return {
      policy: 'CONFIDENTIAL',
      eligibleModels: 'HIPAA-compliant vetted endpoints with signed BAA',
      canEgressToExternalGateway: false,
      reason: 'Protected health information / financial billing rules.'
    };
  }

  if (path.includes('docs/') || path.includes('readme') || path.includes('package.json') || path.includes('.gitignore') || path.includes('public/')) {
    return {
      policy: 'OPEN',
      eligibleModels: 'Any provider, cheapest / free gateway first (Groq, Cerebras, Gemini Flash)',
      canEgressToExternalGateway: true,
      reason: 'Public documentation and open configuration. Safe for zero-cost multi-provider gateway routing.'
    };
  }

  return {
    policy: 'STANDARD',
    eligibleModels: 'Vetted providers (Gemini Flash, Mistral, Sonnet)',
    canEgressToExternalGateway: true,
    reason: 'Application source code without secrets. Standard secure API tier.'
  };
}
