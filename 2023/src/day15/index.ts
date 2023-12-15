import run from "aocrunner";

const parseInput = (rawInput: string) => {
  return rawInput;
};

const part1 = (rawInput: string): any => {
  const input = parseInput(rawInput);
  const parts = input.split(',');
  const sums = parts.map((text) => runHash(text, 0));

  return sums.reduce((prev, acc) => prev+acc, 0);
};

const part2 = (rawInput: string): any => {
  const input = parseInput(rawInput);

  return;
};

const runHash = (text: string, startValue: number) => {
  text.split("").forEach((char) => {
    startValue = runHashOnChar(char, startValue);
  });
  return startValue;
}

const runHashOnChar = (char: string, currentValue: number) => {
  currentValue += char.charCodeAt(0);
  currentValue = (currentValue * 17) % 256;
  return currentValue;
}

run({
  part1: {
    tests: [
      {
        input: `rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7`,
        expected: 1320,
      },
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
