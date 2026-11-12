"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

interface GovtModeContextType {
  isGovt: boolean;
  toggle: () => void;
}

const GovtModeContext = createContext<GovtModeContextType>({
  isGovt: false,
  toggle: () => {},
});

export function GovtModeProvider({ children }: { children: React.ReactNode }) {
  const [isGovt, setIsGovt] = useState(false);

  /* Persist preference */
  useEffect(() => {
    const stored = localStorage.getItem("cl-govt-mode");
    if (stored === "true") setIsGovt(true);
  }, []);

  const toggle = useCallback(() => {
    setIsGovt((prev) => {
      const next = !prev;
      localStorage.setItem("cl-govt-mode", String(next));
      return next;
    });
  }, []);

  /* Apply data attribute to <html> so CSS vars kick in globally */
  useEffect(() => {
    document.documentElement.setAttribute(
      "data-govt-mode",
      String(isGovt)
    );
  }, [isGovt]);

  return (
    <GovtModeContext.Provider value={{ isGovt, toggle }}>
      {children}
    </GovtModeContext.Provider>
  );
}

export function useGovtMode() {
  return useContext(GovtModeContext);
}
