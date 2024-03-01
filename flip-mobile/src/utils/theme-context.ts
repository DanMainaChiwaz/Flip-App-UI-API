import { createContext } from "react";

export const themes = {
  light: {
    colors: {
      background: "#fff",
      foreground: "#22aa99",
      primary: "#b9dfdc",
      secondary: "#264656",
      tertiary: "#AEDBD7",
      interactive: "#2a9d8f",
      accent: "#e9c46a",
      inactive: "#aedbd7",
    },
  },
  dark: { colors: { background: "", primary: "", secondary: "", interactive: "", accent: "" } },
};

export const ThemeContext = createContext(themes.light);
