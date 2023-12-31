/**
 * Root for your util libraries.
 *
 * You can import them in the src/template/index.ts,
 * or in the specific file.
 *
 * Note that this repo uses ES Modules, so you have to explicitly specify
 * .js extension (yes, .js not .ts - even for TypeScript files)
 * for imports that are not imported from node_modules.
 *
 * For example:
 *
 *   correct:
 *
 *     import _ from 'lodash'
 *     import myLib from '../utils/myLib.js'
 *     import { myUtil } from '../utils/index.js'
 *
 *   incorrect:
 *
 *     import _ from 'lodash'
 *     import myLib from '../utils/myLib.ts'
 *     import { myUtil } from '../utils/index.ts'
 *
 *   also incorrect:
 *
 *     import _ from 'lodash'
 *     import myLib from '../utils/myLib'
 *     import { myUtil } from '../utils'
 *
 */

export const getOccurences = <arrayType>(array: arrayType[]) => {
  let occurences = new Map<arrayType, number>();
  array.forEach((value) => {
    if (occurences.has(value)) {
      occurences.set(value, occurences.get(value) + 1);
    } else {
      occurences.set(value, 1);
    }
  });
  return occurences;
};

export const removeStr = (input: string, remove: string[]): string => {
  remove.forEach((value) => {
    input = input.replace(value, '');
  });
  return input;
}

export const getColumn = <arrayType>(input:arrayType[][], columnIndex: number):arrayType[] => {
  let output: arrayType[] = []
  for (let i = 0; i < input.length; i++) {
    output.push(input[i][columnIndex]);
  }
  return output;
}


export const getColumnReversed = <arrayType>(input:arrayType[][], columnIndex: number):arrayType[] => {
  let output: arrayType[] = []
  for (let i = (input.length - 1); i >= 0; i--) {
    output.push(input[i][columnIndex]);
  }
  return output;
}

/**
 * Returns a two dimensional array with the callback function applied to each element
 * @param arrayA Array for elementA
 * @param arrayB Array for elementB
 * @param callback The function applied to each element pair
 */
export const dualMap = <Type>(
  arrayA: Type[][],
  arrayB: Type[][],
  callback: (elementA: Type, elementB: Type) => Type,
): Type[][] => {
  return arrayA.map((line, lineIndex) =>
    line.map((element, elementIndex) =>
      callback(element, arrayB[lineIndex][elementIndex]),
    ),
  );
};

export const createGrid = <Type>(x: number, y: number, startValue: Type):Type[][]  => {
  let array: Type[][] = new Array(x);

  for (let i = 0; i < x; i++) {
    array[i] = new Array(y).fill(startValue);
  }

  return array;
};
