import cn from "classnames";
import Cell from "./cell";
import { TETROMINOS } from "./data";
import styles from "@styles/Tetris.module.scss";

export type STAGECELL = [keyof typeof TETROMINOS, string];
export type STAGE = STAGECELL[][];

interface stageProps {
  stage: STAGE;
}

export function Stage({ stage }: stageProps) {
  return (
    <div className={cn(styles.stage)}>{stage.map((row) => row.map((cell, x) => <Cell key={x} type={cell[0]} />))}</div>
  );
}
