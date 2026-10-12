import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import Settings from './Settings'
import { ThemeProvider } from '../context/ThemeContext'

const openAppearance = async () => {
    render(
        <ThemeProvider>
            <Settings />
        </ThemeProvider>,
    )
    await userEvent.click(screen.getByRole('button', { name: 'Appearance' }))
}

const root = document.documentElement

describe('Settings > Appearance', () => {
    it('다크 모드 스위치가 실제 테마를 바꾼다', async () => {
        root.classList.add('dark')
        await openAppearance()
        const toggle = screen.getByRole('switch', { name: 'Dark Mode' })

        expect(toggle).toBeChecked()
        await userEvent.click(toggle)

        expect(toggle).not.toBeChecked()
        expect(root).not.toHaveClass('dark')
    })

    it('강조색을 선택하면 적용되고 선택 표시가 옮겨 간다', async () => {
        await openAppearance()

        expect(screen.getByRole('radio', { name: 'Cyan' })).toHaveAttribute('aria-checked', 'true')
        await userEvent.click(screen.getByRole('radio', { name: 'Emerald' }))

        expect(root.dataset.accent).toBe('emerald')
        expect(screen.getByRole('radio', { name: 'Emerald' })).toHaveAttribute('aria-checked', 'true')
        expect(screen.getByRole('radio', { name: 'Cyan' })).toHaveAttribute('aria-checked', 'false')
    })

    it('글자 크기를 선택하면 적용된다', async () => {
        await openAppearance()

        await userEvent.click(screen.getByRole('radio', { name: 'Large' }))

        expect(root.dataset.fontSize).toBe('large')
        expect(screen.getByRole('radio', { name: 'Large' })).toHaveAttribute('aria-checked', 'true')
    })

    it('Reset to defaults로 모든 외관 설정을 되돌린다', async () => {
        await openAppearance()
        await userEvent.click(screen.getByRole('radio', { name: 'Red' }))
        await userEvent.click(screen.getByRole('radio', { name: 'Small' }))

        await userEvent.click(screen.getByRole('button', { name: /Reset to defaults/ }))

        expect(root.dataset.accent).toBe('cyan')
        expect(root.dataset.fontSize).toBe('medium')
        expect(root).toHaveClass('dark')
    })
})
