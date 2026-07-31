/**
 * Gustavo Garrocho — Módulo de Analytics & Tráfego Pago (Meta Pixel)
 * DPOS 2026
 */

const ANALYTICS_CONFIG = {
  META_PIXEL_ID: '', // Inserir o ID do Meta Pixel aqui
  GTM_ID: ''          // Inserir o ID do Google Tag Manager aqui (opcional)
};

// Inicialização segura dos scripts de rastreamento
(function initAnalytics() {
  // Evitar execução se IDs não estiverem preenchidos
  if (!ANALYTICS_CONFIG.META_PIXEL_ID && !ANALYTICS_CONFIG.GTM_ID) {
    console.log('Rastreamento (Meta Pixel / GTM) aguardando inserção de IDs no arquivo analytics.js');
    return;
  }

  // 1. INICIALIZAÇÃO META PIXEL
  if (ANALYTICS_CONFIG.META_PIXEL_ID) {
    (function(f,b,e,v,n,t,s) {
      if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)
    })(window, document,'script','https://connect.facebook.net/en_US/fbevents.js');
    
    fbq('init', ANALYTICS_CONFIG.META_PIXEL_ID);
    fbq('track', 'PageView');
    console.log('Meta Pixel inicializado.');
  }

  // 2. INICIALIZAÇÃO GTM
  if (ANALYTICS_CONFIG.GTM_ID) {
    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer',ANALYTICS_CONFIG.GTM_ID);
    console.log('GTM inicializado.');
  }
})();

// Função utilitária para rastreamento de eventos personalizados
function trackCustomEvent(eventName, params = {}) {
  // Rastrear no Facebook
  if (window.fbq && ANALYTICS_CONFIG.META_PIXEL_ID) {
    window.fbq('trackCustom', eventName, params);
  }
  
  // Rastrear no DataLayer (GTM)
  if (window.dataLayer) {
    window.dataLayer.push({
      event: eventName,
      eventParams: params
    });
  }
}

// Configurar escuta para rastreamento do clique no CTA do WhatsApp
document.addEventListener('DOMContentLoaded', () => {
  const ctaButtons = [
    document.getElementById('whatsapp-link-btn'),
    document.getElementById('hero-cta-btn'),
    document.getElementById('header-cta-btn')
  ];
  
  ctaButtons.forEach(btn => {
    if (btn) {
      btn.addEventListener('click', () => {
        trackCustomEvent('WhatsAppClick', {
          buttonId: btn.id,
          timestamp: new Date().toISOString()
        });
      });
    }
  });
});
