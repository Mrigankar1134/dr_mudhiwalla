import mongoose from 'mongoose';

const RiskSchema = new mongoose.Schema({}, { strict: false });

export const WithDiabetesModel = mongoose.model(
  'withDiabetesRisk',
  RiskSchema,
  'withDiabetes'
);

export const WithoutDiabetesModel = mongoose.model(
  'withoutDiabetesRisk',
  RiskSchema,
  'withoutDiabetes'
);