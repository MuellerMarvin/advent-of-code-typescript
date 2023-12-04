import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
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

  let pattern: RegExp = /\d|one|two|three|four|five|six|seven|eight|nine/g;
  const numbers: number[] = lines.map((line) => {
    let matches: string[] = line.match(pattern);
    let digits: number[] = matches.map((digit) => parseDigit(digit));
    return digits[0] * 10 + digits[digits.length - 1];
  });

  return numbers.reduce((acc, value) => {
    return acc + value;
  }, 0);
};

const parseDigit = (digit: string): number => {
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
    default:
      return parseInt(digit);
  }

  return 0;
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
