import Deck from "./Deck";
import { runGame } from "./lib";
import "./style.css";

const state = {
	cardDeck: new Deck(),
	playerDeck: new Deck([]),
	computerDeck: new Deck([]),
	tableDeck: new Deck([]),
	winner: "",
};

function setup() {
	state.cardDeck.shuffle();
	const playerCards = state.cardDeck.deal(26);
	const computerCards = state.cardDeck.deal(26);
	state.playerDeck.pushCards(playerCards);
	state.computerDeck.pushCards(computerCards);
}

function playCards(playerNthCard: number, computerNthCard: number) {
	const playerCard = state.playerDeck.pullCardAtIndex(playerNthCard);
	const computerCard = state.computerDeck.pullCardAtIndex(computerNthCard);

	if (playerCard === null || computerCard === null) {
		console.error("Player or computer has no cards");
		return;
	}

	if (playerCard.isHigherThan(computerCard)) {
		if (state.tableDeck.size > 0) {
			const tableCards = state.tableDeck.pullAllCards();
			state.playerDeck.pushCards(tableCards);
		}
		state.playerDeck.pushCards([playerCard, computerCard]);
		if (state.computerDeck.size === 0) {
			console.log("Player wins!");
			state.winner = "Player";
			return;
		}

		console.log(`Player wins with ${playerCard.toString()} over ${computerCard.toString()}`);
		console.log(state.playerDeck);
	} else if (playerCard.isLowerThan(computerCard)) {
		if (state.tableDeck.size > 0) {
			const tableCards = state.tableDeck.pullAllCards();
			state.computerDeck.pushCards(tableCards);
		}
		state.computerDeck.pushCards([playerCard, computerCard]);
		if (state.playerDeck.size === 0) {
			console.log("Computer wins!");
			state.winner = "Computer";
			return;
		}
		console.log(`Computer wins with ${computerCard.toString()} over ${playerCard.toString()}`);
		console.log(state.computerDeck);
	} else {
		state.tableDeck.pushCards([playerCard, computerCard]);
		console.log("Tie");
		if (state.playerDeck.size === 0 || state.computerDeck.size === 0) {
			console.log("Game over");
			state.winner = "Tie";
			return;
		}
		console.log(state.tableDeck);
	}
}

function onCardClick(nthCard: number) {
	if (state.winner === "") {
		playCards(nthCard, 0);
	}
}

runGame(state, setup, onCardClick);
