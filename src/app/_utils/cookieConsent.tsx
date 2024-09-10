"use client";

import { useEffect, useState } from "react";
import { GoogleAnalytics } from "@next/third-parties/google";

interface Props {
  gaId: string;
}

const CookieConsent = ({ gaId }: Props) => {
  const [consentGiven, setConsentGiven] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (consent === "accepted") {
      setConsentGiven(true);
    }
  }, []);

  return (
    <>
      {consentGiven && gaId && <GoogleAnalytics gaId={gaId} />}
    </>
  );
};

export default CookieConsent;
