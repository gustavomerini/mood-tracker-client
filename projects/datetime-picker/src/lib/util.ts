export function pick<T, K extends keyof T>(
  obj: T,
  ...keys: Array<K>
): Pick<T, K> {
  return keys.reduce((acc, k) => ({ ...acc, [k]: obj[k] }), { } as Pick<T, K>);
}

export function range(num: number, start: number = 0): Array<number> {
  const r = [...Array(num).keys()];
  if (start !== 0) {
    return r.map(n => n + start);
  }
  return r;
}

