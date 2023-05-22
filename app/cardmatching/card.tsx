import { cardsType } from "./page";
import cn from "classnames";
import styles from "@styles/CardMatching.module.scss";

interface SingleCardProps {
  level: number;
  img: string;
  handleChoice: (e: cardsType) => void;
  card: cardsType;
  flipped: boolean;
  disabled: boolean;
}

export default function SingleCard({ card, level, img, handleChoice, flipped, disabled }: SingleCardProps) {
  const cardLevel = "cardLevel" + level;

  function handleClick() {
    if (!disabled) {
      handleChoice(card);
    }
  }

  return (
    <div className={`${styles.card} ${styles[cardLevel]}`}>
      <div className={cn({ [styles.flipped]: flipped })}>
        <div className={styles.cardFront}>{img}</div>
        <img className={styles.cardBack} onClick={handleClick} src="/cardmatching.jpg" alt="back of a card" />
      </div>
    </div>
  );
}
