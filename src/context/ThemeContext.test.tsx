import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { ThemeProvider } from './ThemeContext'
import { useTheme } from './useTheme'

const ThemeProbe = () => {
    const { isDark, toggleTheme, accent, setAccent, fontSize, setFontSize, resetAppearance } = useTheme()
    return (
        <div>
            <button onClick={toggleTheme}>{isDark ? 'dark' : 'light'}</button>
            <button onClick={() => setAccent('pink')}>accent:{accent}</button>
            <button onClick={() => setFontSize('large')}>font:{fontSize}</button>
            <button onClick={resetAppearance}>reset</button>
        </div>
    )
}

const renderTheme = () =>
    render(
        <ThemeProvider>
            <ThemeProbe />
        </ThemeProvider>,
    )

const root = document.documentElement

describe('ThemeProvider', () => {
    it('index.html이 미리 적용한 <html> 상태를 초기값으로 쓴다', () => {
        root.classList.add('dark')
        root.dataset.accent = 'indigo'
        root.dataset.fontSize = 'small'
        renderTheme()

        expect(screen.getByText('dark')).toBeInTheDocument()
        expect(screen.getByText('accent:indigo')).toBeInTheDocument()
        expect(screen.getByText('font:small')).toBeInTheDocument()
    })

    it('알 수 없는 저장 값은 기본값으로 되돌린다', () => {
        root.dataset.accent = 'not-a-color'
        root.dataset.fontSize = 'huge'
        renderTheme()

        expect(screen.getByText('accent:cyan')).toBeInTheDocument()
        expect(screen.getByText('font:medium')).toBeInTheDocument()
        expect(root.dataset.accent).toBe('cyan')
        expect(root.dataset.fontSize).toBe('medium')
    })

    it('토글하면 <html> 클래스와 localStorage를 함께 갱신한다', async () => {
        root.classList.add('dark')
        renderTheme()

        await userEvent.click(screen.getByText('dark'))

        expect(screen.getByText('light')).toBeInTheDocument()
        expect(root).not.toHaveClass('dark')
        expect(localStorage.getItem('theme')).toBe('light')
    })

    it('강조색과 글자 크기를 <html> data 속성과 localStorage에 반영한다', async () => {
        renderTheme()

        await userEvent.click(screen.getByText('accent:cyan'))
        await userEvent.click(screen.getByText('font:medium'))

        expect(root.dataset.accent).toBe('pink')
        expect(root.dataset.fontSize).toBe('large')
        expect(localStorage.getItem('accent')).toBe('pink')
        expect(localStorage.getItem('fontSize')).toBe('large')
    })

    it('초기화하면 다크 모드, cyan, medium으로 돌아간다', async () => {
        root.dataset.accent = 'red'
        root.dataset.fontSize = 'large'
        renderTheme()

        await userEvent.click(screen.getByText('reset'))

        expect(root).toHaveClass('dark')
        expect(screen.getByText('accent:cyan')).toBeInTheDocument()
        expect(screen.getByText('font:medium')).toBeInTheDocument()
    })

    it('Provider 밖에서 useTheme을 쓰면 에러를 던진다', () => {
        expect(() => render(<ThemeProbe />)).toThrow('useTheme must be used within a ThemeProvider')
    })
})
