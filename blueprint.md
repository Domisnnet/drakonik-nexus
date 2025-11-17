# Blueprint: Drakonik Nexus

## Visão Geral

Drakonik Nexus é um jogo da memória interativo construído como uma Single-Page Application (SPA) usando Vue.js. O projeto foi desenvolvido com foco em performance, design moderno e uma experiência de usuário engajante. O objetivo do jogo é combinar todos os pares de cartas de dragões cibernéticos dentro de um tempo limite, testando a memória e a agilidade do jogador.

## Estrutura e Estilo

- **Framework**: Vue.js com `<script setup>` (Composition API).
- **Build Tool**: Vite.
- **Linguagem**: TypeScript.
- **Estilização**: Tailwind CSS para uma abordagem utility-first, com design responsivo e foco em dispositivos móveis. Os estilos são `scoped` por componente para garantir o encapsulamento.
- **Design**: Moderno e arrojado, com tema de fantasia científica, ícones interativos, texturas, sombras e uma paleta de cores vibrante para criar uma experiência imersiva.
- **Roteamento**: `vue-router` para navegação entre a tela inicial e a tela de jogo.
- **Gerenciamento de Estado**: `pinia` para um controle centralizado e reativo do estado do jogo (cartas, pontuação, movimentos, tempo).
- **Qualidade de Código**: ESLint e Prettier para linting e formatação.

## Funcionalidades Implementadas

- **Tela Inicial Imersiva**: Uma landing page com música de fundo, design impactante e um botão para iniciar o jogo.
- **Mecânica de Jogo da Memória**:
  - O tabuleiro de jogo embaralha e exibe 12 cartas (6 pares únicos).
  - O jogador pode virar duas cartas por vez.
  - Se as cartas formam um par, elas permanecem viradas e a pontuação aumenta.
  - Se não formam um par, elas são viradas de volta após um breve intervalo.
- **Painel de Status**: Exibe a pontuação, o número de movimentos e o tempo restante em tempo real.
- **Cronômetro Regressivo com Alerta**: 
  - Um cronômetro de 2 minutos inicia na primeira jogada.
  - **Nos últimos 30 segundos, o cronômetro fica vermelho e pulsa para criar um senso de urgência.**
  - Se o tempo acabar, o jogo termina.
- **Fim de Jogo Centralizado**: 
  - Modais de tela cheia consistentes para condições de vitória ou tempo esgotado.
  - A lógica de exibição é centralizada em `GameView.vue` para evitar conflitos de interface.
- **Controles de Jogo**: Botões para "Reiniciar" o jogo ou voltar para a "Início".

---

## Plano de Desenvolvimento (Última Modificação)

**Objetivo:** Adicionar um feedback visual de urgência no cronômetro durante os 30 segundos finais.

**Passos Concluídos:**

1.  **Estilização Condicional em `GameView.vue`**:
    - Foi adicionada uma diretiva `:class` ao elemento de parágrafo que exibe o tempo no painel de status.
    - Esta diretiva aplica condicionalmente as classes do Tailwind CSS `text-red-500` e `animate-pulse`.
    - A condição para ativar o estilo de alerta é quando o tempo restante (`gameStore.remainingTime`) é menor ou igual a 30 segundos e maior que zero.
    - Isso cria um efeito visual que aumenta a tensão e a interatividade nos momentos finais do jogo.

2.  **Atualização do `blueprint.md`**:
    - O documento foi atualizado para incluir o "Cronômetro Regressivo com Alerta" na lista de funcionalidades implementadas, descrevendo o novo comportamento.
