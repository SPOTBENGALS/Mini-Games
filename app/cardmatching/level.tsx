import styles from "@styles/CardMatching.module.scss";

interface LevelsProps {
  leveling: (e: React.MouseEvent<HTMLDivElement>) => void;
  level: number;
}

export default function Levels({ leveling, level }: LevelsProps) {
  return (
    <div className={styles.levelSelect}>
      <div>level </div>
      {[1, 2, 3, 4, 5].map((number) => {
        return (
          <div key={number} className={number === level ? styles.on : ""} onClick={leveling}>
            {number}
          </div>
        );
      })}
    </div>
  );
}
