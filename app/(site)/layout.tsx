import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import styles from "./page.module.css"
import "./globals.css";
import { Footer, Header, Sidebar } from "./components";
import { AppContextProvider, IAppContext } from "../../context/app.context";

const noto = Noto_Sans_KR({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Наш проект",
  description: "Generated by create next app",
  
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={noto.className}>
          <div className={styles.wrapper}>
            <Header className={styles.header}/>
            <Sidebar className={styles.sidebar}/>
            <div className={styles.main}>
              {children}
            </div>
            <Footer className={styles.footer}/>
          </div>
        </body>
    </html>
  );
}
