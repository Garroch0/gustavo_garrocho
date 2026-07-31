/**
 * Gustavo Garrocho — Sincronização Oficial de Projetos do Behance
 * Restrito Exclusivamente a 2 Cases Reais: Okay Company & Arquitetura Invicto
 * DPOS 2026
 */

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('projetos-container');
  if (!container) return;

  const BEHANCE_USERNAME = 'Garrocho';
  const RSS_FEED_URL = `https://www.behance.net/feeds/user?username=${BEHANCE_USERNAME}`;
  const RSS2JSON_API = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(RSS_FEED_URL)}`;

  // Projetos Alvo Oficiais
  const TARGET_CASES = [
    {
      keywords: ['okay', 'company', 'rebrand'],
      customTitle: "OKAY COMPANY — REBRAND IDENTITY",
      customCategory: "IDENTIDADE VISUAL & ESTRATÉGIA DE MARCA",
      customDesc: "Rebranding completo para a Okay Company, articulando um novo ecossistema visual, posicionamento de mercado e linguagem verbal consistente.",
      fallbackLink: "https://www.behance.net/gallery/246089501/Okay-Company-Rebrand-Identity",
      fallbackCover: "https://mir-s3-cdn-cf.behance.net/projects/max_808/79b4a4246089501.Y3JvcCw5OTksNzgxLDAsMTA4.png"
    },
    {
      keywords: ['invicto', 'arquitetura', 'profissional'],
      customTitle: "ARQUITETURA INVICTO — SITE PROFISSIONAL",
      customCategory: "WEB DESIGN & PRESENÇA DIGITAL",
      customDesc: "Plataforma digital institucional para o escritório Arquitetura Invicto, conectando sofisticação estética, portfólio de obras e arquitetura de informação otimizada.",
      fallbackLink: "https://www.behance.net/gallery/251530349/Arquitetura-Invicto-Site-profissional",
      fallbackCover: "https://mir-s3-cdn-cf.behance.net/projects/max_808/007fa7251530349.Y3JvcCwzMjc1LDI1NjIsMCwzNTY.png"
    }
  ];

  function extractImageFromContent(content) {
    if (!content) return null;
    const imgRegex = /<img[^>]+src=["']([^"']+)["']/i;
    const match = content.match(imgRegex);
    return match ? match[1] : null;
  }

  function renderProjectsList(projects) {
    container.innerHTML = projects.map(proj => `
      <article class="project-card interactive-card">
        <div class="project-content">
          <h3 class="project-title">${proj.title}</h3>
          <p class="project-category-text"><strong>CATEGORIA:</strong> ${proj.category}</p>
          <p class="project-desc">${proj.desc}</p>
          <a href="${proj.link}" target="_blank" rel="noopener" class="btn btn-project-behance">
            VER CASE COMPLETO NO BEHANCE <span class="arrow-text">↗&#xFE0E;</span>
          </a>
        </div>
        <div class="project-image-container">
          <img src="${proj.image}" alt="${proj.title}" class="project-cover-image" loading="lazy" decoding="async" />
        </div>
      </article>
    `).join('');
  }

  // Tenta buscar as imagens dinâmicas do Behance, com fallback instantâneo perfeito
  fetch(RSS2JSON_API)
    .then(res => res.json())
    .then(data => {
      if (data.status === 'ok' && data.items && data.items.length > 0) {
        const matched = [];

        TARGET_CASES.forEach(target => {
          const item = data.items.find(i => {
            const t = (i.title || '').toLowerCase();
            return target.keywords.every(kw => t.includes(kw));
          });

          if (item) {
            const extractedImg = extractImageFromContent(item.content) || item.thumbnail || target.fallbackCover;
            matched.push({
              title: target.customTitle,
              category: target.customCategory,
              desc: target.customDesc,
              link: item.link || target.fallbackLink,
              image: extractedImg
            });
          } else {
            matched.push({
              title: target.customTitle,
              category: target.customCategory,
              desc: target.customDesc,
              link: target.fallbackLink,
              image: target.fallbackCover
            });
          }
        });

        renderProjectsList(matched);
      } else {
        renderFallback();
      }
    })
    .catch(() => {
      renderFallback();
    });

  function renderFallback() {
    renderProjectsList(TARGET_CASES.map(t => ({
      title: t.customTitle,
      category: t.customCategory,
      desc: t.customDesc,
      link: t.fallbackLink,
      image: t.fallbackCover
    })));
  }
});
