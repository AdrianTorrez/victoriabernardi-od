const { MercadoPagoConfig, Preference } = require('mercadopago');
const crypto = require('crypto');

const PRECIO_ARS = Number(process.env.MP_PRECIO_ARS) || 7000;

const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN,
});

function generateDownloadToken() {
  const secret = process.env.DOWNLOAD_SECRET;
  if (!secret) {
    console.error('[create-preference] DOWNLOAD_SECRET no configurado');
    return null;
  }
  const payload = Buffer.from(
    JSON.stringify({ exp: Date.now() + 30 * 60 * 1000 })
  ).toString('base64url');
  const sig = crypto.createHmac('sha256', secret).update(payload).digest('base64url');
  return `${payload}.${sig}`;
}

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const token = generateDownloadToken();
    const successUrl = token
      ? `https://victoriabernardi.com/gracias?token=${token}`
      : 'https://victoriabernardi.com/gracias';

    const preference = new Preference(client);

    const result = await preference.create({
      body: {
        items: [
          {
            title: 'Odontología desde la panza — Ebook de Od. Victoria Bernardi',
            quantity: 1,
            unit_price: PRECIO_ARS,
            currency_id: 'ARS',
          },
        ],
        back_urls: {
          success: successUrl,
          failure: 'https://victoriabernardi.com',
          pending: 'https://victoriabernardi.com/gracias',
        },
        auto_return: 'approved',
        statement_descriptor: 'OD VICTORIA BERNARDI',
      },
    });

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: result.init_point }),
    };
  } catch (error) {
    console.error('[MP Error]', error);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Error al crear la preferencia de pago' }),
    };
  }
};
