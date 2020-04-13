export function pick<T, K extends keyof T>(
  obj: T,
  ...keys: Array<K>
): Pick<T, K> {
  return keys.reduce((acc, k) => ({ ...acc, [k]: obj[k] }), {} as Pick<T, K>);
}

export function range(n: number, start: number = 0): Array<number> {
  const range = [...Array(n).keys()];
  if (start !== 0) {
    return range.map(n => n + start);
  }
  return range;
}

