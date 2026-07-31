/**
 * Gustavo Garrocho — Rastreamento de Analytics (Meta Ads & Microsoft Clarity)
 * Meta Pixel ID Oficial: 2804627116587586
 * DPOS 2026
 */

const META_PIXEL_ID = '2804627116587586'; // Pixel oficial do Meta Ads
const CLARITY_PROJECT_ID = 'SEU_CLARITY_ID_AQUI'; // Insira aqui seu ID do Microsoft Clarity (ex: 'abcde12345')

document.addEventListener('DOMContentLoaded', () => {

  // 1. INICIALIZAÇÃO DO META PIXEL (FACEBOOK ADS)
  if (META_PIXEL_ID) {
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document,'script',
    'https://connect.facebook.net/pt_BR/fbevents.js');

    fbq('init', META_PIXEL_ID);
    fbq('track', 'PageView');
  }

  // 2. INICIALIZAÇÃO DO MICROSOFT CLARITY (HEATMAPS & GRAVAÇÕES DE SESSÃO)
  if (CLARITY_PROJECT_ID && CLARITY_PROJECT_ID !== 'SEU_CLARITY_ID_AQUI') {
    (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", CLARITY_PROJECT_ID);
  }

  // 3. DISPARO DO EVENTO DE CONVERSÃO 'Contact' EM TODOS OS BOTÕES DE WHATSAPP
  const whatsappButtons = document.querySelectorAll(
    'a[href*="wa.me"], a[href*="whatsapp.com"], #whatsapp-link-btn, #hero-cta-btn, #header-cta-btn, .btn-about-cta'
  );

  whatsappButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Dispara o evento de Contato no Meta Pixel
      if (typeof fbq === 'function') {
        fbq('track', 'Contact', {
          content_name: 'Clique Botão WhatsApp',
          content_category: 'Lead Conversão',
          destination_url: btn.getAttribute('href')
        });
      }
    });
  });
});
