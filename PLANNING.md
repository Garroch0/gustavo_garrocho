# Plano de Implementação — Gustavo Garrocho (Landing Page)

Este documento apresenta o planejamento estratégico, técnico e visual completo para a criação da Landing Page de Gustavo Garrocho, estruturado conforme os requisitos da Fase 3 do DPOS.

---

## 1. Resumo Executivo
Criação de uma Landing Page premium e minimalista para posicionar o designer e estrategista de marcas **Gustavo Garrocho** no mercado de projetos de alto valor (high-ticket). O site expressa visualmente a união dos pilares **Natureza, Filosofia e Tecnologia**, utilizando animações interativas e de scroll inspiradas no showcase da GSAP para demonstrar sua capacidade técnica e sensibilidade artística.

---

## 2. Objetivos
*   **Comercial**: Captar contatos comerciais qualificados direcionando-os ao WhatsApp com mensagens pré-programadas para fechamento rápido de serviços de design, estratégia ou tráfego pago.
*   **Posicionamento**: Solidificar a autoridade profissional de Gustavo, elevando o valor percebido de seus 3 projetos publicáveis.
*   **Técnico**: Atingir carregamento inferior a $1.0\text{s}$ (Lighthouse score 95+) para garantir alta eficiência nas campanhas de anúncios futuros.

---

## 3. Escopo
*   **Fase 1 (Atual)**: Landing page de única página (single page) com 5 seções dinâmicas.
*   **Interações**: Transições fluidas baseadas em rolagem e micro-interações refinadas usando a biblioteca GSAP.
*   **Integrações**: Script dinâmico para Meta Pixel e Google Tag Manager sem impacto de performance.

---

## 4. Persona & Jornada do Usuário

### Persona: Ricardo, 38 anos — Fundador de Prestadora de Serviços High-Ticket
*   **Perfil**: Profissional liberal (médico, advogado de prestígio, dono de agência) que deseja se destacar digitalmente com uma marca madura e sofisticada.
*   **Dores**: Acha os designers tradicionais muito focados em "desenhar logo" sem entender de negócios. Desconfia de agências de marketing que prometem milagres apenas com tráfego sem capricho conceitual.
*   **Objetivo**: Encontrar um parceiro estratégico que entenda seus problemas sistêmicos de negócios e crie um universo visual impactante.

### Jornada do Usuário no Site
1.  **Entrada**: Impressiona-se com a abertura interativa e fluida (GSAP), percebendo requinte técnico de imediato.
2.  **Educação**: Lê sobre o método nexialista e entende que o Gustavo trabalha de forma sistêmica e organizada, fugindo do imediatismo.
3.  **Prova Social**: Navega pelos 3 estudos de caso apresentados de forma aprofundada (estratégia + estética).
4.  **Decisão**: Compreende os serviços independentes oferecidos (identidade visual, estratégia, embalagens, tráfego, mentorias).
5.  **Ação**: Clica no botão de conversão de WhatsApp para iniciar um diagnóstico comercial.

---

## 5. Arquitetura da Informação & Sitemap

### Sitemap (Fase 1)
*   **`/` (Landing Page Principal)**
    *   Header / Navigation (Logo + Âncoras: Método, Portfólio, Serviços, Contato)
    *   1. Hero Section (Abertura conceitual)
    *   2. O Método Nexialista (Diferencial sistêmico)
    *   3. Projetos Selecionados (Os 3 cases detalhados)
    *   4. Serviços & Soluções (Cartões interativos)
    *   5. CTA / Footer (Contato WhatsApp + Links de redes)

---

## 6. Fluxo do Usuário
- Visitante entra via Tráfego Pago/Orgânico
- Visualiza Hero: impacto visual e conceitual
- Rola a página: Animações GSAP revelam o Método Nexialista
- Visualiza Projetos Selecionados e lê estudos de caso
- Entende os serviços independentes oferecidos
- Clica no botão de WhatsApp com texto pré-programado
- Conversa comercial iniciada na caixa do Gustavo

---

## 7. Wireframes Textuais

### Header
*   **Esquerda**: Logotipo tipográfico (Gustavo Garrocho).
*   **Centro**: Links de navegação suave (Método, Projetos, Serviços).
*   **Direita**: Botão de contato em destaque (Conversar).

### Seção 1: Hero (Abertura Conceitual)
*   **Texto Principal**: Frase reflexiva e de impacto filosófico-tecnológico.
    *   *Rascunho*: "As marcas duradouras crescem no ritmo da natureza, com o rigor da filosofia e a precisão da tecnologia. Projetamos sistemas visuais e estratégias sistêmicas para quem recusa o imediatismo."
*   **Visual**: Elementos geométricos estruturados (grids) que reagem suavemente ao movimento do mouse ou scroll, em tons terrosos escuros.

### Seção 2: O Método Nexialista (Diferencial)
*   **Título**: "Pensamento sistêmico para problemas complexos."
*   **Subtítulo**: "A abordagem nexialista conecta os pontos cruciais do seu ecossistema de marca."
*   **Blocos Dinâmicos (3 Pilares)**:
    1.  **Investigação & Pesquisa**: Análise de oportunidades profunda sem suposições.
    2.  **Estratégia & Expressão**: Desenhar a identidade visual e posicionamento integrados.
    3.  **Ativação & Crescimento**: Habilidade de colocar a marca no ar com inteligência de aquisição (tráfego e web design).

### Seção 3: Projetos Selecionados (Portfólio)
*   **Título**: "Três Histórias de Marca."
*   **Layout**: Cards expandidos que revelam os bastidores ao passar o mouse (hover dinâmico).
    *   **Case 1**: Identidade Visual (Conceito estético e aplicação real).
    *   **Case 2**: Branding Completo (Estudo da estratégia de marca + desenvolvimento de ID visual).
    *   **Case 3**: Identidade Visual (Foco na resolução do problema estético de posicionamento).

### Seção 4: Serviços (Habilidades Independentes)
*   **Título**: "Como cooperamos."
*   **Layout Bento Grid**: Cards contendo descrição clara dos serviços:
    *   *Card Principal*: Identidade Visual & Estratégia de Marca (Branding).
    *   *Card Secundário*: Web Design (Landing Pages de Alta Conversão).
    *   *Card Médio*: Modelagem de Negócio (Exclusivo para prestadores de serviços estruturarem sua oferta).
    *   *Card Compacto*: Design de Embalagens e Rotulagem.
    *   *Card Compacto*: Auditorias, Consultorias e Mentorias de Marca.

### Seção 5: CTA & Footer
*   **Texto**: "Pronto para estruturar o próximo passo da sua marca?"
*   **Subtexto**: "Inicie um diálogo estratégico amigável e sem compromisso."
*   **CTA Principal**: Botão premium pulsante direcionando para o WhatsApp comercial.
    *   *Mensagem programada*: "Olá Gustavo, acessei seu site pessoal e gostaria de agendar um diagnóstico estratégico para a minha marca."

---

## 8. Estratégia de Conteúdo, SEO e Conversão

*   **Copywriting**: Tom acessível, porém profundamente profissional e questionador, usando metáforas de crescimento natural (reserva florestal/tempo) e rigor de processos.
*   **SEO Técnico**: 
    *   Uso de heading tags (`h1`, `h2`, `h3`) semânticas de forma hierárquica clara.
    *   Meta descrições atraentes e tags OpenGraph estruturadas para compartilhamento.
    *   Alt text em todas as imagens (essencial para acessibilidade e SEO).
*   **Estratégia de Conversão (CRO)**:
    *   Botão flutuante de WhatsApp minimalista no canto inferior direito a partir de determinado ponto de rolagem.
    *   Formatação das mensagens de WhatsApp para permitir que o Gustavo saiba imediatamente que o lead veio do tráfego do site pessoal.

---

## 9. Branding & Direção de Arte

### Identidade Cromática (Paleta Oficial)
*   **Carbono (Fundo Escuro / Texto Principal em claros)**: `#2B2B2B` ou `#121413` (Tonalidade sólida e moderna).
*   **Off-White (Fundo Claro / Texto Principal em escuros)**: `#F2F2F2` (Contraste limpo e confortável).
*   **Verde-Lima (Destaque Tecnológico / CTAs)**: `#C7F032` (Cor vibrante para atrair atenção e cliques).
*   **Lavanda (Destaque Filosófico / Seções Especiais)**: `#C8C5E2` (Tom suave e conceitual).
*   **Verde Menta Claro (Destaque Orgânico / Fallbacks)**: `#DCE8D9` (Remete à natureza de forma sutil).
*   **Azul Profundo (Destaque de Contraste Frio)**: `#3B3386` (Para contrapontos de marca).

### Direção Tipográfica
*   **Títulos Principais (Headings)**: `Founders Grotesk X-Condensed Bold` (Caixa Alta, compactada, para títulos monumentais característicos de design premium. Fallback web: `Antonio` ou `Oswald`).
*   **Corpo do Texto**: `DM Sans` (Google Fonts, sans-serif limpa e geométrica para alta legibilidade e sofisticação neutra).
*   **Detalhes / Código / Rótulos**: Monospace (`Space Mono` ou `JetBrains Mono` em Caixa Alta com letter-spacing amplo, ex: `JOIN OUR COLLECTION...`).

### Visual Concept (Neo-Brutalismo / Suíço)
*   Uso de linhas divisórias pretas/escuras de `1px` para organizar o fluxo estrutural de informações.
*   Cards e blocos geométricos rígidos organizados em grades, intercalando fundos de cores da paleta durante o scroll (ex: seções claras e escuras alternadas de forma fluida).
*   Micro-animações GSAP guiadas por scroll que acionam transições, revelam textos de forma compacta e controlam o ritmo da rolagem de forma tecnológica.

## 10. Arquitetura Técnica & Tecnologias Recomendadas

### Stack Técnica
*   **Linguagem Core**: HTML5 Semântico e CSS3 puro.
*   **Lógica**: JavaScript Vanilla (ES6+) estruturado de forma modular (sem frameworks pesados para garantir velocidade máxima).
*   **Biblioteca de Animação**: **GSAP (GreenSock Animation Platform)** e seu plugin `ScrollTrigger` via CDN rápido.
*   **Hospedagem & Deploy**: Vercel ou Netlify, conectada diretamente ao repositório GitHub para automação de CI/CD integrada e entrega sob CDN global.

### Estrutura de Pastas Proposta
```text
/
├── index.html
├── favicon.ico
├── README.md
├── src/
│   ├── css/
│   │   ├── reset.css        # Reset básico de estilos do navegador
│   │   ├── variables.css    # Variáveis globais do Design System (cores, fontes)
│   │   ├── main.css         # Estrutura principal e layouts de grid
│   │   └── components.css   # Estilos individuais de cards, botões e CTA
│   ├── js/
│   │   ├── app.js           # Lógica de interações gerais e carregamento
│   │   ├── animations.js    # Scripts e Timelines da biblioteca GSAP
│   │   └── analytics.js     # Configuração e inicialização modular do Meta Pixel
│   └── assets/
│       ├── img/             # Imagens otimizadas (formato WebP) dos 3 projetos
│       ├── icons/           # Ícones em formato vetorial SVG
│       └── fonts/           # Fontes locais de fallback (opcional)
```

---

## 11. Roadmap de Produto

*   **Fase 1: Landing Page (Atual)**: Publicação do site pessoal com foco em conversão rápida de leads via WhatsApp, estruturação dos 3 projetos exibíveis e do método nexialista.
*   **Fase 2: Portfólio Completo**: Expansão do site com páginas individuais detalhando os estudos de caso, permitindo a inclusão do quarto projeto comercial (assim que publicado).
*   **Fase 3: Blog / Conteúdo**: Implementação de um canal de publicação para artigos analíticos e conceituais do Gustavo sobre design e estratégia de marca, visando atração via SEO orgânico.
*   **Fase 4: Expansões Futuras**: Plataforma para agendamentos integrados de consultorias/mentorias e materiais ricos de suporte para prestadores de serviços.

---

## 12. Riscos, Dependências e Critérios de Sucesso

### Riscos e Mitigações
*   *Risco*: Animações GSAP pesadas afetando a performance em conexões 3G móveis.
    *   *Mitigação*: Desativar animações mais complexas em telas menores via media queries e scripts de detecção de performance de rede.
*   *Risco*: Carregamento lento de imagens dos estudos de caso.
    *   *Mitigação*: Compressão pesada para WebP e uso do atributo `loading="lazy"`.

### Dependências
*   Envio dos arquivos de imagem (resolução adequada) e textos detalhados sobre os 3 projetos publicáveis.
*   Link do número de WhatsApp comercial parametrizado.

### Critérios de Sucesso
*   Lighthouse score no desktop $\ge 95$ e mobile $\ge 85$ em Performance.
*   Carregamento completo da página principal abaixo de $1.2$ segundos.
*   Conformidade de acessibilidade (WCAG AA) nos contrastes cromáticos.
