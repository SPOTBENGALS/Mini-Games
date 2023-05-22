export function shuffle(array: number[]): number[] {
  return array.sort(() => Math.random() - 0.5);
}

export function generateRandomNumber(numberLength: number): number[] {
  const candidates = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  const pickedNumbers = shuffle(candidates).splice(0, numberLength);

  return pickedNumbers;
}
