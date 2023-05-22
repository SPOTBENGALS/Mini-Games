"use client";

import { useRef, useState } from "react";
import { createStage, isColliding } from "./tetrisHelpers";

import { useInterval } from "./hooks/useInterval";
import { usePlayer } from "./hooks/usePlayer";
import { useStage } from "./hooks/useStage";
import { useTetrisStatus } from "./hooks/useTetrisStatus";

import { Stage } from "./stage";
import Footer from "../../components/footer";

import cn from "classnames";
import styles from "@styles/Tetris.module.scss";

export default function Tetris() {
  const [dropTime, setDropTime] = useState<null | number>(null);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [modal, setModal] = useState<boolean>(false);

  const gameArea = useRef<HTMLDivElement>(null);

  const { player, updatePlayer, resetPlayer, playerRotate } = usePlayer();
  const { stage, setStage, rowsCleared } = useStage(player, resetPlayer);
  const { score, setScore, rows, setRows, level, setLevel } = useTetrisStatus(rowsCleared);

  function movePlayer(dir: number) {
    if (!isColliding(player, stage, { x: dir, y: 0 })) {
      updatePlayer({ x: dir, y: 0, collided: false });
    }
  }

  function keyUp({ keyCode }: { keyCode: number }): void {
    if (!gameOver) {
      if (keyCode === 40 || keyCode === 83) {
        setDropTime(1000 / level + 200);
      }
    }
  }

  function moveToLeft() {
    if (!gameOver) {
      movePlayer(-1);
    }
  }

  function moveToRight() {
    if (!gameOver) {
      movePlayer(1);
    }
  }

  function rotate() {
    if (!gameOver) {
      playerRotate(stage);
    }
  }

  function moveDown() {
    if (!gameOver) {
      setDropTime(30);

      setTimeout(() => {
        setDropTime(1000 / level + 200);
      }, 50);
    }
  }

  function move({ keyCode, repeat }: { keyCode: number; repeat: boolean }): void {
    if (!gameOver) {
      if (keyCode === 37 || keyCode === 65) {
        movePlayer(-1);
      } else if (keyCode === 39 || keyCode === 68) {
        movePlayer(1);
      } else if (keyCode === 40 || keyCode === 83) {
        if (repeat) return;
        setDropTime(30);
      } else if (keyCode === 38 || keyCode === 87) {
        playerRotate(stage);
      }
    }
  }

  function handleStartGame(): void {
    if (gameArea.current) gameArea.current.focus();
    setStage(createStage());
    setDropTime(1000);
    resetPlayer();
    setScore(0);
    setLevel(1);
    setRows(0);
    setGameOver(false);
    setGameStarted(true);
  }

  function drop(): void {
    if (rows > level * 10) {
      setLevel((prev) => prev + 1);
      setDropTime(1000 / level + 200);
    }

    if (!isColliding(player, stage, { x: 0, y: 1 })) {
      updatePlayer({ x: 0, y: 1, collided: false });
    } else {
      if (player.position.y < 1) {
        console.log("Game Over!");
        setGameOver(true);
        setGameStarted(false);
        setModal(true);
        setDropTime(null);
      }

      updatePlayer({ x: 0, y: 0, collided: true });
    }
  }

  function onClickModal() {
    setModal(false);
  }

  useInterval(() => {
    drop();
  }, dropTime);

  return (
    <div className={styles.tetrisContainer} role="button" tabIndex={0} onKeyDown={move} onKeyUp={keyUp} ref={gameArea}>
      <div className={styles.tetris}>
        <h1>TETRIS</h1>
        <div className={styles.tetrisSection}>
          {gameOver == gameStarted ? (
            <>
              <div className={styles.startButton} onClick={handleStartGame}>
                Start Game
              </div>
              <h4>
                Start Game 버튼을 눌러 <br />
                게임을 시작해보세요.{" "}
              </h4>
            </>
          ) : (
            ""
          )}
          {gameStarted ? (
            <>
              <div className={cn(styles.display, { [styles.gameOver]: gameOver })}>{`점수 : ${score}`}</div>
              <div className={cn(styles.display, { [styles.gameOver]: gameOver })}>{`줄삭제 : ${rows}`}</div>
              <div className={cn(styles.display, { [styles.gameOver]: gameOver })}>{`레벨 : ${level}`}</div>
            </>
          ) : (
            ""
          )}
          {gameOver ? (
            <>
              <div className={cn(styles.display, { [styles.gameOver]: gameOver })}>Game Over!</div>
              <div className={styles.startButton} onClick={handleStartGame}>
                New Game
              </div>
            </>
          ) : (
            ""
          )}
          {modal ? (
            <div className={styles.modal}>
              <h2 className={styles.modalText}>
                게임이 종료 되었습니다. <br /> 최종 점수는 <span className={styles.modalSpan}>{score}</span>점 입니다.
              </h2>
              <button onClick={onClickModal}>확인</button>
            </div>
          ) : (
            ""
          )}
        </div>
        <Stage stage={stage} />
        <div className={styles.mobileButtons}>
          <div onClick={moveToLeft} className={styles.mButton}>
            ◀️
          </div>
          <div onClick={rotate} className={cn(styles.mButton, styles.fontAdjust)}>
            🔄️
          </div>
          <div onClick={moveDown} onKeyUp={keyUp} className={cn(styles.mButton, styles.fontAdjust)}>
            🔽
          </div>
          <div onClick={moveToRight} className={styles.mButton}>
            ▶️
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}
