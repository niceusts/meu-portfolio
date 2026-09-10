import { Resend } from 'resend';

function escapeHtml(s: string) {
  return s
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

export async function sendContactEmail(input: {
  name: string;
  email: string;
  subject: string;
  message: string;
  id: number;
  createdAt: Date;
}): Promise<{ sent: boolean; warning?: string }> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO;
  const from = process.env.CONTACT_FROM;

  if (!apiKey || !to || !from) {
    return { sent: false, warning: 'Mensagem salva, envio de e-mail não configurado.' };
  }

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from,
    to,
    replyTo: input.email,
    subject: `[Portfólio] ${input.subject} — ${input.name}`,
    html: `<p><strong>${escapeHtml(input.name)}</strong> &lt;${escapeHtml(input.email)}&gt; escreveu:</p><p>${escapeHtml(input.message).replace(/\n/g, '<br/>')}</p><hr/><p style="color:#666">ID ${input.id} • ${input.createdAt.toISOString()}</p>`,
  });

  if (error) {
    console.error('Resend error:', error);
    return { sent: false, warning: 'Mensagem salva, mas o e-mail falhou.' };
  }
  return { sent: true };
}
