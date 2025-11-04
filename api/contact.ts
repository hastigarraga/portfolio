// api/contact.ts
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';

const SANDBOX = String(process.env.SANDBOX || '').toLowerCase() === 'true';

type Body = { name?: string; email?: string; message?: string };

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const { name, email, message } = (req.body ?? {}) as Body;
  if (!name || !email || !message) return res.status(400).json({ error: 'faltan campos' });

  if (SANDBOX) {
    console.log('[SANDBOX] contact payload:', { name, email, message });
    return res.status(200).json({ ok: true, sandbox: true });
  }

  const apiKey = process.env.RESEND_API_KEY || '';
  const from = process.env.RESEND_FROM || '';
  const to = process.env.CONTACT_TO || '';
  if (!apiKey) return res.status(500).json({ error: 'RESEND_API_KEY faltante' });
  if (!from) return res.status(500).json({ error: 'RESEND_FROM faltante' });
  if (!to) return res.status(500).json({ error: 'CONTACT_TO faltante' });

  try {
    const resend = new Resend(apiKey);

    const subject = `Contacto desde portfolio: ${name}`;
    const text = `Nombre: ${name}\nEmail: ${email}\n\n${message}`;
    const html = `
      <h2>Nuevo contacto</h2>
      <p><b>Nombre:</b> ${escapeHtml(name)}</p>
      <p><b>Email:</b> ${escapeHtml(email)}</p>
      <p><b>Mensaje:</b><br>${escapeHtml(message).replace(/\n/g, '<br>')}</p>
    `;

    // Intento con replyTo tipado
    try {
      await resend.emails.send({
        from,
        to,                 // Resend acepta string o string[]
        subject,
        text,
        html,
        replyTo: email,     // <- correcto
      } as any);
    } catch {
      // Fallback universal con header estándar
      await resend.emails.send({
        from,
        to,
        subject,
        text,
        html,
        headers: { 'Reply-To': email },
      });
    }

    return res.status(200).json({ ok: true });
  } catch (e: any) {
    console.error('send error', e);
    return res.status(500).json({ error: 'fallo el envio', detail: String(e?.message || e) });
  }
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
