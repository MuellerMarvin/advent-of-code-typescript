import run from "aocrunner";

enum Direction {
  North = 0,
  East = 1,
  South = 2,
  West = 3,
}

const pipeSymbolToNumber: { [symbol: string]: number } = {
  S: 0,
  "|": 1,
  "-": 2,
  L: 3,
  J: 4,
  "7": 5,
  F: 6,
  ".": 7,
}

const pipeToArray: { [pipe: string]: Direction[] } = {
  "|": [Direction.North, Direction.South],
  "-": [Direction.West, Direction.East],
  L: [Direction.North, Direction.East],
  J: [Direction.North, Direction.West],
  "7": [Direction.South, Direction.West],
  F: [Direction.South, Direction.East],
  ".": [],
  S: [Direction.North, Direction.East, Direction.South, Direction.West],
};

const directionToArray: { [direction in Direction]: number[] } = {
  [Direction.North]: [-1, 0].slice(0),
  [Direction.East]: [0, 1].slice(0),
  [Direction.South]: [1, 0].slice(0),
  [Direction.West]: [0, -1].slice(0),
};

const directionInverse: { [direction in Direction]: Direction } = {
  [Direction.North]: Direction.South,
  [Direction.East]: Direction.West,
  [Direction.South]: Direction.North,
  [Direction.West]: Direction.East,
};

const parseInput = (rawInput: string) => {
  const lines: string[] = rawInput.split("\n");
  const grid = lines.map((line) => Array.from(line));
  return { grid, startPoint: getStartPoint(grid) };
};

const part1 = (rawInput: string): any => {
  const input = parseInput(rawInput);

  let loopLength = getTheLoopLength(input.grid, input.startPoint);

  return loopLength / 2;
};

const part2 = (rawInput: string): any => {
  const input = parseInput(rawInput);

  return;
};

const getTheLoopLength = (grid: string[][], startPoint: number[]) => {
  // All possible directions from the start-point
  for (let i = 0; i < 4; i++) {
    let loopLength = getLoopLengthInDirection(grid, startPoint, i);
    if (loopLength > 0) return loopLength;
  }
  return null;
};

const getLoopLengthInDirection = (
  grid: string[][],
  startPoint: number[],
  startDirection: Direction,
): number | null => {
  let nowPoint = startPoint;
  let nowDirection: Direction = startDirection;
  let loopLength = 0;

  console.log("New Loop");

  while (true) {
    let next = getNext(grid, nowPoint, nowDirection);
    if (next == null) break;
    nowPoint = next.nextPoint;
    nowDirection = next.nextDirection;
    loopLength++;
  }

  const endPipe = getPipe(grid, nowPoint);
  if (endPipe == null) return null; // Failed to loop
  if (endPipe == "S") return loopLength; // Loop complete !
};

const getMarkedGrid = (
  grid: string[][],
  startPoint: number[],
  startDirection: Direction,
): string[][] => {
  let nowPoint = startPoint;
  let nowDirection: Direction = startDirection;

  console.log("Marking Loop");

  while (true) {
    let next = getNext(grid, nowPoint, nowDirection);
    if (next == null) break;
    nowPoint = next.nextPoint;
    nowDirection = next.nextDirection;
    grid[nowPoint[0]][nowPoint[1]] = "X";
  }

  const endPipe = getPipe(grid, nowPoint);
  if (endPipe == null) return null; // Failed to loop
  if (endPipe == "S") return grid; // Loop complete !
};

const getStartPoint = (grid: string[][]): number[] | null => {
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] === "S") {
        return [i, j];
      }
    }
  }
  return null;
};

const getPipe = (grid: string[][], pos: number[]): string | null => {
  try {
    return grid[pos[0]][pos[1]];
  } catch {
    return null;
  }
};

const getNext = (
  grid: string[][],
  nowPoint: number[],
  nowDirection: Direction,
): {
  nextPoint: number[];
  nextDirection: Direction;
} | null => {
  // Calculate next point after step
  const nextPoint: number[] = nowPoint.map((value, index) => {
    return value + directionToArray[nowDirection][index];
  });

  // Verify new move
  const isMoveLegal = moveLegal(grid, nextPoint, nowDirection);
  if (!isMoveLegal) {
    return null;
  }

  // Get the direction that is not the entry-direction from the pipe by filtering it's direction list
  const pipe: string = getPipe(grid, nextPoint);
  const pipeArray: Direction[] = pipeToArray[pipe];
  const filteredDirections = pipeArray.filter(
    (value) => value != directionInverse[nowDirection],
  );
  const nextDirection: Direction = filteredDirections[0];

  return { nextPoint, nextDirection };
};

const moveLegal = (
  grid: string[][],
  nextPos: number[],
  entryDirection: Direction,
): boolean => {
  // Checks if pipe is in grid
  const pipe = getPipe(grid, nextPos);
  if (pipe == null) return false;

  // Checks if direction is legal
  const inverseDirection = directionInverse[entryDirection];
  const pipeArray: Direction[] = pipeToArray[pipe];
  const includesDirection = pipeArray.includes(inverseDirection);

  return includesDirection;
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
