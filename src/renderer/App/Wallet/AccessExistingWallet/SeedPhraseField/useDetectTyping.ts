import { useState, useEffect } from "react";
import { TimeoutId } from "_t/typeHelpers";

export const useDetectTyping = () => {
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    let timeoutId: TimeoutId;

    if (isTyping) {
      timeoutId = setTimeout(() => {
        setIsTyping(false);
      }, 2000);
    }

    return () => clearTimeout(timeoutId);
  }, [isTyping]);

  return { isTyping, setIsTyping };
};
