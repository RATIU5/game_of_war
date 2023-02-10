import Card, { RANKS, SUITS } from "./Card";
import Pile from "./Pile";
import "./style.css";

const HAND_SIZE = 5;

const deck = createDeck();
const playerHand = new Pile();
const oppHand = new Pile();
const tablePile = new Pile();

// Deal the cards
deck.shuffle();
const [playerCards, oppCards] = dealCards(deck, 2);
playerHand.addCards(playerCards);
oppHand.addCards(oppCards);

const playerCardsElement = document.getElementById("player_cards") as HTMLDivElement;
playerCardsElement.addEventListener("click", (e) => {
	// if the element clicked has the id of player_card, then
	// find the index of the card in the player's hand
	if (e.target instanceof HTMLDivElement && e.target.id === "player_card") {
		// the playerCardElements array won't change in count, only the image src will
		const index = +e.target.id.slice(-1);

		// Move cards at play to the table pile
		const indexOpp = 0;
		oppHand.moveCard(indexOpp, tablePile);
		playerHand.moveCard(index, tablePile);
		updatePlayerCards();
		updateTableCards();
	}
});

// When a card pile is updated, update the DOM elements
function updatePlayerCards() {
	for (let i = 0; i < HAND_SIZE; i++) {
		const cardElement = document.getElementById(`player_card_${i}`) as HTMLDivElement;
		const cardImage = cardElement.querySelector("img") as HTMLImageElement;
		const card = playerHand.cardAt(i);
		cardImage.src = card.getImage();
	}
}

function updateTableCards() {
	const tableOppCard = document.getElementById("card_opponent_table") as HTMLDivElement;
	const tableOppCardImage = tableOppCard.querySelector("img") as HTMLImageElement;
	const tablePlayerCard = document.getElementById("card_player_table") as HTMLDivElement;
	const tablePlayerCardImage = tablePlayerCard.querySelector("img") as HTMLImageElement;
	tableOppCardImage.src = tablePile.cardAt(0).getImage();
	tablePlayerCardImage.src = tablePile.cardAt(1).getImage();
}

updatePlayerCards();

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

// function updateCardImage(cardElement: HTMLDivElement, card: Card) {
// 	const cardImage = cardElement.firstElementChild as HTMLImageElement;
// 	cardImage.src = card.getImage();
// }

// const deck = createDeck();
// deck.shuffle();
// const [playerHand, computerHand] = dealCards(deck, 2);

// const playerPile = new Pile();
// const computerPile = new Pile();
// const tablePile = new Pile();

// playerPile.addCards(playerHand);
// computerPile.addCards(computerHand);

// const playerCard = document.getElementById("player_card");
// const playerCardImage = playerCard?.firstElementChild as HTMLImageElement;

// playerCardImage.src = playerPile.getCards()[0].getImage();

// playerPile.getSignal().subscribe((cards) => {
// 	playerCardImage.src = cards[0].getImage();
// });

// playerCard?.classList.remove("hidden");
// playerCard?.classList.add("card_input");

// tablePile.getSignal().subscribe((cards) => {
// 	console.log(cards);

// 	updateCardImage(document.getElementById("card_opponent_table") as HTMLDivElement, cards[0]);
// 	updateCardImage(document.getElementById("card_player_table") as HTMLDivElement, cards[1]);
// });

// let isMovingCard = false;
// document.getElementById("player_cards")?.addEventListener("click", (e) => {
// 	if ((e.target as HTMLDivElement).classList.contains("card") && !isMovingCard) {
// 		isMovingCard = true;

// 		playerPile.moveCard(0, tablePile);
// 		computerPile.moveCard(0, tablePile);

// 		const userCard = e.target as HTMLDivElement;
// 		const tableUserCard = document.getElementById("card_player_table") as HTMLDivElement;
// 		const userCardBox = userCard.getBoundingClientRect();
// 		const tableUserCardBox = tableUserCard.getBoundingClientRect();

// 		tableUserCard.style.transform = `translate(calc(${
// 			userCardBox.right - tableUserCardBox.right + 5
// 		}px - 0.25rem), calc(${userCardBox.top - tableUserCardBox.top}px + 0.1rem))`;
// 		(tableUserCard.firstChild as HTMLImageElement).src = (
// 			userCard.firstChild as HTMLImageElement
// 		).src;

// 		const oppCard = document.getElementById("opp_card") as HTMLDivElement;
// 		const tableOppCard = document.getElementById("card_opponent_table") as HTMLDivElement;
// 		const oppCardBox = oppCard.getBoundingClientRect();
// 		const tableOppCardBox = tableOppCard.getBoundingClientRect();

// 		tableOppCard.style.transform = `translate(calc(${
// 			oppCardBox.right - tableOppCardBox.right + 5
// 		}px - 0.25rem), calc(${oppCardBox.top - tableOppCardBox.top}px + 0.1rem))`;
// 		(tableOppCard.firstChild as HTMLImageElement).src = (
// 			userCard.firstChild as HTMLImageElement
// 		).src;

// 		setTimeout(() => {
// 			tableUserCard.classList.remove("hidden");
// 			tableUserCard.style.transform = "translate(0, 0)";

// 			tableOppCard.classList.remove("hidden");
// 			tableOppCard.style.transform = "translate(0, 0)";

// 			(tableUserCard.firstElementChild as HTMLImageElement).src = (
// 				userCard.firstElementChild as HTMLImageElement
// 			).src;

// 			(tableOppCard.firstElementChild as HTMLImageElement).src = computerPile
// 				.getCards()[0]
// 				.getImage();

// 			tableUserCard.classList.add("transition");
// 			tableOppCard.classList.add("transition");

// 			setTimeout(() => {
// 				setTimeout(() => {
// 					tableUserCard.style.transform = "translate(1000px, 0)";
// 					tableUserCard.classList.add("hidden");

// 					tableOppCard.style.transform = "translate(1000px, 0)";
// 					tableOppCard.classList.add("hidden");

// 					setTimeout(() => {
// 						tableUserCard.style.transform = "translate(0, 0)";
// 						tableOppCard.style.transform = "translate(0, 0)";
// 						isMovingCard = false;
// 					}, 200);
// 				}, 200);
// 			}, 500);
// 		}, 100);
// 	}
// });
