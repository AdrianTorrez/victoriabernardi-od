const crypto = require('crypto');

exports.handler = async (event) => {
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': 'https://victoriabernardi.com',
  };

  const token = event.queryStringParameters?.token;
  if (!token) {
    return { statusCode: 400, headers, body: JSON.stringify({ valid: false }) };
  }

  const secret = process.env.DOWNLOAD_SECRET;
  if (!secret) {
    console.error('[verify-download] DOWNLOAD_SECRET no configurado');
    return { statusCode: 500, headers, body: JSON.stringify({ valid: false }) };
  }

  const parts = token.split('.');
  if (parts.length !== 2) {
    return { statusCode: 200, headers, body: JSON.stringify({ valid: false }) };
  }

  const [payload, sig] = parts;
  const expectedSig = crypto.createHmac('sha256', secret).update(payload).digest('base64url');

  if (sig !== expectedSig) {
    return { statusCode: 200, headers, body: JSON.stringify({ valid: false }) };
  }

  try {
    const { exp } = JSON.parse(Buffer.from(payload, 'base64url').toString());
    if (Date.now() > exp) {
      return { statusCode: 200, headers, body: JSON.stringify({ valid: false, reason: 'expired' }) };
    }
    return { statusCode: 200, headers, body: JSON.stringify({ valid: true }) };
  } catch {
    return { statusCode: 200, headers, body: JSON.stringify({ valid: false }) };
  }
};
