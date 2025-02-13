import React from "react";
import {useState, useEffect} from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Platform, KeyboardAvoidingView, Keyboard } from "react-native";

enum Direction {
  HORIZONTAL = "horizontal",
  VERTICAL = "vertical",
  BOTH = "both" // Intersection
}

function computeGridSize(words: any[]) {
  let maxRow = 0, maxCol = 0;
  words.forEach(({ word, row, col, direction }) => {
    if (direction === Direction.HORIZONTAL) {
      maxCol = Math.max(maxCol, col + word.length - 1);
    } else {
      maxRow = Math.max(maxRow, row + word.length - 1);
    }
  });

  return Math.max(maxRow + 1, maxCol + 1);
}

function createGrid(words: any[], empty: boolean) {
  const gridSize = computeGridSize(words);
  const grid = Array.from({ length: gridSize }, () => Array(gridSize).fill(null));

  words.forEach(({ word, row, col, direction }) => {
    for (let i = 0; i < word.length; i++) {
      if (direction === Direction.HORIZONTAL) {
        grid[row][col + i] = empty ? '' : word[i];
      } else {
        grid[row + i][col] = empty ? '' : word[i];
      }
    }
  });
  return grid;
}

/**
 * @param words 
 * @returns A grid that keeps track of the corresponding word(s) for each cell,
 * in the following format: gridMap[i][j] = {first: word1, second: word2}
 * Cells belonging to a single word: gridMap[i][j] = {first: word, second: null}
 */
function createMapGrid(words: any[]) {
  const gridSize = computeGridSize(words);
  const grid = Array.from({ length: gridSize }, () => Array(gridSize).fill(null));

  words.forEach((wordEntry) => {
    const { word, row, col, direction } = wordEntry;
    for (let i = 0; i < word.length; i++) {
      if (direction === Direction.HORIZONTAL) {
        if (grid[row][col + i] === null) {
          grid[row][col + i] = {first: wordEntry, second: null};
        } else {
          const prevCell = grid[row][col + i].first;
          grid[row][col + i] = {first: prevCell, second: wordEntry};
        }
      } else {
        if (grid[row + i][col] === null) {
          grid[row + i][col] = {first: wordEntry, second: null};
        } else {
          const prevCell = grid[row + i][col].first;
          grid[row + i][col] = {first: prevCell, second: wordEntry};
        }
      }
    }
  });
  return grid;
}

const CrosswordGrid = () => {
  const words = [
    { word: "HELLO", row: 3, col: 0, direction: Direction.HORIZONTAL },
    { word: "WORLD", row: 0, col: 2, direction: Direction.VERTICAL },
    { word: "COLD", row: 1, col: 1, direction: Direction.HORIZONTAL },
  ];

  const [solutionGrid, setSolutionGrid] = useState(createGrid(words, false));
  const [userGrid, setUserGrid] = useState(createGrid(words, true));
  const [mapGrid, setMapGrid] = useState(createMapGrid(words));
  const [selectedCell, setSelectedCell] = useState({row: words[0].row, col: words[0].col});
  const [currentDirection, setCurrentDirection] = useState(Direction.HORIZONTAL);

  function isSelected(row: number, col: number) {
    return selectedCell.row === row && selectedCell.col === col;
  }

  function onInput(value: string) {
    if (value.length !== 1 || !value.match(/[A-ZÑÁÉÍÓÚ]/i)) {
      return;
    }
    console.log(currentDirection);
    
    setUserGrid((prevGrid) => {
      const newGrid = prevGrid.map((r, rowIndex) =>
        r.map((cell, colIndex) =>
          rowIndex === selectedCell.row && colIndex === selectedCell.col ? value : cell
        )
      );
      return newGrid;
    });

    moveToNextCell();

  }

  function selectCell(row: number, col: number) {
    if (mapGrid[row][col].second === null) {
      setCurrentDirection(mapGrid[row][col].first.direction);
    } else {
      setCurrentDirection(Direction.HORIZONTAL);
    }
    setSelectedCell({row, col});
  }

  function moveToNextCell() {

    const canGoRight = selectedCell.col < userGrid.length - 1 && userGrid[selectedCell.row][selectedCell.col + 1] != null;
    const canGoDown = selectedCell.row < userGrid.length - 1 && userGrid[selectedCell.row + 1][selectedCell.col] != null;
    if (currentDirection === Direction.HORIZONTAL && canGoRight) {
      setSelectedCell({row: selectedCell.row, col:selectedCell.col+1});
    }
    if (currentDirection === Direction.VERTICAL && canGoDown) {
      setSelectedCell({row: selectedCell.row+1, col:selectedCell.col});
    }
  }

  const Cell = ({row, col, text }: {row: number, col: number, text: string}) => {
    return (<TouchableOpacity style={[styles.cell, styles.validCell, isSelected(row, col) ? styles.selectedCell : undefined]} onPress={() => {selectCell(row, col)}}>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>)
  }

  const NegativeCell = () => {
    return (<View style={[styles.cell, styles.negativeCell]} />)
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <TextInput autoFocus={true} style={{opacity: 0}} onKeyPress={(event) => {onInput(event.nativeEvent.key)}} autoCorrect={false} autoCapitalize = {"characters"}/>
      {userGrid.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((cell, colIndex) => (
            (cell !== null) ?
              <Cell key={colIndex} row={rowIndex} col={colIndex} text={cell} />
              :
              <NegativeCell key={colIndex} />
          ))}
        </View>
      ))}
      <View style={styles.clueContainer}></View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 5,
    display: 'flex',
    alignItems: 'center',
    flex: 1,
  },
  clueContainer: {
    width: '100%',
    height: 60,
    backgroundColor: '#D7DECC',
    marginTop: 'auto',
  },
  row: {
    flexDirection: "row",
  },
  cell: {
    width: 34,
    height: 34,
    margin: 3,
  },
  validCell: {
    backgroundColor: "#E9E6E6",
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  negativeCell: {
    visibility: 'none',
  },
  selectedCell: {
    backgroundColor: "#F7CD84",
  },
  text: {
    fontWeight: "bold",
    fontSize: 18,
  },
});

export default CrosswordGrid;
