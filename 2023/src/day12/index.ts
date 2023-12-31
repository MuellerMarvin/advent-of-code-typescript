import run from "aocrunner";
import { validateHeaderName } from "http";

const parseInput = (rawInput: string) => {
  const lines: string[] = rawInput.split("\n");
  const sides: string[][] = lines.map((line) => line.split(" "));

  const templates: number[][] = sides.map((side) => {
    return side[0].split("").map((char) => {
      switch (char) {
        case "?":
          return -1;
        case "#":
          return 1;
        case ".":
          return 0;
        default:
          throw Error("What is this symbol ?!: " + ">" + char + "<");
      }
    });
  });

  const counts: number[][] = sides.map((side) => {
    return side[1].split(",").map((value) => parseInt(value));
  });
  return { templates, counts };
};

const part1 = (rawInput: string): any => {
  const input = parseInput(rawInput);
  if (input.templates.length > 1000) return 69;

  const combinationCounts = input.templates.map((template, index) => {
    const combinations = getGenerallyValidConfigs(
      template.length,
      input.counts[index],
    ).filter((combination) => {
      return isValidForBlanks(combination, template);
    });

    return combinations.length;
  });

  return combinationCounts.reduce((prev, acc) => {
    return prev + acc;
  }, 0);
};

const part2 = (rawInput: string): any => {
  const input = parseInput(rawInput);

  const templates = input.templates.map((template) => {
    return [...template, ...template, ...template, ...template, ...template];
  });
  const counts = input.counts.map((count) => {
    return [...count, ...count, ...count, ...count, ...count];
  });

  const combinationCountsPromise = Promise.all(
    templates.map((template, index) =>
      getValidCombinationCount(template, counts[index], index),
    ),
  );

  combinationCountsPromise.then((combinationCounts) => {
    const count = combinationCounts.reduce((prev, acc) => {
      return prev + acc;
    }, 0);
    return count;
  });
};

const getValidCombinationCount = async (
  template: number[],
  counts: number[], id: number
): Promise<number> => {
  const wildcardCount = template.filter((value) => value == -1).length;
  const comboGen = combinationGenerator(wildcardCount);
  let comboCount = 0;

  for(let combination of comboGen) {
    let tempCounts = getCountsOfLine(fillWildcards(template, combination));
    if(counts.every((value, index) => {
      return tempCounts[index] == value;
    })) {
      comboCount++;
    }
  }
  console.log("Done " + id)
  return comboCount;
};

const fillWildcards = (template: number[], fillers: number[]): number[] => {
  const copyTemplate = template.map((value) => value);
  let filled = 0;
  for (let i = 0; i < copyTemplate.length; i++) {
    if(copyTemplate[i] === -1) {
      copyTemplate[i] = fillers[filled];
      filled++;
    }
  }
  return template;
}

function* combinationGenerator(length: number): Generator<number[]> {
  const totalCombinations = Math.pow(2, length);
  const combinations: number[][] = [];

  for (let i = 0; i < totalCombinations; i++) {
      const combo: number[] = [];
      for (let j = 0; j < length; j++) {
          // Shift and mask to get the bit at position j
          combo.push((i >> j) & 1);
      }
      yield(combo)
  }
}

const isValidForBlanks = (
  combination: number[],
  template: number[],
): boolean => {
  // This should never ever happen is used properly
  if (combination.length != template.length) {
    throw new Error("You produced spaghetti code.");
  }

  return template.every((templateValue, index) => {
    if (templateValue == -1) {
      return true;
    }
    if (templateValue == combination[index]) {
      return true;
    }
    return false;
  });
};

const getGenerallyValidConfigs = (lineLength: number, counts: number[]) => {
  const combinations: number[][] = generateCombinations(lineLength);
  const combinationCounts: number[][] = combinations.map((combination) => {
    return getCountsOfLine(combination);
  });

  const combinationsWithRightLength = combinations.filter(
    (combination, index) => {
      if (combinationCounts[index].length === counts.length) {
        return true;
      }
      return false;
    },
  );

  return combinationsWithRightLength.filter((combination) => {
    return getCountsOfLine(combination).every(
      (value, index) => value == counts[index],
    );
  });
};

const getCountsOfLine = (line: number[]) => {
  let counts = [];

  let sectionLength = 0;
  for (let i = 0; i < line.length; i++) {
    if (line[i] == 1) {
      sectionLength++;
      continue;
    }
    if (line[i] == 0 && sectionLength != 0) {
      counts.push(sectionLength);
      sectionLength = 0;
    }
  }
  if (sectionLength != 0) {
    counts.push(sectionLength);
  }
  return counts;
};

const generateCombinations = (length: number): number[][] => {
  const result: string[] = [];

  function generate(current: string) {
    if (current.length === length) {
      result.push(current);
      return;
    }
    generate(current + "0");
    generate(current + "1");
  }

  generate("");
  return result.map((combination) =>
    combination.split("").map((value) => parseInt(value)),
  );
};

run({
  part1: {
    tests: [
      {
        input: `???.### 1,1,3\n.??..??...?##. 1,1,3\n?#?#?#?#?#?#?#? 1,3,1,6\n????.#...#... 4,1,1\n????.######..#####. 1,6,5\n?###???????? 3,2,1`,
        expected: 21,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `???.### 1,1,3\n.??..??...?##. 1,1,3\n?#?#?#?#?#?#?#? 1,3,1,6\n????.#...#... 4,1,1\n????.######..#####. 1,6,5\n?###???????? 3,2,1`,
        expected: 525152,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
