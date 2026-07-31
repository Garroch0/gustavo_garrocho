/**
 * Gustavo Garrocho — Lenis Smooth Scroll Global & Smart Header (60fps)
 * DPOS 2026
 */

document.addEventListener('DOMContentLoaded', () => {

  // 1. INICIALIZAÇÃO DO LENIS SMOOTH SCROLL (STUDIO FREIGHT INERTIA ENGINE)
  let lenis = null;

  if (typeof Lenis !== 'undefined') {
    lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Easing inercial ultra suave
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
      infinite: false
    });

    // Loop de renderização acelerado por GPU via requestAnimationFrame
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Sincronização com GSAP ScrollTrigger
    if (typeof ScrollTrigger !== 'undefined') {
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
      });
      gsap.ticker.lagSmoothing(0);
    }
  }

  // 2. SMART HEADER AUTO-HIDE (DESEMPENHO OTIMIZADO)
  const header = document.getElementById('main-header');
  let lastScrollY = window.scrollY;
  let ticking = false;
  const scrollThreshold = 10;

  function updateHeader() {
    const currentScrollY = window.scrollY;

    if (currentScrollY > 100) {
      if (currentScrollY > lastScrollY + scrollThreshold) {
        header.classList.add('header-hidden');
      } else if (currentScrollY < lastScrollY - scrollThreshold) {
        header.classList.remove('header-hidden');
      }
    } else {
      header.classList.remove('header-hidden');
    }

    lastScrollY = currentScrollY;
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(updateHeader);
      ticking = true;
    }
  }, { passive: true });

  // 3. ROLAGEM INERCIAL NOS BOTÕES E LINKS DE NAVEGAÇÃO
  const anchorLinks = document.querySelectorAll('a[href^="#"]');

  anchorLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      
      if (!targetId || targetId === '#') return;

      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        e.preventDefault();

        if (lenis) {
          // Rolagem inercial cinemática do Lenis com offset do header
          lenis.scrollTo(targetElement, {
            offset: -80,
            duration: 1.3,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
          });
        } else {
          // Fallback nativo
          const headerOffset = 80;
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });
});
