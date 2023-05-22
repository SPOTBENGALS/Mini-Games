"use client";

import { DragEvent, useEffect, useState } from "react";
import { ANIMALS, STAGE_HEIGHT, STAGE_WIDTH, NumberstoCheck } from "./data";
import Footer from "../../components/footer";

import styles from "@styles/AnimalSaga.module.scss";

export default function AnimalSaga() {
  const [animals, setAnimals] = useState<string[]>([]);
  const [dragging, setDragging] = useState<HTMLDivElement | null>(null);
  const [replacing, setReplacing] = useState<HTMLDivElement | null>(null);
  const [score, setScore] = useState<number>(0);
  const [leftTime, setLeftTime] = useState<number>(60);
  const [disabled, setDisabled] = useState<boolean>(false);
  const [gameOver, setGameOver] = useState<boolean>(false);

  const { notValidinThree, notValidinFour, notValidinFive, firstRow } = NumberstoCheck();

  function horizonalThree() {
    for (let i = 0; i < STAGE_WIDTH * STAGE_HEIGHT; i++) {
      const horizonalThree = [i, i + 1, i + 2];
      const decidedAnimal = animals[i];
      const isBlank = animals[i] === "";

      if (!notValidinThree.includes(i)) {
        if (horizonalThree.every((square) => animals[square] === decidedAnimal) && !isBlank) {
          setScore((score) => score + 40);
          horizonalThree.forEach((square) => (animals[square] = ""));
          return true;
        }
      }
    }
  }

  function verticalThree() {
    for (let i = 0; i < STAGE_WIDTH * (STAGE_HEIGHT - 2) - 1; i++) {
      const verticalThree = [i, i + STAGE_WIDTH, i + STAGE_WIDTH * 2];
      const decidedAnimal = animals[i];
      const isBlank = animals[i] === "";

      if (verticalThree.every((square) => animals[square] === decidedAnimal) && !isBlank) {
        setScore((score) => score + 40);
        verticalThree.forEach((square) => (animals[square] = ""));
        return true;
      }
    }
  }

  function horizonalFour() {
    for (let i = 0; i < STAGE_WIDTH * STAGE_HEIGHT; i++) {
      const horizonalFour = [i, i + 1, i + 2, i + 3, i + 4];
      const decidedAnimal = animals[i];
      const isBlank = animals[i] === "";

      if (!notValidinFour.includes(i)) {
        if (horizonalFour.every((square) => animals[square] === decidedAnimal) && !isBlank) {
          setScore((score) => score + 80);
          horizonalFour.forEach((square) => (animals[square] = ""));
          return true;
        }
      }
    }
  }

  function verticalFour() {
    for (let i = 0; i < STAGE_WIDTH * (STAGE_HEIGHT - 3) - 1; i++) {
      const verticalFour = [i, i + STAGE_WIDTH, i + STAGE_WIDTH * 2, i + STAGE_WIDTH * 3];
      const decidedAnimal = animals[i];
      const isBlank = animals[i] === "";

      if (verticalFour.every((square) => animals[square] === decidedAnimal) && !isBlank) {
        setScore((score) => score + 80);
        verticalFour.forEach((square) => (animals[square] = ""));
        return true;
      }
    }
  }

  function horizonalFive() {
    for (let i = 0; i < STAGE_WIDTH * STAGE_HEIGHT; i++) {
      const horizonalFive = [i, i + 1, i + 2, i + 3, i + 4, i + 5];
      const decidedAnimal = animals[i];
      const isBlank = animals[i] === "";

      if (!notValidinFive.includes(i)) {
        if (horizonalFive.every((square) => animals[square] === decidedAnimal) && !isBlank) {
          setScore((score) => score + 300);
          horizonalFive.forEach((square) => (animals[square] = ""));
          return true;
        }
      }
    }
  }

  function verticalFive() {
    for (let i = 0; i < STAGE_WIDTH * (STAGE_HEIGHT - 4) - 1; i++) {
      const verticalFive = [i, i + STAGE_WIDTH, i + STAGE_WIDTH * 2, i + STAGE_WIDTH * 3, i + STAGE_WIDTH * 4];
      const decidedAnimal = animals[i];
      const isBlank = animals[i] === "";

      if (verticalFive.every((square) => animals[square] === decidedAnimal) && !isBlank) {
        setScore((score) => score + 300);
        verticalFive.forEach((square) => (animals[square] = ""));
        return true;
      }
    }
  }

  function dropAnimals() {
    for (let i = 0; i < STAGE_WIDTH * STAGE_HEIGHT - STAGE_WIDTH; i++) {
      const isFirstRow = firstRow.includes(i);

      if (isFirstRow && animals[i] === "") {
        const randomIndex = Math.floor(Math.random() * ANIMALS.length);
        animals[i] = ANIMALS[randomIndex];
      }

      if (animals[i + STAGE_WIDTH] === "") {
        animals[i + STAGE_WIDTH] = animals[i];
        animals[i] = "";
      }
    }
  }

  function dragStart(e: DragEvent<HTMLDivElement>) {
    const eTarget = e.target as HTMLDivElement;
    if (!disabled) {
      setDragging(eTarget);
    }
  }

  function dragDrop(e: DragEvent<HTMLDivElement>) {
    const eTarget = e.target as HTMLDivElement;
    setReplacing(eTarget);
  }

  function dragEnd(e: DragEvent<HTMLDivElement>) {
    if (dragging !== null && replacing !== null) {
      const draggingID: number = parseInt((dragging as HTMLImageElement).getAttribute("data-id") as string);
      const replacingID: number = parseInt((replacing as HTMLImageElement).getAttribute("data-id") as string);

      const validMoves = [draggingID - 1, draggingID - STAGE_WIDTH, draggingID + 1, draggingID + STAGE_WIDTH];
      const isValidMove = validMoves.includes(replacingID);

      if (isValidMove) {
        animals[replacingID] = dragging.innerText;
        animals[draggingID] = replacing.innerText;

        const isVerticalFive = verticalFive();
        const isHorizonalFive = horizonalFive();
        const isVerticalFour = verticalFour();
        const isHorizonalFour = horizonalFour();
        const isVerticalThree = verticalThree();
        const isHorizonalThree = horizonalThree();

        if (
          replacingID &&
          (isVerticalFive ||
            isHorizonalFive ||
            isVerticalFour ||
            isHorizonalFour ||
            isVerticalThree ||
            isHorizonalThree)
        ) {
          setDragging(null);
          setReplacing(null);
        } else {
          animals[replacingID] = replacing.innerText;
          animals[draggingID] = dragging.innerText;
          setAnimals([...animals]);
        }
      }
    }
  }

  function createBoard() {
    const randomColorArray = [];
    for (let i = 0; i < STAGE_WIDTH * STAGE_HEIGHT; i++) {
      const randomColor = ANIMALS[Math.floor(Math.random() * ANIMALS.length)];
      randomColorArray.push(randomColor);
    }
    setAnimals(randomColorArray);
    setGameOver(false);
    setDisabled(false);
    setLeftTime(60);
    setScore(0);
  }

  useEffect(() => {
    createBoard();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      verticalFive();
      horizonalFive();
      verticalFour();
      horizonalFour();
      verticalThree();
      horizonalThree();
      dropAnimals();
      setAnimals([...animals]);
    }, 100);

    if (leftTime < 1) {
      setGameOver(true);
      setDisabled(true);
    }

    return () => clearInterval(interval);
  }, [verticalThree, horizonalThree, verticalFour, horizonalFour, animals, dropAnimals]);

  useEffect(() => {
    const timer = setInterval(() => {
      setLeftTime((prevTime) => prevTime - 1);
    }, 1000);

    if (leftTime < 1) {
      clearInterval(timer);
    }
  }, []);

  return (
    <>
      <div className={styles.AnimalSagaContainer}>
        <div className={styles.AnimalSaga}>
          <div className={styles.header}>
            <h1>Animal Saga Crush</h1>
            <div className={styles.scoreBoard}>{score}</div>
          </div>
          <section className={styles.stage}>
            {animals.map((animal, index: number) => (
              <div
                className={styles.cell}
                key={index}
                data-id={index}
                draggable={true}
                onDragStart={dragStart}
                onDragOver={(e: DragEvent<HTMLDivElement>) => e.preventDefault()}
                onDragEnter={(e: DragEvent<HTMLDivElement>) => e.preventDefault()}
                onDragLeave={(e: DragEvent<HTMLDivElement>) => e.preventDefault()}
                onDrop={dragDrop}
                onDragEnd={dragEnd}
              >
                {animal}
              </div>
            ))}
          </section>
          <div className={styles.timer}>
            {leftTime < 1 ? (
              "Time Over"
            ) : (
              <>
                <h5>Time</h5>
                {leftTime} s
              </>
            )}
          </div>
          {gameOver ? (
            <div className={styles.modal}>
              <h2 className={styles.modalText}>
                시간이 다 되었어요! <br /> 최종 점수는 <span className={styles.modalSpan}>{score}점</span> 입니다!
                <br /> 게임이 초기화됩니다.
              </h2>
              <button onClick={() => createBoard()}>확인</button>
            </div>
          ) : (
            ""
          )}
          <Footer />
        </div>
      </div>
    </>
  );
}
