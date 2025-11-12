import { defineStore } from 'pinia';
import type { Card } from '../types';

// === DADOS BASE DOS CARDS === //
const RAW_CARD_DATA = [
  {
    pairValue: 1,
    nome: 'Cosmos Sentinel, o Guardião Galáctico',
    fundo: 'fundo-1',
    nivel: 5,
    imagem: 'cosmos.jpg',
    alt: 'Cosmos Sentinel, o Guardião Galáctico',
    descricao: 'Forjado no coração de uma nebulosa, este guerreiro cibernético é a personificação da harmonia, usando seu escudo para repelir o caos.',
    atk: 2800,
    def: 2500,
  },
  {
    pairValue: 2,
    nome: 'Nebuladragon, o Ser das Estrelas Eternas',
    fundo: 'fundo-2',
    nivel: 7,
    imagem: 'knight.jpg',
    alt: 'Nebuladragon, o Ser das Estrelas Eternas',
    descricao: 'Uma criatura mítica nascida da fusão de nebulosas. Suas escamas brilham com a luz de sóis distantes e seu sopro pode forjar galáxias.',
    atk: 3200,
    def: 2000,
  },
  {
    pairValue: 3,
    nome: 'Cyberblade Paladin, o Cavaleiro Digital',
    fundo: 'fundo-3',
    nivel: 3,
    imagem: 'cyberblade.jpg',
    alt: 'Cyberblade Paladin, o Cavaleiro Digital',
    descricao: 'Armado com a lendária Cyberblade, este cavaleiro é um protetor jurado dos reinos digitais, defendendo os dados do mainframe universal.',
    atk: 2600,
    def: 2300,
  },
  {
    pairValue: 4,
    nome: 'Mechadragon X, o Destruidor Biomecânico',
    fundo: 'fundo-4',
    nivel: 7,
    imagem: 'mechadragon.jpg',
    alt: 'Mechadragon X, o Destruidor Biomecânico',
    descricao: 'Uma fusão de biologia dracônica e engenharia cibernética. Seus canhões de plasma foram criados para vaporizar asteroides.',
    atk: 3500,
    def: 3000,
  },
  {
    pairValue: 5,
    nome: 'Archmage Stellarion, o Guardião das Estrelas',
    fundo: 'fundo-5',
    nivel: 3,
    imagem: 'magnus.jpg',
    alt: 'Archmage Stellarion, o Guardião das Estrelas',
    descricao: 'Um mago que manipula as forças do cosmos para proteger o equilíbrio, tecendo feitiços poderosos com poeira estelar.',
    atk: 2400,
    def: 2600,
  },
  {
    pairValue: 6,
    nome: 'Aegis Knight, o Guardião do Firmamento',
    fundo: 'fundo-6',
    nivel: 4,
    imagem: 'aegis.jpg',
    alt: 'Aegis Knight, o Guardião do Firmamento',
    descricao: 'Vestindo uma armadura forjada com fragmentos de estrelas, Aegis Knight é um bastião de defesa, capaz de resistir a qualquer ataque.',
    atk: 3000,
    def: 2800,
  },
  {
    pairValue: 7,
    nome: 'Solaris, a Fênix da Chama Eterna',
    fundo: 'fundo-7',
    nivel: 8,
    imagem: 'phoenix.jpg',
    alt: 'Solaris, a Fênix da Chama Eterna',
    descricao: 'Uma fênix imortal renascida do fogo de um sol. Sua chama purifica tudo o que toca e seu grito ecoa pela vastidão do universo.',
    atk: 3800,
    def: 3200,
  },
  {
    pairValue: 8,
    nome: 'Shadowfiend, o Demônio do Vazio',
    fundo: 'fundo-8',
    nivel: 6,
    imagem: 'shadow.jpg',
    alt: 'Shadowfiend, o Demônio do Vazio',
    descricao: 'Uma entidade de pura escuridão que consome a luz. Ele se esconde nas sombras entre as estrelas, esperando o momento de atacar.',
    atk: 3400,
    def: 2900,
  },
];

interface GameState {
  cards: Card[];
  flippedCards: Card[];
  score: number;
  moves: number;
  isGameOver: boolean;
}

export const useGameStore = defineStore('game', {
  state: (): GameState => ({
    cards: [],
    flippedCards: [],
    score: 0,
    moves: 0,
    isGameOver: false,
  }),

  actions: {
    initializeGame() {
      const duplicatedCards = [...RAW_CARD_DATA, ...RAW_CARD_DATA];
      const shuffledCards: Card[] = duplicatedCards
        .map((card, index) => ({
          ...card,
          id: index,
          isFlipped: false,
          isMatched: false,
        }))
        .sort(() => Math.random() - 0.5);

      this.cards = shuffledCards;
      this.flippedCards = [];
      this.score = 0;
      this.moves = 0;
      this.isGameOver = false;
    },

    flipCard(cardId: number) {
      if (this.flippedCards.length >= 2) return;

      const card = this.cards.find(c => c.id === cardId);
      if (card && !card.isFlipped) {
        card.isFlipped = true;
        this.flippedCards.push(card);
      }

      if (this.flippedCards.length === 2) {
        this.moves++;
        setTimeout(() => {
          this.checkForMatch();
        }, 1000);
      }
    },

    checkForMatch() {
      const [card1, card2] = this.flippedCards;

      if (card1.pairValue === card2.pairValue) {
        card1.isMatched = true;
        card2.isMatched = true;
        this.score += 10;
      } else {
        card1.isFlipped = false;
        card2.isFlipped = false;
      }

      this.flippedCards = [];
      this.checkGameOver();
    },

    checkGameOver() {
      if (this.cards.every(card => card.isMatched)) {
        this.isGameOver = true;
      }
    },
  },
});
