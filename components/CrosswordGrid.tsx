import React from "react";
import { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Game, Word, HORIZONTAL, VERTICAL } from "@/constants/Game";

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
 * Creates a crossword grid for the given words, where negative cells are null.
 * If empty===true, the grid's cells are will be empty strings.
 */
function createGrid(words: Word[], empty: boolean) {
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
 * Cells belonging to a single word: gridMap[i][j] = {horiz: word, vert: null}
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

export type CrosswordGridProps = {
  startIndex: number;
  updateClue: (clue: string) => void;
};

const CrosswordGrid = (props: CrosswordGridProps) => {
  const words = Game.words;

  const [solutionGrid, setSolutionGrid] = useState(createGrid(words, false));
  const [userGrid, setUserGrid] = useState(createGrid(words, true));
  const [mapGrid, setMapGrid] = useState(createMapGrid(words));
  const [selectedCell, setSelectedCell] = useState({
    row: words[props.startIndex].row,
    col: words[props.startIndex].col,
  });
  const [currentDirection, setCurrentDirection] = useState(
    words[props.startIndex].direction
  );
  const textInput = useRef<TextInput>(null);

  function isSelected(row: number, col: number) {
    return selectedCell.row === row && selectedCell.col === col;
  }

  function isHighlighted(row: number, col: number) {
    const currentWord =
      currentDirection === HORIZONTAL
        ? mapGrid[row][col].horiz
        : mapGrid[row][col].vert;
    const highlightedWord =
      currentDirection === HORIZONTAL
        ? mapGrid[selectedCell.row][selectedCell.col].horiz
        : mapGrid[selectedCell.row][selectedCell.col].vert;

    return currentWord === highlightedWord;
  }

  function onInput(value: string) {
    if (!value.match(/[A-ZÑÁÉÍÓÚÜ]/i) && value !== "Backspace") {
      return;
    }

    setUserGrid((prevGrid) => {
      const newGrid = prevGrid.map((r, rowIndex) =>
        r.map((cell, colIndex) =>
          rowIndex === selectedCell.row && colIndex === selectedCell.col
            ? value === "Backspace"
              ? ""
              : value
            : cell
        )
      );
      return newGrid;
    });

    if (value === "Backspace") {
      moveToPrevCell();
    } else {
      moveToNextCell();
    }
  }

  /**
   * Selects the cell at the given row and col. Also updates the current
   * direction to match the direction of the word at the selected cell. If it's
   * an intersection cell, keep the current direction.
   */
  function selectCell(row: number, col: number) {
    // Focus on the textInput to show to keyboard.
    textInput.current?.focus();

    let newDirection = currentDirection;

    // If already selected, change direction if possible
    if (selectedCell.row === row && selectedCell.col === col) {
      if (mapGrid[row][col].horiz && mapGrid[row][col].vert) {
        console.log("changing direction");
        if (currentDirection === HORIZONTAL) {
          newDirection = VERTICAL;
        } else {
          newDirection = HORIZONTAL;
        }
      }
    } else {
      // If it's an intersection, keep the same direction. Otherwise, change
      // direction to match the selected word.
      if (!mapGrid[row][col].horiz) {
        newDirection = VERTICAL;
      }

      if (!mapGrid[row][col].vert) {
        newDirection = HORIZONTAL;
      }

      setSelectedCell({ row, col });
    }

    if (newDirection === HORIZONTAL) {
      props.updateClue(mapGrid[row][col].horiz?.clue);
    } else {
      props.updateClue(mapGrid[row][col].vert?.clue);
    }
    setCurrentDirection(newDirection);
  }

  function moveToNextCell() {
    const canGoRight =
      selectedCell.col < userGrid.length - 1 &&
      userGrid[selectedCell.row][selectedCell.col + 1] != null;
    const canGoDown =
      selectedCell.row < userGrid.length - 1 &&
      userGrid[selectedCell.row + 1][selectedCell.col] != null;

    if (currentDirection === HORIZONTAL && canGoRight) {
      setSelectedCell({ row: selectedCell.row, col: selectedCell.col + 1 });
    }
    if (currentDirection === VERTICAL && canGoDown) {
      setSelectedCell({ row: selectedCell.row + 1, col: selectedCell.col });
    }
  }

  function moveToPrevCell() {
    const canGoLeft =
      selectedCell.col > 0 &&
      userGrid[selectedCell.row][selectedCell.col - 1] != null;
    const canGoUp =
      selectedCell.row > 0 &&
      userGrid[selectedCell.row - 1][selectedCell.col] != null;

    if (currentDirection === HORIZONTAL && canGoLeft) {
      setSelectedCell({ row: selectedCell.row, col: selectedCell.col - 1 });
    }
    if (currentDirection === VERTICAL && canGoUp) {
      setSelectedCell({ row: selectedCell.row - 1, col: selectedCell.col });
    }
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
            isHighlighted(row, col) ? styles.highlightedCell : undefined,
            isSelected(row, col) ? styles.selectedCell : undefined,
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

  const NegativeCell = () => {
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
              <NegativeCell key={colIndex} />
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
    width: 36,
    height: 36,
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

export default CrosswordGrid;
