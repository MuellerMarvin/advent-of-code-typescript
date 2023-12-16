import run from "aocrunner";
import { dir } from "console";
import { createGrid, dualMap } from "../utils/index.js";

const parseInput = (rawInput: string) => {
  const lines: string[] = rawInput.split("\n");
  return lines;
};

enum Direction {
  Up = 0,
  Right = 1,
  Down = 2,
  Left = 3,
}

type Beam = {
  origin: number[];
  direction: Direction;
};

const compareBeams = (beamA: Beam, beamB: Beam) => {
  return (beamA.direction === beamB.direction && beamA.origin[0] == beamB.origin[0] && beamA.origin[1] == beamB.origin[1]);
}

const part1 = (rawInput: string): any => {
  const input = parseInput(rawInput);
  const grid = input.map((line) => line.split(""));
  let beamArchive: Beam[] = [];
  let beams: Beam[] = [{ direction: Direction.Right, origin: [0, -1] }];
  let energized: number[][] = createGrid(grid.length, grid[0].length, 0);

  // Work through queue
  while (beams.length > 0) {
    let beam: Beam = beams.pop();

    let beamResult: BeamResult = fireBeam(beam, grid);
    let nextBeams = beamResult.nextBeams.filter((nextBeam) => {
      return beamArchive.every((beam) => !compareBeams(beam, nextBeam));
    });
    beams = beams.concat(nextBeams);
    beamArchive = beamArchive.concat(nextBeams);
    energized = dualMap(energized, beamResult.energized, (a, b) => a + b);
  }

  let energizedCount = 0;
  energized.forEach((line) =>
    line.forEach((value) => {
      if (value > 0) energizedCount++;
    }),
  );
  return energizedCount;
};

const part2 = (rawInput: string): any => {
  const input = parseInput(rawInput);
  return;
};

type BeamResult = {
  energized: number[][];
  nextBeams: Beam[];
};

const fireBeam = (beam: Beam, grid: string[][]): BeamResult => {
  let pointer = movePointerInDir(beam.origin, beam.direction); // Move to first position
  let energized: number[][] = createGrid(grid.length, grid[0].length, 0);
  while (pointerInGrid(pointer, grid)) {
    // Energize
    energized[pointer[0]][pointer[1]]++;

    // Check what action to do this move
    let nextBeams: Beam[] = getNextBeams(
      grid[pointer[0]][pointer[1]],
      beam.direction,
      pointer,
    );

    // If new beams are created, this one is irrelevant !
    if (nextBeams.length > 0) {
      return { energized, nextBeams };
    }

    // Move pointer for next move
    pointer = movePointerInDir(pointer, beam.direction);
  }

  return { energized, nextBeams: [] };
};

const getNextBeams = (
  gridString: string,
  direction: Direction,
  pointer: number[],
): Beam[] => {
  const isUpDown: boolean = direction % 2 == 0;
  switch (gridString) {
    case "|": {
      if (isUpDown) {
        return [];
      }
      return [
        { direction: Direction.Up, origin: pointer },
        { direction: Direction.Down, origin: pointer },
      ];
    }
    case "-": {
      if (!isUpDown) {
        return [];
      }
      return [
        { direction: Direction.Left, origin: pointer },
        { direction: Direction.Right, origin: pointer },
      ];
    }
    case "/": {
      return [
        { direction: changeDirection(direction, isUpDown), origin: pointer }, // ChangeDirection decides reflection direction
      ];
    }
    case "\\": {
      return [
        { direction: changeDirection(direction, !isUpDown), origin: pointer },
      ];
    }
  }
  return []; // case '.'
};

const movePointerInDir = (
  pointer: number[],
  direction: Direction,
): number[] => {
  switch (direction) {
    case Direction.Up:
      pointer[0]--;
      break;
    case Direction.Right:
      pointer[1]++;
      break;
    case Direction.Down:
      pointer[0]++;
      break;
    case Direction.Left:
      pointer[1]--;
      break;
  }
  return pointer;
};

const pointerInGrid = (pointer: number[], grid: string[][]) => {
  return (
    pointer[0] > -1 &&
    pointer[1] > -1 &&
    pointer[0] < grid.length &&
    pointer[1] < grid[pointer[0]].length
  );
};

const changeDirection = (direction: Direction, goRight: boolean): Direction => {
  if (goRight) {
    return (direction + 1) % 3;
  } else {
    if (direction == 0) {
      return 3;
    } else {
      return direction - 1;
    }
  }
};

run({
  part1: {
    tests: [
      {
        input: `.|...\\....\n|.-.\\.....\n.....|-...\n........|.\n..........\n.........\\\n..../.\\\\..\n.-.-/..|..\n.|....-|.\\\n..//.|....`,
        expected: 46,
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
