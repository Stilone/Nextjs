import React from "react";
import styles from "./page.module.css"
import { getMenu } from "../../api/menu";

export default async function Home() {

  return ( 
    <main className={styles.main}>
        Главная страница
    </main>
  );
}
