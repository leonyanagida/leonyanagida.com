import Image from "next/image";
import { radio_canada } from "@/app/_utils/fonts";
import { texts } from "./content";
import styles from "./page.module.css";

export default function About() {
  return (
    <main className={styles.container}>
      <div className={styles.content}>
        <h2 className={styles.loreTitle}>{texts.title.about}</h2>
        {Object.values(texts.lore).map((lore) => (
          <>
            <p className={[radio_canada.className, styles.loreText].join(" ")}>
              {lore}
            </p>
            <br />
          </>
        ))}
      </div>
      <Image
        src="/static/setup.png"
        alt={texts.alts.room}
        width={250}
        height={250}
        className={styles.img}
      />
    </main>
  );
}
