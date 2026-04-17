const RESEND_API_KEY = process.env.RESEND_API_KEY;
const FROM_EMAIL = process.env.FROM_EMAIL || 'hola@victoriabernardi.com';
const SITE_URL = 'https://victoriabernardi.com';
const EBOOK_URL = 'https://drive.google.com/uc?export=download&id=1td_isTmFZrxkD8d_5ll8EWZl4wh_gpUB';

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  if (!RESEND_API_KEY) {
    console.error('[send-material] RESEND_API_KEY no configurado');
    return { statusCode: 500, body: JSON.stringify({ error: 'Configuración incompleta' }) };
  }

  let nombre, email;
  try {
    ({ nombre, email } = JSON.parse(event.body));
    if (!nombre || !email) throw new Error('Faltan campos');
  } catch {
    return { statusCode: 400, body: JSON.stringify({ error: 'Datos inválidos' }) };
  }

  const html = `
<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8" /></head>
<body style="margin:0; padding:0; background:#FAF4EE; font-family: Georgia, serif;">
  <div style="max-width:560px; margin:0 auto; padding:40px 24px;">

    <img src="${SITE_URL}/logo.png" alt="Victoria Bernardi Odontóloga" style="height:80px; width:auto; margin-bottom:32px; display:block;" />

    <h1 style="font-size:1.8rem; color:#3D2F28; margin-bottom:12px;">
      Hola ${nombre}, <br/>acá está todo tu material 🦷
    </h1>
    <p style="color:#8C6E60; line-height:1.7; margin-bottom:32px;">
      Gracias por tu compra. Abajo encontrás los links para descargar el ebook y los 4 imprimibles incluidos.
    </p>

    <h2 style="font-size:1rem; color:#3D2F28; text-transform:uppercase; letter-spacing:0.08em; margin-bottom:16px;">Ebook</h2>
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:32px;">
      <tr>
        <td style="background:#F5EDE1; border-radius:8px; padding:16px 20px;">
          <strong style="color:#3D2F28;">Odontología desde la panza</strong><br/>
          <span style="color:#8C6E60; font-size:0.9rem;">Od. Victoria Bernardi · 48 páginas</span><br/><br/>
          <a href="${EBOOK_URL}" style="display:inline-block; padding:10px 24px; background:#8C6E60; color:white; border-radius:6px; font-weight:bold; text-decoration:none; font-family:Arial,sans-serif;">Descargar ebook</a>
        </td>
      </tr>
    </table>

    <h2 style="font-size:1rem; color:#3D2F28; text-transform:uppercase; letter-spacing:0.08em; margin-bottom:16px;">Material imprimible incluido</h2>
    <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:separate; border-spacing:0 8px; margin-bottom:32px;">
      ${[
        { nombre: 'Check list', archivo: 'imprimible-checklist.pdf', emoji: '📋' },
        { nombre: 'Track de hábitos', archivo: 'imprimible-track-habitos.pdf', emoji: '📈' },
        { nombre: 'Cuándo salieron los dientes', archivo: 'imprimible-dientes.pdf', emoji: '🦷' },
        { nombre: 'Historias para dejar el chupete', archivo: 'imprimible-chupete.pdf', emoji: '🧸' },
      ].map(item => `
      <tr>
        <td style="background:#F5EDE1; border-radius:8px; padding:14px 20px;">
          <span style="font-size:1.2rem;">${item.emoji}</span>
          <strong style="color:#3D2F28; margin-left:8px;">${item.nombre}</strong>
          <a href="${SITE_URL}/${item.archivo}" style="float:right; padding:6px 16px; background:#F0B99B; color:#3D2F28; border-radius:6px; font-weight:bold; text-decoration:none; font-family:Arial,sans-serif; font-size:0.85rem;">Descargar</a>
        </td>
      </tr>`).join('')}
    </table>

    <p style="color:#8C6E60; font-size:0.9rem; line-height:1.7; border-top:1px solid #E8D5C4; padding-top:24px;">
      ¿Tenés alguna duda? Escribime a
      <a href="https://www.instagram.com/victoriabernardi.od/" style="color:#8C6E60;">@victoriabernardi.od</a>
    </p>
  </div>
</body>
</html>`;

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: `Victoria Bernardi Odontóloga <${FROM_EMAIL}>`,
        to: [email],
        subject: '🦷 Tu material de Odontología desde la panza',
        html,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error('[send-material] Resend error:', err);
      return { statusCode: 500, body: JSON.stringify({ error: 'Error al enviar el email' }) };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ ok: true }),
    };
  } catch (err) {
    console.error('[send-material] Error:', err);
    return { statusCode: 500, body: JSON.stringify({ error: 'Error interno' }) };
  }
};
