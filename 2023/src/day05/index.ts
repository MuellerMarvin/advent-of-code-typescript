import run from "aocrunner";

const parseInput = (rawInput: string): { seeds: number[], convTables: number[][][] } => {
  let lines = rawInput.split('\n');

  // Seeds
  const seeds = lines[0].split(' ').splice(1).map((stringId: string) => {
    return parseInt(stringId);
  });

  // Extract sections of tables
  const sections = lines.slice(2).join('\n').split('\n\n').map((section=> {
    return section.split(':\n')[1];
  }));

  // Conversion Tables
  const convTables = sections.map((section) => {
    return section.split('\n').map((item) => item.split(' ').map((numString) => parseInt(numString)));
  })

  return { seeds, convTables }
};

const part1 = (rawInput: string): any => {
  const input = parseInput(rawInput);



  return;
};

const part2 = (rawInput: string): any => {
  const input = parseInput(rawInput);

  return;
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
