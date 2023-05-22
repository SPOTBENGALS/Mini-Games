"use client";

import React, { useState } from "react";
import { generateRandomNumber } from "../../components/random";
import Footer from "../../components/footer";
import styles from "@styles/Baseball.module.scss";

export default function Baseball() {
  const [randomNumber, setRandomNumber] = useState(generateRandomNumber(4));
  const [inputValue, setInputValue] = useState<string>("");
  const [logs, setLogs] = useState<string[]>([]);
  const [isSuccess, setSuccess] = useState<boolean>(false);
  const [isfailed, setFailed] = useState<boolean>(false);
  const totalChance = 10;

  const handleInputValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = () => {
    const inputValueArray = inputValue.split("").map((item) => Number(item));

    if (inputValueArray.some((number) => isNaN(number))) {
      alert("숫자만 입력해주세요.");
      setInputValue("");
      return;
    }

    if (inputValueArray.length !== randomNumber.length) {
      alert(`${randomNumber.length}자리 숫자만 입력해주세요.`);
      setInputValue("");
      return;
    }

    const isDuplicated = inputValueArray.some((number) => {
      return inputValueArray.indexOf(number) !== inputValueArray.lastIndexOf(number);
    });

    if (isDuplicated) {
      alert("정답은 중복되지 않는 숫자들의 조합입니다. 중복되지 않는 숫자로 입력해주세요.");
      setInputValue("");
      return;
    }

    const { strike, ball } = randomNumber.reduce(
      (prev, current, index) => {
        // strike, ball check
        // strike : 같은 자리에 같은수가 존재할 경우
        // ball : 다른 자리에 수가 존재할 경우
        if (inputValueArray[index] === current) {
          return {
            ...prev,
            strike: prev.strike + 1,
          };
        }
        if (inputValueArray.includes(current)) {
          return {
            ...prev,
            ball: prev.ball + 1,
          };
        }

        return prev;
      },
      {
        strike: 0,
        ball: 0,
      }
    );

    if (strike === randomNumber.length) {
      setSuccess(true);
    }

    setLogs([...logs, ` ${inputValue}  ( strike : ${strike} ,  ball : ${ball} )`]);

    if (logs.length === totalChance - 1) {
      setFailed(true);
    }
  };

  const Close = () => {
    setRandomNumber(generateRandomNumber(4));
    setInputValue("");
    setLogs([]);
    setSuccess(false);
    setFailed(false);
  };

  const leftchance = totalChance - logs.length;

  return (
    <div className={styles.baseballContainer}>
      <div className={styles.baseball}>
        <h1>숫자 야구 게임</h1>
        <p>
          4자리의 숫자를 맞춰보세요!
          <br />
          자리와 숫자 모두 맞으면 Strike!
          <br />
          어딘가에 있는 숫자라면 Ball입니다.
        </p>
        <div className={styles.numbers}>{isSuccess ? `"${inputValue}"` : "????"}</div>
        <h5>남은 기회 : {leftchance}</h5>
        <section>
          <input type="text" value={inputValue} onChange={handleInputValueChange} disabled={isSuccess} />
          <button onClick={handleSubmit}>맞춰보기</button>
        </section>
        <h3>결과 기록</h3>
        <ol>
          {logs.map((log, index) => {
            return <li key={`${log}_${index}`}>{log}</li>;
          })}
        </ol>
      </div>
      <Footer />
      {isfailed ? (
        <div className={`${styles.modal}`}>
          <h2>
            기회가 모두 소진되었습니다. <br />
            정답은 <span>{randomNumber.join("")}</span> 이었습니다. <br />
            게임이 초기화됩니다.
          </h2>
          <button onClick={Close}>확인</button>
        </div>
      ) : (
        " "
      )}
      {isSuccess ? (
        <div className={`${styles.modal}`}>
          <h2>
            축하드려요! <br />
            {randomNumber.join("")} 정답을 맞추셨어요!
          </h2>
          <button onClick={Close}>확인</button>
        </div>
      ) : (
        " "
      )}
    </div>
  );
}
