import run from "aocrunner";

const parseInput = (rawInput: string) => {
  const lines: string[] = rawInput.split("\n");
  const numbers: number[][] = lines.map((line) =>
    line.split(" ").map((value) => parseInt(value)),
  );
  return numbers;
};

const part1 = (rawInput: string): any => {
  const input = parseInput(rawInput);

  const pyramids: number[][][] = pyramidize(input);

  return pyramids.reduce((prev, pyramid) => {
    return prev + addEndOfArrays(pyramid);
  }, 0);
};

const part2 = (rawInput: string): any => {
  const input = parseInput(rawInput);
  const pyramids = pyramidize(input);

  const results = pyramids.map((pyramid) => {
    return pyramid.reverse().reduce((prev, array) => {
      return array[0] - prev;
    }, 0);
  });

  return results.reduce((prev, value) => {
    return prev + value;
  });
};

const pyramidize = (input: number[][]) => {
  const output = input.map((array) => {
    let numbers = [[...array]];

    while (!numbers[numbers.length - 1].every((number) => number === 0)) {
      let current = numbers[numbers.length - 1];
      let diff: number[] = [];

      for (let i = 0; i < current.length - 1; i++) {
        diff.push(current[i + 1] - current[i]);
      }
      numbers.push(diff);
    }
    return numbers;
  });
  return output;
};

const addEndOfArrays = (arrays: number[][]) => {
  return arrays.reverse().reduce((prev, array) => {
    return prev + array.at(-1);
  }, 0);
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
