export enum Direction {
  HORIZONTAL = "horizontal",
  VERTICAL = "vertical",
}
export const HORIZONTAL = Direction.HORIZONTAL;
export const VERTICAL = Direction.VERTICAL;

export type Word = {
  word: string;
  clue: string;
  row: number;
  col: number;
  direction: string;
};

// const Game = {
//   words: [
//     {
//       word: "TOALLA",
//       clue: "Sirve para secarte después de lavarte.",
//       row: 1,
//       col: 0,
//       direction: Direction.HORIZONTAL,
//     },
//     {
//       word: "LAVABO",
//       clue: "Lugar donde te lavas las manos.",
//       row: 0,
//       col: 2,
//       direction: Direction.VERTICAL,
//     },
//     {
//       word: "AZULEJOS",
//       clue: "Suelen cubrir las paredes del baño.",
//       row: 3,
//       col: 2,
//       direction: Direction.HORIZONTAL,
//     },
//     {
//       word: "ESPEJO",
//       clue: "Refleja tu imagen cada mañana.",
//       row: 2,
//       col: 9,
//       direction: Direction.VERTICAL,
//     },
//     {
//       word: "JABÓN",
//       clue: "Espumoso y esencial para la higiene.",
//       row: 6,
//       col: 9,
//       direction: Direction.HORIZONTAL,
//     },
//     {
//       word: "GRIFO",
//       clue: "De aquí sale el agua.",
//       row: 7,
//       col: 5,
//       direction: Direction.HORIZONTAL,
//     },
//   ],
// };

// export { Game };
