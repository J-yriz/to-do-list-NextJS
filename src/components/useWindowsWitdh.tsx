/*
*
* Custom Hook to get the width of the window if it changes
* and return the width of the window
* @returns {number} windowWidth
* 
*/

"use client";

import { useState, useEffect } from "react";

const useWindowsWidth = () => {
  const [windowWidth, setWindowWidth] = useState<number>(0);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [setWindowWidth]);

  return windowWidth;
};

export default useWindowsWidth;