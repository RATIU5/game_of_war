import Card, { RANKS, SUITS } from "./Card";

class Deck {
	private cards: Card[];
	private _size: number;

	constructor(cards?: Card[]) {
		if (typeof cards === "undefined") {
			this.cards = [];
			this._size = 0;
			for (const suit of SUITS) {
				for (const rank of RANKS) {
					this.cards.push(new Card(rank, suit));
					this._size++;
				}
			}
		} else {
			this.cards = cards;
			this._size = cards.length;
		}
	}

	public get size(): number {
		return this._size;
	}

	public cardAtIndex(index: number): Card {
		return this.cards[index];
	}

	public pullCardAtIndex(index: number = 0): Card | null {
		if (index < 0 || index >= this._size) {
			console.error("Cannot pull card, index out of bounds");
			return null;
		}
		const card = this.cards.splice(index, 1);
		this._size--;
		return card[0];
	}

	public pullAllCards(): Card[] {
		const cards = this.cards.splice(0, this._size);
		this._size = 0;
		return cards;
	}

	public pushCard(card: Card): void {
		this.cards.push(card);
		this._size++;
	}

	public pushCards(cards: Card[]): void {
		this.cards.push(...cards);
		this._size += cards.length;
	}

	public shuffle(): void {
		const size = this._size;
		for (let i = size - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
		}
	}

	public deal(numCards: number): Card[] {
		if (numCards > this._size) {
			console.warn("Card:deal(): Cannot deal more cards than in deck");
			const cards = this.cards.splice(0, this._size);
			this._size = 0;
			return cards;
		}
		const cards: Card[] = this.cards.splice(0, numCards);
		this._size -= numCards;
		return cards;
	}
}

export default Deck;
