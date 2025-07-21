import React, { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [dark, setDark] = useState(() => {
    const stored = localStorage.getItem("theme");
    return stored === "dark";
  });

  useEffect(() => {
    localStorage.setItem("theme", dark ? "dark" : "light");
    document.body.style.background = dark ? "#18181b" : "#f8fafc";
    document.body.style.color = dark ? "#f3f4f6" : "#18181b";
  }, [dark]);

  const toggleTheme = () => setDark((d) => !d);

  return (
    <ThemeContext.Provider value={{ dark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
