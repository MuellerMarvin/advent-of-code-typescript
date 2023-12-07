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
  for (let i: number = 0; i < setA.length; i++) {
    if (setA[i] != setB[i]) {
      if(joker && setA[i] == 11)
      {
        return 1
      }
      if(joker && setB[i] == 11) {
        return -1;
      }
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

const getCardSetType = (cardSet: number[], joker: boolean): SetType => {
  const occurences = getOccurences(cardSet);
  const sortedValues = [...occurences.values()].sort((a, b) => b - a);
  joker = (joker && occurences.has(11));

  [...occurences.entries()].length

  // Five of a kind
  if (sortedValues.length == 1) {
    return SetType.FiveOfAKind;
  }

  // Four of a kind
  if (sortedValues[0] == 4) {
    if(joker) return SetType.FiveOfAKind;
    return SetType.FourOfAKind;
  }

  // Full House
  if (sortedValues.length == 2) {
    if(joker) return SetType.FiveOfAKind;
    return SetType.FullHouse;
  }

  // Three of a kind
  if (sortedValues.length === 3 && sortedValues[0] == 3) {
    if(joker) return SetType.FourOfAKind;
    return SetType.ThreeOfAKind;
  }

  // Two pair
  if (
    sortedValues.length === 3 &&
    sortedValues[0] === 2 &&
    sortedValues[1] === 2
  ) {
    if(joker) {
      if(occurences.get(11) == 1)
      {
        return SetType.ThreeOfAKind;
      }
      else {
        return SetType.FourOfAKind;
      }
    }
    return SetType.TwoPair;
  }

  // One pair
  if (sortedValues.length == 4 && sortedValues[0] === 2) {
    if(joker) return SetType.ThreeOfAKind;
    return SetType.OnePair;
  }

  // High card
  if(joker) return SetType.OnePair;
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
