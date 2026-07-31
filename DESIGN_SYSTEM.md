# Design System Spec — DPOS

*(A ser populado após a definição da direção de arte e aprovação do planejamento)*

## 1. Princípios de Design
- Estética premium, limpa e moderna.
- Acessibilidade em conformidade com WCAG (contraste, foco teclado).
- Responsividade fluida (Mobile First).

## 2. Tipografia
*   **Títulos Principais (Headings - H1, H2, H3)**:
    *   *Família*: `Founders Grotesk X-Condensed Bold` (ou fallbacks `Antonio`, `Oswald`, `sans-serif-condensed`).
    *   *Estilo*: Caixa Alta (Uppercase), peso `800` / `900`, `letter-spacing: -0.02em` ou `-0.04em` (compactação extrema), `line-height: 0.8` a `0.9` (títulos empilhados).
*   **Corpo de Texto (Body & Parágrafos)**:
    *   *Família*: `DM Sans` (carregada do Google Fonts).
    *   *Estilo*: Regular (`400`) e Medium (`500`), `line-height: 1.5`, `letter-spacing: -0.01em`.
*   **Detalhes, Rótulos, Badges e Código**:
    *   *Família*: Monospace (ex: `Space Mono` ou `JetBrains Mono` ou `monospace`).
    *   *Estilo*: Caixa Alta (Uppercase), `letter-spacing: 0.1em` ou `0.2em` (super espaçada para rotular metadados e tags técnicas).

## 3. Cores
*   **Carbono (Fundo Escuro / Texto em seções claras)**: `#2B2B2B` (ou `#121413` para preto profundo).
*   **Off-White (Texto em seções escuras / Fundo Claro)**: `#F2F2F2`.
*   **Verde-Lima (Destaque Tecnológico / Botões / CTAs)**: `#C7F032`.
*   **Lavanda (Destaque Filosófico / Seções Especiais)**: `#C8C5E2`.
*   **Menta Claro (Destaque Orgânico / Fundo Suave)**: `#DCE8D9`.
*   **Azul Profundo (Destaque de Contraste Frio)**: `#3B3386`.

## 4. Grid, Espaçamento & Linhas
*   **Divisores**: Bordas e linhas finas horizontais/verticais de `1px` em `#2B2B2B` ou `#F2F2F2` (Neo-Brutalismo / Grade Suíça).
*   **Layout base**: Flexbox e Grid no estilo Bento Grid para disposição de cards.
*   **Padding Interno de Cards**: Variável de acordo com o tamanho do bloco (`2rem` a `4rem`).

## 5. Componentes Globais
*   **Botão Primário**: Fundo `#C7F032` (Verde-Lima), texto `#2B2B2B` em `Founders Grotesk X-Condensed Bold` ou `DM Sans Bold`, borda `1px solid #2B2B2B`. Efeito hover com deslocamento (offset shadow) ou mudança de escala suave.
*   **Cards de Projeto/Serviços**: Borda fina de `1px`, fundos variando entre as cores da paleta, contendo títulos em caixa alta e descrição em `DM Sans`. Monospace para o número do item (ex: `01`, `02`).
