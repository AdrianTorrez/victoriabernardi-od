exports.handler = async () => {
  const launch = Number(process.env.MP_PRECIO_ARS) || 7000;
  const regular = Number(process.env.MP_PRECIO_ARS_REGULAR) || Math.round((launch * 12 / 7) / 100) * 100;

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=300',
    },
    body: JSON.stringify({ launch, regular }),
  };
};
