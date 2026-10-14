import { describe, it, expect } from 'vitest';
import {
  calculateOpportunityScore,
  calculateMarketSizing,
  calculateRunwayAndEconomics,
  calculateMoatDefensibility
} from './calculations';

describe('Founder OS Mathematical & Decision Utilities', () => {
  describe('calculateOpportunityScore', () => {
    it('calculates Tier 1 High Conviction score correctly', () => {
      const res = calculateOpportunityScore({
        urgency: 5,
        frequency: 5,
        budgetRoi: 4,
        reachability: 4,
        evidenceQuality: 4,
        wedgeDifferentiation: 4
      });
      expect(res.totalScore).toBe(26);
      expect(res.maxScore).toBe(30);
      expect(res.tierLabel).toBe('Tier 1 — High Conviction');
      expect(res.percentage).toBe(87);
    });

    it('handles low scores with safe boundaries', () => {
      const res = calculateOpportunityScore({
        urgency: 1,
        frequency: 2,
        budgetRoi: 2,
        reachability: 2,
        evidenceQuality: 1,
        wedgeDifferentiation: 2
      });
      expect(res.totalScore).toBe(10);
      expect(res.tierLabel).toBe('Tier 3 — High Friction');
    });

    it('safely bounds empty or invalid values to 1', () => {
      const res = calculateOpportunityScore({});
      expect(res.totalScore).toBe(6);
    });
  });

  describe('calculateMarketSizing', () => {
    it('calculates bottom-up TAM and SOM with sensitivity range', () => {
      const res = calculateMarketSizing({
        targetAudienceCount: 50000,
        plausibleAcv: 1200,
        penetrationPct: 2
      });
      expect(res.tamWedge).toBe(60000000); // 50,000 * 1,200 = $60M
      expect(res.somEstimate).toBe(1200000); // $60M * 2% = $1.2M
      expect(res.lowEstimate).toBe(720000); // $1.2M * 0.6 = $720k
      expect(res.highEstimate).toBe(1800000); // $1.2M * 1.5 = $1.8M
    });

    it('handles 0 target audience safely', () => {
      const res = calculateMarketSizing({
        targetAudienceCount: 0,
        plausibleAcv: 1000
      });
      expect(res.tamWedge).toBe(0);
      expect(res.somEstimate).toBe(0);
    });
  });

  describe('calculateRunwayAndEconomics', () => {
    it('computes burn, runway months, and status correctly for cash-burning startup', () => {
      const res = calculateRunwayAndEconomics({
        cashBalance: 120000,
        monthlyRevenue: 5000,
        monthlyBurnGross: 20000
      });
      expect(res.netBurn).toBe(15000);
      expect(res.runwayMonths).toBe(8);
      expect(res.runwayStatus).toBe('Caution (4–8 Months)');
      expect(res.isDefaultAlive).toBe(false);
    });

    it('flags default alive / cashflow positive venture safely without zero division', () => {
      const res = calculateRunwayAndEconomics({
        cashBalance: 50000,
        monthlyRevenue: 25000,
        monthlyBurnGross: 18000
      });
      expect(res.netBurn).toBe(0);
      expect(res.isDefaultAlive).toBe(true);
      expect(res.runwayMonths).toBe('Profitable');
      expect(res.runwayStatus).toBe('Default Alive (Cashflow Positive)');
    });
  });

  describe('calculateMoatDefensibility', () => {
    it('evaluates high moat score accurately', () => {
      const res = calculateMoatDefensibility({
        switchingCosts: 5,
        proprietaryData: 5,
        networkEffects: 3,
        costAdvantage: 4,
        regulatoryLicensing: 4,
        speedExecution: 4
      });
      expect(res.totalScore).toBe(25);
      expect(res.defensibilityRating).toBe('High Moat (Durable Defensibility)');
    });
  });
});
