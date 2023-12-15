import run from "aocrunner";
import { createHash } from "crypto";
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

  let remaining = 1_000_000_000 % ((data.pastIndex + 1) + ((data.currentIndex + 1) - (data.pastIndex + 1)));
  lines = data.lastGrid;

  for (let index = 0; index < remaining; index++) {
    lines = runCycle(lines);
  }

  return getLoad(lines);
};

const findRepeatingCycle = (
  lines: string[][],
): { currentIndex: number; pastIndex: number; pastHashes: string[], lastGrid: string[][] } | null => {
  let cycleCount: number = 0;
  let pastHashes = [getHash(lines)];

  while (cycleCount < 1_000_000_000) {
    // Run Cycle
    lines = runCycle(lines);
    cycleCount++;
    //console.log(`Cycle: ${cycleCount} | Load: ${getLoad(lines)} | Hash: ${getHash(lines)}`);

    // Compare Load
    let currentHash = getHash(lines);
    // find cyclical appearance
    if (pastHashes.includes(currentHash)) {
      return {
        currentIndex: cycleCount,
        pastIndex: pastHashes.findIndex((value) => value == currentHash),
        pastHashes: pastHashes,
        lastGrid: lines,
       };
    }
    pastHashes.push(currentHash);
  }
  return null;
};

const getHash = (input: string[][]) => {
  return createHash("sha256")
    .update(input.map((line) => line.join("")).join(""))
    .digest("hex");
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
