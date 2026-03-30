import React, { useEffect, useState } from "react";
import "./Preloader.css";

interface PreloaderProps {
  /** Minimum time (ms) to show the preloader, even if the page loads faster */
  minDisplayTime?: number;
}

const Preloader: React.FC<PreloaderProps> = ({ minDisplayTime = 2000 }) => {
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    let minTimePassed = false;
    let pageLoaded = false;

    const tryHide = () => {
      if (minTimePassed && pageLoaded) {
        setFadeOut(true);
        setTimeout(() => setVisible(false), 600);
      }
    };

    const minTimer = setTimeout(() => {
      minTimePassed = true;
      tryHide();
    }, minDisplayTime);

    const onLoad = () => {
      pageLoaded = true;
      tryHide();
    };

    if (document.readyState === "complete") {
      pageLoaded = true;
      // Still wait for minDisplayTime
    } else {
      window.addEventListener("load", onLoad);
    }

    return () => {
      clearTimeout(minTimer);
      window.removeEventListener("load", onLoad);
    };
  }, [minDisplayTime]);

  if (!visible) return null;

  return (
    <div
      className={`preloader-overlay ${fadeOut ? "preloader-fade-out" : ""}`}
      aria-label="Loading"
      role="status"
    >
      <div className="preloader-rocket-body">
        <span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </span>
        <div className="preloader-base">
          <span></span>
          <div className="preloader-face"></div>
        </div>
      </div>
      <div className="preloader-longfazers">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
};

export default Preloader;
