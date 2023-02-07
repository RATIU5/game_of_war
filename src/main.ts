import Card, { RANKS, SUITS } from "./Card";
import Pile from "./Pile";
import "./style.css";

function createDeck() {
	const cards = [];
	for (const suit of SUITS) {
		for (const rank of RANKS) {
			cards.push(new Card(rank, suit));
		}
	}
	return new Pile(cards);
}

function dealCards(deck: Pile, player: Pile, computer: Pile) {
	const cardCount = SUITS.length * RANKS.length;
	for (let i = 0; i < cardCount; i++) {
		const card = deck.cardAt(i);
		if (i % 2 === 0) {
			deck.moveCard(card, player);
		} else {
			deck.moveCard(card, computer);
		}
	}
}

const deck = createDeck();
const player = new Pile([]);
const computer = new Pile([]);
dealCards(deck, player, computer);

document.getElementById("playerHand")?.addEventListener("click", (e) => {});

document.getElementById("startButton")?.addEventListener("click", () => {});

//  Have move function to move cards from deck to deck. Card can only be in one deck at a time. Starting deck, player deck, computer deck, pile deck. Instead of deck, rename to pile of cards.
