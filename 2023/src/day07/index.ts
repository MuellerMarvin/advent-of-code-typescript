import run from "aocrunner";
import { getOccurences } from "../utils/index.js";

type hand = {
  set: number[];
  bet: number;
  type: SetType;
};

enum SetType {
  FiveOfAKind = 7,
  FourOfAKind = 6,
  FullHouse = 5,
  ThreeOfAKind = 4,
  TwoPair = 3,
  OnePair = 2,
  HighCard = 1,
}

const parseInput = (rawInput: string, joker: boolean): hand[] => {
  const lines: string[] = rawInput.split("\n");
  let values: any = lines.map((line) => line.split(" "));
  return values.map((line) => {
    let set = line[0].split("").map((value) => getCardValue(value));
    let bet = parseInt(line[1]);
    let type: SetType = getCardSetType(set, joker);

    return { set, bet, type };
  });
};

const part1 = (rawInput: string): any => {
  const input = parseInput(rawInput, false);
  const sortedHands: hand[] = sortHandsForValue(input, false);

  return sortedHands.reduce((prev, curr, index) => {
    return prev + curr.bet * (index + 1);
  }, 0);
};

const part2 = (rawInput: string): any => {
  const input = parseInput(rawInput, true);
  const hands = input.map((hand) => {
    hand.set.map((value) => {
      if (value == 11) {
        return 20;
      } else {
        return value;
      }
    });
  });

  const sortedHands: hand[] = sortHandsForValue(input, true);

  return sortedHands.reduce((prev, curr, index) => {
    return prev + curr.bet * (index + 1);
  }, 0);
};

const sortHandsForValue = (pairs: hand[], joker: boolean) => {
  return pairs.sort((handA, handB) => {
    // Sort by type
    if (handA.type != handB.type) {
      return handA.type - handB.type;
    }

    // Sort by first winning card
    return battleSets(handA.set, handB.set, joker);
  });
};

const battleSets = (setA: number[], setB: number[], joker: boolean) => {
  // If the joker is active, the card 11 is actually 1
  if (joker) {
    setA = setA.map((value) => (value == 11 ? 1 : 11));
    setB = setB.map((value) => (value == 11 ? 1 : 11));
  }
  for (let i: number = 0; i < setA.length; i++) {
    if (setA[i] != setB[i]) {
      return setA[i] - setB[i];
    }
  }
  return 0;
};

const getCardValue = (card: string): number => {
  switch (card) {
    case "A":
      return 14;
    case "K":
      return 13;
    case "Q":
      return 12;
    case "J":
      return 11;
    case "T":
      return 10;
    default:
      return parseInt(card);
  }
};

function* jokerGen(length: number): Generator<number[], void, unknown> {
  const array = [2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 13, 14];
  let result = new Array(length).fill(0); // Initialize with indices of the first element

  while (true) {
    // Yield the current combination
    yield result.map(i => array[i]);

    // Find the rightmost element that can be incremented
    let i = length - 1;
    while (i >= 0 && result[i] === array.length - 1) {
      i--;
    }

    // If all elements are at their maximum value, we're done
    if (i < 0) return;

    // Increment the current element and reset all elements to the right
    result[i]++;
    for (let j = i + 1; j < length; j++) {
      result[j] = 0;
    }
  }
}


const getCardSetType = (cardSet: number[], joker: boolean): SetType => {
  const occurences = getOccurences(cardSet);
  const sortedValues = [...occurences.values()].sort((a, b) => b - a);

  // Try joker combinations
  if (joker && occurences.has(11)) {
    let highestType = SetType.HighCard;
    const gen = jokerGen(occurences.get(11));
    let baseSet = cardSet.sort((a, b) => {
      if (a == 11) {
        return 1;
      }
      if (b == 11) {
        return -1;
      }
      return 0;
    }).slice(0, -occurences.get(11));

    for (const genVal of gen) {
      const tempSet = [...baseSet, ...genVal];
      const tempType = getCardSetType(tempSet, false);
      if(tempType > highestType) {
        highestType = getCardSetType(tempSet, false);
      }
    }

    return highestType;
  }

  [...occurences.entries()].length;

  // Five of a kind
  if (sortedValues.length == 1) {
    return SetType.FiveOfAKind;
  }

  // Four of a kind
  if (sortedValues[0] == 4) {
    return SetType.FourOfAKind;
  }

  // Full House
  if (sortedValues.length == 2) {
    return SetType.FullHouse;
  }

  // Three of a kind
  if (sortedValues.length === 3 && sortedValues[0] == 3) {
    return SetType.ThreeOfAKind;
  }

  // Two pair
  if (
    sortedValues.length === 3 &&
    sortedValues[0] === 2 &&
    sortedValues[1] === 2
  ) {
    return SetType.TwoPair;
  }

  // One pair
  if (sortedValues.length == 4 && sortedValues[0] === 2) {
    return SetType.OnePair;
  }

  // High card
  return SetType.HighCard;
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
