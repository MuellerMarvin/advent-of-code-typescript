import run from "aocrunner";
import { Dir } from "fs";

enum Direction {
  North = 1,
  East = 2,
  South = 3,
  West = 4,
}

const pipeToArray: { [pipe: string]: Direction[] } = {
  "|": [Direction.North, Direction.South],
  "-": [Direction.West, Direction.East],
  L: [Direction.North, Direction.East],
  J: [Direction.North, Direction.West],
  "7": [Direction.South, Direction.West],
  F: [Direction.South, Direction.East],
  ".": [],
  S: [Direction.North, Direction.East, Direction.South, Direction.West],
};

const directionToArray: { [direction in Direction]: number[] } = {
  [Direction.North]: [-1, 0],
  [Direction.East]: [0, 1],
  [Direction.South]: [1, 0],
  [Direction.West]: [0, -1],
};

const directionInverse: { [direction in Direction]: Direction } = {
  [Direction.North]: Direction.South,
  [Direction.East]: Direction.West,
  [Direction.South]: Direction.North,
  [Direction.West]: Direction.East,
};

const parseInput = (rawInput: string) => {
  const lines: string[] = rawInput.split("\n");
  const grid = lines.map((line) => Array.from(line));
  return { grid, startPoint: getStartPoint(grid) };
};

const part1 = (rawInput: string): any => {
  const input = parseInput(rawInput);

  return;
};

const part2 = (rawInput: string): any => {
  const input = parseInput(rawInput);

  return;
};

const getStartPoint = (grid: string[][]) => {
  grid.forEach((line, lineIndex) => {
    let indexFound = line.findIndex((value) => value == "S");
    if (indexFound > -1) {
      return [lineIndex, indexFound];
    }
  });
  return null;
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
