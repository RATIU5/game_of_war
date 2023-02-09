import Card, { RANKS, SUITS } from "./Card";
import Pile from "./Pile";
import "./style.css";

/**
 * Create a new deck of cards
 * @returns the deck's pile
 */
function createDeck() {
	const cards = [];
	for (const suit of SUITS) {
		for (const rank of RANKS) {
			cards.push(new Card(rank, suit));
		}
	}
	const pile = new Pile();
	pile.addCards(cards);

	return pile;
}

/**
 * Given a deck, deal the cards into the given number of hands
 * @param deck the deck to deal from
 * @param count the number of hands to deal
 * @returns an array of hands
 */
function dealCards(deck: Pile, count: number) {
	const chunkSize = Math.ceil(deck.cardCount() / count);
	const chunks: Card[][] = [];
	for (let i = 0; i < count; i++) {
		chunks.push(
			deck
				.getSignal()
				.get()
				.slice(i * chunkSize, (i + 1) * chunkSize),
		);
	}

	return chunks;
}

const deck = createDeck();
deck.shuffle();
const [playerHand, computerHand] = dealCards(deck, 2);

const playerPile = new Pile();
const computerPile = new Pile();

playerPile.addCards(playerHand);
computerPile.addCards(computerHand);

const playerCard = document.getElementById("player_card");
const playerCardImage = playerCard?.firstElementChild as HTMLImageElement;

playerCardImage.src = playerPile.getCards()[0].getImage();

playerPile.getSignal().subscribe((cards) => {
	playerCardImage.src = cards[0].getImage();
});

playerCard?.classList.remove("hidden");
playerCard?.classList.add("card_input");

let isMovingCard = false;
document.getElementById("player_cards")?.addEventListener("click", (e) => {
	if ((e.target as HTMLDivElement).classList.contains("card") && !isMovingCard) {
		isMovingCard = true;

		const userCard = e.target as HTMLDivElement;
		const tableUserCard = document.getElementById("card_player_table") as HTMLDivElement;
		const userCardBox = userCard.getBoundingClientRect();
		const tableUserCardBox = tableUserCard.getBoundingClientRect();

		tableUserCard.style.transform = `translate(calc(${
			userCardBox.right - tableUserCardBox.right + 5
		}px - 0.25rem), calc(${userCardBox.top - tableUserCardBox.top}px + 0.1rem))`;
		(tableUserCard.firstChild as HTMLImageElement).src = (
			userCard.firstChild as HTMLImageElement
		).src;

		const oppCard = document.getElementById("opp_card") as HTMLDivElement;
		const tableOppCard = document.getElementById("card_opponent_table") as HTMLDivElement;
		const oppCardBox = oppCard.getBoundingClientRect();
		const tableOppCardBox = tableOppCard.getBoundingClientRect();

		tableOppCard.style.transform = `translate(calc(${
			oppCardBox.right - tableOppCardBox.right + 5
		}px - 0.25rem), calc(${oppCardBox.top - tableOppCardBox.top}px + 0.1rem))`;
		(tableOppCard.firstChild as HTMLImageElement).src = (
			userCard.firstChild as HTMLImageElement
		).src;

		setTimeout(() => {
			tableUserCard.classList.remove("hidden");
			tableUserCard.style.transform = "translate(0, 0)";

			tableOppCard.classList.remove("hidden");
			tableOppCard.style.transform = "translate(0, 0)";

			(tableOppCard.firstElementChild as HTMLImageElement).src = (
				userCard.firstElementChild as HTMLImageElement
			).src;

			(tableUserCard.firstElementChild as HTMLImageElement).src = (
				userCard.firstElementChild as HTMLImageElement
			).src;

			tableUserCard.classList.add("transition");

			tableOppCard.classList.add("transition");

			setTimeout(() => {
				setTimeout(() => {
					tableUserCard.style.transform = "translate(1000px, 0)";
					tableUserCard.classList.add("hidden");

					tableOppCard.style.transform = "translate(1000px, 0)";
					tableOppCard.classList.add("hidden");

					setTimeout(() => {
						tableUserCard.style.transform = "translate(0, 0)";
						tableOppCard.style.transform = "translate(0, 0)";
						isMovingCard = false;
					}, 200);
				}, 200);
			}, 500);
		}, 100);
	}
});

// const deck = createDeck();

// deck.shuffle();
// deck.shuffle();

// const playerPile = new Pile();
// const computerPile = new Pile();
// const tablePile = new Pile();
// const [playerCards, computerCards] = dealCards(deck, 2);

// playerPile.getSignal().subscribe((cards) => {
// 	for (let i = 0; i < MAX_SHOWN_CARDS; i++) {
// 		(document.getElementById(`card_${i}`)?.firstChild as HTMLImageElement).src =
// 			cards[i].getImage();
// 	}
// });

// for (let i = 0; i < MAX_SHOWN_CARDS; i++) {
// 	document.getElementById(`card_${i}`)!.addEventListener("click", () => {
// 		playCard(i);
// 	});
// }

// playerPile.addCards(playerCards);
// computerPile.addCards(computerCards);

// document.getElementById("startButton")?.addEventListener("click", () => {
// 	playCard(0);
// });

// /**
//  * Create a new deck of cards
//  * @returns the deck's pile
//  */
// function createDeck() {
// 	const cards = [];
// 	for (const suit of SUITS) {
// 		for (const rank of RANKS) {
// 			cards.push(new Card(rank, suit));
// 		}
// 	}
// 	const pile = new Pile();
// 	pile.addCards(cards);

// 	return pile;
// }

// /**
//  * Given a deck, deal the cards into the given number of hands
//  * @param deck the deck to deal from
//  * @param count the number of hands to deal
//  * @returns an array of hands
//  */
// function dealCards(deck: Pile, count: number) {
// 	const chunkSize = Math.ceil(deck.cardCount() / count);
// 	const chunks: Card[][] = [];
// 	for (let i = 0; i < count; i++) {
// 		chunks.push(
// 			deck
// 				.getSignal()
// 				.get()
// 				.slice(i * chunkSize, (i + 1) * chunkSize),
// 		);
// 	}
// 	console.log(chunks);

// 	return chunks;
// }

// function animateCardOut(card: HTMLDivElement, callback: () => void) {
// 	setTimeout(() => {
// 		card.classList.add("played-card-out");
// 		setTimeout(() => callback(), 50);
// 	}, 800);
// }

// let playingCard = false;
// /**
//  * Given an index, take that index from the player's deck to play against the
//  * first card from the computer's deck
//  * @param i the index of the card to play
//  */
// function playCard(i: number) {
// 	if (i < 0 || i >= playerPile.cardCount()) {
// 		return;
// 	}
// 	if (playingCard) {
// 		return;
// 	}
// 	playingCard = true;
// 	const playerCard = playerPile.cardAt(i);
// 	const computerCard = computerPile.cardAt(0);

// 	// Move the cards to the table
// 	playerPile.moveCard(playerCard, tablePile);
// 	const tableCard = document.getElementById("playerPlayedCard");
// 	(tableCard!.firstChild! as HTMLImageElement).src = playerCard.getImage();
// 	(tableCard! as HTMLDivElement).classList.remove("hidden");
// 	(tableCard! as HTMLDivElement).classList.add("played-card");
// 	computerPile.moveCard(computerCard, tablePile);

// 	// Compare the cards on the table
// 	if (playerCard.isHigherThan(computerCard)) {
// 		// Player wins the round
// 		tablePile.moveCard(playerCard, playerPile);
// 		tablePile.moveCard(computerCard, playerPile);
// 		console.log(
// 			`Player uses ${playerCard.getRank()} of ${playerCard.getSuit()} to beat ${computerCard.getRank()} of ${computerCard.getSuit()}`,
// 		);
// 		console.log(`Player card count: ${playerPile.cardCount()}`);
// 	} else if (playerCard.isLowerThan(computerCard)) {
// 		// Computer wins the round
// 		tablePile.moveCard(playerCard, computerPile);
// 		tablePile.moveCard(computerCard, computerPile);
// 		console.log(
// 			`Computer uses ${computerCard.getRank()} of ${computerCard.getSuit()} to beat ${playerCard.getRank()} of ${playerCard.getSuit()}`,
// 		);
// 		console.log(`Computer card count: ${computerPile.cardCount()}`);
// 	} else {
// 		// Cards are equal
// 		playCard(i + 1);
// 	}

// 	animateCardOut(tableCard! as HTMLDivElement, () => {
// 		(tableCard! as HTMLDivElement).classList.add("hidden");
// 		setTimeout(() => {
// 			(tableCard! as HTMLDivElement).classList.remove("played-card");
// 			(tableCard! as HTMLDivElement).classList.remove("played-card-out");
// 			playingCard = false;
// 		}, 150);
// 	});
// }
