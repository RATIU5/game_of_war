import Deck from "./Deck";

type State = {
	deck: Deck;
	playerCardCount: number;
	computerCardCount: number;
};

const TOP_FIVE = 5;
export function runGame(state: State, setupFn: () => void, clickFn: (nthCard: number) => void) {
	const playerCardsContainer = document.getElementById("player_cards");
	if (!playerCardsContainer) {
		console.error("The HTML was modified and the player cards container was not found");
		return;
	}

	setupFn();

	function renderPlayerCards() {
		for (let i = 0; i < TOP_FIVE; i++) {
			const cardIndex = state.deck.getNthIndexByOwner(i, 0);

			if (cardIndex === undefined) {
				console.error("Cannot render player cards, card index is undefined");
				return;
			}
			const element = document.querySelector(`#player_card_${i + 1}`) as HTMLDivElement;
			const image = element.querySelector("img") as HTMLImageElement;
			if (!image) {
				console.error("Cannot render player cards, image is undefined");
				return;
			}
			image.src = `img/${state.deck.cardAt(cardIndex).getRank()}_of_${state.deck
				.cardAt(cardIndex)
				.getSuit()}.png`;
		}
	}

	renderPlayerCards();

	let isMovingCard = false;
	playerCardsContainer.addEventListener("click", (e) => {
		if (isMovingCard) {
			return;
		}
		if ((e.target as HTMLDivElement).classList.contains("card")) {
			isMovingCard = true;
			const oppCardImg = state.deck.cardAt(state.deck.getNthIndexByOwner(1, 1)).getImage();

			const tableUserCard = document.getElementById("card_player_table") as HTMLDivElement;
			const cardElement = e.target as HTMLDivElement;
			const userCardBox = cardElement.getBoundingClientRect();
			const tableUserCardBox = tableUserCard.getBoundingClientRect();
			const nthCard = parseInt(cardElement.id.slice(-1));

			// Can't figure out why this needs to be in a setTimeout
			// without it, the next card is animated in
			setTimeout(() => {
				clickFn(nthCard);
				renderPlayerCards();
			}, 200);

			tableUserCard.style.transform = `translate(calc(${
				userCardBox.right - tableUserCardBox.right + 5
			}px - 0.25rem), calc(${userCardBox.top - tableUserCardBox.top}px + 0.1rem))`;
			(tableUserCard.firstChild as HTMLImageElement).src = (
				cardElement.firstChild as HTMLImageElement
			).src;

			const oppCard = document.getElementById("opp_card") as HTMLDivElement;
			const tableOppCard = document.getElementById("card_opponent_table") as HTMLDivElement;
			const oppCardBox = oppCard.getBoundingClientRect();
			const tableOppCardBox = tableOppCard.getBoundingClientRect();

			// Ensure the invisible cards are in the same position as the visible cards
			tableOppCard.style.transform = `translate(calc(${
				oppCardBox.right - tableOppCardBox.right + 5
			}px - 0.25rem), calc(${oppCardBox.top - tableOppCardBox.top}px + 0.1rem))`;
			(tableOppCard.firstChild as HTMLImageElement).src = (
				cardElement.firstChild as HTMLImageElement
			).src;

			// Delicate code, may be messy but it works
			// Don't touch it, it runs the animations of the cards moving
			setTimeout(() => {
				tableUserCard.classList.remove("hidden");
				tableUserCard.style.transform = "translate(0, 0)";

				tableOppCard.classList.remove("hidden");
				tableOppCard.style.transform = "translate(0, 0)";

				(tableUserCard.firstElementChild as HTMLImageElement).src = (
					cardElement.firstElementChild as HTMLImageElement
				).src;

				(tableOppCard.firstElementChild as HTMLImageElement).src = oppCardImg;

				tableUserCard.classList.add("transition");
				tableOppCard.classList.add("transition");

				setTimeout(() => {
					setTimeout(() => {
						tableUserCard.style.transform = "translate(1000px, 0)";
						tableUserCard.classList.add("hidden");

						tableOppCard.style.transform = "translate(1000px, 0)";
						tableOppCard.classList.add("hidden");

						document.getElementById(
							"score",
						)!.innerHTML = `User: ${state.playerCardCount} Computer: ${state.computerCardCount}`;

						setTimeout(() => {
							tableUserCard.style.transform = "translate(0, 0)";
							tableOppCard.style.transform = "translate(0, 0)";
							isMovingCard = false;
						}, 200);
					}, 200);
				}, 800);
			}, 100);
		}
	});
}
