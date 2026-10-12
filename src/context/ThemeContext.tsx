import { useEffect, useState, ReactNode } from 'react';
import {
  ThemeContext,
  DEFAULT_ACCENT,
  DEFAULT_FONT_SIZE,
  isAccent,
  isFontSize,
  type Accent,
  type FontSize,
} from './theme';

const save = (key: string, value: string) => {
  try {
    localStorage.setItem(key, value);
  } catch {
    // 저장소 접근 불가 (사생활 보호 모드 등) 시 저장만 생략
  }
};

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const root = document.documentElement;

  // index.html의 인라인 스크립트가 첫 페인트 전에 적용한 <html> 상태를 초기값으로 쓴다
  const [isDark, setIsDark] = useState(() => root.classList.contains('dark'));
  const [accent, setAccent] = useState<Accent>(() =>
    isAccent(root.dataset.accent) ? root.dataset.accent : DEFAULT_ACCENT
  );
  const [fontSize, setFontSize] = useState<FontSize>(() =>
    isFontSize(root.dataset.fontSize) ? root.dataset.fontSize : DEFAULT_FONT_SIZE
  );

  useEffect(() => {
    root.classList.toggle('dark', isDark);
    save('theme', isDark ? 'dark' : 'light');
  }, [root, isDark]);

  useEffect(() => {
    root.dataset.accent = accent;
    save('accent', accent);
  }, [root, accent]);

  useEffect(() => {
    root.dataset.fontSize = fontSize;
    save('fontSize', fontSize);
  }, [root, fontSize]);

  const toggleTheme = () => setIsDark(prev => !prev);

  const resetAppearance = () => {
    setIsDark(true);
    setAccent(DEFAULT_ACCENT);
    setFontSize(DEFAULT_FONT_SIZE);
  };

  return (
    <ThemeContext.Provider
      value={{
        isDark,
        toggleTheme,
        setDark: setIsDark,
        accent,
        setAccent,
        fontSize,
        setFontSize,
        resetAppearance,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
