import { defineStore } from 'pinia';

// === DADOS BASE DOS CARDS === //
const RAW_CARD_DATA = [
  {
    pairValue: 1,
    nome: 'Cosmos Sentinel, o Guardião Galáctico',
    fundo: 'fundo-1',
    nivel: 5,
    imagem: 'cosmos.jpg',
    alt: 'Cosmos Sentinel, o Guardião Galáctico',
    descricao: 'Este imponente guerreiro cibernético é a personificação da harmonia...',
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
    descricao: 'Uma criatura mítica nascida da fusão de nebulosas e energia estelar...',
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
    descricao: 'Armado com a lendária Cyberblade, este cavaleiro cibernético é um protetor...',
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
    descricao: 'Uma fusão mortal de biologia dracônica e engenharia cibernética...',
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
    descricao: 'Um mago enigmático que manipula as forças do cosmos para proteger o equilíbrio...',
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
    descricao: 'Vestindo uma armadura forjada com fragmentos de estrelas, Aegis Knight...',
    atk: 3000,
    def: 2800,
  },
  {
    pairValue: 7,
    nome: 'Stormbringer Dragon, o Arauto das Tempestades',
    fundo: 'fundo-7',
    nivel: 5,
    imagem: 'stormbriger.jpg',
    alt: 'Stormbringer Dragon, o Arauto das Tempestades',
    descricao: 'Este poderoso dragão domina os céus, invocando trovões e relâmpagos...',
    atk: 2900,
    def: 2100,
  },
];

// === FUNÇÃO DE EMBARALHAR === //
const shuffleArray = (array: any[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

// === PINIA STORE === //
export const useGameStore = defineStore('game', {
  state: () => ({
    cards: [] as any[],
    flipCardIds: [] as number[],
    score: 0,
    isGameActive: false,
    moves: 0,
    currentCardIndex: 0,
  }),

  getters: {
    canFlipCard: (state) => state.flipCardIds.length < 2 && state.isGameActive,

    isGameOver: (state) =>
      state.cards.length > 0 && state.cards.every((c) => c.isMatched),

    // Card atual (para o SliderNavigator)
    currentCard(state) {
      const card = state.cards[state.currentCardIndex];
      if (!card) return null;

      const contentUrl = `${import.meta.env.BASE_URL}images/${card.imagem}`;

      return {
        ...card,
        cardId: card.id,
        cardState: card.isFlipped
          ? 'flipped'
          : card.isMatched
          ? 'matched'
          : 'default',
        contentUrl,
      };
    },
  },

  actions: {
    initializeGame() {
      this.isGameActive = false;
      this.flipCardIds = [];
      this.score = 0;
      this.moves = 0;
      this.currentCardIndex = 0;

      let baseCards: any[] = [];
      let uniqueIdCounter = 0;

      RAW_CARD_DATA.forEach((data) => {
        for (let i = 0; i < 2; i++) {
          baseCards.push({
            id: uniqueIdCounter++,
            ...data,
            isFlipped: false,
            isMatched: false,
          });
        }
      });

      this.cards = shuffleArray(baseCards);
      this.isGameActive = true;
    },

    flipCard(cardId: number) {
      if (!this.isGameActive || !this.canFlipCard) return;

      const card = this.cards.find((c) => c.id === cardId);
      if (!card || card.isFlipped || card.isMatched) return;

      card.isFlipped = true;
      this.flipCardIds.push(cardId);

      if (this.flipCardIds.length === 2) {
        this.moves++;
        setTimeout(() => this.checkForMatch(), 1000);
      }
    },

    checkForMatch() {
      const [id1, id2] = this.flipCardIds;
      const card1 = this.cards.find((c) => c.id === id1);
      const card2 = this.cards.find((c) => c.id === id2);

      if (card1 && card2 && card1.pairValue === card2.pairValue) {
        card1.isMatched = true;
        card2.isMatched = true;
        this.score += 10;
      } else {
        if (card1) card1.isFlipped = false;
        if (card2) card2.isFlipped = false;
      }

      this.flipCardIds = [];

      if (this.isGameOver) {
        this.isGameActive = false;
        alert(`Fim de Jogo! Pontuação: ${this.score}. Movimentos: ${this.moves}.`);
      }
    },

    // === SLIDER CONTROLES === //
    nextCard() {
      if (this.cards.length === 0) return;
      this.currentCardIndex =
        this.currentCardIndex < this.cards.length - 1
          ? this.currentCardIndex + 1
          : 0;
    },

    previousCard() {
      if (this.cards.length === 0) return;
      this.currentCardIndex =
        this.currentCardIndex > 0
          ? this.currentCardIndex - 1
          : this.cards.length - 1;
    },
  },
});
