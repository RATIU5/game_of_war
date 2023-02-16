type Suit = typeof SUITS[number];
type Rank = typeof RANKS[number];

class Card {
	private readonly rank: Rank;
	private readonly suit: Suit;

	constructor(rank: Rank, suit: Suit) {
		this.rank = rank;
		this.suit = suit;
	}

	public getRank(): Rank {
		return this.rank;
	}

	public getSuit(): Suit {
		return this.suit;
	}

	public isHigherThan(card: Card): boolean {
		return this.rank > card.getRank();
	}

	public isLowerThan(card: Card): boolean {
		return this.rank < card.getRank();
	}

	public isEqualTo(card: Card): boolean {
		return this.rank === card.getRank();
	}

	public getImage(): string {
		if (this.rank < 11) {
			return `/img/${this.rank}_of_${this.suit}.png`;
		}
		switch (this.rank) {
			case 11:
				return `/img/jack_of_${this.suit}.png`;
			case 12:
				return `/img/queen_of_${this.suit}.png`;
			case 13:
				return `/img/king_of_${this.suit}.png`;
			case 14:
				return `/img/ace_of_${this.suit}.png`;
			default:
				return "";
		}
	}

	public toString(): string {
		return `${this.rank} of ${this.suit}`;
	}
}

export const SUITS = ["clubs", "diamonds", "hearts", "spades"] as const;
export const RANKS = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14] as const;
export default Card;
