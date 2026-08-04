/**
 * Gustavo Garrocho — Motor de Texto Interativo 2xa.studio
 * Deslizamento Cinemático (10px/s) com Teleporte de Borda e Repulsão Vetorial Suave
 * DPOS 2026
 */

document.addEventListener('DOMContentLoaded', () => {

  // --------------------------------------------------------------------------
  // 1. MOTOR CANVAS 2D DE TEXTO INTERATIVO (REDUÇÃO DE WRAP + HOVER ESTÁVEL)
  // --------------------------------------------------------------------------
  class InteractiveTextBackground {
    constructor(canvasId = 'hero-text-canvas', sectionId = 'hero') {
      this.canvas = document.getElementById(canvasId);
      if (!this.canvas) return;

      if (this.canvas._instance) {
        this.canvas._instance.destroy();
      }
      this.canvas._instance = this;

      this.ctx = this.canvas.getContext('2d');
      this.heroSection = document.getElementById(sectionId);
      if (!this.heroSection) return;

      this.rawText = `DRIVEN DESIGN STUDIO BETWEEN BRAND STRATEGY VISUAL IDENTITY DIGITIZATION PROCESSES SHAPED BY INPUT NO SINGLE OUTCOME IS TREATED AS FINAL SYSTEMATICS UNFOLD THROUGH DEPENDENCY AND ITERATION EACH STATE EMERGES FROM PREVIOUS CONDITIONS AND INFLUENCES WHAT FOLLOWS CHANGE IS NOT AN EFFECT APPLIED AFTERWARD BUT AN INHERENT PROPERTY OF THE SYSTEM COMPUTATIONAL DESIGN DRAWS INPUT FROM EXISTING CONDITIONS INCLUDING MACHINE PROCESSES HUMAN INTENTIONS AND BRAND STRATEGY `;

      this.particles = [];
      this.mouse = { x: -9999, y: -9999, radius: 210, active: false };
      this.time = 0;
      this.isPaused = false;
      this.animationFrameId = null;
      this.rectCache = null;

      const isMobile = window.innerWidth < 768;
      this.fontSize = isMobile ? 12 : 13;
      this.lineHeight = isMobile ? 26 : 21;
      this.letterSpacing = isMobile ? 16 : 12;

      const scheduleInit = () => {
        if (window.requestIdleCallback) {
          window.requestIdleCallback(() => this.init(), { timeout: 800 });
        } else {
          setTimeout(() => this.init(), 80);
        }
      };

      if (document.fonts) {
        document.fonts.ready.then(scheduleInit);
      } else {
        scheduleInit();
      }
    }

    destroy() {
      this.isPaused = true;
      if (this.animationFrameId) {
        cancelAnimationFrame(this.animationFrameId);
        this.animationFrameId = null;
      }
    }

    init() {
      this.updateRectCache();
      this.resize();
      this.bindEvents();
      this.setupObserver();
      
      if (this.animationFrameId) {
        cancelAnimationFrame(this.animationFrameId);
      }
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
                if (!this.animationFrameId) {
                  this.animate();
                }
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

      this.cols = Math.ceil(this.width / this.letterSpacing) + 8;
      this.rows = Math.ceil(this.height / this.lineHeight) + 2;

      this.totalRowWidth = this.cols * this.letterSpacing;
      const textLength = this.rawText.length;

      for (let r = 0; r < this.rows; r++) {
        const direction = r % 2 === 0 ? 0.35 : -0.35;
        let textOffset = (r * 17) % textLength;

        for (let c = 0; c < this.cols; c++) {
          const char = this.rawText[(textOffset + c) % textLength];

          if (char === ' ') continue;

          const baseColX = c * this.letterSpacing - this.letterSpacing * 2;
          const originY = r * this.lineHeight + this.fontSize;

          this.particles.push({
            char: char,
            x: baseColX,
            y: originY,
            colIndex: c,
            rowIndex: r,
            originY: originY,
            direction: direction,
            forceFactor: 1.0 + (Math.sin(c * 0.5 + r) * 0.2)
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
      if (this.isPaused) {
        this.animationFrameId = null;
        return;
      }

      this.time += 0.016;
      this.ctx.clearRect(0, 0, this.width, this.height);
      this.ctx.font = `${this.fontSize}px "Space Mono", monospace`;

      for (let i = 0; i < this.particles.length; i++) {
        const p = this.particles[i];

        const rowShift = this.time * 10 * p.direction;
        const rawX = (p.colIndex * this.letterSpacing) + rowShift;
        
        let currentOriginX = ((rawX % this.totalRowWidth) + this.totalRowWidth) % this.totalRowWidth - this.letterSpacing * 2;
        const currentOriginY = p.originY;

        const dx = this.mouse.x - p.x;
        const dy = this.mouse.y - p.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        let targetX = currentOriginX;
        let targetY = currentOriginY;
        let isHovered = false;

        if (distance < this.mouse.radius && this.mouse.active) {
          isHovered = true;
          const proximity = (this.mouse.radius - distance) / this.mouse.radius;
          
          const smoothFactor = Math.sin(proximity * Math.PI * 0.5);
          const maxForce = 44 * p.forceFactor;
          const force = smoothFactor * maxForce;

          const angle = Math.atan2(dy, dx);
          targetX = currentOriginX - Math.cos(angle) * force;
          targetY = currentOriginY - Math.sin(angle) * force;
        }

        // Teleporte imediato de borda no wrap para evitar caracteres flutuando pela tela
        if (Math.abs(targetX - p.x) > this.letterSpacing * 6) {
          p.x = targetX;
          p.y = targetY;
        } else {
          p.x += (targetX - p.x) * 0.12;
          p.y += (targetY - p.y) * 0.12;
        }

        if (isHovered) {
          const proximity = (this.mouse.radius - distance) / this.mouse.radius;
          const alpha = 0.35 + (proximity * 0.65);

          if (proximity > 0.28) {
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
