/**
 * Bigset by TinyFish — Multi-Agent Structured Dataset Engine
 * 
 * Turns one natural language sentence into a structured, self-refreshing dataset.
 * Orchestrator discovers leads, sub-agents fan out in parallel to extract verified facts with source URLs,
 * and deduplicates on a primary key.
 */

export const PRESET_BIGSET_PROMPTS = [
  {
    id: 'funded-startups-30d',
    title: 'Startups funded in last 30 days',
    category: 'Leads & Investors',
    sentence: 'Startups that raised funding in the last 30 days, with what they do, funding stage, location, and careers page.',
    schema: ['Company', 'Domain', 'WhatTheyDo', 'Stage', 'AmountRaised', 'Location', 'CareersUrl', 'SourceUrl', 'ConfidenceScore']
  },
  {
    id: 'solo-pt-clinics-cotx',
    title: 'Independent PT Clinics (CO & TX)',
    category: 'Healthcare B2B Prospects',
    sentence: 'Solo & boutique physical therapy clinics in Colorado and Texas, with clinic owner, EHR software used, phone, and website.',
    schema: ['ClinicName', 'OwnerName', 'Location', 'EhrSoftware', 'WeeklyVolume', 'Website', 'SourceUrl', 'ConfidenceScore']
  },
  {
    id: 'yc-companies-hiring',
    title: 'YC companies hiring engineers',
    category: 'Job Intelligence',
    sentence: 'YC companies currently hiring engineers, with funding stage, location, tech stack, and number of open roles.',
    schema: ['Company', 'Batch', 'Stage', 'Location', 'TechStack', 'OpenRolesCount', 'JobsUrl', 'SourceUrl', 'ConfidenceScore']
  },
  {
    id: 'b2b-saas-freetiers',
    title: 'B2B SaaS with free tiers',
    category: 'Market Gap Analysis',
    sentence: 'Popular B2B SaaS healthcare and documentation tools that offer a free tier, with category, free-tier limits, and pricing page URL.',
    schema: ['ToolName', 'Category', 'FreeTierSummary', 'StartingPaidTier', 'PricingUrl', 'SourceUrl', 'ConfidenceScore']
  }
];

export const INITIAL_BIGSET_DATASETS = [
  {
    id: 'ds-funded-30d',
    sentence: 'Startups that raised funding in the last 30 days, with what they do, funding stage, location, and careers page.',
    primaryKey: 'Domain',
    refreshCadence: 'Daily', // '30m' | '6h' | '12h' | 'Daily' | 'Weekly'
    lastRefreshedAt: '2026-10-14T08:15:00Z',
    status: 'Ready',
    totalEntitiesFound: 6,
    rows: [
      {
        Company: 'Aura Health AI',
        Domain: 'aurahealth.ai',
        WhatTheyDo: 'Ambient clinical listening for pediatric clinics with zero hardware',
        Stage: 'Series A',
        AmountRaised: '$14.2M',
        Location: 'Austin, TX',
        CareersUrl: 'https://aurahealth.ai/careers',
        SourceUrl: 'https://techcrunch.com/2026/10/02/aura-health-series-a',
        ConfidenceScore: 98,
        discoveredAt: '2026-10-14'
      },
      {
        Company: 'Kinetix Medical',
        Domain: 'kinetixmed.com',
        WhatTheyDo: 'Computer-vision goniometer and automated range-of-motion billing code generator',
        Stage: 'Seed',
        AmountRaised: '$3.5M',
        Location: 'Boulder, CO',
        CareersUrl: 'https://kinetixmed.com/jobs',
        SourceUrl: 'https://news.ycombinator.com/item?id=41829102',
        ConfidenceScore: 95,
        discoveredAt: '2026-10-14'
      },
      {
        Company: 'Synapse Flow',
        Domain: 'synapseflow.io',
        WhatTheyDo: 'Decentralized medical records verification with zero-knowledge proofs',
        Stage: 'Pre-Seed',
        AmountRaised: '$1.8M',
        Location: 'San Francisco, CA',
        CareersUrl: 'https://synapseflow.io/careers',
        SourceUrl: 'https://synapseflow.io/press/seed-raise',
        ConfidenceScore: 92,
        discoveredAt: '2026-10-13'
      },
      {
        Company: 'ChartPilot Health',
        Domain: 'chartpilot.co',
        WhatTheyDo: 'Specialist veterinary and physical therapy auto-charting agent',
        Stage: 'Seed',
        AmountRaised: '$4.1M',
        Location: 'Denver, CO',
        CareersUrl: 'https://chartpilot.co/team',
        SourceUrl: 'https://pitchbook.com/profiles/company/chartpilot',
        ConfidenceScore: 96,
        discoveredAt: '2026-10-12'
      },
      {
        Company: 'NexusBio Genomics',
        Domain: 'nexusbio.ai',
        WhatTheyDo: 'Variant effect prediction and protein design models for rare diseases',
        Stage: 'Series A',
        AmountRaised: '$18.0M',
        Location: 'Boston, MA',
        CareersUrl: 'https://nexusbio.ai/openings',
        SourceUrl: 'https://endpts.com/nexusbio-18m-genomics-ai',
        ConfidenceScore: 99,
        discoveredAt: '2026-10-11'
      },
      {
        Company: 'MotionMetrics PT',
        Domain: 'motionmetrics.clinic',
        WhatTheyDo: 'In-clinic smart sensor mat for orthopedic balance testing',
        Stage: 'Seed',
        AmountRaised: '$2.2M',
        Location: 'Dallas, TX',
        CareersUrl: 'https://motionmetrics.clinic/careers',
        SourceUrl: 'https://crunchbase.com/organization/motionmetrics',
        ConfidenceScore: 94,
        discoveredAt: '2026-10-10'
      }
    ]
  },
  {
    id: 'ds-pt-clinics',
    sentence: 'Solo & boutique physical therapy clinics in Colorado and Texas, with clinic owner, EHR software used, phone, and website.',
    primaryKey: 'Website',
    refreshCadence: 'Weekly',
    lastRefreshedAt: '2026-10-12T14:30:00Z',
    status: 'Ready',
    totalEntitiesFound: 4,
    rows: [
      {
        ClinicName: 'Vance Orthopedic Therapy',
        OwnerName: 'Dr. Marcus Vance, PT, DPT',
        Location: 'Austin, TX',
        EhrSoftware: 'WebPT',
        WeeklyVolume: '70 patient visits',
        Website: 'https://vanceorthopt.com',
        SourceUrl: 'https://npiregistry.cms.hhs.gov/provider-view/1841394012',
        ConfidenceScore: 99,
        discoveredAt: '2026-10-12'
      },
      {
        ClinicName: 'Pacific Motion PT',
        OwnerName: 'Dr. Chloe Lin, DPT, OCS',
        Location: 'Seattle, WA',
        EhrSoftware: 'Jane App',
        WeeklyVolume: '85 patient visits',
        Website: 'https://pacificmotionpt.com',
        SourceUrl: 'https://pacificmotionpt.com/about-us',
        ConfidenceScore: 97,
        discoveredAt: '2026-10-12'
      },
      {
        ClinicName: 'Mile High Spine & Sport',
        OwnerName: 'Dr. Nathan Becker, PT',
        Location: 'Denver, CO',
        EhrSoftware: 'Clinicient / Insight',
        WeeklyVolume: '60 patient visits',
        Website: 'https://milehighspinesport.com',
        SourceUrl: 'https://npiregistry.cms.hhs.gov/provider-view/1922301948',
        ConfidenceScore: 94,
        discoveredAt: '2026-10-11'
      },
      {
        ClinicName: 'Elevate Sports Therapy',
        OwnerName: 'Dr. Samira Khan, PT, CSCS',
        Location: 'Boulder, CO',
        EhrSoftware: 'WebPT',
        WeeklyVolume: '50 patient visits',
        Website: 'https://elevatesportsboulder.com',
        SourceUrl: 'https://elevatesportsboulder.com/team',
        ConfidenceScore: 96,
        discoveredAt: '2026-10-10'
      }
    ]
  }
];

/**
 * Infer a structured schema from an arbitrary English prompt
 */
export function inferSchemaFromSentence(sentence) {
  const lower = sentence.toLowerCase();
  
  if (lower.includes('startup') || lower.includes('funded') || lower.includes('raised')) {
    return {
      category: 'Startups & Funding',
      primaryKey: 'Domain',
      columns: ['Company', 'Domain', 'WhatTheyDo', 'Stage', 'AmountRaised', 'Location', 'CareersUrl', 'SourceUrl', 'ConfidenceScore']
    };
  }
  
  if (lower.includes('clinic') || lower.includes('therap') || lower.includes('doctor') || lower.includes('hospital')) {
    return {
      category: 'Healthcare & Clinical Prospects',
      primaryKey: 'Website',
      columns: ['ClinicName', 'OwnerName', 'Location', 'EhrSoftware', 'WeeklyVolume', 'Website', 'SourceUrl', 'ConfidenceScore']
    };
  }
  
  if (lower.includes('job') || lower.includes('hiring') || lower.includes('role') || lower.includes('engineer')) {
    return {
      category: 'Talent & Job Openings',
      primaryKey: 'Company',
      columns: ['Company', 'RoleTitle', 'Location', 'Stage', 'TechStack', 'CareersUrl', 'SourceUrl', 'ConfidenceScore']
    };
  }

  // Default general entity schema
  return {
    category: 'General Entities',
    primaryKey: 'Name',
    columns: ['Name', 'Category', 'Description', 'KeyMetric', 'Website', 'SourceUrl', 'ConfidenceScore']
  };
}

/**
 * Deduplicate rows based on the primary key
 */
export function deduplicateRows(rows, primaryKey = 'Domain') {
  const seen = new Set();
  const result = [];
  for (const row of rows) {
    const keyVal = String(row[primaryKey] || row.Domain || row.Company || row.Name || '').toLowerCase().trim();
    if (keyVal && !seen.has(keyVal)) {
      seen.add(keyVal);
      result.push(row);
    }
  }
  return result;
}

/**
 * Generate CSV text for download
 */
export function exportToCsv(dataset) {
  if (!dataset || !dataset.rows || dataset.rows.length === 0) return '';
  const headers = Object.keys(dataset.rows[0]);
  const rowsText = dataset.rows.map(row => 
    headers.map(h => {
      const val = row[h] !== undefined ? String(row[h]) : '';
      return `"${val.replace(/"/g, '""')}"`;
    }).join(',')
  );
  return [headers.join(','), ...rowsText].join('\n');
}
