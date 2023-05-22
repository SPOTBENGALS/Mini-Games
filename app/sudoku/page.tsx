"use client";

import { useEffect, useState } from "react";
import SudokuBoard from "./board";
import SudokuStatus from "./status";
import Footer from "../../components/footer";
import moment from "moment";
import { getSudokuGame } from "./libCustom";
import SudokuStore from "../../store/sudokuStore";
import styles from "@styles/Sudoku.module.scss";

export default function Sudoku() {
  let sudokuArray = SudokuStore((state) => state.sudokuArray);
  let setSudokuArray = SudokuStore((state) => state.setSudokuArray);
  let cellSelected = SudokuStore((state) => state.cellSelected);
  let setCellSelected = SudokuStore((state) => state.setCellSelected);
  let initArray = SudokuStore((state) => state.initArray);
  let setInitArray = SudokuStore((state) => state.setInitArray);
  let fastMode = SudokuStore((state) => state.fastMode);
  let setFastMode = SudokuStore((state) => state.setFastMode);
  let numberSelected = SudokuStore((state) => state.numberSelected);
  let setNumberSelected = SudokuStore((state) => state.setNumberSelected);
  let difficulty = SudokuStore((state) => state.difficulty);
  let setDifficulty = SudokuStore((state) => state.setDifficulty);
  let setTimeStarted = SudokuStore((state) => state.setTimeStarted);
  let setWon = SudokuStore((state) => state.setWon);

  const [solvedArray, setSolvedArray] = useState<string[]>([]);
  const [modal, setModal] = useState<boolean>(false);

  function createNewGame(e?: React.ChangeEvent<HTMLSelectElement>) {
    let [tempInitArray, tempSolvedArray] = getSudokuGame(difficulty, e);

    setInitArray(tempInitArray);
    setSudokuArray(tempInitArray);
    setSolvedArray(tempSolvedArray);
    setNumberSelected("0");
    setTimeStarted(moment());
    setCellSelected(-1);
    setWon(false);
  }

  function isSolved(index: number, value: string) {
    if (
      sudokuArray.every((cell: string, cellIndex: number) => {
        if (cellIndex === index) {
          return value === solvedArray[cellIndex];
        } else {
          return cell === solvedArray[cellIndex];
        }
      })
    ) {
      return true;
    }
    return false;
  }

  async function userFillCell(index: number, value: string) {
    fillCell(index, value);
  }

  function fillCell(index: number, value: string) {
    if (initArray[index] === "0") {
      let tempArray = sudokuArray.slice();

      tempArray[index] = value;
      setSudokuArray(tempArray);

      if (isSolved(index, value)) {
        setModal(true);
        setWon(true);
      }
    }
  }

  function onClickNewGame() {
    createNewGame();
  }

  function onClickCell(indexOfArray: number) {
    setNumberSelected("0");
    if (fastMode) {
      if (numberSelected !== "0" && initArray[indexOfArray] === "0") {
        // 넣을 숫자를 선택했고, 그 cell은 비어있었는가?
        setCellSelected(indexOfArray);
        userFillCell(indexOfArray, numberSelected);
      } else {
        setCellSelected(indexOfArray);
      }
    } else {
      if (numberSelected !== "0") {
        setCellSelected(indexOfArray);
        userFillCell(indexOfArray, numberSelected);
      }
      setCellSelected(indexOfArray);
    }
  }

  function onChangeDifficulty(e: React.ChangeEvent<HTMLSelectElement>) {
    setDifficulty(e.target.value);
    createNewGame(e);
  }

  function onClickNumber(num: string) {
    setNumberSelected(num);
    if (fastMode) {
      if (cellSelected !== -1) {
        userFillCell(cellSelected, num);
      }
    } else if (cellSelected !== -1) {
      userFillCell(cellSelected, num);
    }
  }

  function onClickErase() {
    if (cellSelected !== -1 && sudokuArray[cellSelected] !== "0") {
      fillCell(cellSelected, "0");
    }
  }

  function onClickFastMode() {
    if (fastMode) {
      setNumberSelected("0");
    }
    setCellSelected(-1);
    setFastMode(!fastMode);
    createNewGame();
  }

  function onClickModal() {
    setModal(false);
    createNewGame();
  }

  useEffect(() => {
    createNewGame();
  }, []);

  return (
    <div className={styles.sudokuContainer}>
      <div className={styles.sudokuPaper}>
        <header className={styles.header}>
          <h1>
            스도쿠 <span>SUDOKU</span>
          </h1>
          <h2 onClick={onClickNewGame}>New Game</h2>
        </header>
        <section className={styles.sudokuSection}>
          <SudokuBoard onClick={(indexOfArray: number) => onClickCell(indexOfArray)} />
          <SudokuStatus
            onClickNumber={(number: string) => onClickNumber(number)}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => onChangeDifficulty(e)}
            onClickErase={onClickErase}
            onClickFastMode={onClickFastMode}
          />
        </section>
        <Footer />
        {modal ? (
          <div className={styles.modal}>
            <h2 className={styles.modalText}>
              축하합니다! <br /> <span className={styles.modalSpan}>난이도 {difficulty} 모드</span>를 클리어 했어요!
            </h2>
            <button onClick={onClickModal}>확인</button>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
