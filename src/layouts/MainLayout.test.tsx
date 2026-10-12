import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import MainLayout from './MainLayout'
import { ThemeProvider } from '../context/ThemeContext'
import { setViewportWidth } from '../test/setup'

const renderLayout = (path = '/') =>
    render(
        <ThemeProvider>
            <MemoryRouter initialEntries={[path]}>
                <Routes>
                    <Route path="/" element={<MainLayout />}>
                        <Route index element={<p>home page</p>} />
                        <Route path="analytics" element={<p>analytics page</p>} />
                    </Route>
                </Routes>
            </MemoryRouter>
        </ThemeProvider>,
    )

const sidebar = () => document.querySelector('aside')!
const overlay = () => document.querySelector('.bg-black\\/50')
const menuButton = () => screen.getByRole('button', { name: 'Toggle menu' })

describe('MainLayout (데스크톱)', () => {
    it('메뉴 버튼으로 사이드바를 접고 편다', async () => {
        renderLayout()
        const content = sidebar().nextElementSibling!

        expect(sidebar()).toHaveClass('w-64')
        expect(content).toHaveClass('lg:ml-64')

        await userEvent.click(menuButton())
        expect(sidebar()).toHaveClass('w-20')
        expect(content).toHaveClass('lg:ml-20')

        await userEvent.click(menuButton())
        expect(sidebar()).toHaveClass('w-64')
    })

    it('오버레이를 표시하지 않는다', async () => {
        renderLayout()
        await userEvent.click(menuButton())

        expect(overlay()).not.toBeInTheDocument()
    })
})

describe('MainLayout (모바일)', () => {
    it('메뉴 버튼으로 드로어를 열고, 오버레이를 누르면 닫는다', async () => {
        setViewportWidth(375)
        renderLayout()

        expect(sidebar()).toHaveClass('-translate-x-full')

        await userEvent.click(menuButton())
        expect(sidebar()).toHaveClass('translate-x-0')
        expect(overlay()).toBeInTheDocument()

        await userEvent.click(overlay()!)
        expect(sidebar()).toHaveClass('-translate-x-full')
        expect(overlay()).not.toBeInTheDocument()
    })

    it('드로어에서 메뉴를 눌러 이동하면 드로어가 닫힌다', async () => {
        setViewportWidth(375)
        renderLayout()

        await userEvent.click(menuButton())
        await userEvent.click(screen.getByRole('link', { name: 'Analytics' }))

        expect(screen.getByText('analytics page')).toBeInTheDocument()
        expect(sidebar()).toHaveClass('-translate-x-full')
    })

    it('모바일에서는 접힘 상태를 쓰지 않고 전체 라벨을 보여 준다', async () => {
        setViewportWidth(375)
        renderLayout()

        await userEvent.click(menuButton())

        expect(sidebar()).toHaveClass('w-64')
        expect(screen.getByRole('link', { name: 'Analytics' })).toHaveTextContent('Analytics')
    })
})
