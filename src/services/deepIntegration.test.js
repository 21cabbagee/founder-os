import { describe, it, expect } from 'vitest';
import { 
  inferSchemaFromSentence, 
  deduplicateRows, 
  exportToCsv,
  PRESET_BIGSET_PROMPTS,
  INITIAL_BIGSET_DATASETS 
} from './bigsetEngine';

import { 
  routeGatewayRequest, 
  calculateAggregateCapacity,
  INITIAL_GATEWAY_PROVIDERS 
} from './gatewayService';

import { 
  calculateRoutingTrap, 
  evaluateSecurityPolicy,
  VISIBILITY_LEVELS,
  INITIAL_CONTEXT_CHUNKS 
} from './jevHarness';

describe('Bigset by TinyFish — Structured Dataset Swarm Engine', () => {
  it('correctly infers schema for funding and startup queries', () => {
    const schema = inferSchemaFromSentence('Startups that raised funding in the last 30 days');
    expect(schema.category).toBe('Startups & Funding');
    expect(schema.primaryKey).toBe('Domain');
    expect(schema.columns).toContain('Company');
    expect(schema.columns).toContain('AmountRaised');
    expect(schema.columns).toContain('SourceUrl');
  });

  it('correctly infers schema for healthcare and clinic prospects', () => {
    const schema = inferSchemaFromSentence('Solo physical therapy clinics in Colorado with EHR software');
    expect(schema.category).toBe('Healthcare & Clinical Prospects');
    expect(schema.primaryKey).toBe('Website');
    expect(schema.columns).toContain('ClinicName');
    expect(schema.columns).toContain('EhrSoftware');
  });

  it('deduplicates entities based on primary key', () => {
    const rawRows = [
      { Company: 'Acme Health', Domain: 'acme.com', Value: 100 },
      { Company: 'Beta AI', Domain: 'beta.ai', Value: 200 },
      { Company: 'Acme Health Duplicate', Domain: 'acme.com', Value: 300 }
    ];
    const deduped = deduplicateRows(rawRows, 'Domain');
    expect(deduped.length).toBe(2);
    expect(deduped[0].Domain).toBe('acme.com');
    expect(deduped[1].Domain).toBe('beta.ai');
  });

  it('exports structured dataset to valid CSV with headers and escaped quotes', () => {
    const dataset = INITIAL_BIGSET_DATASETS[0];
    const csv = exportToCsv(dataset);
    expect(csv).toContain('Company,Domain,WhatTheyDo');
    expect(csv).toContain('"Aura Health AI"');
    expect(csv).toContain('"aurahealth.ai"');
  });
});

describe('FreeLLMAPI & OmniRoute — Multi-Provider Gateway Quota Pool', () => {
  it('calculates aggregate free capacity across independent providers', () => {
    const cap = calculateAggregateCapacity(INITIAL_GATEWAY_PROVIDERS);
    expect(cap.totalRpd).toBeGreaterThan(30000); // 1500 + 14400 + 14400 + 500 + 200 = 31000
    expect(cap.totalRpm).toBeGreaterThan(90);
    expect(cap.remainingRpd).toBeLessThanOrEqual(cap.totalRpd);
    expect(cap.percentUsed).toBeGreaterThanOrEqual(0);
  });

  it('routes fast strategy to ultra-low latency providers (Cerebras / Groq)', () => {
    const res = routeGatewayRequest('Extract entities', 'auto/fast', INITIAL_GATEWAY_PROVIDERS, true);
    expect(['Cerebras Inference', 'Groq Cloud']).toContain(res.providerUsed);
    expect(res.latencyMs).toBeLessThan(200);
    expect(res.xRoutedVia).toContain('freellmapi://');
  });

  it('routes coding strategy to high-fidelity reasoning providers (Google AI Studio / Mistral)', () => {
    const res = routeGatewayRequest('Write TypeScript function', 'auto/coding', INITIAL_GATEWAY_PROVIDERS, true);
    expect(['Google AI Studio', 'Mistral AI']).toContain(res.providerUsed);
  });

  it('respects USE_GATEWAY off-ramp and routes directly to paid frontier', () => {
    const res = routeGatewayRequest('Confidential financial audit', 'auto', INITIAL_GATEWAY_PROVIDERS, false);
    expect(res.providerUsed).toContain('Direct Frontier');
    expect(res.xOmniRouteDecision).toBe('BYPASS_GATEWAY_OFFRAMP');
  });
});

describe('Jev Engineering for Coding Agents — Meta-Attention & Harness', () => {
  it('correctly calculates the Routing Trap and flags when naive routing costs more', () => {
    // In Jev Section II.A: X=0.65, Y=0.12, Z=0.23 -> Path 1 = 4.15, Path 2 = 6.19 (costs ~49% more)
    const trap = calculateRoutingTrap(0.65, 0.12, 0.23);
    expect(trap.path1Cost).toBe(4.15); // 25*0.12 + 5*0.23 = 3.00 + 1.15 = 4.15
    expect(trap.path2Cost).toBe(6.19); // 3*0.65 + 15*0.12 + 3*0.23 + 5*(0.12+0.23) = 1.95 + 1.80 + 0.69 + 1.75 = 6.19
    expect(trap.isRoutingTrap).toBe(true);
    expect(trap.percentageOverhead).toBe(49);
    expect(trap.verdict).toContain('Routing Trap Detected');
  });

  it('identifies safe routing when subtask generates high output relative to context reads (5Y > 3(X+Z))', () => {
    // When subtask is code-generation heavy: X=0.02, Y=0.30, Z=0.02
    // Path 1 (Pure Opus): 25*0.30 + 5*0.02 = 7.60
    // Path 2 (Routed): 3*0.02 + 20*0.30 + 8*0.02 = 6.22
    const safe = calculateRoutingTrap(0.02, 0.30, 0.02);
    expect(safe.isRoutingTrap).toBe(false);
    expect(safe.path1Cost).toBe(7.60);
    expect(safe.path2Cost).toBe(6.22);
    expect(safe.verdict).toContain('Safe to Route');
  });

  it('classifies file sensitivity accurately according to security policy (Table IV)', () => {
    const secretPolicy = evaluateSecurityPolicy('.env.production');
    expect(secretPolicy.policy).toBe('RESTRICTED');
    expect(secretPolicy.canEgressToExternalGateway).toBe(false);

    const hipaaPolicy = evaluateSecurityPolicy('src/billing/hipaaPatientRecords.ts');
    expect(hipaaPolicy.policy).toBe('CONFIDENTIAL');
    expect(hipaaPolicy.canEgressToExternalGateway).toBe(false);

    const publicPolicy = evaluateSecurityPolicy('docs/getting-started.md');
    expect(publicPolicy.policy).toBe('OPEN');
    expect(publicPolicy.canEgressToExternalGateway).toBe(true);
  });

  it('verifies token compression factors on Visibility Ladder', () => {
    expect(VISIBILITY_LEVELS.HIDE.tokenFactor).toBe(0);
    expect(VISIBILITY_LEVELS.SHORT.tokenFactor).toBe(0.05);
    expect(VISIBILITY_LEVELS.LONG.tokenFactor).toBe(0.20);
    expect(VISIBILITY_LEVELS.FULL.tokenFactor).toBe(1.0);
  });
});
