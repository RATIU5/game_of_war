import Card from "./Card";

class Pile {
	private cards: Card[];

	constructor(cards: Card[]) {
		this.cards = cards;
	}

	public moveCard(card: Card, pile: Pile) {
		pile.addCard(card);
		this.cards = this.cards.filter((c) => c !== card);
	}

	public addCard(card: Card) {
		this.cards.push(card);
	}

	public cardAt(index: number) {
		return this.cards[index];
	}
}

export default Pile;
