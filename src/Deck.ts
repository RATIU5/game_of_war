import Card, { RANKS, SUITS } from "./Card";

class Deck {
	private cards: Card[];
	private size: number;

	constructor(cards?: Card[]) {
		if (typeof cards === "undefined") {
			this.cards = [];
			this.size = 0;
			for (const suit of SUITS) {
				for (const rank of RANKS) {
					this.cards.push(new Card(rank, suit));
					this.size++;
				}
			}
		} else {
			this.cards = cards;
			this.size = cards.length;
		}
	}

	public cardAtIndex(index: number): Card {
		return this.cards[index];
	}

	public pullCardAtIndex(index: number = 0): Card | null {
		if (index < 0 || index >= this.size) {
			console.error("Cannot pull card, index out of bounds");
			return null;
		}
		const card = this.cards.splice(index, 1);
		this.size--;
		return card[0];
	}

	public pushCard(card: Card): void {
		this.cards.push(card);
		this.size++;
	}

	public shuffle(): void {
		const size = this.size;
		for (let i = size - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
		}
	}

	public deal(numCards: number): Deck {
		if (numCards > this.size) {
			console.warn("Cannot deal more cards than in deck");
			const cards = this.cards.splice(0, this.size);
			this.size = 0;
			return new Deck(cards);
		}
		const cards: Card[] = this.cards.splice(0, numCards);
		this.size -= numCards;
		return new Deck(cards);
	}
}

export default Deck;
