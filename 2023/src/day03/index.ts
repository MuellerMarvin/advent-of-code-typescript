import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string): any => {
  const input = parseInput(rawInput);
  const lines = input.split("\n");
  const lineNumbers: NumberPos[][] = lines.map((line) =>
    findNumbersInLine(line),
  );
  const partNumbers: number[] = 

  return partNumbers.reduce((acc, value) => acc + value, 0);
};

const part2 = (rawInput: string): any => {
  const input = parseInput(rawInput);

  return;
};

type NumberPos = {
  value: number;
  index: number;
  endIndex: number;
};

const findNumbersInLine = (line: string): NumberPos[] => {
  let i = 0;
  let numbers: NumberPos[] = [];
  while (i < line.length) {
    let nextNum: NumberPos = findNextNumber(line, i);
    if (nextNum.index !== null) {
      numbers.push(nextNum);
    } else {
      break;
    }
    i = nextNum.endIndex;
  }
  return numbers;
};

const findNextNumber = (line: string, startIndex: number): NumberPos => {
  let match = "";
  let index = startIndex;
  let collecting = false;
  for (let i = startIndex; i < line.length; i++) {
    if (line[i].match(/\d/)) {
      match += line[i];
      if (!collecting) index = i;
      collecting = true;
      continue;
    }
    if (collecting) break; // If it is collecting but didn't find a digit anmore
  }
  if (match === "") return { value: null, index: null, endIndex: null };
  return {
    value: parseInt(match),
    index: index,
    endIndex: index + match.length,
  };
};

const containsSymbol = (text: string): boolean => {
  return !Array.from(text).every((value) => {
    return !isSymbol(value);
  });
}

const isSymbol = (value: string): boolean => {
  if(value.match(/\d/) !== null || value == '.') return true;
  return false;
}

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
