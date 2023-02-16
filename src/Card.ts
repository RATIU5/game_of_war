type Suit = typeof SUITS[number];
type Rank = typeof RANKS[number];

class Card {
	private readonly rank: Rank;
	private readonly suit: Suit;
	private ownerIndex: number;

	constructor(rank: Rank, suit: Suit, ownerIndex: number) {
		this.rank = rank;
		this.suit = suit;
		this.ownerIndex = ownerIndex;
	}

	public getRank(): Rank {
		return this.rank;
	}

	public getSuit(): Suit {
		return this.suit;
	}

	public getImage(): string {
		return `/img/${this.rank.toLowerCase()}_of_${this.suit.toLowerCase()}.png`;
	}

	public isHigherThan(card: Card): boolean {
		return RANKS.indexOf(this.rank) > RANKS.indexOf(card.getRank());
	}

	public isLowerThan(card: Card): boolean {
		return RANKS.indexOf(this.rank) < RANKS.indexOf(card.getRank());
	}

	public isEqualTo(card: Card): boolean {
		return RANKS.indexOf(this.rank) === RANKS.indexOf(card.getRank());
	}

	public toString(): string {
		return `${this.rank} of ${this.suit}`;
	}

	public setOwnerIndex(ownerIndex: number): void {
		this.ownerIndex = ownerIndex;
	}

	public getOwnerIndex(): number {
		return this.ownerIndex;
	}
}

export const SUITS = ["clubs", "diamonds", "hearts", "spades"] as const;
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
	"jack",
	"queen",
	"king",
	"ace",
] as const;
export default Card;
