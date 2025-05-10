import express from 'express';
import Contact from '../models/Contact.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { name, email, number, message } = req.body;

    const newContact = new Contact({ name, email, number, message });
    await newContact.save();

    res.status(201).json({ message: 'Contact saved successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to save contact' });
  }
});

export default router;
