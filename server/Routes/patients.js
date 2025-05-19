// server/routes/patients.js
import express from 'express';
import Patient from '../models/Patient.js';
import { lookupRisk } from '../utils/riskLookup.js';

const router = express.Router();

// Phase 1: CREATE basic info
router.post('/', async (req, res, next) => {
  try {
    const {
      phone,
      name,
      email,
      gender,
      age,
      height,
      weight,
      hipCircumference,
      waistCircumference
    } = req.body;

    const patient = new Patient({
      _id: phone,
      basicInfo: { name, email, gender, age, height, weight, hipCircumference, waistCircumference }
    });

    await patient.save();
    res.json({ phone: patient._id });
  } catch (err) {
    next(err);
  }
});

// Phase 2: UPDATE diagnosis
router.put('/:phone/diagnosis', async (req, res, next) => {
  try {
    const updated = await Patient.findByIdAndUpdate(
      req.params.phone,
      { diagnosis: req.body },
      { new: true }
    );
    if (!updated) return res.status(404).send('Patient not found');
    res.json(updated);
  } catch (err) {
    next(err);
  }
});

// Phase 3: UPDATE lifestyle
router.put('/:phone/lifestyle', async (req, res, next) => {
  try {
    const updated = await Patient.findByIdAndUpdate(
      req.params.phone,
      { lifestyle: req.body },
      { new: true }
    );
    if (!updated) return res.status(404).send('Patient not found');
    res.json(updated);
  } catch (err) {
    next(err);
  }
});

// GET all patients basic info
router.get('/', async (req, res, next) => {
  try {
    const patients = await Patient.find({}, '_id basicInfo');
    const list = patients.map(p => ({
      phone: p._id,
      name: p.basicInfo.name,
      email: p.basicInfo.email,
      gender: p.basicInfo.gender
    }));
    res.json(list);
  } catch (err) {
    next(err);
  }
});

// GET single patient risk score
router.get('/:phone/score', async (req, res, next) => {
  try {
    const patient = await Patient.findById(req.params.phone);
    if (!patient) return res.status(404).json({ error: 'Patient not found' });

    const score = await lookupRisk(patient);
    res.json(score);
  } catch (err) {
    next(err);
  }
});

router.post('/score/calc', async (req, res, next) => {
  try {
    const score = await lookupRisk(req.body);
    res.json({ score });
  } catch (err) {
    next(err);
  }
});

export default router;
