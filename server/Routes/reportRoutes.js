// server/Routes/reportRoutes.js
import express   from 'express';
import path      from 'path';
import ejs       from 'ejs';
import puppeteer from 'puppeteer';
import { getReportData } from '../services/reportService.js';

const router = express.Router();

// ─── HTML preview
//    GET /report/html?patient=9001787233
router.get('/html', async (req, res, next) => {
  try {
    const patientId = req.query.patient;
    if (!patientId) {
      return res.status(400).send('Missing `patient` query parameter');
    }
    const data = await getReportData(patientId);
    res.render('report', data);
  } catch (err) {
    next(err);
  }
});

// ─── PDF download
//    GET /report/pdf?patient=9001787233
router.get('/pdf', async (req, res, next) => {
  try {
    const patientId = req.query.patient;
    if (!patientId) {
      return res.status(400).send('Missing `patient` query parameter');
    }
    const data = await getReportData(patientId);

    // Render EJS → HTML
    const html = await ejs.renderFile(
      path.join(__dirname, '../templates/report.ejs'),
      data,
      { async: true }
    );

    // Launch headless Chrome
    const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
    const page    = await browser.newPage();

    // Load HTML with proper base URL
    await page.setContent(html, {
      waitUntil: 'networkidle0',
      url: `http://localhost:${process.env.PORT || 5001}/report-static/`
    });

    // PDF options
    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: { top: '10mm', right: '10mm', bottom: '10mm', left: '10mm' },
      pageRanges: '1'
    });

    await browser.close();

    res.type('application/pdf').send(pdfBuffer);
  } catch (err) {
    next(err);
  }
});

export default router;