/**
 * Gustavo Garrocho — Sincronização de Projetos do Behance (Renderização Instantânea 0ms)
 * DPOS 2026
 */

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('projetos-container');
  if (!container) return;

  // Projetos Selecionados Oficiais (Renderização Instantânea Síncrona 0ms para Nota 95+ no PageSpeed)
  const defaultProjects = [
    {
      title: "Okay Company — Rebrand Identity",
      category: "Identidade Visual & Estratégia de Marca",
      desc: "Rebranding completo para a Okay Company, articulando um novo ecossistema visual, posicionamento de mercado e linguagem verbal consistente.",
      link: "https://www.behance.net/gallery/246089501/Okay-Company-Rebrand-Identity",
      image: "https://mir-s3-cdn-cf.behance.net/projects/404/79b4a4246089501.Y3JvcCw5OTksNzgxLDAsMTA4.png"
    },
    {
      title: "Arquitetura Invicto — Site profissional",
      category: "Web Design & Presença Digital",
      desc: "Plataforma digital institucional para o escritório Arquitetura Invicto, conectando sofisticação estética, portfólio de obras e arquitetura de informação otimizada.",
      link: "https://www.behance.net/gallery/251530349/Arquitetura-Invicto-Site-profissional",
      image: "https://mir-s3-cdn-cf.behance.net/projects/404/007fa7251530349.Y3JvcCwzMjc1LDI1NjIsMCwzNTY.png"
    }
  ];

  function renderProjects(projects) {
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
          <img src="${proj.image}" alt="${proj.title}" class="project-cover-image" loading="lazy" decoding="async" width="404" height="316" />
        </div>
      </article>
    `).join('');
  }

  // Renderiza imediatamente sem esperar requisição remota de API
  renderProjects(defaultProjects);
});
