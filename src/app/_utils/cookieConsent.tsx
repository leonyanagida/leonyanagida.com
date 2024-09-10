"use client";

import { useEffect, useState } from "react";
import { GoogleAnalytics } from "@next/third-parties/google";

interface Props {
  gaId: string;
}

const CookieConsent = ({ gaId }: Props) => {
  const [consentGiven, setConsentGiven] = useState(false);

  useEffect(() => {
    const checkConsent = () => {
      const consent = localStorage.getItem("cookieConsent");
      if (consent === "accepted") {
        setConsentGiven(true);
        clearInterval(interval); // Stop polling when consent is given
      }
    };

    // Check for consent immediately on mount
    checkConsent();

    // Set an interval to re-check for consent in case it is set later by the GTM banner
    const interval = setInterval(checkConsent, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {consentGiven && gaId && <GoogleAnalytics gaId={gaId} />}
    </>
  );
};

export default CookieConsent;
