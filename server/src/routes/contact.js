import express from 'express';
import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const router = express.Router();

// Simple in-memory rate limit per IP: max 5 messages per hour
const hits = new Map();
function rateLimited(ip) {
  const now = Date.now();
  const windowMs = 60 * 60 * 1000; // 1h
  const max = 5;
  const entry = hits.get(ip) || [];
  const recent = entry.filter((ts) => now - ts < windowMs);
  if (recent.length >= max) return true;
  recent.push(now);
  hits.set(ip, recent);
  return false;
}

const schema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email().max(200),
  phone: z.string().max(50).optional().nullable(),
  message: z.string().min(5).max(5000),
  // Optional CAPTCHA token from frontend
  captchaToken: z.string().optional(),
});

router.post('/', async (req, res) => {
  try {
    const ip = req.headers['x-forwarded-for']?.toString().split(',')[0] || req.socket.remoteAddress || 'unknown';
    if (rateLimited(ip)) return res.status(429).json({ error: 'Too many requests. Please try again later.' });

    const body = schema.parse(req.body || {});

    // Optional reCAPTCHA verify when RECAPTCHA_SECRET is set and token provided
    if (process.env.RECAPTCHA_SECRET && body.captchaToken) {
      try {
        const captchaResp = await fetch('https://www.google.com/recaptcha/api/siteverify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams({
            secret: process.env.RECAPTCHA_SECRET,
            response: body.captchaToken,
            remoteip: ip,
          }),
        });
        const captchaJson = await captchaResp.json();
        if (!captchaJson.success) {
          return res.status(400).json({ error: 'CAPTCHA validation failed' });
        }
      } catch (err) {
        return res.status(400).json({ error: 'CAPTCHA verification error' });
      }
    }

    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    const MAIL_FROM_EMAIL = process.env.MAIL_FROM_EMAIL || 'no-reply@starindus.com';
    const MAIL_FROM_NAME = process.env.MAIL_FROM_NAME || 'Star Industries Website';
    const MAIL_TO = (process.env.MAIL_TO || process.env.ADMIN_EMAIL || 'sales@starindus.com').split(',').map((s) => s.trim()).filter(Boolean);

    if (!RESEND_API_KEY) return res.status(500).json({ error: 'Email is not configured on the server.' });

    const subject = `New enquiry from ${body.name}`;
    const text = `Name: ${body.name}\nEmail: ${body.email}\nPhone: ${body.phone || '-'}\nIP: ${ip}\n\nMessage:\n${body.message}`;
    const html = `
      <div style="font-family:system-ui,Segoe UI,Roboto,Arial,sans-serif;line-height:1.5;color:#111">
        <h2>New enquiry from ${body.name}</h2>
        <p><strong>Email:</strong> ${body.email}</p>
        <p><strong>Phone:</strong> ${body.phone || '-'}</p>
        <p><strong>IP:</strong> ${ip}</p>
        <hr/>
        <p>${body.message.replace(/\n/g, '<br/>')}</p>
      </div>`;

    // Use Resend REST API via fetch (Node 18+)
    const resp = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: `${MAIL_FROM_NAME} <${MAIL_FROM_EMAIL}>`,
        to: MAIL_TO,
        subject,
        text,
        html,
        reply_to: body.email,
      }),
    });

    if (!resp.ok) {
      const err = await resp.text();
      // eslint-disable-next-line no-console
      console.error('Resend send failed:', err);
      return res.status(502).json({ error: 'Failed to send email', details: err });
    }

    const data = await resp.json();
    return res.json({ ok: true, id: data.id || undefined });
  } catch (e) {
    return res.status(400).json({ error: e?.message || 'Invalid request' });
  }
});

export default router;
