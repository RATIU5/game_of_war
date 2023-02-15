import Deck from "./Deck";

type State = {
	deck: Deck;
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
		for (let i = 1; i <= TOP_FIVE; i++) {
			const cardIndex = state.deck.cardWithOwnerAt("player", i);

			if (cardIndex === undefined) {
				console.error("Player has no cards");
				return;
			}
			const element = document.querySelector(`#player_card_${i}`) as HTMLDivElement;
			const image = element.querySelector("img") as HTMLImageElement;
			if (!image) {
				console.error("The HTML was modified and the player card image was not found");
				return;
			}
			image.src = `img/${state.deck.cardAt(cardIndex).getRank()}_of_${state.deck
				.cardAt(cardIndex)
				.getSuit()}.png`;
		}
	}

	renderPlayerCards();

	playerCardsContainer.addEventListener("click", (e) => {
		if ((e.target as HTMLDivElement).classList.contains("card")) {
			const cardElement = e.target as HTMLDivElement;
			const nthCard = parseInt(cardElement.id.slice(-1));
			clickFn(nthCard);
			renderPlayerCards();
			// console.log(state.deck);
		}
	});
}
