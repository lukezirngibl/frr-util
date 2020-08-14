import { some, none, Option } from 'fp-ts/lib/Option'

export const keys = <A extends Record<string, unknown>, K extends keyof A>(
  x: A,
): Array<K> => Object.keys(x) as Array<K>

export const capitalizeFirstLetter = (string: string) =>
  string.charAt(0).toUpperCase() + string.slice(1)

export const convertObjToString = (obj: { [k: string]: string }) =>
  Object.keys(obj).reduce((s, k) => `${s}${obj[k]}`, '')

export const convertStringToObj = (str: string): { [k: string]: string } =>
  str
    .split('')
    .reduce((obj: any, n: string, i: number) => ({ ...obj, [`${i}`]: n }), {})

export const groupArrayBy = <T,>(
  array: T[],
  key: keyof T & string,
): { [k: string]: T[] } =>
  array.reduce((grouped: { [k: string]: T[] }, level: any) => {
    return {
      ...grouped,
      [level[key]]: [...(grouped[level[key]] || []), level],
    }
  }, {})

export const replaceAt = (str: string, index: number) => (
  replacement: string,
) => {
  return (
    str.substr(0, index) + replacement + str.substr(index + replacement.length)
  )
}

export const groupObjectBy = <T,>(
  obj: { [k: string]: T },
  key: keyof T & string,
): { [k: string]: T[] } =>
  Object.keys(obj).reduce((grouped: { [k: string]: T[] }, objKey: string) => {
    return {
      ...grouped,
      [(obj[objKey][key] as unknown) as string]: [
        ...(grouped[(obj[objKey][key] as unknown) as string] || []),
        obj[objKey],
      ],
    }
  }, {})

export const find = <T,>(array: T[], f: (i: T) => boolean): Option<T> => {
  for (let i = 0; i < array.length; i++) {
    if (f(array[i])) {
      return some(array[i])
    }
  }
  return none
}

export const convertArrayToObject = <T,>(
  array: Array<T>,
  key: keyof T & string,
): { [k: string]: T } =>
  array.reduce(
    (obj: { [k: string]: T }, i: any) => ({
      ...obj,
      [i[key]]: i,
    }),
    {},
  )

export const findIndex = <T,>(
  array: Array<T>,
  f: (a: T) => boolean,
): Option<number> => {
  for (let i = 0; i < array.length; i++) {
    if (f(array[i])) {
      return some(i)
    }
  }

  return none
}

export const wait = (ms: number) =>
  new Promise(resolve => setTimeout(() => resolve('timed-out'), ms))
