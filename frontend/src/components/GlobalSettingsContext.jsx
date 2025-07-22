import React, { createContext, useContext, useState } from "react";

const GlobalSettingsContext = createContext();

export function GlobalSettingsProvider({ children }) {
  const [language, setLanguage] = useState("en");
  const [currency, setCurrency] = useState("INR");
  const currencySymbols = {
    INR: "₹", USD: "$", EUR: "€", GBP: "£", JPY: "¥", AUD: "A$", CAD: "C$"
  };
  const languageLabels = {
    en: "English",
    hi: "हिन्दी",
    es: "Español",
    fr: "Français"
  };

  return (
    <GlobalSettingsContext.Provider value={{ language, setLanguage, currency, setCurrency, currencySymbols, languageLabels }}>
      {children}
    </GlobalSettingsContext.Provider>
  );
}

export function useGlobalSettings() {
  return useContext(GlobalSettingsContext);
}
