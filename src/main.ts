import Deck from "./Deck";
import { runGame } from "./lib";
import "./style.css";

const state = {
	deck: new Deck(),
};

function setup() {
	state.deck.shuffle();
	state.deck.deal([
		{ name: "player", count: 26 },
		{ name: "computer", count: 26 },
	]);
}

function testCards(pCardIndex: number, cCardIndex: number) {
	if (state.deck.cardAt(pCardIndex).isHigherThan(state.deck.cardAt(cCardIndex))) {
		state.deck.cardAt(cCardIndex).setOwner("player");
		state.deck.moveToEnd(cCardIndex);
		state.deck.moveToEnd(pCardIndex);
	} else if (state.deck.cardAt(pCardIndex).isLowerThan(state.deck.cardAt(cCardIndex))) {
		state.deck.cardAt(pCardIndex).setOwner("computer");
		state.deck.moveToEnd(pCardIndex);
		state.deck.moveToEnd(cCardIndex);
	} else {
		state.deck.cardAt(pCardIndex).setOwner("table");
		state.deck.cardAt(cCardIndex).setOwner("table");
		testCards(state.deck.cardWithOwnerAt("player"), state.deck.cardWithOwnerAt("computer")
	}
}

function onCardClick(playerCardIndex: number) {
	let cardsNotEqual = true;
	const computerCardIndex = state.deck.cardWithOwnerAt("computer");
	if (computerCardIndex === undefined) {
		console.error("Computer has no cards");
		return;
	}


}

runGame(state, setup, onCardClick);
