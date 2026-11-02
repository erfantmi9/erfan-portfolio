export type AlgorithmId = "bubble" | "insertion" | "selection";

export interface SortStep {
  values: readonly number[];
  /** Indices being compared, if any. */
  pair: readonly [number, number] | null;
  swapped: boolean;
}

export const algorithmIds: readonly AlgorithmId[] = ["bubble", "insertion", "selection"];

export const complexity: Record<AlgorithmId, string> = {
  bubble: "O(n²)",
  insertion: "O(n²)",
  selection: "O(n²)",
};

/** Deterministic PRNG so server and client render the same initial array. */
function mulberry32(seed: number): () => number {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function createArray(size: number, seed: number): number[] {
  const rand = mulberry32(seed);
  const values = Array.from({ length: size }, (_, i) => i + 1);
  for (let i = values.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [values[i], values[j]] = [values[j] as number, values[i] as number];
  }
  return values;
}

/** Pure: input is never mutated; returns every observable step including the initial state. */
export function buildSteps(algorithm: AlgorithmId, input: readonly number[]): SortStep[] {
  const a = [...input];
  const steps: SortStep[] = [{ values: [...a], pair: null, swapped: false }];
  const record = (pair: [number, number] | null, swapped: boolean) =>
    steps.push({ values: [...a], pair, swapped });
  const swap = (i: number, j: number) => {
    [a[i], a[j]] = [a[j] as number, a[i] as number];
  };
  const n = a.length;

  if (algorithm === "bubble") {
    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        const out = (a[j] as number) > (a[j + 1] as number);
        if (out) swap(j, j + 1);
        record([j, j + 1], out);
      }
    }
  } else if (algorithm === "insertion") {
    for (let i = 1; i < n; i++) {
      for (let j = i; j > 0; j--) {
        const out = (a[j - 1] as number) > (a[j] as number);
        if (out) swap(j - 1, j);
        record([j - 1, j], out);
        if (!out) break;
      }
    }
  } else {
    for (let i = 0; i < n - 1; i++) {
      let min = i;
      for (let j = i + 1; j < n; j++) {
        record([min, j], false);
        if ((a[j] as number) < (a[min] as number)) min = j;
      }
      if (min !== i) {
        swap(i, min);
        record([i, min], true);
      }
    }
  }

  steps.push({ values: [...a], pair: null, swapped: false });
  return steps;
}
