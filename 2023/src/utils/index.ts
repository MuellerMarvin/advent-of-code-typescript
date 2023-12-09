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
