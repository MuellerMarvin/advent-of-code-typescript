import run from "aocrunner";
import { parse } from "path";

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const cardPairs = cardPairifier(input);

  const points: number[] = cardPairs.map((pair) => {
    let filtered = pair[0].filter((element) => {
      return pair[1].includes(element);
    });
    if (filtered.length == 0) return 0;
    return Math.pow(2, filtered.length - 1);
  });

  return points.reduce((acc, item) => {
    return acc + item;
  }, 0);
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const cardPairs = cardPairifier(input);
  let pairCount: number[] = new Array(cardPairs.length).fill(1);

  cardPairs.forEach((pair, index) => {
    // Which numbers win ?
    let filtered = pair[0].filter((element) => {
      return pair[1].includes(element);
    });

    let subset = pairCount.slice(index + 1, index + 1 + filtered.length);
    subset = subset.map((item) => item + pairCount[index]);

    pairCount.splice(index + 1, subset.length, ...subset);
  });

  return pairCount.reduce((acc, value) => {
    return acc + value;
  }, 0);
};

const cardPairifier = (input: string): number[][][] => {
  const cardPairs: number[][][] = input.split("\n").map((line) => {
    return line
      .split(": ")[1]
      .split("|")
      .map((side) => {
        return side
          .split(" ")
          .filter(Number)
          .map((item) => parseInt(item));
      });
  });
  return cardPairs;
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
