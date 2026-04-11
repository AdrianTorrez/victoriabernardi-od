const { MercadoPagoConfig, Preference } = require('mercadopago');

// Precio en pesos argentinos — configurar con la variable de entorno MP_PRECIO_ARS en Netlify
const PRECIO_ARS = Number(process.env.MP_PRECIO_ARS) || 7000;

const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN,
});

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
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
          success: 'https://victoriabernardi.com/gracias',
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
