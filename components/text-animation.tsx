"use client";

import { useState, useEffect, memo } from "react";

interface TextAnimationProps {
  prefix?: string;
  word?: string;
}

const DEFAULT_PREFIX = "Full Stack ";
const DEFAULT_WORD = "Developer";
const TYPING_INTERVAL_MS = 1000;

function TextAnimation({
  prefix = DEFAULT_PREFIX,
  word = DEFAULT_WORD,
}: TextAnimationProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev < word.length ? prev + 1 : 0));
    }, TYPING_INTERVAL_MS);

    return () => clearInterval(interval);
  }, [word.length]);

  return <>{prefix + word.slice(0, currentIndex)}</>;
}

export default memo(TextAnimation);
