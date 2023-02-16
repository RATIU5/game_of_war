import Deck from "./Deck";
import { runGame } from "./lib";
import "./style.css";

const state = {
	deck: new Deck(["player", "computer", "table"]),
	playerCardCount: 25,
	computerCardCount: 25,
};

function setup() {
	state.deck.shuffle();
	state.deck.deal([
		{ ownerIndex: 0, count: 26 }, // player
		{ ownerIndex: 1, count: 26 }, // computer
	]);
}

function playCards(playerNthCard: number, computerNthCard: number) {
	const pIndex = state.deck.getNthIndexByOwner(playerNthCard, 0);
	const cIndex = state.deck.getNthIndexByOwner(computerNthCard, 1);
	if (pIndex === -1 || cIndex === -1) {
		console.error(`Cannot find card at index ${pIndex} or ${cIndex}`);
		return;
	}

	console.log(`Player plays ${state.deck.cardAt(pIndex).toString()}`);

	if (state.deck.cardAt(pIndex).isHigherThan(state.deck.cardAt(cIndex))) {
		moveTableCards(0);
		state.deck.cardAt(cIndex).setOwnerIndex(0);
		if (cIndex > pIndex) {
			state.deck.moveToEnd(cIndex);
			state.deck.moveToEnd(pIndex);
		} else {
			state.deck.moveToEnd(pIndex);
			state.deck.moveToEnd(cIndex);
		}
		state.playerCardCount = state.deck.getAllCardsByOwner(0).length;
	} else if (state.deck.cardAt(pIndex).isLowerThan(state.deck.cardAt(cIndex))) {
		moveTableCards(1);
		state.deck.cardAt(pIndex).setOwnerIndex(1);
		if (cIndex > pIndex) {
			state.deck.moveToEnd(cIndex);
			state.deck.moveToEnd(pIndex);
		} else {
			state.deck.moveToEnd(pIndex);
			state.deck.moveToEnd(cIndex);
		}
		state.computerCardCount = state.deck.getAllCardsByOwner(1).length;
	} else {
		state.deck.cardAt(pIndex).setOwnerIndex(2);
		state.deck.cardAt(cIndex).setOwnerIndex(2);
		playCards(playerNthCard + 1, computerNthCard + 1);
	}
}

function moveTableCards(ownerIndex: number) {
	return state.deck.getAllCardsByOwner(2).forEach((card) => {
		card.setOwnerIndex(ownerIndex);
	});
}

function onCardClick(nthCard: number) {
	const computerCardIndex = state.deck.getNthIndexByOwner(0, 1);
	if (computerCardIndex === -1) {
		console.error("Computer has no cards");
		return;
	}
	playCards(nthCard, 1);
}

runGame(state, setup, onCardClick);
