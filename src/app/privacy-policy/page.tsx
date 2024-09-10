import Link from "next/link";
import Image from "next/image";
import { texts } from "./content";
import styles from "./index.module.css";

export default function PrivacyPolicy() {
  return (
    <section className={styles.loreSection}>
      <div className={styles.content}>
        <p className={styles.heading}>
          {texts.titles.heading}
        </p>
        <p className={styles.date}>
          {texts.titles.date}
        </p>
        <p className={styles.text}>
          {texts.descriptions.main}
        </p>
      </div>
    </section>
  );
}
