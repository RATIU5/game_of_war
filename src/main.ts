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

function testCards(playerNthCard: number, computerNthCard: number) {
	const pIndex = state.deck.getNthIndexByOwner(playerNthCard, "player");
	const cIndex = state.deck.getNthIndexByOwner(computerNthCard, "computer");
	if (pIndex === -1 || cIndex === -1) {
		console.error(`Cannot find card at index ${pIndex} or ${cIndex}`);
		return;
	}

	const pCard = state.deck.cardAt(pIndex);
	const cCard = state.deck.cardAt(cIndex);

	if (state.deck.cardAt(pIndex).isHigherThan(state.deck.cardAt(cIndex))) {
		console.log(
			`| ${pCard.getRank()} of ${pCard.getSuit()} (${pIndex}) > ${cCard.getRank()} of ${cCard.getSuit()} (${cIndex}) |`,
		);

		state.deck.cardAt(cIndex).setOwner("player");
		state.deck.moveToEnd(cIndex);
		console.log(
			`| ${pCard.getRank()} of ${pCard.getSuit()} (${pIndex}) > ${cCard.getRank()} of ${cCard.getSuit()} (${cIndex}) |`,
		);

		state.deck.moveToEnd(pIndex);
	} else if (state.deck.cardAt(pIndex).isLowerThan(state.deck.cardAt(cIndex))) {
		console.log(
			`| ${pCard.getRank()} of ${pCard.getSuit()} (${pIndex}) < ${cCard.getRank()} of ${cCard.getSuit()} (${cIndex}) |`,
		);

		state.deck.cardAt(pIndex).setOwner("computer");
		state.deck.moveToEnd(pIndex);
		state.deck.moveToEnd(cIndex);
	} else {
		console.log("draw, next cards");
		state.deck.cardAt(pIndex).setOwner("table");
		state.deck.cardAt(cIndex).setOwner("table");
		testCards(playerNthCard + 1, computerNthCard + 1);
	}
}

function onCardClick(nthCard: number) {
	const computerCardIndex = state.deck.cardWithOwnerAt("computer");
	if (computerCardIndex === undefined) {
		console.error("Computer has no cards");
		return;
	}
	testCards(nthCard, 1);
}

runGame(state, setup, onCardClick);
