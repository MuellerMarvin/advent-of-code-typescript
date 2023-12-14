import run from "aocrunner";
import { getColumn } from "../utils/index.js";

const parseInput = (rawInput: string) => {
  const pattern: string[][] = rawInput
    .split("\n\n")
    .map((patch) => patch.split("\n"));
  return pattern;
};

const part1 = (rawInput: string): any => {
  const patterns = parseInput(rawInput);

  const horizontalUnfiltered = patterns.map((pattern) =>
    findHorizontalReflection(pattern),
  );
  const horizontal = horizontalUnfiltered.filter((value) => value > -1);

  const verticalInputPatters = patterns.filter((pattern, index) => {
    if (horizontalUnfiltered[index] < 0) return true;
    return false;
  });
  const vertical = patterns
    .map((pattern) => findVerticalReflection(pattern))
    .filter((value) => value > -1);

  const horizontalCount = horizontal.reduce((prev, acc) => prev + acc + 1, 0);
  const verticalCount = vertical.reduce((prev, acc) => prev + acc + 1, 0);

  return verticalCount + horizontalCount * 100;
};

const part2 = (rawInput: string): any => {
  const patterns = parseInput(rawInput);

  const unfilteredHorizontals = patterns
    .map((pattern) => {
      return findHorizontalSmudge(pattern);
    });
  const horizontals = unfilteredHorizontals.filter((value) => value > -1);

  const verticals: number[] = patterns
    .map((pattern, patternIndex) => {
      if(unfilteredHorizontals[patternIndex] > -1) {
        return -1;
      }
      return findHorizontalSmudge(pattern);
    })
    .filter((value) => value > -1);

  const horizontalCount = horizontals.reduce((prev, acc) => prev + acc + 1, 0);
  const verticalCount = verticals.reduce((prev, acc) => prev + acc + 1, 0);

  return verticalCount + horizontalCount * 100;
};

const findHorizontalReflection = (pattern: string[]): number => {
  for (let line = 0; line < pattern.length; line++) {
    const a = pattern.slice(0, line + 1).reverse();
    const b = pattern.slice(line + 1);
    const partsSame = partsAreSame(a, b);
    if (partsSame && b.length > 0) {
      return line;
    }
  }
  return -1;
};

const findVerticalReflection = (pattern: string[]): number | null => {
  let sideWaysPattern = [];
  let segmentedPattern = pattern.map((line) => line.split(""));

  for (let column = 0; column < pattern[0].length; column++) {
    sideWaysPattern.push(getColumn(segmentedPattern, column));
  }

  return findHorizontalReflection(sideWaysPattern.map((line) => line.join("")));
};

const partsAreSame = (partA: string[], partB: string[]): boolean => {
  const comparisonRange = Math.min(partA.length, partB.length);
  for (let i = 0; i < comparisonRange; i++) {
    if (partA[i] !== partB[i]) {
      return false;
    }
  }
  return true;
};

const findVerticalSmudge = (pattern: string[]): number => {
  let sideWaysPattern = [];
  let segmentedPattern = pattern.map((line) => line.split(""));

  for (let column = 0; column < pattern[0].length; column++) {
    sideWaysPattern.push(getColumn(segmentedPattern, column));
  }

  return findHorizontalSmudge(sideWaysPattern.map((line) => line.join("")));
};

const findHorizontalSmudge = (pattern: string[]): number => {
  const skipReflection = findHorizontalReflection(pattern);

  for (let i = 0; i < pattern.length; i++) {
    for (let j = 0; j < pattern[i].length; j++) {
      let attemptPattern: string[] = pattern.map((line) => line);
      if (attemptPattern[i].at(j) == "#") {
        attemptPattern[i] = replaceAt(attemptPattern[i], ".", j);
      } else {
        attemptPattern[i] = replaceAt(attemptPattern[i], "#", j);
      }
      const reflection = findHorizontalReflection(attemptPattern);
      if (reflection > -1 && reflection !== skipReflection) {
        return findHorizontalReflection(attemptPattern);
      }
    }
  }
  return -1;
};

const replaceAt = (input: string, character: string, pos: number) => {
  return input.substring(0, pos) + character + input.substring(pos + 1);
};

run({
  part1: {
    tests: [
      {
        input: `#.##..##.\n..#.##.#.\n##......#\n##......#\n..#.##.#.\n..##..##.\n#.#.##.#.\n\n#...##..#\n#....#..#\n..##..###\n#####.##.\n#####.##.\n..##..###\n#....#..#`,
        expected: 405,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `#.##..##.\n..#.##.#.\n##......#\n##......#\n..#.##.#.\n..##..##.\n#.#.##.#.\n\n#...##..#\n#....#..#\n..##..###\n#####.##.\n#####.##.\n..##..###\n#....#..#`,
        expected: 400,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
