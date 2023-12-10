import run from "aocrunner";

const parseInput = (rawInput: string) => {
  let lines: string[] = rawInput.split("\n");

  // Scan lines for numbers
  let numberSignatures: NumberSignature[] = [];
  lines.forEach((line, lineIndex) => {
    // Find numbers in line
    const matches = line.match(/\d+/g);

    if (matches == null) return;

    // Find indices
    matches.forEach((match) => {
      let matchIndex = line.indexOf(match);
      line = line.replace(match, ".".repeat(match.length));
      numberSignatures.push({
        number: parseInt(match),
        length: match.length,
        line: lineIndex,
        start: matchIndex,
      });
    });
  });

  return { rawInput, lines, numbers: numberSignatures };
};

type NumberSignature = {
  number: number; // The number itself
  length: number; // Length of the number in digits
  line: number; // Line index
  start: number; // Start position in the line
};

type GearSignature = {
  line: number;
  index: number;
};

const getSpace = (
  lines: string[],
  lineIndex: number,
  charIndex: number,
  itemLength: number,
) => {
  let lineStart = Math.max(0, lineIndex - 1);
  let lineEnd = Math.min(lines.length, lineIndex + 2);
  let charStart = Math.max(0, charIndex - 1);
  let charEnd = Math.min(lines[lineIndex].length, charIndex + itemLength + 1);

  const space = lines.slice(lineStart, lineEnd).map((line) => {
    return line.slice(charStart, charEnd);
  });

  return space;
};

const part1 = (rawInput: string): any => {
  const input = parseInput(rawInput);
  const machineNumbers: number[] = [];

  input.numbers.forEach((number) => {
    const space = getSpace(input.lines, number.line, number.start, number.length);

    if (space.join("").match(/^[.\d]*$/) === null) {
      machineNumbers.push(number.number);
    }
  });

  return machineNumbers.reduce((prev, val) => {
    return prev + val;
  }, 0);
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
