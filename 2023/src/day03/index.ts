import run from "aocrunner";

const parseInput = (rawInput: string) => {
  let lines: any = rawInput.split('\n');
  lines = lines.map((line) => Array.from(line));
  return lines;
};

const part1 = (rawInput: string): any => {
  const input = parseInput(rawInput);
  return;
};

const part2 = (rawInput: string): any => {
  const input = parseInput(rawInput);

  return;
};

// getIfNumberHasSymbolsAroundit()
// getNumberFromFirstDigit()

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
