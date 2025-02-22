type GameWithCategory = {
  id: string;
  category: number;
};

type Game = {
  id: string;
  words: Word[];
};

type Word = {
  word: string;
  clue: string;
  row: number;
  col: number;
  direction: string;
};

enum Direction {
  HORIZONTAL = "horizontal",
  VERTICAL = "vertical",
}
const HORIZONTAL = Direction.HORIZONTAL;
const VERTICAL = Direction.VERTICAL;

export { Game, Word, Direction, HORIZONTAL, VERTICAL, GameWithCategory };
