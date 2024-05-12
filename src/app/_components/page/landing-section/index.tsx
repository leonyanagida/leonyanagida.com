"use client";
import { useState } from "react";
import Image from "next/image";
import {radio_canada } from "@/app/_utils/fonts";
import { highlightText } from "@/app/_utils/highlightText";
import CursorFollower from "@/app/_components/page/landing-section/cursor-follower";
import { detectDeviceType } from "@/app/_utils/detectDeviceType";
import { texts } from "./content";
import styles from "./index.module.css";

export default function LandingSection() {
  return (
    <section className={styles.landingSectionContainer}>
      <WizardTime />
    </section>
  );
}

function WizardTime() {
  const [wizardMode, setWizardMode] = useState(false);
  
  const isMobile = detectDeviceType() === "mobile";
  const magicMessage = isMobile ? texts.buttons.mobile.wizardMode : texts.buttons.desktop.wizardMode;
  const initialMessage = isMobile ? texts.buttons.mobile.initial : texts.buttons.desktop.initial;

  return (
    <div>
      <TextContent />
      {wizardMode && <CursorFollower />}
      <div className={styles.wizardWrapper} onClick={() => setWizardMode(prevState => !prevState)}>
        <p className={[styles.wizardText, radio_canada.className].join(" ")}>
          {wizardMode ? magicMessage : initialMessage}
        </p>
        <span className={styles.floatingWizard}>{texts.emojis.wizard}</span>
      </div>
    </div>
  );
}

function TextContent() {
  const title = texts.titles.fullStackDeveloper;
  const description = texts.descriptions.main;

  const wordsToHighlight = [...texts.descriptions.mainHighlights];
  const processedDescription = highlightText(description, wordsToHighlight);

  return (
    <div className={styles.commonContentContainer}>
      <div className={styles.commonText}>
        <h1 className={styles.commonContentTitle}>{title}</h1>
        <p className={styles.commonContentSubtitle} dangerouslySetInnerHTML={{ __html: processedDescription }}></p>
      </div>
      <div>
        <div className={styles.clouds}>
          <Image src="/static/cloud-1-1.png" alt="Cloud" width={80} height={80} className={styles.cloud} />
          <Image src="/static/cloud-1-1.png" alt="Cloud" width={110} height={110} className={styles.cloudDelay1} />
        </div>
        <div className={styles.stand}>
          <Image src="/static/stand-clear.png" alt="Stand" width={150} height={150} className={styles.standFloat} />
        </div>
      </div>
    </div>
  );
}
