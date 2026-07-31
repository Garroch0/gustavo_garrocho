# Registro de Decisões de Arquitetura e Produto (ADR) — DPOS

Este documento registra as decisões significativas tomadas durante o ciclo de desenvolvimento do produto, detalhando o contexto e as justificativas.

---

## [D001] — Inicialização do Processo DPOS
- **Data**: 2026-07-30
- **Status**: Aprovado
- **Contexto**: O usuário solicitou a atuação como um Sistema Operacional para criação de produtos digitais (DPOS).
- **Decisão**: Inicialização da Fase 1 (Discovery) e criação da estrutura de controle e rastreamento local (PROJECT.md, ROADMAP.md, DECISIONS.md, TASKS.md, DESIGN_SYSTEM.md) para garantir transparência e integridade das decisões.
- **Impacto**: Garante que o projeto siga rigorosamente o fluxo planejado (Discovery -> Pesquisa -> Planejamento -> Stack -> Desenvolvimento -> QA -> Entrega).

---

## [D002] — Seleção da Stack Tecnológica
- **Data**: 2026-07-30
- **Status**: Proposta
- **Contexto**: Necessidade de performance extrema (para anúncios tráfego pago), SEO impecável, animações GSAP avançadas e custo zero de infraestrutura.
- **Decisão**: Utilização de **HTML5 Semântico, CSS3 estruturado com variáveis nativas, JavaScript Vanilla modular (ES6+) e GSAP via CDN**.
- **Justificativa**: 
  1. *Performance*: Zero tempo de hidratação e bundle JS reduzido ao mínimo, garantindo pontuação $100/100$ nos Core Web Vitals.
  2. *GSAP Nativo*: Integração sem fricção do GreenSock ScrollTrigger direto com o DOM, sem problemas de re-renderizações indesejadas de frameworks.
  3. *Manutenção & Longevidade*: Stack que não sofre com quebras de atualizações de bibliotecas (*dependency hell*), garantindo vida útil longa ao código.
  4. *Custo*: Deploy estático gratuito via Vercel/Netlify com CDN global e HTTPS ativo.
- **Alternativas Consideradas**: React/Vite (descartado pelo overhead de JS para página única) e Astro (descartado por não haver necessidade de templates dinâmicos nesta fase inicial de LP única, embora seja o caminho de transição para a Fase 2/3).

---

## [D003] — Incorporação da Copy e Layout Temporários (Site Antigo)
- **Data**: 2026-07-30
- **Status**: Revertido (Desfeito por solicitação do usuário)
- **Contexto**: O usuário enviou a imagem do seu antigo site e solicitou a inserção da copy e estrutura da versão anterior temporariamente, mas posteriormente optou por reverter essa alteração.
- **Decisão**: Reversão completa de index.html, main.css e animations.js para o estado de Planejamento Original Aprovado na Fase 3.
- **Impacto**: O projeto retorna ao design minimalista suíço premium original, mantendo a coerência estratégica.
- **Riscos & Mitigações**: Nenhum. O site volta a exibir os 5 blocos originais (Hero, Método, Projetos, Bento Serviços, CTA).

---

## [D004] — Integração de Efeitos de Animação Premium (Estilo Made with GSAP)
- **Data**: 2026-07-30
- **Status**: Revertido (Desfeito por solicitação do usuário)
- **Contexto**: O usuário solicitou a análise do site madewithgsap.com e a aplicação de animações e efeitos baseados na referência, mas posteriormente optou por reverter.
- **Decisão**: Reversão completa de index.html, main.css e animations.js para o estado de Planejamento Original Aprovado limpo de efeitos de cursor, scroll-shift, text-splitting e Lenis.
- **Impacto**: O projeto retorna à sua estrutura de código estática minimalista de alta performance original.
- **Riscos & Mitigações**: Nenhum. O site volta a rodar de forma limpa e nativa.

---

## [D008] — Smooth Scroll Nativo (60fps), Otimização SEO & Dados Estruturados Schema.org
- **Data**: 2026-07-31
- **Status**: Aprovado
- **Contexto**: O usuário solicitou a aplicação de navegação "Smooth Scroll" e auditoria técnica completa de SEO, velocidade de carregamento e boas práticas de versionamento final.
- **Decisão**: 
  1. *Smooth Scroll Otimizado*: Implementada rolagem física fluida em CSS (`scroll-behavior: smooth` com `scroll-padding-top: 80px`) e escuta JS acelerada via `requestAnimationFrame` em `app.js`.
  2. *SEO & Schema.org (JSON-LD)*: Injetados dados estruturados do profissional Gustavo Garrocho no `<head>` do [index.html](file:///Users/gustavogarrocho/Documents/Trabalho/Site%20Pessoal/index.html), com tags `canonical`, `theme-color`, OpenGraph, Twitter Cards e meta-descrições enriquecidas.
  3. *Velocidade & Core Web Vitals*: Adicionadas pré-conexões `dns-prefetch` e `preconnect` para Google Fonts e CDNs do Behance, além de atributos de otimização de imagem (`loading` e `decoding`).

---

## [D007] — Efeito de Seleção de Texto, Favicon Oficial GG. e Inversão Cromática de Serviços
- **Data**: 2026-07-30
- **Status**: Aprovado
- **Contexto**: O usuário forneceu referências visuais para o highlight de seleção de texto (imagem 1) e favicon oficial (imagem 2), solicitando também a inversão de cores nos cards de serviços.
- **Decisão**: 
  1. *Efeito de Seleção de Texto (::selection)*: Configurado destaque de fundo em Verde-Lima (`#C7F032`) e texto em Carbono Escuro (`#121413`) ao selecionar qualquer texto com o cursor (fidelidade total à imagem 1).
  2. *Favicon Oficial (GG.)*: Criado o arquivo [favicon.svg](file:///Users/gustavogarrocho/Documents/Trabalho/Site%20Pessoal/favicon.svg) com o monograma "GG." em Off-White com ponto em Verde-Lima sobre fundo escuro.
  3. *Inversão Cromática de Serviços*: Card 1 (Identidade Visual) inicia invertido em Verde-Lima e transiciona para escuro no hover; Cards 2 a 6 iniciam padronizados em escuro e invertem para Verde-Lima no hover.


---

## [D006] — Refinamento de Etapas, Restrição Cromática (3 Cores), Gestão de Tráfego e Smart Header
- **Data**: 2026-07-30
- **Status**: Aprovado
- **Contexto**: O usuário forneceu 3 imagens de especificação para atualizar os textos de etapas, paleta de serviços e estrutura de desenvolvimento.
- **Decisão**: 
  1. *Etapas do Projeto*: Aumento da altura vertical dos cards (`min-height: 420px`) com a transcrição textual exata do slide 2 de orçamento (Análise, Onboarding, Criação, Apresentação, Entrega).
  2. *Seção de Serviços (Máximo 3 Cores)*: Aplicação estrita das 3 cores principais (Carbono Escuro `#121413`, Off-White `#F2F2F2` e Verde-Lima `#C7F032`).
  3. *Gestão de Tráfego (Meta Ads)*: Substituição de Naming por Gestão de Tráfego no Bento Grid de serviços com descrição de atração e conversão de público-alvo.
  4. *Estratégia de Marca*: Integração das 3 etapas (Investigação, Estratégia e Universo Verbal) combinada à Identidade Visual.
  5. *Smart Header*: Ocultamento automático do menu ao rolar para baixo e reexibição ao rolar para cima (`scroll up`).


---

## [D005] — Diretriz de Comunicação: Clareza Acessível, Humor Sutil e Design Não-Caricato
- **Data**: 2026-07-30
- **Status**: Aprovado
- **Contexto**: O usuário estabeleceu diretrizes claras para a linguagem e expressão da marca.
- **Decisão**: 
  1. *Comunicação Acessível*: Traduzir pensamentos e análises estruturais complexas em mensagens extremamente simples, diretas e compreensíveis para o cliente.
  2. *Tom de Voz*: Amigável, maduro e acolhedor, com toques de humor/ironia inteligente quando oportuno.
  3. *Concepção de Design*: Criar marcas adequadas à realidade comercial do cliente, construídas sobre repertórios ricos que evitam clichês e caricaturas do mercado.




