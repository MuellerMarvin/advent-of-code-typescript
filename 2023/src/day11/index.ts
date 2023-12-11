import run from "aocrunner";
import { getColumn } from "../utils/index.js";

const parseInput = (rawInput: string) => {
  const lines: string[] = rawInput.split("\n");
  const grid: string[][] = lines.map((line) => Array.from(line));
  return { grid };
};

const part1 = (rawInput: string): any => {
  const grid = parseInput(rawInput).grid;
  const space = expandSpace(grid);
  let galaxies = getGalaxies(space);

  let distSum = 0;
  for (let i = 0; i < galaxies.length; i++) {
    for (let j = i + 1; j < galaxies.length; j++) {
      distSum += getDistance(galaxies[i], galaxies[j]);
    }
  }
  return distSum;
};

const part2 = (rawInput: string): any => {
  const input = parseInput(rawInput);

  return;
};

const getGalaxies = (grid: string[][]): number[][] => {
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
  let grid: string[][] = inputGrid.map((line) => line.map((char) => char));

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
    const column = getColumn(grid, i);
    if (column.every((value) => value === ".")) {
      emptyColumns.push(i);
    }
  }

  for (let index = 0; index < emptyColumns.length; index++) {
    // Fill one element into each line at the index of the empty colunmn
    for (let line = 0; line < grid.length; line++) {
      grid[line].splice(emptyColumns[index], 0, ".");
    }
    emptyColumns = emptyColumns.map((value) => value + 1);
  }
  //#endregion Expand Columns

  return grid;
};

const getDistance = (a: number[], b: number[]) => {
  let lineDistance = Math.max(a[0], b[0]) - Math.min(a[0], b[0]);
  let columnDistance = Math.max(a[1], b[1]) - Math.min(a[1], b[1]);
  return lineDistance + columnDistance;
};

const getMarkedDistance = (
  a: number[],
  b: number[],
  grid: string[][],
  expansion: number,
) => {
  let distance = 0;

  let lowerLine = Math.min(a[0], b[0]);
  let higherLine = Math.max(a[0], b[0]);
  let lowerColumn = Math.min(a[1], b[1]);
  let higherColumn = Math.max(a[1], b[1]);

  const line = grid[higherLine].slice(lowerColumn, higherColumn);
  line.forEach((char) => {
    if (char === "#" || char === ".") {
      distance++;
    } else {
      distance += expansion;
    }
  });

  const column = getColumn(grid, higherColumn).slice(lowerLine, higherLine);
  column.forEach((char) => {
    if(char === '.' || char === '#') {
      distance++;
    }
    else {
      distance += expansion;
    }
  });
};

run({
  part1: {
    tests: [
      {
        input: `...#......\n.......#..\n#.........\n..........\n......#...\n.#........\n.........#\n..........\n.......#..\n#...#.....`,
        expected: 374,
      },
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
