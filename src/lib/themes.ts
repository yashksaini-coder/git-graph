import { ThemeInput } from "react-activity-calendar";

export const DefaultTheme: ThemeInput = {
  light: ["#e6edf3", "#9ebeff"],
  dark: ["#dad7cd", "#a3b18a", "#588157", "#3a5a40", "#344e41"], 
};

export const DarkTheme: ThemeInput = {
  light: ["#3a4b63", "#273649"], 
  dark: ["#2c3e50", "#34495e", "#1f2a38", "#0f1c2e", "#050c17"], 
};

export const LightTheme: ThemeInput = {
  light: ["#bbdefb", "#90caf9", "#64b5f6", "#42a5f5", "#2196f3"],
  dark: ["#5f7999", "#405a7a", "#2e3b4e", "#1f2b3e", "#162232"], 
};

export const ColorfulTheme: ThemeInput = {
  light: ["#f0f0f0", "#c4edde", "#7ac7c4", "#f73859", "#384259"],
  dark: ['#383838', '#4D455D', '#7DB9B6', '#F5E9CF', '#E96479'],
};

export const themes: Record<string, ThemeInput> = {
  default: DefaultTheme,
  dark: DarkTheme,
  light: LightTheme,
  colorful: ColorfulTheme,
};
