import run from "aocrunner";
import { stat } from "fs";

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
};

const pipeToArray: { [pipe: number]: Direction[] } = {
  0: [Direction.North, Direction.East, Direction.South, Direction.West],
  1: [Direction.North, Direction.South],
  2: [Direction.West, Direction.East],
  3: [Direction.North, Direction.East],
  4: [Direction.North, Direction.West],
  5: [Direction.South, Direction.West],
  6: [Direction.South, Direction.East],
  7: [],
  8: [],
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
  const stringGrid = lines.map((line) => Array.from(line));
  const numberGrid: number[][] = stringGrid.map((line) => {
    return line.map((value) => {
      return pipeSymbolToNumber[value];
    });
  });
  return { grid: numberGrid, startPoint: getStartPoint(numberGrid) };
};

const part1 = (rawInput: string): any => {
  const input = parseInput(rawInput);

  let loopLength = getTheLoopLength(input.grid, input.startPoint);

  return loopLength / 2;
};

const part2 = (rawInput: string): any => {
  const input = parseInput(rawInput);
  const grid = input.grid;
  const startPoint = input.startPoint;

  let direction: Direction = 0;

  // Determine direction of loop
  for (let i = 0; i < 4; i++) {
    direction = i;
    let loopLength = getLoopLengthInDirection(grid, startPoint, direction);
    if (loopLength > 2) break;
  }

  replaceStartSymbol(grid, startPoint);

  
  const markedGrid = getMarkedGrid([...grid], startPoint, direction);

  let innerCount = 0;
  let oldCount = 0;
  for (let i = 0; i < markedGrid.length; i++) {
    for (let j = 0; j < markedGrid[i].length; j++) {
      if (markedGrid[i][j] == 8) {
        continue; // It's a border, continue with next
      }

      let counts = [0, 0, 0, 0];
      let verticalSet: number[] = ["-", "L", "J"].map(
        (value) => pipeSymbolToNumber[value],
      );
      let horizontalSet: number[] = ["|", "J", "7"].map(
        (value) => pipeSymbolToNumber[value],
      );
      // Check north
      for (let k = i + 1; k < markedGrid.length; k++) {
        if (markedGrid[k][j] === 8 && verticalSet.includes(grid[k][j])) {
          counts[0]++;
        }
      }
      // Check south
      let southCount = 0;
      for (let k = i + 1; k < markedGrid.length; k++) {
        if (markedGrid[k][j] === 8 && verticalSet.includes(grid[k][j])) {
          counts[1]++;
        }
      }

      // Check west
      counts[2] = markedGrid[i]
        .slice(0, j)
        .filter((value) => horizontalSet.includes(value))
        .reduce((prev, num) => {
          if (num === 8) {
            return prev + 1;
          }
          return prev;
        }, 0);
      // Check east
      counts[3] = markedGrid[i]
        .slice(j + 1)
        .filter((value) => horizontalSet.includes(value))
        .reduce((prev, num) => {
          if (num === 8) {
            return prev + 1;
          }
          return prev;
        }, 0);

      // Decision
      //if((counts[0] % 2 === 0 && counts[1] % 2 === 0 )|| (counts[2] % 2 === 0 && counts[3] % 2 === 0 )) {
      const countSum = counts.reduce((prev, value) => {
        return prev + value;
      }, 0);

      if (counts.filter(value => value % 2 !== 0).length > 0) {
        innerCount++;
      }
    }
  }
  return innerCount;
};

const getTheLoopLength = (grid: number[][], startPoint: number[]) => {
  // All possible directions from the start-point
  for (let i = 0; i < 4; i++) {
    let loopLength = getLoopLengthInDirection(grid, startPoint, i);
    if (loopLength > 0) return loopLength;
  }
  return null;
};

const getLoopLengthInDirection = (
  grid: number[][],
  startPoint: number[],
  startDirection: Direction,
): number | null => {
  let nowPoint = startPoint;
  let nowDirection: Direction = startDirection;
  let loopLength = 0;

  console.log("New Loop");

  while (true) {
    let next = getNext(grid, nowPoint, nowDirection);
    if (next === null) break;
    nowPoint = next.nextPoint;
    nowDirection = next.nextDirection;
    loopLength++;
    if (loopLength > 20000) {
      return null;
    }
  }

  const endPipe = getPipe(grid, nowPoint);
  if (endPipe === null) return null; // Failed to loop
  if (endPipe === 0) return loopLength; // Loop complete !
};

const getMarkedGrid = (
  inputGrid: number[][],
  startPoint: number[],
  startDirection: Direction,
): number[][] | null => {
  let nowPoint = startPoint;
  let nowDirection: Direction = startDirection;

  console.log("Marking Loop");
  // clone array so you don't modify the input
  let grid = [];
  for (let i = 0; i < inputGrid.length; i++) {
    grid.push([]);
    for (let j = 0; j < inputGrid[i].length; j++) {
      grid[i].push(inputGrid[i][j]);
    }
  }

  while (true) {
    let next = getNext(grid, nowPoint, nowDirection);
    if (next === null) break;
    nowPoint = next.nextPoint;
    nowDirection = next.nextDirection;
    grid[nowPoint[0]][nowPoint[1]] = 8;
  }

  const endPipe = getPipe(grid, nowPoint);
  if (endPipe === null) return null; // Failed to loop
  if (endPipe === 8) {
    return grid;
  } // Loop complete !
};

const getStartPoint = (grid: number[][]): number[] | null => {
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] === 0) {
        return [i, j];
      }
    }
  }
  return null;
};

const getPipe = (grid: number[][], pos: number[]): number | null => {
  try {
    return grid[pos[0]][pos[1]];
  } catch {
    return null;
  }
};

const getNext = (
  grid: number[][],
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
  const pipe: number = getPipe(grid, nextPoint);
  const pipeArray: Direction[] = pipeToArray[pipe];
  const filteredDirections = pipeArray.filter(
    (value) => value != directionInverse[nowDirection],
  );
  const nextDirection: Direction = filteredDirections[0];

  return { nextPoint, nextDirection };
};

const moveLegal = (
  grid: number[][],
  nextPos: number[],
  entryDirection: Direction,
): boolean => {
  // Checks if pipe is in grid
  const pipe = getPipe(grid, nextPos);
  if (pipe === null) return false;

  // Checks if direction is legal
  const inverseDirection = directionInverse[entryDirection];
  const pipeArray: Direction[] = pipeToArray[pipe];
  if (pipeArray === undefined) {
    return false;
  }
  const includesDirection = pipeArray.includes(inverseDirection);

  return includesDirection;
};

const replaceStartSymbol = (grid: number[][], startPoint: number[]) => {
  let directions = [];
  for (let i = 0; i < 4; i++) {
    if(getLoopLengthInDirection(grid, startPoint, i) > 1) {
      directions.push(i);
    }
  }

  for (let i = 1; i < 7; i++) {
    const pipeArray = pipeToArray[i];

    if(pipeArray.filter((value) => directions.includes(value)).length == 2) {
      grid[startPoint[0]][startPoint[1]] = pipeSymbolToNumber[i];
      return;
    }
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
