import React, { Suspense } from "react";
import styles from "./page.module.css"
import Loading from "./[...alias]/loading";



export default async function Home() {

  return (
        <main className={styles.main}>
            Главная страница
        </main>
  );
}
