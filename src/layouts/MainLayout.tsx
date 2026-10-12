import { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Sidebar from '../components/layout/Sidebar'
import Header from '../components/layout/Header'

// lg 브레이크포인트(1024px) 이상이면 고정 사이드바, 미만이면 오버레이 드로어
const DESKTOP_QUERY = '(min-width: 1024px)'

const useIsDesktop = () => {
    const [isDesktop, setIsDesktop] = useState(() => window.matchMedia(DESKTOP_QUERY).matches)

    useEffect(() => {
        const mql = window.matchMedia(DESKTOP_QUERY)
        const onChange = (e: MediaQueryListEvent) => setIsDesktop(e.matches)
        mql.addEventListener('change', onChange)
        return () => mql.removeEventListener('change', onChange)
    }, [])

    return isDesktop
}

const MainLayout = () => {
    const isDesktop = useIsDesktop()
    const location = useLocation()
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
    const [mobileOpen, setMobileOpen] = useState(false)

    // 모바일에서 페이지 이동 시 드로어 닫기
    useEffect(() => {
        setMobileOpen(false)
    }, [location.pathname])

    // 데스크톱으로 전환되면 드로어 상태 초기화
    useEffect(() => {
        if (isDesktop) setMobileOpen(false)
    }, [isDesktop])

    const handleMenuToggle = () => {
        if (isDesktop) setSidebarCollapsed(prev => !prev)
        else setMobileOpen(prev => !prev)
    }

    const collapsed = isDesktop && sidebarCollapsed

    return (
        <div className="min-h-screen bg-hud-bg-primary hud-grid-bg">
            {/* Mobile Overlay */}
            {!isDesktop && mobileOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-45"
                    onClick={() => setMobileOpen(false)}
                />
            )}

            {/* Sidebar */}
            <Sidebar
                collapsed={collapsed}
                mobileOpen={mobileOpen}
                onExpand={() => setSidebarCollapsed(false)}
            />

            {/* Main Content */}
            <div className={`transition-all duration-300 ${collapsed ? 'lg:ml-20' : 'lg:ml-64'}`}>
                {/* Header */}
                <Header onMenuToggle={handleMenuToggle} />

                {/* Page Content */}
                <main className="p-4 sm:p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}

export default MainLayout
