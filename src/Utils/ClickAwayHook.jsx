import { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";

export const ClickAwayHook = (initialValue) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(initialValue);

  const clickOutside = (e) => {
    if (ref.current && !ref.current.contains(e.target)) setVisible(false);
  };

  useEffect(() => {
    document.addEventListener("click", clickOutside, true);
    return () => {
      document.removeEventListener("click", clickOutside, true);
    };
  }, [ref]);
  return { visible, setVisible, ref };
};
