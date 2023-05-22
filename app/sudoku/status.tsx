import { useEffect, useState } from "react";
import SudokuStore from "../../store/sudokuStore";
import moment from "moment";
import styles from "@styles/Sudoku.module.scss";

interface SudokuStatusProps {
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onClickNumber: (number: string) => void;
  onClickErase: () => void;
  onClickFastMode: () => void;
}

export default function SudokuStatus(props: SudokuStatusProps) {
  let difficulty = SudokuStore((state) => state.difficulty);
  let won = SudokuStore((state) => state.won);
  let timeStarted = SudokuStore((state) => state.timeStarted);
  let fastMode = SudokuStore((state) => state.fastMode);

  const [currentTime, setCurrentTime] = useState(moment());

  useEffect(() => {
    if (!won) {
      setTimeout(() => tick(), 1000);
    }
  });

  function tick() {
    setCurrentTime(moment());
  }

  function getTimer() {
    let secondsTotal = currentTime.diff(timeStarted, "seconds");

    if (secondsTotal <= 0) return "00 : 00";

    let duration = moment.duration(secondsTotal, "seconds");
    let hours = duration.hours();
    let minutes = duration.minutes();
    let seconds = duration.seconds();
    let stringTimer = "";

    stringTimer += hours ? "" + hours + " : " : "";
    stringTimer += minutes ? (minutes < 10 ? "0" : "") + minutes + " : " : "00 : ";
    stringTimer += seconds < 10 ? "0" + seconds : seconds;

    return stringTimer;
  }

  return (
    <section className={styles.status}>
      <div className={styles.difficulty}>
        <span className={styles.difficultylText}>난이도&nbsp;&nbsp; : &nbsp;&nbsp;&nbsp;</span>
        <select
          name="difficultylSelect"
          className={styles.difficultylSelect}
          defaultValue={difficulty}
          onChange={props.onChange}
        >
          <option value="Easy">Easy</option>
          <option value="Standard">Standard</option>
          <option value="Hard">Hard</option>
          <option value="Very-Hard">Very-Hard</option>
          <option value="Insane">Insane</option>
        </select>
      </div>

      <div className={styles.timer}>{getTimer()}</div>

      <div className={styles.actions}>
        <div className={styles.erase} onClick={props.onClickErase}>
          X
        </div>
        <div className={styles.fastMode}>
          <label className={styles.fastModeSwitch}>
            <input type="checkbox" />
            {fastMode ? (
              <span className={`${styles.fastModeSlider} ${styles.ModeOn}`} onClick={props.onClickFastMode}></span>
            ) : (
              <span className={styles.fastModeSlider} onClick={props.onClickFastMode}></span>
            )}
          </label>
          <p className={styles.fastModeText}>Hint</p>
        </div>
      </div>

      <div className={styles.numbers}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((number) => {
          return (
            <div className={styles.number} key={number} onClick={() => props.onClickNumber(number.toString())}>
              {number}
            </div>
          );
        })}
      </div>
    </section>
  );
}
