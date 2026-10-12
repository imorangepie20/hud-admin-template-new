import { useEffect, useState, ReactNode } from 'react';
import { ThemeContext } from './theme';

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  // index.html의 인라인 스크립트가 첫 페인트 전에 적용한 <html> 클래스를 초기값으로 쓴다
  const [isDark, setIsDark] = useState(() => document.documentElement.classList.contains('dark'));

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
    try {
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
    } catch {
      // 저장소 접근 불가 (사생활 보호 모드 등) 시 저장만 생략
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(prev => !prev);

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
