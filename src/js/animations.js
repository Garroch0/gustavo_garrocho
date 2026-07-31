/**
 * Gustavo Garrocho — Motor de Texto Interativo tipo 2xa.studio (Subtil, Refinado & Legibilidade 100%)
 * DPOS 2026
 */

document.addEventListener('DOMContentLoaded', () => {

  // --------------------------------------------------------------------------
  // 1. MOTOR CANVAS 2D DE TEXTO INTERATIVO ESTILO 2XA.STUDIO (SUBTIL & ELEGANTE)
  // --------------------------------------------------------------------------
  class InteractiveTextBackground {
    constructor() {
      this.canvas = document.getElementById('hero-text-canvas');
      if (!this.canvas) return;

      this.ctx = this.canvas.getContext('2d');
      this.heroSection = document.getElementById('hero');

      // Parágrafos de texto denso em estilo editorial/brutalista (2xa.studio)
      this.rawText = `DRIVEN DESIGN STUDIO BETWEEN BRAND STRATEGY VISUAL IDENTITY DIGITIZATION PROCESSES SHAPED BY INPUT NO SINGLE OUTCOME IS TREATED AS FINAL SYSTEMATICS UNFOLD THROUGH DEPENDENCY AND ITERATION EACH STATE EMERGES FROM PREVIOUS CONDITIONS AND INFLUENCES WHAT FOLLOWS CHANGE IS NOT AN EFFECT APPLIED AFTERWARD BUT AN INHERENT PROPERTY OF THE SYSTEM COMPUTATIONAL DESIGN DRAWS INPUT FROM EXISTING CONDITIONS INCLUDING MACHINE PROCESSES HUMAN INTENTIONS AND BRAND STRATEGY`;

      this.particles = [];
      this.mouse = { x: -9999, y: -9999, radius: 130, active: false }; // Raio harmonioso e discreto

      this.fontSize = 13;
      this.lineHeight = 21;
      this.letterSpacing = 11;

      // Inicialização garantida após o carregamento completo da fonte tipográfica
      if (document.fonts) {
        document.fonts.ready.then(() => this.init());
      } else {
        setTimeout(() => this.init(), 200);
      }
    }

    init() {
      this.resize();
      this.bindEvents();
      this.animate();
    }

    resize() {
      if (!this.heroSection) return;
      const rect = this.heroSection.getBoundingClientRect();
      this.width = rect.width;
      this.height = rect.height;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      this.canvas.width = this.width * dpr;
      this.canvas.height = this.height * dpr;
      this.ctx.scale(dpr, dpr);

      this.createParticles();
    }

    createParticles() {
      this.particles = [];
      const cols = Math.floor(this.width / this.letterSpacing) + 2;
      const rows = Math.floor(this.height / this.lineHeight) + 2;

      let textIndex = 0;
      const textLength = this.rawText.length;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const char = this.rawText[textIndex % textLength];
          textIndex++;

          if (char === ' ') continue;

          const originX = c * this.letterSpacing;
          const originY = r * this.lineHeight + this.fontSize;

          this.particles.push({
            char: char,
            x: originX,
            y: originY,
            originX: originX,
            originY: originY,
            vx: 0,
            vy: 0,
            density: (Math.random() * 15) + 8
          });
        }
      }
    }

    bindEvents() {
      window.addEventListener('resize', () => this.resize());

      // Rastreamento sutil do cursor do mouse
      window.addEventListener('mousemove', (e) => {
        if (!this.heroSection) return;
        const rect = this.heroSection.getBoundingClientRect();
        
        if (
          e.clientX >= rect.left &&
          e.clientX <= rect.right &&
          e.clientY >= rect.top &&
          e.clientY <= rect.bottom
        ) {
          this.mouse.x = e.clientX - rect.left;
          this.mouse.y = e.clientY - rect.top;
          this.mouse.active = true;
        } else {
          this.mouse.active = false;
        }
      });

      // Suporte a Toque Mobile
      window.addEventListener('touchmove', (e) => {
        if (!this.heroSection || e.touches.length === 0) return;
        const rect = this.heroSection.getBoundingClientRect();
        const touch = e.touches[0];

        if (
          touch.clientX >= rect.left &&
          touch.clientX <= rect.right &&
          touch.clientY >= rect.top &&
          touch.clientY <= rect.bottom
        ) {
          this.mouse.x = touch.clientX - rect.left;
          this.mouse.y = touch.clientY - rect.top;
          this.mouse.active = true;
        }
      }, { passive: true });
    }

    animate() {
      this.ctx.clearRect(0, 0, this.width, this.height);
      this.ctx.font = `${this.fontSize}px "Space Mono", monospace`;

      for (let i = 0; i < this.particles.length; i++) {
        const p = this.particles[i];

        const dx = this.mouse.x - p.x;
        const dy = this.mouse.y - p.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        let isHovered = false;

        if (distance < this.mouse.radius && this.mouse.active) {
          isHovered = true;
          const forceDirectionX = dx / distance;
          const forceDirectionY = dy / distance;
          const maxDistance = this.mouse.radius;
          const force = (maxDistance - distance) / maxDistance;
          const directionX = forceDirectionX * force * p.density * 1.2;
          const directionY = forceDirectionY * force * p.density * 1.2;

          // Dispersão sutil e elegante
          p.x -= directionX;
          p.y -= directionY;
        } else {
          // Retorno elástico suave à posição de origem
          if (p.x !== p.originX) {
            const dxOrigin = p.originX - p.x;
            p.x += dxOrigin * 0.08;
          }
          if (p.y !== p.originY) {
            const dyOrigin = p.originY - p.y;
            p.y += dyOrigin * 0.08;
          }
        }

        // Renderização com opacidade sutil de alta legibilidade
        if (isHovered) {
          this.ctx.fillStyle = 'rgba(199, 240, 50, 0.45)'; // Verde-Lima sutil em hover
        } else {
          this.ctx.fillStyle = 'rgba(242, 242, 242, 0.22)'; // Off-white suave de marca d'água
        }

        this.ctx.fillText(p.char, p.x, p.y);
      }

      requestAnimationFrame(() => this.animate());
    }
  }

  // Inicializa o background de texto interativo 2xa.studio
  new InteractiveTextBackground();

  // --------------------------------------------------------------------------
  // 2. REVELAÇÃO SUAVE DE ELEMENTOS (GSAP SCROLLTRIGGER)
  // --------------------------------------------------------------------------
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    gsap.utils.toArray('.interactive-card, .bento-card, .project-card').forEach((card) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: 'top 88%',
          toggleActions: 'play none none none'
        },
        opacity: 0,
        y: 25,
        duration: 0.8,
        ease: 'power2.out'
      });
    });
  }
});
