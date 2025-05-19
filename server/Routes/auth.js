// File: server/Routes/auth.js
import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import { authenticate, requireAdmin } from '../middleware/auth.js';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

// ─── LOGIN (public) ──────────────────────────────────────────────────
router.post('/login', async (req, res, next) => {
  console.log('🔍 [login] payload:', req.body);
  try {
    const { phone, password } = req.body;
    const user = await User.findOne({ phone });
    if (!user) {
      console.warn('⚠️ [login] no user for phone:', phone);
      return res.status(401).json({ error: 'Bad creds' });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      console.warn('⚠️ [login] password mismatch for:', phone);
      return res.status(401).json({ error: 'Bad creds' });
    }

    console.log('🔑 [login] Signing token with JWT_SECRET loaded?', !!JWT_SECRET);
    const token = jwt.sign(
      { sub: user._id, phone: user.phone, role: user.role },
      JWT_SECRET,
      { expiresIn: '8h' }
    );
    console.log('✅ [login] Token issued:', token);

    res.json({ token });
  } catch (err) {
    next(err);
  }
});

// ─── CREATE PROFESSIONAL (admin only) ────────────────────────────────
router.post(
  '/users',
  authenticate,
  requireAdmin,
  async (req, res, next) => {
    console.log('🔍 [create-user] payload:', req.body);
    try {
      const { phone, password } = req.body;
      const hash = await bcrypt.hash(password, 10);
      await User.create({ phone, password: hash, role: 'professional' });
      console.log('✅ [create-user] Created pro:', phone);
      res.sendStatus(201);
    } catch (err) {
      next(err);
    }
  }
);

export default router;