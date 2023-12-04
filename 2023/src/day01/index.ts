import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
  return;
  const input = parseInput(rawInput);
  const lines: String[] = input.split("\n");

  let pattern: RegExp = /\d/g;
  const numbers: number[] = lines.map((line) => {
    let digits: number[] = line.match(pattern).map((digit) => parseInt(digit));
    return digits[0] * 10 + digits[digits.length - 1];
  });

  return numbers.reduce((acc, value) => {
    return acc + value;
  }, 0);
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const lines: String[] = input.split("\n");

  let pattern: RegExp =
    /\d|oneight|twone|threeight|fiveight|sevenine|eightwo|eighthree|nineight|one|two|three|four|five|six|seven|eight|nine/g;
  const numbers: number[] = lines.map((line) => {
    const digits: number[] = line
      .match(pattern)
      .map((digit) => parseDigit(digit))
      .flat();
    const digiSum: number = digits[0] * 10 + digits[digits.length - 1];
    return digiSum;
  });

  return numbers.reduce((acc, value) => {
    return acc + value;
  }, 0);
};

const parseDigit = (digit: string): number | number[] => {
  switch (digit) {
    case "one":
      return 1;
    case "two":
      return 2;
    case "three":
      return 3;
    case "four":
      return 4;
    case "five":
      return 5;
    case "six":
      return 6;
    case "seven":
      return 7;
    case "eight":
      return 8;
    case "nine":
      return 9;
    case "oneight":
      return [1, 8];
    case "twone":
      return [2, 1];
    case "threeight":
      return [3, 8];
    case "fiveight":
      return [5, 8];
    case "sevenine":
      return [7, 9];
    case "eightwo":
      return [8, 2];
    case "eighthree":
      return [8, 3];
    case "nineight":
      return [9, 8];
    default:
      return parseInt(digit);
  }
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
