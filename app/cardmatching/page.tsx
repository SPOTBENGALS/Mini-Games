"use client";

import { useEffect, useState } from "react";
import SingleCard from "./card";
import Levels from "./level";
import Footer from "../../components/footer";

import styles from "@styles/CardMatching.module.scss";

const cardImages = [
  { img: "👸", matched: false },
  { img: "🌟", matched: false },
  { img: "🌘", matched: false },
  { img: "🎂", matched: false },
  { img: "🥂", matched: false },
  { img: "🪺", matched: false },
  { img: "🦌", matched: false },
  { img: "🛞", matched: false },
  { img: "🕍", matched: false },
  { img: "🦋", matched: false },
  { img: "🦎", matched: false },
  { img: "🫀", matched: false },
  { img: "🧚‍♀️", matched: false },
  { img: "🛀", matched: false },
  { img: "🧑‍🤝‍🧑", matched: false },
];
export interface cardsType {
  id: number;
  img: string;
  matched: boolean;
}
export default function CardMatching(this: any) {
  const [cards, setCards] = useState<cardsType[]>([]);
  const [turns, setTurns] = useState(10);
  const [choiceOne, setChoiceOne] = useState<cardsType | null>(null);
  const [choiceTwo, setChoiceTwo] = useState<cardsType | null>(null);
  const [level, setLevel] = useState(1);
  const [disabled, setDisabled] = useState(false);
  const [modal, setModal] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  // level : 1 => 12 (img 6개)
  // level : 2 => 16
  // levle : 3 => 20
  // level : 4 => 24
  // level : 5 => 28 (img 14개)

  function leveling(e: React.MouseEvent<HTMLDivElement>) {
    let eventTarget = e.target as HTMLElement;

    if (level !== parseInt(eventTarget.innerHTML)) {
      setCards([]);
      setTurns(0);
      setLevel(parseInt(eventTarget.innerHTML));
    }
  }

  function shuffleCards() {
    let levelingCard = Array(...cardImages).splice(0, level * 2 + 4);

    const shuffledCards = [...levelingCard, ...levelingCard]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
    setTurns(10 + level * 5);
    setModal(false);
    setGameOver(false);
    setDisabled(false);
  }

  function handleChoice(card: cardsType) {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  }

  function resetTurn() {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurns) => prevTurns - 1);
    setDisabled(false);
  }

  function onClickModal() {
    setModal(false);
    shuffleCards();
  }

  function checkClear() {
    const isAllMatched = cards.every((card) => card.matched === true);

    if (isAllMatched) setModal(true);
  }

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);

      if (choiceOne.img === choiceTwo.img) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.img === choiceOne.img) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
    checkClear();
    if (turns === 0) {
      setGameOver(true);
      setDisabled(true);
    }
  }, [choiceOne, choiceTwo]);

  useEffect(() => {
    shuffleCards();
  }, [level]);

  useEffect(() => {
    shuffleCards();
  }, []);

  return (
    <div className={styles.cardMatchingContainer}>
      <div className={styles.cardMatching}>
        <header className={styles.header}>
          <h1>Card Match</h1>
          <div className={styles.nav}>
            <Levels leveling={leveling} level={level} />
            <button className={styles.newGame} onClick={shuffleCards}>
              New Game
            </button>
          </div>
        </header>
        <div className={styles.cardGrid}>
          {cards.map((card: cardsType) => (
            <SingleCard
              handleChoice={handleChoice}
              flipped={card === choiceOne || card === choiceTwo || card.matched}
              disabled={disabled}
              card={card}
              level={level}
              key={card.id}
              img={card.img}
            />
          ))}
        </div>
        <div className={styles.leftTurns}>
          <p>남은 턴 : {turns}</p>
        </div>
      </div>
      {modal ? (
        <div className={styles.modal}>
          <h2 className={styles.modalText}>
            Level {level} 게임을 클리어 했어요! <br /> 축하드립니다!
          </h2>
          <button onClick={onClickModal}>확인</button>
        </div>
      ) : (
        ""
      )}
      {gameOver ? (
        <div className={styles.modal}>
          <h2 className={styles.modalText}>
            아쉽게도 클리어하지 못했어요. 😢 <br /> 다시 도전해보세요!
          </h2>
          <button onClick={onClickModal}>확인</button>
        </div>
      ) : (
        ""
      )}
      <Footer />
    </div>
  );
}
