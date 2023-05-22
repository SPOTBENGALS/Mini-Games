import styles from "@styles/Home.module.scss";

export default function Home() {
  return (
    <main className={styles.main}>
      <section className={styles.welcomeBox}>
        <div className={styles.welcome}>
          <h1 className={styles.logo}>
            Mini🎆Games{" "}
            <span>
              에 오신 것을
              <br /> 환영합니다!
            </span>
          </h1>
        </div>
        <div className={styles.chooseGame}>
          <p>좌측 메뉴에서 원하는 게임을 골라 플레이해보세요!</p>
        </div>
        <div className={styles.bounce}></div>
      </section>
    </main>
  );
}
