import { formatWon } from "@/shared/lib/formatters";

import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <h1>FE Architecture Lab</h1>
      <p>alias(@) 테스트 : {formatWon(1234567)}</p>
    </main>
  );
}
