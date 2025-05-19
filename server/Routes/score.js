import express from 'express';
import Patient from '../models/Patient.js';
import { authenticate } from '../middleware/auth.js';
import { lookupRisk } from '../utils/riskLookup.js';

const router = express.Router();

router.get('/:phone/score', authenticate, async (req, res, next) => {
  try {
    const patient = await Patient.findById(req.params.phone);
    if (!patient) return res.status(404).json({ error: 'Not found' });

    const score = await lookupRisk(patient);
    res.json(score);
  } catch (err) {
    next(err);
  }
});

export default router;