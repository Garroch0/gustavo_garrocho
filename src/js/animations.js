/**
 * Gustavo Garrocho — Motor de Texto Interativo 2xa.studio (Onda no Mouse & Deriva Flutuante Flutuante)
 * DPOS 2026
 */

document.addEventListener('DOMContentLoaded', () => {

  // --------------------------------------------------------------------------
  // 1. MOTOR CANVAS 2D DE TEXTO INTERATIVO (ONDA SENOIDAL + FLUTUAÇÃO IDLE)
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
      this.mouse = { x: -9999, y: -9999, radius: 170, active: false };
      this.time = 0;

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
            phase: Math.random() * Math.PI * 2, // Fase aleatória única por caractere
            speed: 0.0015 + Math.random() * 0.001,
            ampX: 3.5 + Math.random() * 3, // Amplitude x randômica
            ampY: 2.5 + Math.random() * 2.5 // Amplitude y randômica
          });
        }
      }
    }

    bindEvents() {
      window.addEventListener('resize', () => this.resize());

      // Rastreamento do cursor na Hero
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
      this.time += 0.025;
      this.ctx.clearRect(0, 0, this.width, this.height);
      this.ctx.font = `${this.fontSize}px "Space Mono", monospace`;

      for (let i = 0; i < this.particles.length; i++) {
        const p = this.particles[i];

        // 1. Movimento Padrão Flutuante Randômico em Repouso (Idle Floating Drift)
        const idleTargetX = p.originX + Math.sin(this.time * p.speed * 60 + p.phase) * p.ampX;
        const idleTargetY = p.originY + Math.cos(this.time * p.speed * 40 + p.phase) * p.ampY;

        // 2. Interação de Onda ao Passar o Mouse (Mouse Wave Ripple Effect)
        const dx = this.mouse.x - p.x;
        const dy = this.mouse.y - p.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        let isHovered = false;
        let targetX = idleTargetX;
        let targetY = idleTargetY;

        if (distance < this.mouse.radius && this.mouse.active) {
          isHovered = true;
          
          // Efeito de Onda Senoidal Radiante a partir do Cursor
          const waveAngle = Math.sin(distance * 0.07 - this.time * 4);
          const forceDirectionX = dx / (distance || 1);
          const forceDirectionY = dy / (distance || 1);
          const maxDistance = this.mouse.radius;
          const force = ((maxDistance - distance) / maxDistance) * waveAngle * 20;

          targetX = idleTargetX - forceDirectionX * force;
          targetY = idleTargetY - forceDirectionY * force;
        }

        // Interpolação elástica em direção aos alvos (60fps)
        p.x += (targetX - p.x) * 0.12;
        p.y += (targetY - p.y) * 0.12;

        // Estilização de Visibilidade e Contraste
        if (isHovered) {
          this.ctx.fillStyle = 'rgba(199, 240, 50, 0.85)'; // Verde-Lima vibrante na onda do mouse
        } else {
          this.ctx.fillStyle = 'rgba(242, 242, 242, 0.38)'; // Off-White visível e elegante
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
