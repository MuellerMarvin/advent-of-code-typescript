import run from "aocrunner";
import { getColumn, getColumnReversed } from "../utils/index.js";

const parseInput = (rawInput: string) => {
  const lines: string[] = rawInput.split("\n");
  return lines.map((line) => line.trim().split(""));
};

const part1 = (rawInput: string): any => {
  const input = parseInput(rawInput);
  let lines = input;

  // Move
  lines = moveRocksUpFully(lines);

  // Count
  lines = lines.reverse();
  let count = 0;
  lines.forEach((line, lineIndex) => {
    line.forEach((char) => {
      if (char == "O") {
        count += lineIndex + 1;
      }
    });
  });

  return count;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  let lines = input;
  let data = findRepeatingCycle(lines);

  return;
};

const findRepeatingCycle = (
  lines: string[][],
): { currentIndex: number; pastIndex: number, pastLoads: number[] } | null => {
  let pastLoads = [getLoad(lines)];
  let pastCycles = [makeCopy(lines)];
  let cycleCount: number = 0;

  while (cycleCount < 1_000_000_000) {
    // Run Cycle
    lines = runCycle(lines);
    cycleCount++;

    // Compare Load
    let currentLoad = getLoad(lines);
    // find cyclic
  }
  return null;
};

const getLoad = (input: string[][]) => {
  let lines = makeCopy(input);
  // Count
  lines = lines.reverse();
  let count = 0;
  lines.forEach((line, lineIndex) => {
    line.forEach((char) => {
      if (char == "O") {
        count += lineIndex + 1;
      }
    });
  });
  return count;
};

const cycleEqual = (cycleA: string[][], cycleB: string[][]) => {
  return cycleA.every((line, lineIndex) => {
    return line.every((char, charIndex) => {
      return char === cycleB[lineIndex][charIndex];
    });
  });
};

const makeCopy = (lines: string[][]): string[][] => {
  return lines.map((line) => line.map((char) => char));
};

const runCycle = (lines: string[][]): string[][] => {
  for (let spins = 0; spins < 4; spins++) {
    lines = moveRocksUpFully(lines);
    lines = spinPlatform(lines);
  }
  return lines;
};

const moveRocksUpFully = (lines: string[][]): string[][] => {
  for (let i = 0; i < lines.length; i++) {
    lines = moveRocksUp(lines);
  }
  return lines;
};

const moveRocksUp = (lines: string[][]) => {
  for (let lineIndex = 1; lineIndex < lines.length; lineIndex++) {
    lines[lineIndex].forEach((char, charIndex) => {
      if (char !== "O") return;
      if (lines[lineIndex - 1][charIndex] == ".") {
        lines[lineIndex - 1][charIndex] = "O";
        lines[lineIndex][charIndex] = ".";
      }
    });
  }
  return lines;
};

const spinPlatform = (array: string[][]) => {
  let newArray = [];
  for (let i = 0; i < array.length; i++) {
    newArray.push(getColumnReversed(array, i));
  }
  return newArray;
};

run({
  part1: {
    tests: [
      {
        input: `O....#....
        O.OO#....#
        .....##...
        OO.#O....O
        .O.....O#.
        O.#..O.#.#
        ..O..#O..O
        .......O..
        #....###..
        #OO..#....`,
        expected: 136,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `O....#....
        O.OO#....#
        .....##...
        OO.#O....O
        .O.....O#.
        O.#..O.#.#
        ..O..#O..O
        .......O..
        #....###..
        #OO..#....`,
        expected: 64,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
