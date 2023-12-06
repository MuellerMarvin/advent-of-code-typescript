import run from "aocrunner";

const parseInput = (
  rawInput: string,
): { seeds: number[]; convTables: number[][][] } => {
  let lines = rawInput.split("\n");

  // Seeds
  const seeds = lines[0]
    .split(" ")
    .splice(1)
    .map((stringId: string) => {
      return parseInt(stringId);
    });

  // Extract sections of tables
  const sections = lines
    .slice(2)
    .join("\n")
    .split("\n\n")
    .map((section) => {
      return section.split(":\n")[1];
    });

  // Conversion Tables
  const convTables = sections.map((section) => {
    return section
      .split("\n")
      .map((item) => item.split(" ").map((numString) => parseInt(numString)));
  });

  return { seeds, convTables };
};

const part1 = (rawInput: string): any => {
  const input = parseInput(rawInput);
  const seedConfigs: number[][] = getSeedConfigs(input.seeds, input.convTables);
  return findLowestLocation(seedConfigs);
};

const part2 = (rawInput: string): any => {
  const input = parseInput(rawInput);

  let starts = [];
  let lengths = [];
  input.seeds.forEach((value, index) => {
    if (index % 2 == 0) {
      starts.push(value);
    } else {
      lengths.push(value);
    }
  });

  let closest = getSeedConfig(starts[0], input.convTables)[6];
  starts.forEach((start, index) => {
    let length = lengths[index];
    for (let i = start; i < start + length; i++) {
      let location = (getSeedConfig(i, input.convTables))[6];

      if (location < closest) {
        closest = location;
      }
    }
  });

  return closest;
};

const getSeedConfigs = (seeds: number[], convTables: number[][][]) => {
  const seedConfigs = seeds.map((seed) => getSeedConfig(seed, convTables));
  return seedConfigs;
};

const getSeedConfig = (seed: number, convTables: number[][][]): number[] => {
  let output = [];
  let lastValue = seed;
  convTables.forEach((table, index) => {
    lastValue = runConversion(lastValue, table);
    output.push(lastValue);
  });
  return output;
};

const isInSourceRange = (value: number, table: number[]): boolean => {
  return value >= table[1] && value < table[1] + table[2];
};

const runConversion = (source: number, convTables: number[][]): number => {
  let table = convTables.find((table) => isInSourceRange(source, table));

  // if no table matches, it matches directly
  if (table == undefined) {
    return source;
  }

  let src = table[1];
  let dst = table[0];

  if (dst > src) {
    let diff = dst - src;
    return source + diff;
  }
  // src > dst
  else if (src > dst) {
    let diff = src - dst;
    return source - diff;
  }
  // equal
  else {
    return src;
  }
};

const findLowestLocation = (seedConfigs: number[][]): number => {
  let lowest = Number.MAX_VALUE;
  seedConfigs.forEach((value) => {
    let location = value[value.length - 1];
    if (location < lowest) lowest = location;
  });
  return lowest;
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
