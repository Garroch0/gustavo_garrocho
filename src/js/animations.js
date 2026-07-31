/**
 * Gustavo Garrocho — Motor de Texto Interativo tipo 2xa.studio (Alta Visibilidade & 60fps)
 * DPOS 2026
 */

document.addEventListener('DOMContentLoaded', () => {

  // --------------------------------------------------------------------------
  // 1. MOTOR CANVAS 2D DE TEXTO INTERATIVO ESTILO 2XA.STUDIO
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
      this.mouse = { x: -9999, y: -9999, radius: 220, active: false };

      this.fontSize = 14;
      this.lineHeight = 22;
      this.letterSpacing = 12;

      // Inicialização garantida após o carregamento da fonte tipográfica
      if (document.fonts) {
        document.fonts.ready.then(() => this.init());
      } else {
        setTimeout(() => this.init(), 300);
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
            density: (Math.random() * 25) + 12
          });
        }
      }
    }

    bindEvents() {
      window.addEventListener('resize', () => this.resize());

      // Rastreamento global do movimento do mouse na Hero
      window.addEventListener('mousemove', (e) => {
        if (!this.heroSection) return;
        const rect = this.heroSection.getBoundingClientRect();
        
        // Verifica se o mouse está sobre a área da Hero
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
          const directionX = forceDirectionX * force * p.density * 2.5;
          const directionY = forceDirectionY * force * p.density * 2.5;

          // Dispersão do caractere ao aproximar o mouse
          p.x -= directionX;
          p.y -= directionY;
        } else {
          // Retorno elástico suave à posição de origem
          if (p.x !== p.originX) {
            const dxOrigin = p.originX - p.x;
            p.x += dxOrigin * 0.1;
          }
          if (p.y !== p.originY) {
            const dyOrigin = p.originY - p.y;
            p.y += dyOrigin * 0.1;
          }
        }

        // Renderização com visibilidade e contraste alto
        if (isHovered) {
          this.ctx.fillStyle = '#C7F032'; // Verde-Lima em destaque quando próximo ao cursor
        } else {
          this.ctx.fillStyle = 'rgba(242, 242, 242, 0.45)'; // Off-White visível no fundo carbono
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
