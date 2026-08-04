/**
 * Gustavo Garrocho — Sincronização Oficial dos 2 Projetos Selecionados do Behance
 * Otimizado com DocumentFragment para 0 Reflows de DOM no PageSpeed
 * DPOS 2026
 */

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('projetos-container');
  if (!container) return;

  const behanceProjects = [
    {
      num: '01',
      title: 'OKAY COMPANY — REBRAND IDENTITY',
      category: 'REBRANDING // IDENTIDADE VISUAL // BRANDING',
      desc: 'Projeto autoral de rebranding e posicionamento estratégico da marca Okay Company, desenvolvido para gerar consistência, impacto e clareza de mercado.',
      coverImg: 'https://mir-s3-cdn-cf.behance.net/project_modules/1400/49711d246089501.69bbe41f9560f.png',
      link: 'https://www.behance.net/gallery/246089501/Okay-Company-Rebrand-Identity'
    },
    {
      num: '02',
      title: 'ARQUITETURA INVICTO — SITE PROFISSIONAL',
      category: 'WEB DESIGN // UI/UX // SITE PROFISSIONAL',
      desc: 'Desenvolvimento de site portfólio de alta performance e interface visual para o estúdio de arquitetura Invicto.',
      coverImg: 'https://mir-s3-cdn-cf.behance.net/projects/max_808/26ec1e251530349.Y3JvcCwyMjgwLDE3ODMsMCw2Nw.png',
      link: 'https://www.behance.net/gallery/251530349/Arquitetura-Invicto-Site-profissional'
    }
  ];

  renderProjects(behanceProjects);

  function renderProjects(list) {
    container.innerHTML = '';
    const fragment = document.createDocumentFragment();
    
    list.forEach((proj) => {
      const card = document.createElement('article');
      card.className = 'project-card interactive-project';
      
      card.innerHTML = `
        <div class="project-info">
          <span class="mono-badge text-dark-badge">BEHANCE PORTFÓLIO // ${proj.num}</span>
          <h3 class="project-title">${proj.title}</h3>
          <p class="project-category-text"><strong>CATEGORIA:</strong> ${proj.category}</p>
          <p class="project-desc">${proj.desc}</p>
          <a href="${proj.link}" target="_blank" rel="noopener" class="btn btn-project-behance">
            VER CASE COMPLETO NO BEHANCE <span class="arrow-text">↗&#xFE0E;</span>
          </a>
        </div>
        <div class="project-image-container">
          <img src="${proj.coverImg}" alt="${proj.title}" class="project-behance-img" loading="lazy" decoding="async" width="800" height="500" />
        </div>
      `;
      
      fragment.appendChild(card);
    });

    container.appendChild(fragment);
  }
});
