import run from "aocrunner";
import { removeStr } from "../utils/index.js";

const parseInput = (rawInput: string): Input => {
  const lines = rawInput
    .split(" = (")
    .join()
    .split(")")
    .join("")
    .split(", ")
    .join()
    .split("\n");
  const instructions: string[] = Array.from(lines.slice(0, 2)[0]);

  const nodes: string[][] = lines.slice(2).map((line) => line.split(","));

  return { instructions, nodes };
};

type Input = {
  instructions: string[];
  nodes: string[][];
};

const part1 = (rawInput: string): any => {
  const input = parseInput(rawInput);
  const startNode = "AAA";
  const destinationNode = "ZZZ";

  let node = startNode;
  let instructions = cycleArray(input.instructions);
  let jumpCount = 0;
  while (node != destinationNode) {
    let nodeArray = input.nodes.find((line) => line[0] == node);
    if (instructions.next().value == "L") {
      node = nodeArray[1];
    } else {
      node = nodeArray[2];
    }

    jumpCount++;
  }
  return jumpCount;
};

const part2 = (rawInput: string): any => {
  const input = parseInput(rawInput);

  let nodes: string[] = input.nodes
    .filter((node) => node[0].endsWith("A"))
    .map((node) => node[0]);

  const cycleLengths: number[] = nodes.map((node) => {
    const instructions = cycleArray(input.instructions);
    let jumps = 0;

    while (!node.endsWith("Z")) {
      jumps++;
      let nodeArray = input.nodes.find((line) => line[0] == node);
      if (instructions.next().value == "L") {
        node = nodeArray[1];
      } else {
        node = nodeArray[2];
      }
    }
    return jumps;
  });

  return cycleLengths.reduce((acc, val) => lcm(acc, val), 1);
};

function gcd(a: number, b: number): number {
  while (b !== 0) {
    let temp = b;
    b = a % b;
    a = temp;
  }
  return a;
}

function lcm(a: number, b: number): number {
  return Math.abs(a * b) / gcd(a, b);
}

function* cycleArray(items: string[]) {
  while (true) {
    yield* items;
  }
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
