import { defineStore } from 'pinia';
import type { Card } from '@/types';

const RAW_CARD_DATA: Omit<Card, 'id' | 'isFlipped' | 'isMatched'>[] = [
  {
    pairValue: 1,
    nome: 'Cosmos Sentinel, o Guardião Galáctico',
    fundo: 'fundo-1',
    nivel: 5,
    imagem: 'cosmos.jpg',
    alt: 'Cosmos Sentinel, o Guardião Galáctico',
    descricao:
      'Forjado no coração de uma nebulosa, este guerreiro cibernético é a personificação da harmonia, usando seu escudo para repelir o caos.',
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
    descricao:
      'Uma criatura mítica nascida da fusão de nebulosas. Suas escamas brilham com a luz de sóis distantes e seu sopro pode forjar galáxias.',
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
    descricao:
      'Armado com a lendária Cyberblade, este cavaleiro é um protetor jurado dos reinos digitais, defendendo os dados do mainframe universal.',
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
    descricao:
      'Uma fusão de biologia dracônica e engenharia cibernética. Seus canhões de plasma foram criados para vaporizar asteroides.',
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
    descricao:
      'Um mago que manipula as forças do cosmos para proteger o equilíbrio, tecendo feitiços poderosos com poeira estelar.',
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
    descricao:
      'Vestindo uma armadura forjada com fragmentos de estrelas, Aegis Knight é um bastião de defesa, capaz de resistir a qualquer ataque.',
    atk: 3000,
    def: 2800,
  },
];

interface GameState {
  cards: Card[];
  uniqueCards: Card[];
  flippedCards: Card[];
  score: number;
  moves: number;
  isGameOver: boolean;
}

export const useGameStore = defineStore('game', {
  state: (): GameState => ({
    cards: [],
    uniqueCards: [],
    flippedCards: [],
    score: 0,
    moves: 0,
    isGameOver: false,
  }),

  actions: {
    initializeGame() {
      this.uniqueCards = RAW_CARD_DATA.map(
        (card, index): Card => ({
          ...card,
          id: index,
          isFlipped: true,
          isMatched: false,
        })
      );

      const duplicatedCards = [...this.uniqueCards, ...this.uniqueCards];

      const shuffledCards = duplicatedCards
        .map(
          (card, index): Card => ({
            ...card,
            id: index,
            isFlipped: false,
            isMatched: false,
          })
        )
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
      if (card && !card.isFlipped && !card.isMatched) {
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

      if (!card1 || !card2) return;

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
      if (this.cards.length > 0 && this.cards.every(card => card.isMatched)) {
        this.isGameOver = true;
      }
    },
  },
});
