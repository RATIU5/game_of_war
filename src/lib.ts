const SUITS = ["Clubs", "Diamonds", "Hearts", "Spades"] as const;
const RANKS = [
	"2",
	"3",
	"4",
	"5",
	"6",
	"7",
	"8",
	"9",
	"10",
	"Jack",
	"Queen",
	"King",
	"Ace",
] as const;

type Suit = typeof SUITS[number];
type Rank = typeof RANKS[number];

type Card = {
	suit: Suit;
	rank: Rank;
};

class Deck {
	cards: Array<Card>;

	constructor() {
		this.cards = [];
		for (const suit of SUITS) {
			for (const rank of RANKS) {
				this.cards.push({
					suit,
					rank,
				});
			}
		}

		this.shuffle();
	}

	shuffle() {
		for (let i = this.cards.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
		}
	}

	deal(amount = 1): Card[] {
		if (amount > this.cards.length) {
			console.error("Not enough cards in the deck.");
			return [];
		} else if (amount < 1) {
			console.error("You must deal at least one card.");
			return [];
		}

		const dealtCards: Card[] = [];
		for (let i = 0; i < amount; i++) {
			const card = this.cards.pop();

			if (card !== undefined) {
				dealtCards.push(card);
			}
		}

		return dealtCards;
	}
}

class Player {
	name: string;
	private hand: Array<Card>;

	constructor(name: string) {
		this.name = name;
		this.hand = [];
	}

	takeCards(deck: Deck, n: number) {
		deck.deal(n).forEach((card) => this.hand.push(card));
	}

	playCard() {
		return this.hand.pop();
	}

	topFive() {
		return this.hand.slice(0, 5);
	}
}

class War {
	deck: Deck;
	players: Player[];

	constructor() {
		this.deck = new Deck();
		this.deck.shuffle();
		this.players = [new Player("Player 1"), new Player("Player 2")];

		for (const player of this.players) {
			player.takeCards(this.deck, 26);
		}
	}

	playRound() {
		const cards = [this.players[0].playCard(), this.players[1].playCard()];

		if (cards[0] === undefined || cards[1] === undefined) {
			console.error("One of the players has no cards left.");
			return;
		}

		if (RANKS.indexOf(cards[0].rank) > RANKS.indexOf(cards[1].rank)) {
			this.players[0].hand.unshift(...(cards as Card[]));
		} else if (RANKS.indexOf(cards[0].rank) < RANKS.indexOf(cards[1].rank)) {
			this.players[1].hand.unshift(...(cards as Card[]));
		} else {
			console.log("War!");
		}
	}

	playGame() {
		while (this.players[0].hand.length && this.players[1].hand.length) {
			this.playRound();
		}

		console.log(
			`${this.players[0].hand.length ? this.players[0].name : this.players[1].name} wins!`,
		);
	}
}

export { Deck, Player, War };
