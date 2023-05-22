export const STAGE_WIDTH = 8;
export const STAGE_HEIGHT = 8;
export const ANIMALS = ["😺", "🐔", "🐸", "🐵", "🐼", "🐷"];

export const NumberstoCheck = () => {
  const notValidinThree: number[] = [];

  for (let i = 1; i < STAGE_HEIGHT + 1; i++) {
    notValidinThree.push(STAGE_WIDTH * i - 2);
    notValidinThree.push(STAGE_WIDTH * i - 1);
  }

  const notValidinFour: number[] = [];

  for (let i = 1; i < STAGE_HEIGHT + 1; i++) {
    notValidinFour.push(STAGE_WIDTH * i - 3);
    notValidinFour.push(STAGE_WIDTH * i - 2);
    notValidinFour.push(STAGE_WIDTH * i - 1);
  }

  const notValidinFive: number[] = [];

  for (let i = 1; i < STAGE_HEIGHT + 1; i++) {
    notValidinFour.push(STAGE_WIDTH * i - 4);
    notValidinFour.push(STAGE_WIDTH * i - 3);
    notValidinFour.push(STAGE_WIDTH * i - 2);
    notValidinFour.push(STAGE_WIDTH * i - 1);
  }

  const firstRow: number[] = [];

  for (let i = 0; i < STAGE_WIDTH; i++) {
    firstRow.push(i);
  }

  return { notValidinThree, notValidinFour, notValidinFive, firstRow };
};
