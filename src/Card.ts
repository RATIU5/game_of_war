export const SUITS = ["Clubs", "Diamonds", "Hearts", "Spades"] as const;
export const RANKS = [
	"2",
	"3",
	"4",
	"5",
	"6",
	"7",
	"8",
	"9",
	"10",
	"Jack",
	"Queen",
	"King",
	"Ace",
] as const;

type Suit = typeof SUITS[number];
type Rank = typeof RANKS[number];

class Card {
	private readonly rank: Rank;
	private readonly suit: Suit;

	constructor(public rankValue: Rank, public suitValue: Suit) {
		this.rank = rankValue;
		this.suit = suitValue;
	}

	public getRank() {
		return this.rank;
	}

	public getSuit() {
		return this.suit;
	}

	public getImage() {
		return `/img/${this.rank.toLowerCase()}_of_${this.suit.toLowerCase()}.png`;
	}

	public isHigherThan(card: Card) {
		return RANKS.indexOf(this.rank) > RANKS.indexOf(card.getRank());
	}

	public isLowerThan(card: Card) {
		return RANKS.indexOf(this.rank) < RANKS.indexOf(card.getRank());
	}

	public isEqualTo(card: Card) {
		return RANKS.indexOf(this.rank) === RANKS.indexOf(card.getRank());
	}

	public toString() {
		return `${this.rank} of ${this.suit}`;
	}
}

export default Card;
