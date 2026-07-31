/**
 * Gustavo Garrocho — Motor de Texto Interativo 2xa.studio
 * Otimizado contra Long Tasks e Reflow Forçado (0ms bloqueio na thread principal)
 * DPOS 2026
 */

document.addEventListener('DOMContentLoaded', () => {

  // --------------------------------------------------------------------------
  // 1. MOTOR CANVAS 2D DE TEXTO INTERATIVO (DIFERIDO CONTRA LONG TASKS)
  // --------------------------------------------------------------------------
  class InteractiveTextBackground {
    constructor(canvasId = 'hero-text-canvas', sectionId = 'hero') {
      this.canvas = document.getElementById(canvasId);
      if (!this.canvas) return;

      this.ctx = this.canvas.getContext('2d');
      this.heroSection = document.getElementById(sectionId);
      if (!this.heroSection) return;

      this.rawText = `DRIVEN DESIGN STUDIO BETWEEN BRAND STRATEGY VISUAL IDENTITY DIGITIZATION PROCESSES SHAPED BY INPUT NO SINGLE OUTCOME IS TREATED AS FINAL SYSTEMATICS UNFOLD THROUGH DEPENDENCY AND ITERATION EACH STATE EMERGES FROM PREVIOUS CONDITIONS AND INFLUENCES WHAT FOLLOWS CHANGE IS NOT AN EFFECT APPLIED AFTERWARD BUT AN INHERENT PROPERTY OF THE SYSTEM COMPUTATIONAL DESIGN DRAWS INPUT FROM EXISTING CONDITIONS INCLUDING MACHINE PROCESSES HUMAN INTENTIONS AND BRAND STRATEGY `;

      this.particles = [];
      this.mouse = { x: -9999, y: -9999, radius: 240, active: false };
      this.time = 0;
      this.isPaused = false;
      this.animationFrameId = null;
      this.rectCache = null;

      const isMobile = window.innerWidth < 768;
      this.fontSize = isMobile ? 12 : 13;
      this.lineHeight = isMobile ? 26 : 21;
      this.letterSpacing = isMobile ? 16 : 11;
      this.lineSpeeds = [];

      // Inicialização diferida para evitar tarefas longas (Long Tasks) no PageSpeed
      const scheduleInit = () => {
        if (window.requestIdleCallback) {
          window.requestIdleCallback(() => this.init(), { timeout: 1000 });
        } else {
          setTimeout(() => this.init(), 100);
        }
      };

      if (document.fonts) {
        document.fonts.ready.then(scheduleInit);
      } else {
        scheduleInit();
      }
    }

    init() {
      this.updateRectCache();
      this.resize();
      this.bindEvents();
      this.setupObserver();
      this.animate();
    }

    updateRectCache() {
      if (this.heroSection) {
        this.rectCache = this.heroSection.getBoundingClientRect();
      }
    }

    setupObserver() {
      if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              if (this.isPaused) {
                this.isPaused = false;
                this.animate();
              }
            } else {
              this.isPaused = true;
              if (this.animationFrameId) {
                cancelAnimationFrame(this.animationFrameId);
                this.animationFrameId = null;
              }
            }
          });
        }, { threshold: 0.05 });

        observer.observe(this.heroSection);
      }
    }

    resize() {
      if (!this.heroSection) return;
      this.updateRectCache();
      
      this.width = this.rectCache.width || this.heroSection.clientWidth;
      this.height = this.rectCache.height || this.heroSection.clientHeight;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      this.canvas.width = this.width * dpr;
      this.canvas.height = this.height * dpr;
      this.ctx.scale(dpr, dpr);

      this.createParticles();
    }

    createParticles() {
      this.particles = [];
      this.lineSpeeds = [];

      const cols = Math.floor(this.width / this.letterSpacing) + 6;
      const rows = Math.floor(this.height / this.lineHeight) + 2;

      const textLength = this.rawText.length;

      for (let r = 0; r < rows; r++) {
        const direction = r % 2 === 0 ? 0.45 : -0.45;
        this.lineSpeeds.push(direction);

        let textOffset = (r * 15) % textLength;

        for (let c = 0; c < cols; c++) {
          const char = this.rawText[(textOffset + c) % textLength];

          if (char === ' ') continue;

          const originX = c * this.letterSpacing - this.letterSpacing * 2;
          const originY = r * this.lineHeight + this.fontSize;

          this.particles.push({
            char: char,
            x: originX,
            y: originY,
            originX: originX,
            originY: originY,
            row: r,
            direction: direction,
            density: (Math.random() * 25) + 15
          });
        }
      }
    }

    bindEvents() {
      window.addEventListener('resize', () => this.resize(), { passive: true });
      window.addEventListener('scroll', () => this.updateRectCache(), { passive: true });

      window.addEventListener('mousemove', (e) => {
        if (!this.heroSection || this.isPaused || !this.rectCache) return;
        const rect = this.rectCache;
        
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
      }, { passive: true });

      window.addEventListener('touchmove', (e) => {
        if (!this.heroSection || this.isPaused || !this.rectCache || e.touches.length === 0) return;
        const rect = this.rectCache;
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
      if (this.isPaused) return;

      this.time += 0.025;
      this.ctx.clearRect(0, 0, this.width, this.height);
      this.ctx.font = `${this.fontSize}px "Space Mono", monospace`;

      for (let i = 0; i < this.particles.length; i++) {
        const p = this.particles[i];

        p.originX += p.direction;

        if (p.originX > this.width + this.letterSpacing * 2) {
          p.originX = -this.letterSpacing * 2;
        } else if (p.originX < -this.letterSpacing * 2) {
          p.originX = this.width + this.letterSpacing * 2;
        }

        const idleTargetX = p.originX;
        const idleTargetY = p.originY;

        const dx = this.mouse.x - p.x;
        const dy = this.mouse.y - p.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        let targetX = idleTargetX;
        let targetY = idleTargetY;
        let isHovered = false;

        if (distance < this.mouse.radius && this.mouse.active) {
          isHovered = true;
          const proximity = (this.mouse.radius - distance) / this.mouse.radius;

          const forceDirectionX = dx / (distance || 1);
          const forceDirectionY = dy / (distance || 1);
          const force = proximity * p.density * 4.8;

          targetX = idleTargetX - forceDirectionX * force;
          targetY = idleTargetY - forceDirectionY * force;
        }

        p.x += (targetX - p.x) * 0.14;
        p.y += (targetY - p.y) * 0.14;

        if (isHovered) {
          const proximity = (this.mouse.radius - distance) / this.mouse.radius;
          const alpha = 0.35 + (proximity * 0.65);

          if (proximity > 0.30) {
            this.ctx.fillStyle = `rgba(199, 240, 50, ${alpha.toFixed(2)})`;
          } else {
            this.ctx.fillStyle = `rgba(242, 242, 242, ${alpha.toFixed(2)})`;
          }
        } else {
          this.ctx.fillStyle = 'rgba(242, 242, 242, 0.35)';
        }

        this.ctx.fillText(p.char, p.x, p.y);
      }

      this.animationFrameId = requestAnimationFrame(() => this.animate());
    }
  }

  // Inicializa o background de texto interativo 2xa.studio na Hero
  new InteractiveTextBackground('hero-text-canvas', 'hero');

  // Inicializa o background de texto interativo 2xa.studio na Seção CTA
  new InteractiveTextBackground('cta-text-canvas', 'contato');

  // --------------------------------------------------------------------------
  // 2. REVELAÇÃO SUAVE DE ELEMENTOS (GSAP SCROLLTRIGGER OTIMIZADO)
  // --------------------------------------------------------------------------
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    gsap.utils.toArray('.interactive-card, .bento-card, .project-card').forEach((card) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: 'top 92%',
          toggleActions: 'play none none none'
        },
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: 'power2.out'
      });
    });
  }
});
