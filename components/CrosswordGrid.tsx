import React from "react";
import { useState, useRef, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Keyboard,
  Platform,
} from "react-native";
import { Word, HORIZONTAL, VERTICAL, Game, Direction } from "@/constants/Game";

export type CrosswordGridProps = {
  game: Game;
  startIndex: number;
  updateClue: (clue: string) => void;
  completeGame: () => void;
};

const CrosswordGrid = (props: CrosswordGridProps) => {
  const words = props.game.words;

  /***************************** HOOKS *******************************/
  /**
   * A square grid representing the crossword's solution, where each valid cell
   * is a character. Cells that are not part of the crossword are null.
   */
  const solutionGrid = useMemo(() => {
    return createGrid(words, false);
  }, []);

  /**
   * A square grid representing a map between cells and the word that touch the
   * cell, in the format: mapGrid[i][j] = {horiz: word1|null, vert: word2|null}.
   * Cells that are not part of the crossword are null.
   */
  const mapGrid = useMemo(() => {
    return createMapGrid(words);
  }, []);

  /**
   * The square grid representing the user's game, where each valid cell is
   * initially ''. Cells that are not part of the crossword are null.
   */
  const [userGrid, setUserGrid] = useState(createGrid(words, true));

  // Currently selected cell and direction (horizontal or vertical).
  const [selectedCell, setSelectedCell] = useState({
    row: words[props.startIndex].row,
    col: words[props.startIndex].col,
    dir: words[props.startIndex].direction,
  });

  // Invisible text input, used to trigger the keyboard by focusing on it.
  const textInput = useRef<TextInput>(null);

  /************************** USER ACTIONS ***************************/
  /**
   * Update the user grid with the input value, if valid. On each input,
   * check if the game is complete.
   */
  function onInput(value: string) {
    if (!value.match(/[A-ZÑÁÉÍÓÚÜ]/i) && value !== "Backspace") {
      return;
    }

    const newGrid = userGrid.map((r, rowIndex) =>
      r.map((cell, colIndex) =>
        rowIndex === selectedCell.row && colIndex === selectedCell.col
          ? value === "Backspace"
            ? ""
            : value.toUpperCase()
          : cell
      )
    );
    setUserGrid(newGrid);

    if (isGameCompleteAndCorrect(newGrid)) {
      props.completeGame();
    }

    if (value === "Backspace") {
      moveToPrevCell();
    } else {
      moveToNextCell();
    }
  }

  /**
   * Selects the cell at the given row, col and direction. If direction is
   * not provided, use the direction of the word at the given cell. If the
   * selected cell is an intersection, keep the same direction as before.
   */
  function selectCell(row: number, col: number, dir?: string) {
    let newRow = row;
    let newCol = col;
    let newDir = dir ?? selectedCell.dir;
    const isIntersection = mapGrid[row][col].horiz && mapGrid[row][col].vert;
    const isAlreadySelected =
      selectedCell.row === row && selectedCell.col === col;

    // Focus on the text input to show to keyboard.
    if (!Keyboard.isVisible()) {
      if (Platform.OS === "ios") {
        textInput.current?.focus();
      } else {
        // The timeout and blur() are needed to work correctly in Android.
        setTimeout(() => {
          textInput.current?.blur();
          textInput.current?.focus();
        }, 100);
      }
    }

    // If direction was not provided, compute the new direction.
    if (!dir) {
      // If this cell was already selected and it's an intersection, change the
      // direction.
      if (isAlreadySelected && isIntersection) {
        if (selectedCell.dir === HORIZONTAL) {
          newDir = VERTICAL;
        } else {
          newDir = HORIZONTAL;
        }
      } else {
        // If it's an intersection, keep the same direction. Otherwise, update
        // the direction to match the word at the new cell.
        if (!isIntersection) {
          if (mapGrid[row][col].horiz) {
            newDir = HORIZONTAL;
          } else {
            newDir = VERTICAL;
          }
        }
      }
    }

    // Update the "selected cell" state.
    setSelectedCell({ row: newRow, col: newCol, dir: newDir });

    // Update the clue upstream to match the new selected word.
    props.updateClue(getWordAt(newRow, newCol, newDir)?.clue);
  }

  /*************************** GAME LOGIC ****************************/
  function moveToNextCell() {
    const direction = selectedCell.dir;
    const nextRow =
      direction === HORIZONTAL ? selectedCell.row : selectedCell.row + 1;
    const nextCol =
      direction === HORIZONTAL ? selectedCell.col + 1 : selectedCell.col;

    if (
      nextRow >= userGrid.length ||
      nextCol >= userGrid.length ||
      userGrid[nextRow][nextCol] === null
    ) {
      moveToNextWord();
    } else {
      selectCell(nextRow, nextCol);
    }
  }

  function moveToPrevCell() {
    const direction = selectedCell.dir;
    const prevRow =
      direction === HORIZONTAL ? selectedCell.row : selectedCell.row - 1;
    const prevCol =
      direction === HORIZONTAL ? selectedCell.col - 1 : selectedCell.col;

    if (prevRow < 0 || prevCol < 0 || userGrid[prevRow][prevCol] === null) {
      moveToPrevWord();
    } else {
      selectCell(prevRow, prevCol);
    }
  }

  function moveToNextWord() {
    const selectedWord = getWordAt(selectedCell.row, selectedCell.col);
    const nextWord = findNextUnfilledWord(selectedWord);
    if (nextWord === null) {
      // If all words are filled, stay here.
      return;
    }
    selectCell(nextWord.row, nextWord.col, nextWord.direction);
  }

  function isWordFilled(word: Word) {
    let row = word.row;
    let col = word.col;
    let rowIndex = 0;
    let colIndex = 0;
    const length = word.word.length;
    while (rowIndex < length && colIndex < length) {
      if (userGrid[row + rowIndex][col + colIndex] === "") {
        return false;
      }
      if (word.direction === HORIZONTAL) {
        colIndex++;
      } else {
        rowIndex++;
      }
    }
    return true;
  }

  function findNextUnfilledWord(word: Word) {
    const wordIndex = props.game.words.indexOf(word);
    let index = wordIndex + 1;
    while (index < props.game.words.length) {
      if (!isWordFilled(props.game.words[index])) {
        return props.game.words[index];
      }
      index++;
    }
    index = 0;
    while (index < wordIndex) {
      if (!isWordFilled(props.game.words[index])) {
        return props.game.words[index];
      }
      index++;
    }
    return null;
  }

  function moveToPrevWord() {
    const selectedWord = getWordAt(selectedCell.row, selectedCell.col);
    let indexOfNextWord = props.game.words.indexOf(selectedWord) - 1;
    if (indexOfNextWord < 0) {
      indexOfNextWord = props.game.words.length - 1;
    }
    const nextWord = props.game.words[indexOfNextWord];

    // Go the the end of the word.
    const length = nextWord.word.length;
    if (nextWord.direction === HORIZONTAL) {
      selectCell(nextWord.row, nextWord.col + length - 1, nextWord.direction);
    } else {
      selectCell(nextWord.row + length - 1, nextWord.col, nextWord.direction);
    }
  }

  function getWordAt(row: number, col: number, dir?: string) {
    const requestedDir = dir ?? selectedCell.dir;
    return requestedDir === HORIZONTAL
      ? mapGrid[row][col]?.horiz
      : mapGrid[row][col]?.vert;
  }

  function isGameCompleteAndCorrect(grid: string[][]) {
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid.length; ++j) {
        if (grid[i][j] !== solutionGrid[i][j]) {
          return false;
        }
      }
    }
    return true;
  }

  /************************** UI COMPONENTS ***************************/
  function isCellSelected(row: number, col: number) {
    return selectedCell.row === row && selectedCell.col === col;
  }

  function isCellHighlighted(row: number, col: number) {
    const currentWord = getWordAt(row, col);
    const highlightedWord = getWordAt(selectedCell.row, selectedCell.col);
    return currentWord === highlightedWord;
  }

  const ValidCell = ({
    row,
    col,
    value,
  }: {
    row: number;
    col: number;
    value: string;
  }) => {
    return (
      <View style={styles.cell}>
        <TouchableOpacity
          style={[
            styles.validCell,
            isCellHighlighted(row, col) ? styles.highlightedCell : undefined,
            isCellSelected(row, col) ? styles.selectedCell : undefined,
          ]}
          onPress={() => {
            selectCell(row, col);
          }}
        >
          <Text style={styles.cellContent}>{value}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const InvalidCell = () => {
    return <View style={[styles.cell]} />;
  };

  return (
    <View>
      <TextInput
        ref={textInput}
        autoFocus={true}
        style={styles.textInput}
        onKeyPress={(event) => {
          onInput(event.nativeEvent.key);
        }}
        autoCorrect={false}
        autoCapitalize={"characters"}
        keyboardAppearance="light"
        keyboardType="ascii-capable"
      />

      {userGrid.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((cell, colIndex) =>
            cell !== null ? (
              <ValidCell
                key={colIndex}
                row={rowIndex}
                col={colIndex}
                value={cell}
              />
            ) : (
              <InvalidCell key={colIndex} />
            )
          )}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  textInput: {
    position: "absolute",
    top: -10,
    left: -10,
    opacity: 0,
    width: 1,
    height: 1,
  },
  row: {
    flexDirection: "row",
  },
  cell: {
    width: 34,
    height: 34,
    display: "flex",
    backgroundColor: "#fff",
  },
  validCell: {
    flex: 1,
    margin: 2,
    backgroundColor: "#E9E6E6",
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  selectedCell: {
    backgroundColor: "#F7CD84",
  },
  highlightedCell: {
    backgroundColor: "#CCCBCB",
  },
  cellContent: {
    fontSize: 18,
  },
});

/**
 * Compute the size of the smallest square grid that fits the game.
 */
function computeGridSize(words: Word[]) {
  let maxRow = 0;
  let maxCol = 0;
  words.forEach(({ word, row, col, direction }) => {
    if (direction === HORIZONTAL) {
      maxCol = Math.max(maxCol, col + word.length - 1);
    } else {
      maxRow = Math.max(maxRow, row + word.length - 1);
    }
  });

  return Math.max(maxRow + 1, maxCol + 1);
}

/**
 * Creates a crossword grid for the given words, where invalid cells are null.
 * If empty===true, the grid's cells will be ''.
 */
export function createGrid(words: Word[], empty: boolean) {
  const gridSize = computeGridSize(words);
  const grid = Array.from({ length: gridSize }, () =>
    Array(gridSize).fill(null)
  );

  words.forEach(({ word, row, col, direction }) => {
    for (let i = 0; i < word.length; i++) {
      if (direction === HORIZONTAL) {
        grid[row][col + i] = empty ? "" : word[i];
      } else {
        grid[row + i][col] = empty ? "" : word[i];
      }
    }
  });
  return grid;
}

/**
 * A grid that keeps track of the corresponding word(s) for each cell,
 * in the following format: gridMap[i][j] = {horiz: word1, vert: word2}.
 */
function createMapGrid(words: Word[]) {
  const gridSize = computeGridSize(words);
  const grid = Array.from({ length: gridSize }, () =>
    Array(gridSize).fill(null)
  );

  words.forEach((wordEntry) => {
    const { word, row, col, direction } = wordEntry;
    for (let i = 0; i < word.length; i++) {
      if (direction === HORIZONTAL) {
        const vert = grid[row][col + i]?.vert;
        grid[row][col + i] = { horiz: wordEntry, vert: vert };
      } else {
        const horiz = grid[row + i][col]?.horiz;
        grid[row + i][col] = { horiz: horiz, vert: wordEntry };
      }
    }
  });
  return grid;
}

export default CrosswordGrid;
