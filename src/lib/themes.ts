import { ThemeInput } from "react-activity-calendar";

export const DefaultTheme: ThemeInput = {
  light: ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"],
  dark: ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"],
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
  light: LightTheme,
  colorful: ColorfulTheme,
};
