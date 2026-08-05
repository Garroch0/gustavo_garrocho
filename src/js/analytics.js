/**
 * Gustavo Garrocho — Rastreamento de Analytics (Meta Ads CAPI + Pixel & Microsoft Clarity)
 * Carregamento sob demanda com disparos duplos (Browser + Server CAPI) e Desduplicação Inteligente
 * Meta Pixel ID Oficial: 2804627116587586
 * Test Event Code: TEST11893
 * Microsoft Clarity ID Oficial: skyn8ao5wu
 * DPOS 2026
 */

const META_PIXEL_ID = '2804627116587586';
const META_TEST_EVENT_CODE = 'TEST11893';
const CLARITY_PROJECT_ID = 'skyn8ao5wu';

let analyticsInitialized = false;

function loadThirdPartyAnalytics() {
  if (analyticsInitialized) return;
  analyticsInitialized = true;

  // 1. CARREGAMENTO SEGURO DO META PIXEL
  if (META_PIXEL_ID && !window.fbq) {
    try {
      !function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window, document,'script',
      'https://connect.facebook.net/pt_BR/fbevents.js');

      if (window.fbq) {
        fbq('init', META_PIXEL_ID);
        if (META_TEST_EVENT_CODE) {
          fbq('set', 'testEventCode', META_TEST_EVENT_CODE);
        }
        fbq('track', 'PageView');
      }
    } catch (e) {}
  }

  // 2. CARREGAMENTO SEGURO DO MICROSOFT CLARITY
  if (CLARITY_PROJECT_ID && !window.clarity) {
    try {
      (function(c,l,a,r,i,t,y){
          c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
          t=l.createElement(r);t.async=1;
          t.src="https://www.clarity.ms/tag/"+i;
          y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
      })(window, document, "clarity", "script", CLARITY_PROJECT_ID);
    } catch (e) {}
  }
}

// Dispara o carregamento do analytics na primeira interação real do usuário na página
const userInteractionEvents = ['scroll', 'mousemove', 'touchstart', 'click', 'keydown'];

function onFirstUserInteraction() {
  loadThirdPartyAnalytics();
  userInteractionEvents.forEach(evt => {
    window.removeEventListener(evt, onFirstUserInteraction);
  });
}

userInteractionEvents.forEach(evt => {
  window.addEventListener(evt, onFirstUserInteraction, { passive: true, once: true });
});

// Fallback de segurança para visitantes estáticos após 4.5s
setTimeout(() => {
  loadThirdPartyAnalytics();
}, 4500);

document.addEventListener('DOMContentLoaded', () => {
  // 3. DISPARO DE CONVERSÃO DUPLO (BROWSER PIXEL + VERCEL SERVER CAPI)
  const whatsappButtons = document.querySelectorAll(
    'a[href*="wa.me"], a[href*="whatsapp.com"], #whatsapp-link-btn, #hero-cta-btn, #header-cta-btn, .btn-about-cta'
  );

  whatsappButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      try {
        // Garantia de Inicialização do Pixel
        loadThirdPartyAnalytics();

        // Chave de Desduplicação Única (Browser & Server)
        const eventId = `wa_click_${Date.now()}_${Math.floor(Math.random() * 1000)}`;

        // A) Disparo no Navegador (Browser Pixel)
        if (typeof fbq === 'function') {
          fbq('track', 'Contact', {
            content_name: 'Clique Botão WhatsApp',
            content_category: 'Lead Conversão',
            destination_url: btn.getAttribute('href')
          }, { eventID: eventId });
        }

        // B) Disparo no Servidor (Vercel Serverless CAPI)
        fetch('/api/conversion', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            eventId: eventId,
            eventName: 'Contact',
            sourceUrl: window.location.href
          })
        }).catch(() => {});

      } catch (e) {}
    });
  });
});
