import * as React from "react";
import {
  render,
  fireEvent,
  waitFor,
  cleanup,
} from "@testing-library/react-native";

import CrosswordGrid from "../CrosswordGrid";
import category1 from "@/data/games/1.json";

describe("CrosswordGrid", () => {
  it("renders correctly", () => {
    expect(
      render(
        <CrosswordGrid
          game={category1[0]}
          startIndex={0}
          updateClue={() => {}}
          completeGame={() => {}}
        />
      ).toJSON()
    ).toMatchSnapshot();
  });

  it("Updates cell colors when pressed", async () => {
    const { getByTestId } = render(
      <CrosswordGrid
        game={category1[0]}
        startIndex={0}
        updateClue={() => {}}
        completeGame={() => {}}
      />
    );

    const row = 6;
    const col = 5;
    const cell = `grid-cell-${row}-${col}`;
    const cellLeft = `grid-cell-${row}-${col - 1}`;
    const cellRight = `grid-cell-${row}-${col + 1}`;

    expect(getByTestId(cell).props.style.backgroundColor).toBe("#E9E6E6");
    expect(getByTestId(cellLeft).props.style.backgroundColor).toBe("#E9E6E6");
    expect(getByTestId(cellRight).props.style.backgroundColor).toBe("#E9E6E6");
    fireEvent.press(getByTestId(cell));
    expect(getByTestId(cell).props.style.backgroundColor).toBe("#F7CD84");
    expect(getByTestId(cellLeft).props.style.backgroundColor).toBe("#CCCBCB");
    expect(getByTestId(cellRight).props.style.backgroundColor).toBe("#CCCBCB");
  });
});

afterEach(cleanup);
