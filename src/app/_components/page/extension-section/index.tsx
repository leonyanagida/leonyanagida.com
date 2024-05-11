import Image from "next/image";
import styles from "./index.module.css";
import { texts } from "./content";
import Link from "next/link";

export default function ExtensionSection() {
  const repeatedText = Array(10).fill(texts.banners.join).join(" "); 

  return (
    <section className={styles.container}>
      <div className={styles.banner}>
        <p>{repeatedText}</p>
      </div>
      <div className={styles.images}>
        <Image
          src="/static/chrome-piano.svg"
          alt={texts.alts.chromePiano}
          width={500}
          height={400}
          className={styles.chromePiano}
        />
        <Link href={texts.links.chromePiano} target="_blank">
          <Image
            src="/static/chrome-web-store.svg"
            alt={texts.alts.chromeWebStore}
            width={300}
            height={100}
            className={styles.chromeWebStore}
          />
        </Link>
      </div>
    </section>
  );
}
