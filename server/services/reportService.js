// server/services/reportService.js

import Patient from '../models/Patient.js';       // ensure filename matches
import { lookupRisk } from '../utils/riskLookup.js';

/**
 * Add ordinal suffix to day numbers: 1→"1st", 2→"2nd", etc.
 */
function ordinalSuffixOf(i) {
  const j = i % 10, k = i % 100;
  if (j === 1 && k !== 11) return i + 'st';
  if (j === 2 && k !== 12) return i + 'nd';
  if (j === 3 && k !== 13) return i + 'rd';
  return i + 'th';
}

/**
 * Format a Date into "14th May 2025"
 */
function formatDate(d) {
  const day   = ordinalSuffixOf(d.getDate());
  const month = d.toLocaleString('default', { month: 'long' });
  const year  = d.getFullYear();
  return `${day} ${month} ${year}`;
}

/**
 * Format a Date into "1:36 PM"
 */
function formatTime(d) {
  let h = d.getHours();
  const m = d.getMinutes().toString().padStart(2, '0');
  const ampm = h >= 12 ? 'PM' : 'AM';
  h = h % 12 || 12;
  return `${h}:${m} ${ampm}`;
}

/**
 * Unwrap Mongo‐style {$numberInt:"..."} or {$numberDouble:"..."} → Number
 */
function asNumber(n) {
  if (n && typeof n === 'object') {
    if ('$numberInt'    in n) return parseInt(n.$numberInt,   10);
    if ('$numberDouble' in n) return parseFloat(n.$numberDouble);
  }
  return n;
}

/**
 * Generic 0/1/2 scorer: ≤t0→0, ≤t1→1, else→2
 */
function scoreAgainst(value, t0, t1) {
  if (value <= t0) return 0;
  if (value <= t1) return 1;
  return 2;
}

/**
 * Obesity risk
 */
function obesityRisk(bmi, bri, whr, gender) {
  const bmiScore = scoreAgainst(bmi, 24.9, 29.9);
  const briScore = scoreAgainst(bri,   6.0, 12.0);
  const [w0, w1] = gender.toLowerCase() === 'female' ? [0.85, 0.89] : [0.90, 0.99];
  const whrScore = scoreAgainst(whr, w0, w1);
  const maxScore = Math.max(bmiScore, briScore, whrScore);
  const labels   = ['Normal','Moderate','High'];
  const classes  = ['green','yellow','red'];
  return { statusLabel: labels[maxScore], statusClass: classes[maxScore] };
}

/**
 * Blood pressure risk
 */
function bpRisk(sys, dia) {
  const sysScore = sys <= 120   ? 0 : (sys <= 140 ? 1 : 2);
  const diaScore = dia <= 80    ? 0 : (dia <= 90  ? 1 : 2);
  const maxScore = Math.max(sysScore, diaScore);
  const labels   = ['Normal','Moderate','High'];
  const classes  = ['green','yellow','red'];
  return { statusLabel: labels[maxScore], statusClass: classes[maxScore] };
}

/**
 * Cholesterol risk
 */
function cholesterolRisk(total) {
  const score = total < 200 ? 0 : (total < 240 ? 1 : 2);
  const labels  = ['Normal','Moderate','High'];
  const classes = ['green','yellow','red'];
  return { statusLabel: labels[score], statusClass: classes[score] };
}

/**
 * Physical activity risk
 */
function physicalRisk(act) {
  let score;
  if (/Almost\s+Daily|Regularly/i.test(act))                score = 1;
  else if (/On Office Days|On Weekends/i.test(act))         score = 2;
  else                                                       score = 3;
  const labels  = ['Normal','Moderate','High'];
  const classes = ['green','yellow','red'];
  return { statusLabel: labels[score-1], statusClass: classes[score-1], score };
}

/**
 * Physical summary: map score→short phrase
 */
function physicalSummary(score) {
  const summaries = ['Very Active','Somewhat Active','Rarely Active'];
  return summaries[score-1] || summaries[2];
}

/**
 * Smoking risk
 */
function smokingRisk(ans) {
  let score;
  if (/Non[-\s]*smoker/i.test(ans)) score = 0;
  else if (/Quit in the past/i.test(ans)) score = 1;
  else score = 2;
  const labels  = ['Non-Smoker','Former Smoker','Current Smoker'];
  const classes = ['green','yellow','red'];
  return { statusLabel: labels[score], statusClass: classes[score] };
}

/**
 * Combined sleep score
 */
function mapFrequency(ans) {
  if (/Almost\s+Daily|Regularly/i.test(ans))   return 0;
  if (/On Office Days|On Weekends/i.test(ans)) return 1;
  return 2;
}
function sleepQualityScore(ref, dur) {
  return Math.max(mapFrequency(ref), mapFrequency(dur));
}
function sleepSummary(score) {
  const summaries = ['Well Rested','Fairly Rested','Poorly Rested'];
  return summaries[score] || summaries[2];
}

/**
 * Stress score
 */
function mapStressAnswer(ans) {
  if (/Rarely/i.test(ans))       return 0;
  if (/Sometimes/i.test(ans))    return 1;
  if (/Often|Mostly/i.test(ans)) return 2;
  if (/Very Often|Almost/i.test(ans)) return 3;
  return 0;
}
function stressScore(a1, a2) {
  return Math.max(mapStressAnswer(a1), mapStressAnswer(a2));
}
function stressBucket(score) {
  if (score <= 1) return 0;
  if (score === 2) return 1;
  return 2;
}
function stressSummary(bucket) {
  const summaries = ['Rarely Overwhelmed','Sometimes Under Pressure','Frequently High Stress'];
  return summaries[bucket] || summaries[2];
}
function stressBucketLabel(bucket) {
  const labels = ['Normal','Moderate','High'];
  return labels[bucket] || labels[2];
}

export async function getReportData(patientId) {
  if (!patientId) throw new Error('Missing query param: patient');

  const doc = await Patient.findById(patientId).lean();
  if (!doc) throw new Error('Patient not found: ' + patientId);

  const { basicInfo: b, diagnosis: d, lifestyle: l, calculated: c, updatedAt } = doc;

  // Normalize numeric values
  const height      = asNumber(b.height);
  const weight      = asNumber(b.weight);
  const age         = asNumber(b.age);
  const bmi         = asNumber(c.bmi);
  const bri         = asNumber(c.bri);
  const whr         = asNumber(c.whr);
  const bloodSugar  = asNumber(d.bloodSugar);
  const cholesterol = asNumber(d.cholesterol);
  const sysBP       = asNumber(d.bloodPressure.systolic);
  const diaBP       = asNumber(d.bloodPressure.diastolic);

  // Format date/time
  const testDate = formatDate(updatedAt);
  const testTime = formatTime(updatedAt);

  // Compute statuses & summaries
  const { statusLabel: obesityLabel, statusClass: obesityClass } = obesityRisk(bmi, bri, whr, b.gender);

  const phys = physicalRisk(l.physicalActivity);
  const physLabel = phys.statusLabel, physClass = phys.statusClass, physValue = physicalSummary(phys.score);

  const { statusLabel: bpLabel,   statusClass: bpClass   } = bpRisk(sysBP, diaBP);
  const { statusLabel: cholLabel, statusClass: cholClass } = cholesterolRisk(cholesterol);
  const { statusLabel: smokeLabel, statusClass: smokeClass } = smokingRisk(l.smokingFreq);

  const sqScore    = sleepQualityScore(l.refreshedFeeling, l.sleepHours);
  const sleepLabel = ['Good','Moderate','Poor'][sqScore];
  const sleepClass = ['green','yellow','red'][sqScore];
  const sleepValue = sleepSummary(sqScore);

  const rawStress   = stressScore(l.pressureOverwhelmed, l.physicalSymptoms);
  const bucket      = stressBucket(rawStress);
  const summaryText = stressSummary(bucket);
  const badgeText   = stressBucketLabel(bucket);
  const badgeClass  = ['green','yellow','red'][bucket];

  // Use real riskScore from your score endpoint:
  const { outOf5: riskScore } = 5;

  // Build factors array
  const factors = [
    {
      name:        'Obesity',
      value:       `BMI ${bmi} | WHR ${whr} | BRI ${bri}`,
      icon:        'obesity',
      statusLabel: obesityLabel,
      statusClass: obesityClass
    },
    {
      name:        'Blood Sugar',
      value:       `${bloodSugar} mg/dL`,
      icon:        'blood_sugar',
      statusLabel: 'Normal',
      statusClass: 'green'
    },
    {
      name:        'Blood Pressure',
      value:       `${sysBP}/${diaBP} mmHg`,
      icon:        'bp',
      statusLabel: bpLabel,
      statusClass: bpClass
    },
    {
      name:        'Cholesterol',
      value:       `${cholesterol} mg/dL`,
      icon:        'cholesterol',
      statusLabel: cholLabel,
      statusClass: cholClass
    },
    {
      name:        'Smoking Habit',
      value:       l.smokingFreq,
      icon:        'smoking',
      statusLabel: smokeLabel,
      statusClass: smokeClass
    },
    {
      name:        'Physical Activity',
      value:       physValue,
      icon:        'physical',
      statusLabel: physLabel,
      statusClass: physClass
    },
    {
      name:        'Stress Level',
      value:       summaryText,
      icon:        'stress',
      statusLabel: badgeText,
      statusClass: badgeClass
    },
    {
      name:        'Sleep Quality',
      value:       sleepValue,
      icon:        'sleep',
      statusLabel: sleepLabel,
      statusClass: sleepClass
    }
  ];

  const recommendations = [
    'Increase physical activity to at least 30 min/day',
    'Adopt a balanced diet rich in fruits & vegetables',
    'Monitor blood pressure weekly',
    'Practice stress-management techniques'
  ];

  return {
    testDate,
    testTime,
    name:       b.name,
    age,
    gender:     b.gender,
    height,
    weight,
    riskScore,      // now fetched from /score endpoint
    factors,
    recommendations
  };
}