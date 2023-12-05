import run from "aocrunner";

const parseInput = (rawInput: string) => {
  return rawInput
    .split("\n") // split for lines
    .map((line) => line.split(": ")[1]) // remove "Game XX: "
    .join("\n"); // join lines together
};

const part1 = (rawInput: string) => {
  const maxCubes = [12, 13, 14]; // (red, gren, blue) Any games with more than these will be impossible
  const input = parseInput(rawInput);
  const games = getGames(input);
  let sumOfInvalids = 0;

  games.forEach((game, index) => {
    let valid = game.every((set) => {
      return verifySet(set, maxCubes);
    });
    if(valid) {
      sumOfInvalids += (index + 1);
    }
  });
  return sumOfInvalids;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const games = getGames(input);
  const minimums = games.map((game) => {
    return findMinimumCubes(game);
  });
  const powers = minimums.map((values) => {
    return values[0] * values[1] * values[2];
  });

  return powers.reduce((acc, value) => {
    return acc + value;
  }, 0)
};

const getGames = (input: string) => {
  const lines = input.split("\n");
  const gameSets: string[][][] = lines.map((line) =>
    line.split(";").map((set) => set.split(",").map((item) => item.trim())),
  );
  return gameSets.map((game) => game.map((set) => interpreteSet(set)));
};

const interpreteSet = (set: string[]): number[] => {
  let cubeCounts: number[] = [0, 0, 0];

  set.map((item) => {
    let sides = item.split(' ')
    cubeCounts[colorDict[sides[1]]] = parseInt(sides[0]);
  })
  return cubeCounts;
}

const colorDict: { [colorname: string]: number } = {
  "red": 0,
  "green": 1,
  "blue": 2
}

const verifySet = (set: number[], maximums: number[]): boolean => {
  return set.every((value, index) => (value <= maximums[index]));
}

const findMinimumCubes = (game: number[][]): number[] => {
  let minimum = [0, 0, 0];
  game.forEach((set) => {
    set.forEach((value, index) => {
      if(minimum[index] < value) {
        minimum[index] = value;
      }
    });
  });
  return minimum;
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
