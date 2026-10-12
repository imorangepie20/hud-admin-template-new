import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { ThemeProvider } from './ThemeContext'
import { useTheme } from './useTheme'

const ThemeProbe = () => {
    const { isDark, toggleTheme } = useTheme()
    return <button onClick={toggleTheme}>{isDark ? 'dark' : 'light'}</button>
}

const renderTheme = () =>
    render(
        <ThemeProvider>
            <ThemeProbe />
        </ThemeProvider>,
    )

describe('ThemeProvider', () => {
    it('index.html이 미리 적용한 <html> 클래스를 초기 테마로 쓴다', () => {
        document.documentElement.classList.add('dark')
        renderTheme()

        expect(screen.getByRole('button')).toHaveTextContent('dark')
    })

    it('토글하면 <html> 클래스와 localStorage를 함께 갱신한다', async () => {
        document.documentElement.classList.add('dark')
        renderTheme()

        await userEvent.click(screen.getByRole('button'))

        expect(screen.getByRole('button')).toHaveTextContent('light')
        expect(document.documentElement).not.toHaveClass('dark')
        expect(localStorage.getItem('theme')).toBe('light')
    })

    it('Provider 밖에서 useTheme을 쓰면 에러를 던진다', () => {
        expect(() => render(<ThemeProbe />)).toThrow('useTheme must be used within a ThemeProvider')
    })
})
