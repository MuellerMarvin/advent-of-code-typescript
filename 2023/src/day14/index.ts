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

const part2 = (rawInput: string): any => {
  const input = parseInput(rawInput);
  let lines = input;
  if (lines.length > 100) return;

  let lastCycle = lines;
  for (let cycle = 0; cycle < 1000000000; cycle++) {
    lines = runCycle(lines);
    if (
      lines.every((line, lineIndex) =>
        line.every(
          (char, charIndex) => char === lastCycle[lineIndex][charIndex],
        ),
      )
    ) {
      break;
    }
    lastCycle = makeCopy(lines);
  }

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
