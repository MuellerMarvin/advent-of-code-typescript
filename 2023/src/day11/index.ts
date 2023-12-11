import run from "aocrunner";

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
