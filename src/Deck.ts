import Card, { RANKS, SUITS } from "./Card";

class Deck {
	private cards: Card[];

	constructor() {
		this.cards = [];
		for (const suit of SUITS) {
			for (const rank of RANKS) {
				this.cards.push(new Card(rank, suit));
			}
		}
	}

	public cardAt(index: number): Card {
		return this.cards[index];
	}

	public cardWithOwnerAt(owner: string, index: number = 0): number | undefined {
		let count = 0;
		for (let i = 0; i < this.cards.length; i++) {
			if (this.cards[i].getOwner() === owner) {
				if (count === index) {
					return i;
				}
				count++;
			}
		}
		return undefined;
	}

	public getNthIndexByOwner(nth: number, owner: string): number {
		let count = 0;
		for (let i = 0; i < this.cards.length; i++) {
			if (this.cards[i].getOwner() === owner) {
				count++;
				if (count === nth) {
					// console.log(`Found ${owner} at index ${i}, looking for ${nth}`);
					return i;
				}
			}
		}
		return -1;
	}

	public moveToEnd(index: number): void {
		if (index < 0 || index >= this.cards.length) {
			console.error("Cannot move card to end of deck, index out of bounds");
			return;
		}
		const card = this.cards.splice(index, 1);
		this.cards.push(card[0]);
	}

	public shuffle(): void {
		for (let i = this.cards.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
		}
	}

	public deal(hands: Array<{ name: string; count: number }>): void {
		for (let i = 0; i < this.cards.length; i++) {
			const hand = hands[i % hands.length];
			this.cards[i].setOwner(hand.name);
		}
	}
}

export default Deck;
