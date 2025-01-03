import Image from "next/image";
import styles from "./index.module.css";
import { texts } from "./content";
import Link from "next/link";
import { Suspense } from "react";

async function getUserCount() {
  try {
    const response = await fetch(
      "https://chromewebstore.google.com/detail/chrome-piano/pjafcgbpdclmdeiipolenjgkikeldljl?hl=en"
    );
    const html = await response.text();
    
    const userMatch = html.match(/>([\d,]+)\+?\s*users</i);
    return userMatch ? userMatch[1] : "90,000+";
  } catch (error) {
    console.error("Failed to fetch user count:", error);
    return "90,000+";
  }
}

export default async function ExtensionSection() {
  const userCount = await getUserCount();
  const repeatedText = Array(10).fill(`${userCount}+ ${texts.banners.join}`).join(" ");

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <section className={styles.container}>
        <div className={styles.banner}>
          <p>{repeatedText}</p>
        </div>
        <div className={styles.images}>
          <Link href={texts.links.chromePiano} target="_blank">
            <Image
              src="/static/chrome-piano.svg"
              alt={texts.alts.chromePiano}
              width={500}
              height={400}
              className={styles.chromePiano}
            />
          </Link>
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
    </Suspense>
  );
}
