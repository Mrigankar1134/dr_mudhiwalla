// server/server.js
import 'dotenv/config';
import express  from 'express';
import mongoose from 'mongoose';
import cors     from 'cors';
import path     from 'path';
import { fileURLToPath } from 'url';

// ═══ __dirname shim for ESM ════════════════════════════════════════
const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

// ═══ App & Env ════════════════════════════════════════════════════
const app  = express();
const PORT = process.env.PORT || 5001;

// ═══ Connect to MongoDB & seed super-admin ═════════════════════════
mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('✅ MongoDB connected');
    if (process.env.ADMIN_PHONE && process.env.ADMIN_PASSWORD) {
      const User   = (await import('./models/user.js')).default;
      const bcrypt = (await import('bcrypt')).default;
      const exists = await User.findOne({ role: 'admin' });
      if (!exists) {
        const hash = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);
        await User.create({
          phone:    process.env.ADMIN_PHONE,
          password:  hash,
          role:      'admin'
        });
        console.log('🔥 Super-admin created:', process.env.ADMIN_PHONE);
      }
    }
  })
  .catch(err => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  });

// ═══ Middleware ════════════════════════════════════════════════════
app.use(cors());
app.use(express.json());

// ═══ Serve report static assets (CSS, icons, logo) ════════════════
app.use(
  '/report-static',
  express.static(path.join(__dirname, 'public'))
);

// ═══ Configure EJS for the report template ════════════════════════
app.set('view engine', 'ejs');
app.set('views',       path.join(__dirname, 'templates'));

// ═══ Your existing API routes ═════════════════════════════════════
import authRoutes    from './Routes/auth.js';
import contactRoutes from './Routes/contact.js';
import patientRoutes from './Routes/patients.js';
import scoreRoutes   from './Routes/score.js';
import { authenticate, requireProfessional } from './middleware/auth.js';

app.use('/api/auth',    authRoutes);
app.use('/api/contact', contactRoutes);

app.use(
  '/api/patients',
  authenticate,
  requireProfessional,
  patientRoutes
);
app.use(
  '/api/patients',
  authenticate,
  requireProfessional,
  scoreRoutes
);

// ═══ Mount report routes under /report ═════════════════════════════
import reportRoutes from './Routes/reportRoutes.js';
app.use('/report', reportRoutes);

// ═══ Global error handler ═════════════════════════════════════════
app.use((err, req, res, next) => {
  console.error('🚨', err);
  res.status(500).send('Server error');
});

// ═══ Start listening ═══════════════════════════════════════════════
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});