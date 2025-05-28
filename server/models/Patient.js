// server/models/Patient.js
import mongoose from 'mongoose';

const { Schema } = mongoose;

// ─── 1) Sub‐schemas ──────────────────────────────────────────────
const BasicInfoSchema = new Schema({
  name:              { type: String, required: true },
  email:             { type: String, required: true },
  gender:            { type: String, required: true },
  age:               { type: Number, required: true },
  height:            { type: Number, required: true }, // cm
  weight:            { type: Number, required: true }, // kg
  hipCircumference:  { type: Number, required: true }, // cm
  waistCircumference:{ type: Number, required: true }  // cm
}, { _id: false });

const DiagnosisSchema = new Schema({
  bloodPressure: {
    systolic:  { type: Number, required: true },
    diastolic: { type: Number, required: true }
  },
  cholesterol: { type: Number, required: true },
  bloodSugar:  { type: Number, required: true },
  takingMedication: { type: Boolean, required: true }
}, { _id: false });

const LifestyleSchema = new Schema({
  pressureOverwhelmed: { type: String, required: true },
  physicalSymptoms:    { type: String, required: true },
  physicalActivity:    { type: String, required: true },
  refreshedFeeling:    { type: String, required: true },
  sleepHours:          { type: String, required: true },
  outsideFoodFreq:     { type: String, required: true },
  chipsChocFreq:       { type: String, required: true },
  alcoholFreq:         { type: String, required: true },
  smokingFreq:         { type: String, required: true }
}, { _id: false });

const CalculatedSchema = new Schema({
  bmi: { type: Number, required: true },   // Body Mass Index
  whr: { type: Number, required: true },   // Waist-to-Hip Ratio
  bri: { type: Number, required: true }    // Body Roundness Index
}, { _id: false });

// ─── 2) Main Patient Schema ──────────────────────────────────────
const PatientSchema = new Schema({
  _id:        { type: String, required: true },   // phone as ID
  basicInfo:  { type: BasicInfoSchema, required: true },
  diagnosis:  { type: DiagnosisSchema, default: null },
  lifestyle:  { type: LifestyleSchema, default: null },
  calculated: { type: CalculatedSchema, default: null }
}, { timestamps: true });

// ─── 3) Reusable metric‐calc fn ──────────────────────────────────
function calcMetrics(basic) {
  const weight = basic.weight;
  const heightCm = basic.height;
  const heightM  = heightCm / 100;

  // BMI
  const bmi = weight / (heightM * heightM);

  // WHR
  const whr = basic.waistCircumference / basic.hipCircumference;

  // BRI
  const pi = Math.PI;
  const numerator   = Math.pow(basic.waistCircumference / (2 * pi), 2);
  const denominator = 0.5 * Math.pow(heightCm, 2);
  const bri = 364.2 - 365.5 * Math.sqrt(1 - numerator / denominator);

  return {
    bmi: parseFloat(bmi.toFixed(2)),
    whr: parseFloat(whr.toFixed(2)),
    bri: parseFloat(bri.toFixed(2))
  };
}

// ─── 4) Hooks to auto‐write calculated ────────────────────────────
// On new save()
PatientSchema.pre('save', function(next) {
  if (this.basicInfo) {
    this.calculated = calcMetrics(this.basicInfo);
  }
  next();
});

// On findOneAndUpdate()
PatientSchema.pre('findOneAndUpdate', function(next) {
  const upd = this.getUpdate();
  if (upd.basicInfo) {
    const newCalc = calcMetrics(upd.basicInfo);
    // merge into the update
    this.set({
      'calculated.bmi': newCalc.bmi,
      'calculated.whr': newCalc.whr,
      'calculated.bri': newCalc.bri
    });
  }
  next();
});

// ─── 5) Expose virtuals in toJSON/toObject ───────────────────────
PatientSchema.set('toObject',   { virtuals: true });
PatientSchema.set('toJSON',     { virtuals: true });

export default mongoose.model('Patient', PatientSchema);