/**
 * Gustavo Garrocho — Animações de Inversão & Hover (GSAP)
 * DPOS 2026
 */

document.addEventListener('DOMContentLoaded', () => {
  if (typeof gsap !== 'undefined') {

    // 1. ANIMAÇÃO DE ABERTURA SUAVE NA HERO
    gsap.from('.hero-title span', {
      y: 25,
      opacity: 0.3,
      stagger: 0.12,
      duration: 0.9,
      ease: 'power2.out'
    });

    // 2. REGRA DE INVERSÃO DE CORES NO HOVER DOS CARDS DE SERVIÇOS
    const bentoCards = document.querySelectorAll('.bento-card');
    
    bentoCards.forEach(card => {
      const isInvertedDefault = card.classList.contains('card-inverted-default');

      card.addEventListener('mouseenter', () => {
        if (isInvertedDefault) {
          // CARD 1 (Identidade Visual): Mudar do Verde-Lima para Fundo Carbono + Texto Off-White (Inverte para Escuro)
          gsap.to(card, {
            backgroundColor: 'rgba(18, 20, 19, 0.95)',
            borderColor: 'rgba(242, 242, 242, 0.4)',
            y: -6,
            duration: 0.3,
            ease: 'power2.out'
          });
          
          gsap.to(card.querySelectorAll('h3, p, span, .card-num'), {
            color: '#F2F2F2',
            duration: 0.25
          });

          gsap.to(card.querySelectorAll('.card-num'), {
            color: '#C7F032',
            duration: 0.25
          });
        } else {
          // CARDS 2 A 6 (Padronizados): Mudar do Fundo Carbono para Verde-Lima + Texto Carbono (Inverte para Claro)
          gsap.to(card, {
            backgroundColor: '#C7F032',
            borderColor: '#C7F032',
            y: -6,
            duration: 0.3,
            ease: 'power2.out'
          });
          
          gsap.to(card.querySelectorAll('h3, p, span, .card-num'), {
            color: '#121413',
            duration: 0.25
          });
        }
      });

      card.addEventListener('mouseleave', () => {
        if (isInvertedDefault) {
          // CARD 1: Volta ao estado original (Fundo Verde-Lima + Texto Carbono)
          gsap.to(card, {
            backgroundColor: '#C7F032',
            borderColor: '#C7F032',
            y: 0,
            duration: 0.3,
            ease: 'power2.out'
          });
          
          gsap.to(card.querySelectorAll('h3, p, span, .card-num'), {
            color: '#121413',
            duration: 0.25
          });
        } else {
          // CARDS 2 A 6: Voltam ao estado padronizado (Fundo Carbono + Texto Off-White)
          gsap.to(card, {
            backgroundColor: 'rgba(255, 255, 255, 0.03)',
            borderColor: card.classList.contains('card-borda-lima') ? '#C7F032' : 'rgba(242, 242, 242, 0.25)',
            y: 0,
            duration: 0.3,
            ease: 'power2.out'
          });
          
          gsap.to(card.querySelectorAll('h3, p'), {
            color: '#F2F2F2',
            duration: 0.25
          });

          gsap.to(card.querySelectorAll('.card-num'), {
            color: '#C7F032',
            duration: 0.25
          });
        }
      });
    });

    // 3. HOVER NOS CARDS DAS ETAPAS DO PROJETO
    const metodoCards = document.querySelectorAll('.metodo-card');
    metodoCards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        gsap.to(card, {
          backgroundColor: 'rgba(199, 240, 50, 0.08)',
          borderTopColor: '#C7F032',
          y: -4,
          duration: 0.25,
          ease: 'power2.out'
        });
      });

      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          backgroundColor: 'rgba(255, 255, 255, 0.03)',
          borderTopColor: '#C7F032',
          y: 0,
          duration: 0.25,
          ease: 'power2.out'
        });
      });
    });
  }
});
