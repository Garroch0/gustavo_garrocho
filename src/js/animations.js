/**
 * Gustavo Garrocho — Motor de Texto Interativo 2xa.studio
 * Deslizamento por Linhas + Repulsão Vetorial Elástica Original + Alta Opacidade Radial
 * DPOS 2026
 */

document.addEventListener('DOMContentLoaded', () => {

  // --------------------------------------------------------------------------
  // 1. MOTOR CANVAS 2D DE TEXTO INTERATIVO (2XA.STUDIO ORIGINAL DISPERSION)
  // --------------------------------------------------------------------------
  class InteractiveTextBackground {
    constructor() {
      this.canvas = document.getElementById('hero-text-canvas');
      if (!this.canvas) return;

      this.ctx = this.canvas.getContext('2d');
      this.heroSection = document.getElementById('hero');

      // Parágrafos de texto denso em estilo editorial/brutalista (2xa.studio)
      this.rawText = `DRIVEN DESIGN STUDIO BETWEEN BRAND STRATEGY VISUAL IDENTITY DIGITIZATION PROCESSES SHAPED BY INPUT NO SINGLE OUTCOME IS TREATED AS FINAL SYSTEMATICS UNFOLD THROUGH DEPENDENCY AND ITERATION EACH STATE EMERGES FROM PREVIOUS CONDITIONS AND INFLUENCES WHAT FOLLOWS CHANGE IS NOT AN EFFECT APPLIED AFTERWARD BUT AN INHERENT PROPERTY OF THE SYSTEM COMPUTATIONAL DESIGN DRAWS INPUT FROM EXISTING CONDITIONS INCLUDING MACHINE PROCESSES HUMAN INTENTIONS AND BRAND STRATEGY `;

      this.particles = [];
      this.mouse = { x: -9999, y: -9999, radius: 200, active: false };
      this.time = 0;

      this.fontSize = 13;
      this.lineHeight = 21;
      this.letterSpacing = 11;
      this.lineSpeeds = [];

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
      this.lineSpeeds = [];

      const cols = Math.floor(this.width / this.letterSpacing) + 6;
      const rows = Math.floor(this.height / this.lineHeight) + 2;

      const textLength = this.rawText.length;

      for (let r = 0; r < rows; r++) {
        // Alterna a direção da linha: pares para a direita (+0.45), ímpares para a esquerda (-0.45)
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
            density: (Math.random() * 20) + 12
          });
        }
      }
    }

    bindEvents() {
      window.addEventListener('resize', () => this.resize());

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

        // 1. Deslizamento Contínuo Infinito da Linha (Esquerda / Direita)
        p.originX += p.direction;

        // Loop Infinito do Caractere na Tela
        if (p.originX > this.width + this.letterSpacing * 2) {
          p.originX = -this.letterSpacing * 2;
        } else if (p.originX < -this.letterSpacing * 2) {
          p.originX = this.width + this.letterSpacing * 2;
        }

        const idleTargetX = p.originX;
        const idleTargetY = p.originY;

        // 2. Efeito de Repulsão Vetorial Elástica Original do 2xa.studio
        const dx = this.mouse.x - p.x;
        const dy = this.mouse.y - p.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        let targetX = idleTargetX;
        let targetY = idleTargetY;
        let alpha = 0.30;
        let isHovered = false;

        if (distance < this.mouse.radius && this.mouse.active) {
          isHovered = true;
          const proximity = (this.mouse.radius - distance) / this.mouse.radius;

          // Opacidade forte no centro de influência (até 1.0 sólido)
          alpha = 0.30 + (proximity * 0.70);

          // Repulsão e dispersão de caracteres original do 2xa.studio
          const forceDirectionX = dx / (distance || 1);
          const forceDirectionY = dy / (distance || 1);
          const force = proximity * p.density * 2.4;

          targetX = idleTargetX - forceDirectionX * force;
          targetY = idleTargetY - forceDirectionY * force;
        }

        // Interpolação suave em 60fps
        p.x += (targetX - p.x) * 0.14;
        p.y += (targetY - p.y) * 0.14;

        // Renderização com Verde-Lima em destaque no centro do mouse
        if (isHovered) {
          const proximity = (this.mouse.radius - distance) / this.mouse.radius;
          if (proximity > 0.35) {
            this.ctx.fillStyle = `rgba(199, 240, 50, ${alpha.toFixed(2)})`; // Verde-Lima forte e nítido
          } else {
            this.ctx.fillStyle = `rgba(242, 242, 242, ${alpha.toFixed(2)})`; // Off-White na borda
          }
        } else {
          this.ctx.fillStyle = `rgba(242, 242, 242, ${alpha.toFixed(2)})`;
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
