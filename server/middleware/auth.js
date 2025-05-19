// File: server/middleware/auth.js
import jwt from 'jsonwebtoken';
import User from '../models/user.js';

const JWT_SECRET = process.env.JWT_SECRET;

// ─── Authenticate ─────────────────────────────────────────────────────
// Verifies the Bearer token and loads req.user, or returns 401.
export async function authenticate(req, res, next) {
  const auth = req.headers.authorization;
  console.log('🔍 [auth] Authorization header:', auth);

  if (!auth || !auth.startsWith('Bearer ')) {
    console.warn('⚠️ [auth] Missing or malformed Authorization header');
    return res.sendStatus(401);
  }

  const token = auth.slice(7);
  console.log('🔐 [auth] Token to verify:', token);
  console.log('🔑 [auth] JWT_SECRET loaded?', !!JWT_SECRET);

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    console.log('✅ [auth] JWT payload:', payload);
     let user = await User.findById(payload.sub);
     if (!user && payload.phone) {
       console.log('🔍 [auth] No user by ID; falling back to phone:', payload.phone);
       user = await User.findOne({ phone: payload.phone });
     }
    console.log(
      '👤 [auth] User from DB:',
      user ? `${user.phone} (${user.role})` : 'NOT FOUND'
    );
    if (!user) return res.sendStatus(401);

    req.user = user;
    next();
  } catch (err) {
    console.error('❌ [auth] JWT verify error:', err.message);
    return res.sendStatus(401);
  }
}

// ─── Require Professional or Admin ────────────────────────────────────
// Allows if req.user.role is 'professional' OR 'admin'.
export function requireProfessional(req, res, next) {
  const role = req.user.role;
  console.log('🔍 [auth] requireProfessional role:', role);
  if (role !== 'professional' && role !== 'admin') {
    console.warn('⚠️ [auth] Forbidden, role not allowed:', role);
    return res.sendStatus(403);
  }
  next();
}

// ─── Require Admin Only ───────────────────────────────────────────────
// Allows only if req.user.role is 'admin'.
export function requireAdmin(req, res, next) {
  const role = req.user.role;
  console.log('🔍 [auth] requireAdmin role:', role);
  if (role !== 'admin') {
    console.warn('⚠️ [auth] Forbidden, not admin:', role);
    return res.sendStatus(403);
  }
  next();
}