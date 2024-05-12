"use client";
import Image from "next/image";
import { AnimatePresence, motion } from 'framer-motion';
import { useFooter } from "@/app/_contexts/FooterContext";
import { texts } from "./content";
import styles from "./index.module.css";

export default function Footer() {
  const { footerRef, showArrows } = useFooter();

  return (
    <footer id="contact" ref={footerRef} className={styles.footer}>
      <Arrow showArrows={showArrows} />
      <h3 className={styles.email}>{texts.email.leonyanagida}</h3>
      <p className={styles.year}>
        © {new Date().getFullYear()} {texts.copyright.message}
      </p>
    </footer>
  );
}

function Arrow({ showArrows }: { showArrows: boolean }) {
  return (
    <AnimatePresence>
      {showArrows && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{
            opacity: 1,
            y: [30, 10, 30],
            transition: {
              opacity: { duration: 0.5, ease: "easeInOut" },
              y: {
                duration: 1,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "loop",
                repeatDelay: 0
              }
            }
          }}
          exit={{
            opacity: 0,
            transition: { duration: 0.5, ease: "easeInOut" }
          }}
        >
          <Image src="/static/blue-arrow.png" alt={texts.alts.downArrow} priority={true} width={75} height={75} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
