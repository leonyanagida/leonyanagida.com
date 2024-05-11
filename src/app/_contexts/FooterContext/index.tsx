"use client";
import React, { createContext, useRef, useContext, useEffect, useState } from "react";
import styles from "./index.module.css"

interface FooterProvider {
  children: React.ReactNode;
}

interface IFooterContext {
  footerRef: React.RefObject<HTMLDivElement>;
  triggerGlow: () => void;
  showArrows: boolean;
  setShowArrows: (show: boolean) => void;
}

const defaultContextValue: IFooterContext = {
  footerRef: { current: null },
  triggerGlow: () => {},
  showArrows: false,
  setShowArrows: () => {}
};

const FooterContext = createContext<IFooterContext>(defaultContextValue);

const ANIMATION_DURATION = 1500;

export const useFooter = () => useContext(FooterContext);

export const FooterProvider = ({ children }: FooterProvider) => {
  const [showArrows, setShowArrows] = useState(false);
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      document.documentElement.style.setProperty("--animation-duration", `${ANIMATION_DURATION}ms`);
    }
  }, []);

  const triggerGlow = () => {
    const footer = footerRef.current;
    if (footer) {
      footer.classList.add(styles.glow);
      setTimeout(() => footer.classList.remove(styles.glow), ANIMATION_DURATION); 
    }
  };

  return (
    <FooterContext.Provider value={{ footerRef, triggerGlow, showArrows, setShowArrows }}>
      {children}
    </FooterContext.Provider>
  );
};
