"use client";
import { useState } from "react";
import Link from "next/link";
import { useFooter } from "@/app/_contexts/FooterContext";
import { texts } from "./content";
import styles from "./index.module.css";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const footerContext = useFooter();

  const { triggerGlow, setShowArrows } = footerContext;

  const mobileDelayClose = () => setTimeout(() => toggleMobileMenu(), 400);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleContactClick = () => {
    if (!footerContext) {
      console.error("This components needs to be within the FooterProvider");
      return null;
    }

    triggerGlow();
    setShowArrows(true);
    setTimeout(() => setShowArrows(false), 2000);
  };

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <div className={styles.mobileMenuButton} onClick={toggleMobileMenu}>
          <span className={`${styles.bar} ${isMobileMenuOpen ? styles.changeBar1 : ''}`}/>
          <span className={`${styles.bar} ${isMobileMenuOpen ? styles.changeBar2 : ''}`}/>
          <span className={`${styles.bar} ${isMobileMenuOpen ? styles.changeBar3 : ''}`}/>
        </div>

        <div className={styles.mobileMenu} style={{ display: isMobileMenuOpen ? 'flex' : 'none' }}>
          <Link href={texts.links.home} className={styles.mobileLink} onClick={mobileDelayClose}>
            {texts.words.home}
          </Link>
          <Link href={texts.links.about} className={styles.mobileLink} onClick={mobileDelayClose}>
            {texts.words.about}
          </Link>
          <Link
            href={texts.links.contact}
            className={styles.mobileLink} 
            onClick={() => {
              toggleMobileMenu();
              handleContactClick();
            }}
          >
            {texts.words.contact}
          </Link>
        </div>

        <div className={styles.desktopMenu}>
          <Link href={texts.links.home} className={styles.link}>{texts.words.home}</Link>
          <Link href={texts.links.about} className={styles.link}>{texts.words.about}</Link>
          <Link
            href={texts.links.contact}
            className={styles.link}
            onClick={() => handleContactClick()}
          >
            {texts.words.contact}
          </Link>
        </div>
      </nav>
    </header>
  );
}
