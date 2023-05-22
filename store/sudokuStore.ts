import create from "zustand";
import moment from "moment";

interface SudokuStoreType {
  // 현재 선택된 숫자
  numberSelected: string;
  setNumberSelected: any;
  // 현재 보드 Array
  sudokuArray: string[];
  setSudokuArray: any;
  // 선택된 cell 위치
  cellSelected: number;
  setCellSelected: any;
  // 세팅 Array
  initArray: string[];
  setInitArray: any;
  // fastMode
  fastMode: boolean;
  setFastMode: any;
  // 난이도
  difficulty: string;
  setDifficulty: any;
  // 클리어
  won: boolean;
  setWon: any;
  // 시간 기준
  timeStarted: moment.Moment;
  setTimeStarted: any;
}

const SudokuStore = create<SudokuStoreType>((set) => ({
  numberSelected: "0",
  setNumberSelected: (number: string) => set({ numberSelected: number }),
  sudokuArray: [],
  setSudokuArray: (array: string[]) => set({ sudokuArray: array }),
  cellSelected: -1,
  setCellSelected: (cell: number) => set({ cellSelected: cell }),
  initArray: [],
  setInitArray: (array: string[]) => set({ initArray: array }),
  fastMode: false,
  setFastMode: (mode: boolean) => set({ fastMode: mode }),
  difficulty: "Easy",
  setDifficulty: (difficulty: string) => set({ difficulty: difficulty }),
  won: false,
  setWon: (isWon: boolean) => set({ won: isWon }),
  timeStarted: moment(),
  setTimeStarted: (timeStarted: moment.Moment) => set({ timeStarted: timeStarted }),
}));

export default SudokuStore;
