/**
 * Vercel Serverless Function — Meta Ads Conversions API (CAPI Server-Side)
 * Disparo seguro de conversão de servidor para servidor (PageView & Contact)
 * Pixel ID: 2804627116587586
 * Test Event Code: TEST94149
 * DPOS 2026
 */

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    let body = req.body;
    if (typeof body === 'string') {
      try { body = JSON.parse(body); } catch (e) { body = {}; }
    }
    body = body || {};

    const eventName = body.eventName || 'PageView';
    const eventId = body.eventId || `pv_${Date.now()}`;
    const sourceUrl = body.sourceUrl || 'https://gustavogarrocho.com.br/';

    const rawIp = req.headers['x-forwarded-for'] || req.socket?.remoteAddress || '127.0.0.1';
    const clientIp = rawIp.split(',')[0].trim();
    const userAgent = req.headers['user-agent'] || 'Mozilla/5.0';

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
            content_name: eventName === 'PageView' ? 'Visualizacao de Pagina (CAPI)' : 'Clique Botao WhatsApp (CAPI)',
            content_category: eventName === 'PageView' ? 'Navegacao' : 'Lead Conversao'
          }
        }
      ],
      test_event_code: 'TEST94149'
    };

    const accessToken = 'EAAOnGOguNUkBSEuz6ZAmPsv3ipLjpYActvvjdZBUaNZCGxPZAc835H2kFI6eaHLOppvZA5mvNyFYS1AZAZCrHIwzZCgHZCHh9fMMoyO4AJvA8vZAu2kFRZAzUyj1gd8oFFW2KvMlAm4R6dfpZAivRnHxgZB2h9wuMaXyZCoX8IuzxuCLNv0K8ZChGhnHy7zt1rP1IkXefZAYSgZDZD';
    const pixelId = '2804627116587586';

    const response = await fetch(`https://graph.facebook.com/v19.0/${pixelId}/events?access_token=${accessToken}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const data = await response.json();
    return res.status(200).json({ success: true, data: data });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
