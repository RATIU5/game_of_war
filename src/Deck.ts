import Card, { RANKS, SUITS } from "./Card";

class Deck {
	private cards: Card[];
	private size: number;
	private players: string[];

	constructor(players: string[]) {
		this.cards = [];
		this.size = 0;
		this.players = players;

		for (const suit of SUITS) {
			for (const rank of RANKS) {
				this.cards.push(new Card(rank, suit, -1));
				this.size++;
			}
		}
	}

	public cardAt(index: number): Card {
		return this.cards[index];
	}

	public getNthIndexByOwner(nth: number, ownerIndex: number): number {
		let count = 0;
		const size = this.size;
		for (let i = 0; i < size; i++) {
			if (this.cards[i].getOwnerIndex() === ownerIndex) {
				if (count === nth) {
					return i;
				}
				count++;
			}
		}
		return 0 - 1;
	}

	public getAllCardsByOwner(ownerIndex: number): Card[] {
		const cards: Card[] = [];
		const size = this.size;
		for (let i = 0; i < size; i++) {
			if (this.cards[i].getOwnerIndex() === ownerIndex) {
				cards.push(this.cards[i]);
			}
		}
		return cards;
	}

	public moveToEnd(index: number): void {
		if (index < 0 || index >= this.size) {
			console.error("Cannot move card to end of deck, index out of bounds");
			return;
		}
		const card = this.cards.splice(index, 1);
		this.cards.push(card[0]);
	}

	public shuffle(): void {
		const size = this.size;
		for (let i = size - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
		}
	}

	public deal(hands: Array<{ ownerIndex: number; count: number }>): void {
		let cardIndex = 0;
		for (let i = 0; i < hands.length; i++) {
			for (let j = 0; j < hands[i].count; j++) {
				if (cardIndex >= this.size) {
					console.error("Cannot deal card, deck is empty");
					return;
				}
				this.cards[cardIndex].setOwnerIndex(hands[i].ownerIndex);
				cardIndex++;
			}
		}
	}
}

export default Deck;
