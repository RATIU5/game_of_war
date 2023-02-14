import Card from "./Card";
import createSignal from "./Signal";

class Pile {
	private cards: ReturnType<typeof createSignal<Card[]>>;

	constructor() {
		this.cards = createSignal([] as Card[]);
	}

	public moveCard(cardIndex: number, pile: Pile) {
		const card = this.cardAt(cardIndex);
		pile.addCard(card);
		this.removeCard(card);
	}

	public shuffle() {
		for (let i = this.cards.get().length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[this.cards.get()[i], this.cards.get()[j]] = [this.cards.get()[j], this.cards.get()[i]];
		}
	}

	public addCard(card: Card) {
		this.cards.set([...this.cards.get(), card]);
	}

	private removeCard(card: Card) {
		this.cards.set(this.cards.get().filter((c) => c !== card));
	}

	public addCards(cards: Card[]) {
		this.cards.set([...this.cards.get(), ...cards]);
	}

	public cardAt(index: number) {
		return this.cards.get()[index];
	}

	public cardCount() {
		return this.cards.get().length;
	}

	public printCards() {
		for (const card of this.cards.get()) {
			console.log(card);
		}
	}

	public getCards() {
		return this.cards.get();
	}

	public getSignal() {
		return this.cards;
	}
}

export default Pile;
