import run from "aocrunner";

const parseInput = (rawInput: string) => {
  const lines = rawInput.split("\n").map((line) => {
    return line.split(":")[1].trim();
  });
  const fragments = lines.map((line) =>
    line.split(" ").filter((value) => value !== ""),
  );
  const values = fragments.map((line) => line.map((value) => parseInt(value)));
  return { times: values[0], distances: values[1] };
};

const part1 = (rawInput: string): any => {
  const input = parseInput(rawInput);
  const differences: number[] = input.times.map((time, index) => {
    let result = getRaceMaxMin(time, input.distances[index]);
    return result.max - result.min;
  });

  return differences.reduce((prev, value) => {
    return prev * value;
  }, 1);
};

const part2 = (rawInput: string): any => {
  const input = parseInput(rawInput);

  return;
};

const getRaceMaxMin = (
  time: number,
  targetDistance: number,
): { min: number; max: number } => {
  let minReached = false;
  let min = getMin(time, targetDistance);
  let max = 0;
  // How long should it be held
  for (let i = min; i <= time; i++) {
    if ((time - i) * i <= targetDistance) {
      max = i;
      break;
    }
  }
  return { min, max };
};

const getMin = (time: number, targetDistance: number) => {
  // How long should it be held
  for (let i = 1; i < time; i++) {
    if ((time - i) * i > targetDistance) {
      return i;
    }
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
