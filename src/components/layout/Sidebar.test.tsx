import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'
import Sidebar from './Sidebar'

const renderSidebar = (path: string, props: Partial<Parameters<typeof Sidebar>[0]> = {}) => {
    const onExpand = vi.fn()
    render(
        <MemoryRouter initialEntries={[path]}>
            <Sidebar collapsed={false} mobileOpen={false} onExpand={onExpand} {...props} />
        </MemoryRouter>,
    )
    return { onExpand }
}

describe('Sidebar', () => {
    it('현재 경로가 속한 상위 메뉴를 자동으로 펼친다', () => {
        renderSidebar('/email/inbox')

        expect(screen.getByRole('link', { name: 'Inbox' })).toBeInTheDocument()
        // 다른 상위 메뉴는 닫혀 있다
        expect(screen.queryByRole('link', { name: 'AI Chat' })).not.toBeInTheDocument()
    })

    it('펼쳐진 상위 메뉴를 다시 누르면 닫힌다', async () => {
        renderSidebar('/email/inbox')

        await userEvent.click(screen.getByRole('button', { name: /Email/ }))

        expect(screen.queryByRole('link', { name: 'Inbox' })).not.toBeInTheDocument()
    })

    it('메일 상세는 id와 관계없이 Detail 메뉴를 활성 표시한다', () => {
        renderSidebar('/email/detail/42')

        expect(screen.getByRole('link', { name: 'Detail' })).toHaveClass('text-hud-accent-primary')
        expect(screen.getByRole('link', { name: 'Inbox' })).not.toHaveClass('text-hud-accent-primary')
    })

    it('접힌 상태에서는 라벨 대신 툴팁(title)을 보여 준다', () => {
        renderSidebar('/', { collapsed: true })

        expect(screen.queryByText('Analytics')).not.toBeInTheDocument()
        expect(screen.getByTitle('Analytics')).toBeInTheDocument()
    })

    it('접힌 상태에서 상위 메뉴를 누르면 사이드바 펼침을 요청한다', async () => {
        const { onExpand } = renderSidebar('/', { collapsed: true })

        await userEvent.click(screen.getByTitle('AI Studio'))

        expect(onExpand).toHaveBeenCalledTimes(1)
    })

    it('모바일 드로어가 닫혀 있으면 화면 밖에 둔다', () => {
        renderSidebar('/')

        expect(document.querySelector('aside')).toHaveClass('-translate-x-full')
    })
})
