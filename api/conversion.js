/**
 * Vercel Serverless Function — Meta Ads Conversions API (CAPI Server-Side)
 * Disparo seguro de conversão de servidor para servidor
 * Pixel ID: 2804627116587586
 * Test Event Code: TEST11893
 * DPOS 2026
 */

module.exports = async function handler(req, res) {
  // Configuração de Cabeçalhos CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    let body = req.body;
    if (typeof body === 'string') {
      try {
        body = JSON.parse(body);
      } catch (e) {
        body = {};
      }
    }
    body = body || {};

    const eventId = body.eventId || `wa_click_${Date.now()}`;
    const eventName = body.eventName || 'Contact';
    const sourceUrl = body.sourceUrl || 'https://gustavogarrocho.com.br/';

    const rawIp = req.headers['x-forwarded-for'] || req.socket?.remoteAddress || '';
    const clientIp = rawIp.split(',')[0].trim();
    const userAgent = req.headers['user-agent'] || '';

    const payload = {
      data: [
        {
          event_name: eventName,
          event_time: Math.floor(Date.now() / 1000),
          event_id: eventId,
          event_source_url: sourceUrl,
          action_source: 'website',
          user_data: {
            client_ip_address: clientIp,
            client_user_agent: userAgent
          },
          custom_data: {
            content_name: 'Clique Botão WhatsApp (Server CAPI)',
            content_category: 'Lead Conversão'
          }
        }
      ],
      test_event_code: 'TEST11893'
    };

    const accessToken = 'EAAOnGOguNUkBSEuz6ZAmPsv3ipLjpYActvvjdZBUaNZCGxPZAc835H2kFI6eaHLOppvZA5mvNyFYS1AZAZCrHIwzZCgHZCHh9fMMoyO4AJvA8vZAu2kFRZAzUyj1gd8oFFW2KvMlAm4R6dfpZAivRnHxgZB2h9wuMaXyZCoX8IuzxuCLNv0K8ZChGhnHy7zt1rP1IkXefZAYSgZDZD';
    const pixelId = '2804627116587586';

    const response = await fetch(`https://graph.facebook.com/v19.0/${pixelId}/events?access_token=${accessToken}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();
    return res.status(200).json({ success: true, metaResponse: data });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
