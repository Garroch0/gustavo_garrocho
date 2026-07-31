/**
 * Gustavo Garrocho — Rastreamento de Analytics (Meta Ads & Microsoft Clarity)
 * Meta Pixel ID Oficial: 2804627116587586
 * Test Event Code: TEST11893
 * Microsoft Clarity ID Oficial: skyn8ao5wu
 * DPOS 2026
 */

const META_PIXEL_ID = '2804627116587586';
const META_TEST_EVENT_CODE = 'TEST11893'; // Código de evento de teste no Gerenciador do Meta Ads
const CLARITY_PROJECT_ID = 'skyn8ao5wu';  // ID oficial do Microsoft Clarity

document.addEventListener('DOMContentLoaded', () => {

  // 1. INICIALIZAÇÃO SEGURA DO META PIXEL (COM TRATAMENTO DE ADBLOCK)
  if (META_PIXEL_ID) {
    try {
      !function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.onerror = function() {
        console.log('[Analytics Notice] O script do Meta Pixel foi mantido em espera (bloqueador de anúncios ativo no navegador).');
      };
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window, document,'script',
      'https://connect.facebook.net/pt_BR/fbevents.js');

      fbq('init', META_PIXEL_ID);
      
      // Envia o código de evento de teste para o Gerenciador do Meta Ads
      if (META_TEST_EVENT_CODE) {
        fbq('set', 'testEventCode', META_TEST_EVENT_CODE);
      }

      fbq('track', 'PageView');
    } catch (err) {
      console.log('[Analytics] Meta Pixel controlado pelo cliente.');
    }
  }

  // 2. INICIALIZAÇÃO SEGURA DO MICROSOFT CLARITY
  if (CLARITY_PROJECT_ID) {
    try {
      (function(c,l,a,r,i,t,y){
          c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
          t=l.createElement(r);t.async=1;
          t.onerror = function() {
            console.log('[Analytics Notice] O script do Microsoft Clarity foi mantido em espera.');
          };
          t.src="https://www.clarity.ms/tag/"+i;
          y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
      })(window, document, "clarity", "script", CLARITY_PROJECT_ID);
    } catch (err) {
      console.log('[Analytics] Clarity controlado pelo cliente.');
    }
  }

  // 3. DISPARO AUTOMÁTICO E TESTE DE CONVERSÃO 'Contact' NOS BOTÕES DE WHATSAPP
  const whatsappButtons = document.querySelectorAll(
    'a[href*="wa.me"], a[href*="whatsapp.com"], #whatsapp-link-btn, #hero-cta-btn, #header-cta-btn, .btn-about-cta'
  );

  whatsappButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      try {
        if (typeof fbq === 'function') {
          fbq('track', 'Contact', {
            content_name: 'Clique Botão WhatsApp',
            content_category: 'Lead Conversão',
            destination_url: btn.getAttribute('href')
          });
        }
      } catch (e) {}
    });
  });
});
