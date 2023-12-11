import run from "aocrunner";
import { getColumn } from "../utils/index.js";

const parseInput = (rawInput: string) => {
  const lines: string[] = rawInput.split("\n");
  return { grid: lines.map((line) => Array.from(line)) };
};

const part1 = (rawInput: string): any => {
  const grid = parseInput(rawInput).grid;
  const galaxies = getGalaxies(grid);
  const space = expandSpace(grid);
  return;
};

const part2 = (rawInput: string): any => {
  const input = parseInput(rawInput);

  return;
};

const getGalaxies = (grid: string[][]) => {
  let galaxies = [];
  grid.forEach((line, lineIndex) => {
    line.forEach((char, charIndex) => {
      if (char === "#") {
        galaxies.push([lineIndex, charIndex]);
      }
    });
  });

  return galaxies;
};

const expandSpace = (inputGrid: string[][]) => {
  // Deep copy to preverse input-grid
  let grid = inputGrid.map((line) => line.map((char) => char));

  //#region Expand Lines
  let emptyLines: number[] = [];
  grid.forEach((line, lineIndex) => {
    if (line.every((value) => value === ".")) {
      emptyLines.push(lineIndex);
    }
  });

  for (let i = 0; i < emptyLines.length; i++) {
    grid.splice(emptyLines[i], 0, Array(grid[i].length).fill("."));
    emptyLines = emptyLines.map((value) => value + 1);
  }
  //#endregion Expand Lines

  //#region Expand Columns
  let emptyColumns: number[] = [];
  for (let i = 0; i < grid[0].length; i++) {
    if(getColumn(grid, i).every((value) => value === '.')) {
      emptyColumns.push(i);
    }
  }

  for (let index = 0; index < emptyColumns.length; index++) {
    // Fill one element into each line at the index of the empty colunmn
    for (let line = 0; line < grid.length; line++) {
      grid[line].splice(emptyColumns[index], 0, '.');
      
    }
  }
  //#endregion Expand Columns

  return grid;
};

run({
  part1: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
