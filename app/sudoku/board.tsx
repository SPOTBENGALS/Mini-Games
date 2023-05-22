import SudokuStore from "../../store/sudokuStore";
import styles from "../../styles/Sudoku.module.scss";
import cn from "classnames";

interface SudokuBoardProps {
  onClick: (indexOfArray: number) => void;
}

export default function SudokuBoard(props: SudokuBoardProps) {
  const rows = [0, 1, 2, 3, 4, 5, 6, 7, 8];

  let sudokuArray = SudokuStore((state) => state.sudokuArray);
  let cellSelected = SudokuStore((state) => state.cellSelected);
  let initArray = SudokuStore((state) => state.initArray);
  let fastMode = SudokuStore((state) => state.fastMode);
  let numberSelected = SudokuStore((state) => state.numberSelected);
  let setNumberSelected = SudokuStore((state) => state.setNumberSelected);

  function isSameCellPosition(row: number, col: number) {
    if (cellSelected === row * 9 + col) {
      // 선택된 cell의 위치와 생성될 cell의 위치가 같은가?
      return true;
    }
    if (sudokuArray[cellSelected] === "0") {
      return false;
    }
    if (cellSelected === row * 9 + col) {
      return true;
    }
  }

  function EmptyCell(indexOfArray: number, value: string, highlight: string) {
    // 숫자가 없던 cell
    const isHighlight = highlight === "highlight";

    if (value !== "0") {
      // 채운 숫자
      if (initArray[indexOfArray] === "0") {
        // 유저가 채운 숫자라면
        return (
          <td
            className={cn(styles.cell, styles.cell_userfilled, {
              [styles.cell_highlightSelected]: isHighlight,
              [styles.cell_Selected]: !isHighlight,
            })}
            key={indexOfArray}
            onClick={() => props.onClick(indexOfArray)}
          >
            {value}
          </td>
        );
      } else {
        // 원래 있던 숫자라면
        return (
          <td
            className={cn(styles.cell, styles.cell_filled, {
              [styles.cell_highlightSelected]: isHighlight,
              [styles.cell_Selected]: !isHighlight,
            })}
            key={indexOfArray}
            onClick={() => props.onClick(indexOfArray)}
          >
            {value}
          </td>
        );
      }
    } else {
      // 비워진 cell
      return (
        <td
          className={cn(styles.cell, {
            [styles.cell_highlightSelected]: isHighlight,
            [styles.cell_Selected]: !isHighlight,
          })}
          key={indexOfArray}
          onClick={() => props.onClick(indexOfArray)}
        >
          {value}
        </td>
      );
    }
  }

  function unEmptyCell(indexOfArray: number, value: string, hint: string) {
    const isHint = hint === "hint";

    // 숫자가 이미 있는 cell
    if (value !== "0") {
      // 유저가 채운 숫자라면
      if (initArray[indexOfArray] === "0") {
        return (
          <td
            className={cn(styles.cell, styles.cell_userfilled, {
              [styles.cell_hint]: isHint,
              [styles.cell]: !isHint,
            })}
            key={indexOfArray}
            onClick={() => props.onClick(indexOfArray)}
          >
            {value}
          </td>
        );
      } else {
        return (
          <td
            className={cn(styles.cell, styles.cell_filled, {
              [styles.cell_hint]: isHint,
              [styles.cell]: !isHint,
            })}
            key={indexOfArray}
            onClick={() => props.onClick(indexOfArray)}
          >
            {value}
          </td>
        );
      }
    } else {
      return (
        <td className={styles.cell} key={indexOfArray} onClick={() => props.onClick(indexOfArray)}>
          {value}
        </td>
      );
    }
  }

  return (
    <section className={styles.sudoku}>
      <table className={styles.sudokuBoard}>
        <tbody>
          {rows.map((row) => {
            return (
              <tr className={styles.boardRow} key={row}>
                {rows.map((col) => {
                  const indexOfArray = row * 9 + col;
                  const value = sudokuArray[indexOfArray];

                  // 선택된 cell과 같은 위치에 있는 cell은?
                  if (cellSelected === indexOfArray) {
                    return EmptyCell(indexOfArray, value, "highlight");
                  }

                  if (fastMode) {
                    // 선택된 셀과 숫자가 같은 cell만 highlight
                    // fast 모드
                    if (numberSelected !== "0" && isSameCellPosition(row, col)) {
                      // 선택된 숫자가 있고, 같은 위치의 cell일때

                      return EmptyCell(indexOfArray, value, "highlight");
                    }
                    if (numberSelected !== "0" && numberSelected === sudokuArray[row * 9 + col]) {
                      // numberSelected와 같은지
                      return unEmptyCell(indexOfArray, value, "hint");
                    } else {
                      return unEmptyCell(indexOfArray, value, "");
                    }
                  } else {
                    // fast 모드 X
                    if (cellSelected !== -1 && isSameCellPosition(row, col)) {
                      // cell이 선택되어 있고, 그 cell과 같은 숫자들의 경우
                      return EmptyCell(indexOfArray, value, "");
                    } else {
                      return unEmptyCell(indexOfArray, value, "");
                    }
                  }
                  setNumberSelected("0");
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
}
