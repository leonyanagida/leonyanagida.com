import Link from "next/link";
import Image from "next/image";
import { texts } from "./content";
import styles from "./index.module.css";

export default function LoreSection() {
  return (
    <section className={styles.loreSection}>
      <div className={styles.content}>
        <p className={styles.lore}>{texts.titles.lore}</p>
        <p className={styles.description}>
          {texts.descriptions.main}
          <Link href={texts.links.about} className={styles.continueReadingLink}>
            {texts.descriptions.continueReading}
          </Link>
        </p>
      </div>
      <div className={styles.imageContent}>
        <div className={styles.doggos}>
          <Image src="/static/doggo.jpg" alt={texts.alts.dog} className={styles.doggo1} height={150} width={150} />
          <Image src="/static/doggo.jpg" alt={texts.alts.dog} className={styles.doggo2} height={150} width={150} />
        </div>
      </div>
    </section>
  );
}
