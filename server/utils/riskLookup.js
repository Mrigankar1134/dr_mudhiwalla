// server/utils/riskLookup.js
import { WithDiabetesModel, WithoutDiabetesModel } from '../models/RiskTables.js';

// ── 2) Cache the tables in memory (so we only hit the DB once) ───────────
let _withTable = null;
let _withoutTable = null;
async function loadTables() {
  if (!_withTable) {
    const doc = await WithDiabetesModel.findOne({});
    // either the JSON sits under doc.WithDiabetes, or (if you loaded it flat)
    // under the root of the doc. Adjust as needed:
    _withTable = doc?.WithDiabetes ?? doc.toObject();
  }
  if (!_withoutTable) {
    const doc = await WithoutDiabetesModel.findOne({});
    _withoutTable = doc?.WithoutDiabetes ?? doc.toObject();
  }
}

// ── 3) Helper functions to map raw values → your string keys ────────────
function getAgeGroup(age) {
  if (age >= 70 && age <= 74) return '70-74';
  if (age >= 65           ) return '65-69';
  if (age >= 60           ) return '60-64';
  if (age >= 55           ) return '55-59';
  if (age >= 50           ) return '50-54';
  if (age >= 45           ) return '45-49';
  if (age >= 40           ) return '40-44';
  if (age >= 30           ) return '30-39';
  return '20-29';
}

function getCholGroup(chol) {
  if (chol < 4    ) return '<4';
  if (chol < 4.9  ) return '4-4.9';
  if (chol < 5.9  ) return '5-5.9';
  if (chol < 6.9  ) return '6-6.9';
  return '>=7';
}

function getSBPGroup(sys) {
  if (sys < 120   ) return '<120';
  if (sys < 140   ) return '120-139';
  if (sys < 160   ) return '140-159';
  if (sys < 180   ) return '160-179';
  return '>=180';
}

function getSmokeKey(smokingFreq) {
  // adjust this test to match your intake values:
  return smokingFreq && smokingFreq === 'Non-smoker /Teetotaller' ? 'Non-smoker' : 'Smoker';
}

function getGenderKey(gender) {
  return (gender || '').toLowerCase() === 'male' ? 'Men' : 'Women';
}

// ── 4) The async lookup function ────────────────────────────────────────
export async function lookupRisk(patient) {
  await loadTables();

  // extract the raw inputs
  const { cholesterol, bloodPressure, bloodSugar, takingMedication } = patient.diagnosis;
  const sys = bloodPressure.systolic;
  const age = patient.basicInfo.age;
  const smoke = patient.lifestyle.smokingFreq;
  const gender = patient.basicInfo.gender;

  // compute your buckets
  const genderKey = getGenderKey(gender);
  const smokeKey  = getSmokeKey(smoke);
  const ageGroup  = getAgeGroup(age);
  const cholGroup = getCholGroup(cholesterol);
  const sbpGroup  = getSBPGroup(sys);
  
const useWith = takingMedication === true || bloodSugar > 180;
const table = useWith ? _withTable : _withoutTable;
const score = table[genderKey]?.[smokeKey]?.[ageGroup]?.[cholGroup]?.[sbpGroup];

  return score;
}