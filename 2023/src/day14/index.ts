import run from "aocrunner";

const parseInput = (rawInput: string) => {
  const lines: string[] = rawInput.split("\n");
  return lines.map((line) => line.split(""));
};

const part1 = (rawInput: string): any => {
  const input = parseInput(rawInput);
  let lines = input;

  // Move
  for (let i = 0; i < lines.length + 5; i++) {
    lines = moveRocksNorth(lines);
  }

  // Count
  lines = lines.reverse();
  let count = 0;
  lines.forEach((line, lineIndex) => {
    line.forEach((char) => {
      if(char == 'O') {
        count += lineIndex + 1;
      }
    })
  });

  return count;
};

const part2 = (rawInput: string): any => {
  const input = parseInput(rawInput);

  return;
};

const moveRocksNorth = (lines: string[][]) => {
  for (let lineIndex = 1; lineIndex < lines.length; lineIndex++) {
    lines[lineIndex].forEach((char, charIndex) => {
      if (char !== "O") return;
      if (lines[lineIndex - 1][charIndex] == ".") {
        lines[lineIndex - 1][charIndex] = "O";
        lines[lineIndex][charIndex] = ".";
      }
    });
  }
  return lines;
};

run({
  part1: {
    tests: [
      {
        input: `O....#....
        O.OO#....#
        .....##...
        OO.#O....O
        .O.....O#.
        O.#..O.#.#
        ..O..#O..O
        .......O..
        #....###..
        #OO..#....`,
        expected: 136,
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
