import Link from "next/link";
import Image from "next/image";

import styles from "@styles/Menu.module.scss";

export default function Menu() {
  return (
    <section className={styles.menuContainer}>
      <Link href="/">
        <h1 className={styles.logo}>Mini🎆Games</h1>
      </Link>
      <div className={styles.cardContainer}>
        <Link href="sudoku">
          <div className={styles.card}>
            <Image src="/sudoku_thumb.jpg" width={150} height={150} alt="Sudoku Thumbnail" />
            <h3 className={styles.cardTitle}>스도쿠</h3>
          </div>
        </Link>
        <Link href="/tetris">
          <div className={styles.card}>
            <Image src="/tetris_thumb.jpg" width={150} height={150} alt="Baseball Thumbnail" />
            <h3 className={styles.cardTitle}>테트리스</h3>
          </div>
        </Link>
        <Link href="/animalsaga">
          <div className={styles.card}>
            <Image src="/animalsaga_thumb.jpg" width={150} height={150} alt="Baseball Thumbnail" />
            <h3 className={styles.cardTitle}>애니멀사가</h3>
          </div>
        </Link>
        <Link href="/cardmatching">
          <div className={styles.card}>
            <Image src="/cardmatching_thumb.jpg" width={150} height={150} alt="Baseball Thumbnail" />
            <h3 className={styles.cardTitle}>카드 매칭</h3>
          </div>
        </Link>
        <Link href="baseball">
          <div className={styles.card}>
            <Image src="/baseball_thumb.jpg" width={150} height={150} alt="Baseball Thumbnail" />
            <h3 className={styles.cardTitle}>숫자 야구</h3>
          </div>
        </Link>
      </div>
    </section>
  );
}
