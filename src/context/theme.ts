import { createContext } from 'react';

// index.css의 :root[data-accent] 프리셋과 값이 같아야 한다 (스와치 표시용)
export const ACCENT_PRESETS = [
  { id: 'cyan', label: 'Cyan', light: '8, 145, 178', dark: '0, 255, 204' },
  { id: 'indigo', label: 'Indigo', light: '79, 70, 229', dark: '99, 102, 241' },
  { id: 'pink', label: 'Pink', light: '219, 39, 119', dark: '255, 20, 147' },
  { id: 'orange', label: 'Orange', light: '217, 119, 6', dark: '255, 165, 0' },
  { id: 'emerald', label: 'Emerald', light: '5, 150, 105', dark: '16, 185, 129' },
  { id: 'red', label: 'Red', light: '220, 38, 38', dark: '239, 68, 68' },
] as const;

export const FONT_SIZES = [
  { id: 'small', label: 'Small' },
  { id: 'medium', label: 'Medium' },
  { id: 'large', label: 'Large' },
] as const;

export type Accent = (typeof ACCENT_PRESETS)[number]['id'];
export type FontSize = (typeof FONT_SIZES)[number]['id'];

export const DEFAULT_ACCENT: Accent = 'cyan';
export const DEFAULT_FONT_SIZE: FontSize = 'medium';

export const isAccent = (value: unknown): value is Accent =>
  ACCENT_PRESETS.some(preset => preset.id === value);

export const isFontSize = (value: unknown): value is FontSize =>
  FONT_SIZES.some(size => size.id === value);

export interface ThemeContextProps {
  isDark: boolean;
  toggleTheme: () => void;
  setDark: (isDark: boolean) => void;
  accent: Accent;
  setAccent: (accent: Accent) => void;
  fontSize: FontSize;
  setFontSize: (fontSize: FontSize) => void;
  resetAppearance: () => void;
}

export const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);
