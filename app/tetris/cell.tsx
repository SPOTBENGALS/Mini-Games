import React from "react";
import cn from "classnames";
import { TETROMINOS } from "./data";
import styles from "@styles/Tetris.module.scss";

interface cellProps {
  type: keyof typeof TETROMINOS;
}

function Cell({ type }: cellProps) {
  switch (type) {
    case 0:
      return <div className={cn(styles.cell, styles.black)}></div>;
    case "I":
      return <div className={cn(styles.cell, styles.aqua)}></div>;
    case "J":
      return <div className={cn(styles.cell, styles.blue)}></div>;
    case "L":
      return <div className={cn(styles.cell, styles.orange)}></div>;
    case "O":
      return <div className={cn(styles.cell, styles.lemon)}></div>;
    case "S":
      return <div className={cn(styles.cell, styles.green)}></div>;
    case "T":
      return <div className={cn(styles.cell, styles.purple)}></div>;
    case "Z":
      return <div className={cn(styles.cell, styles.red)}></div>;
  }
}

export default React.memo(Cell);
