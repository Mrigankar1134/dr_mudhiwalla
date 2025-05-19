// server/routes/contact.js
import express from 'express';
import nodemailer from 'nodemailer';
import Contact from '../models/Contact.js';  // your mongoose model

const router = express.Router();

// configure transporter using SMTP
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

// POST /api/contact
router.post('/', async (req, res, next) => {
  try {
    const { name, email, message, company, number } = req.body;

    // 1) Save to MongoDB
    const contact = new Contact({ name, email, message, company, number });
    await contact.save();

    // 2) Send notification email
    await transporter.sendMail({
      from: `"Website Contact" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_TO,
      subject: `New contact form submission from ${name}`,
      html: `
        <h3>New Contact Submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Company:</strong> ${company || 'N/A'}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${number || 'N/A'}</p>
        <p><strong>Message:</strong><br/>${message.replace(/\n/g, '<br/>')}</p>
      `
    });
    console.log('✅ Contact form submission email sent');
    res.status(200).json({ success: true, contactId: contact._id });
  } catch (err) {
    console.error('❌ Contact route error:', err);
    next(err);
  }
});

export default router;
