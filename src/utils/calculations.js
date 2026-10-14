/**
 * Founder OS — Core Financial, Discovery & Strategy Mathematical Engine
 * 
 * Strict truthfulness principles:
 * - All calculations expose denominators and explicit formulas
 * - Bottom-up assumptions are marked as sensitivity projections
 * - Safe divide-by-zero protection across all metrics
 */

/**
 * 1. Opportunity Scorecard
 * Calculates Score out of 30 based on 6 core dimensions (1-5 each)
 * @param {Object} scores { urgency, frequency, budgetRoi, reachability, evidenceQuality, wedgeDifferentiation }
 * @returns {Object} { totalScore, maxScore: 30, percentage, tierLabel, recommendation }
 */
export function calculateOpportunityScore(scores = {}) {
  const keys = [
    'urgency',
    'frequency',
    'budgetRoi',
    'reachability',
    'evidenceQuality',
    'wedgeDifferentiation'
  ];

  let totalScore = 0;
  keys.forEach(k => {
    const val = Number(scores[k]) || 0;
    totalScore += Math.max(1, Math.min(5, val));
  });

  const percentage = Math.round((totalScore / 30) * 100);

  let tierLabel = 'Tier 3 — High Friction';
  let recommendation = 'High risk of churn or prolonged sales cycles. Refine the wedge or seek a more urgent recurring pain point before building.';

  if (totalScore >= 24) {
    tierLabel = 'Tier 1 — High Conviction';
    recommendation = 'Strong recurring pain, clear budget, and sharp wedge. Advance immediately to customer commitment tests (paid pilot / LOI).';
  } else if (totalScore >= 18) {
    tierLabel = 'Tier 2 — Promising (Needs Evidence)';
    recommendation = 'Viable market problem, but willingness-to-pay or reachability requires deeper customer interview validation.';
  }

  return {
    totalScore,
    maxScore: 30,
    percentage,
    tierLabel,
    recommendation,
    breakdown: keys.map(k => ({ key: k, score: Number(scores[k]) || 1 }))
  };
}

/**
 * 2. Bottom-up Market Sizing Sensitivity Model
 * Evaluates realistic market size from explicit bottom-up assumptions
 * @param {Object} inputs { targetAudienceCount, plausibleAcv, penetrationPct }
 * @returns {Object} { tamWedge, somEstimate, lowEstimate, baseEstimate, highEstimate }
 */
export function calculateMarketSizing(inputs = {}) {
  const count = Math.max(0, Number(inputs.targetAudienceCount) || 0);
  const acv = Math.max(0, Number(inputs.plausibleAcv) || 0);
  const penetration = Math.max(0.1, Math.min(100, Number(inputs.penetrationPct) || 2)) / 100;

  // Total Addressable Wedge = Total reachable ICP * ACV
  const tamWedge = Math.round(count * acv);

  // Serviceable Obtainable Market (Base Scenario) = TAM * Penetration %
  const baseEstimate = Math.round(tamWedge * penetration);

  // Sensitivity Scenarios: Low (-40%) and High (+50%)
  const lowEstimate = Math.round(baseEstimate * 0.6);
  const highEstimate = Math.round(baseEstimate * 1.5);

  return {
    targetAudienceCount: count,
    plausibleAcv: acv,
    penetrationPct: penetration * 100,
    tamWedge,
    somEstimate: baseEstimate,
    lowEstimate,
    baseEstimate,
    highEstimate,
    formulaNotice: 'Bottom-up model: Reachable ICP × Plausible ACV × Penetration Rate'
  };
}

/**
 * 3. Runway, Burn & Business Health
 * @param {Object} inputs { cashBalance, monthlyRevenue, monthlyBurnGross }
 * @returns {Object} { netBurn, runwayMonths, runwayStatus, isDefaultAlive }
 */
export function calculateRunwayAndEconomics(inputs = {}) {
  const cash = Math.max(0, Number(inputs.cashBalance) || 0);
  const revenue = Math.max(0, Number(inputs.monthlyRevenue) || 0);
  const grossBurn = Math.max(0, Number(inputs.monthlyBurnGross) || 0);

  const netBurn = Math.max(0, grossBurn - revenue);
  const isDefaultAlive = revenue >= grossBurn;

  let runwayMonths = 999;
  let runwayStatus = 'Default Alive (Cashflow Positive)';

  if (!isDefaultAlive && netBurn > 0) {
    runwayMonths = Math.round((cash / netBurn) * 10) / 10;
    if (runwayMonths <= 3.5) {
      runwayStatus = 'Critical (< 4 Months)';
    } else if (runwayMonths <= 8) {
      runwayStatus = 'Caution (4–8 Months)';
    } else {
      runwayStatus = 'Healthy Runway (> 8 Months)';
    }
  }

  return {
    cashBalance: cash,
    monthlyRevenue: revenue,
    monthlyBurnGross: grossBurn,
    netBurn,
    runwayMonths: isDefaultAlive ? 'Profitable' : runwayMonths,
    runwayMonthsNumeric: isDefaultAlive ? 999 : runwayMonths,
    runwayStatus,
    isDefaultAlive
  };
}

/**
 * 4. Defensibility & Moat Scorecard
 * @param {Object} moatScores { switchingCosts, proprietaryData, networkEffects, costAdvantage, regulatoryLicensing, speedExecution }
 * @returns {Object} { totalScore, maxScore: 30, defensibilityRating, summary }
 */
export function calculateMoatDefensibility(moatScores = {}) {
  const keys = [
    'switchingCosts',
    'proprietaryData',
    'networkEffects',
    'costAdvantage',
    'regulatoryLicensing',
    'speedExecution'
  ];

  let totalScore = 0;
  keys.forEach(k => {
    const val = Number(moatScores[k]) || 0;
    totalScore += Math.max(0, Math.min(5, val));
  });

  let defensibilityRating = 'Low Moat (Commodity Risk)';
  let summary = 'Easy for incumbents or fast followers to replicate. Build compounding customer data or deep workflow switching costs.';

  if (totalScore >= 22) {
    defensibilityRating = 'High Moat (Durable Defensibility)';
    summary = 'Strong competitive barriers through deep workflow integration, network effects, or compounding proprietary data.';
  } else if (totalScore >= 14) {
    defensibilityRating = 'Moderate Moat (Execution Dependent)';
    summary = 'Differentiator relies primarily on speed and specialized wedge. Solid foundation, but requires deepening data loops.';
  }

  return {
    totalScore,
    maxScore: 30,
    percentage: Math.round((totalScore / 30) * 100),
    defensibilityRating,
    summary,
    breakdown: keys.map(k => ({ key: k, score: Number(moatScores[k]) || 0 }))
  };
}
