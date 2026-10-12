import { Suspense, useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Sidebar from '../components/layout/Sidebar'
import Header from '../components/layout/Header'
import PageLoader from '../components/common/PageLoader'

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
    // 드로어를 연 시점의 경로. 페이지를 이동하거나 데스크톱으로 바뀌면 자동으로 닫힌다
    const [drawerPath, setDrawerPath] = useState<string | null>(null)
    const mobileOpen = !isDesktop && drawerPath === location.pathname
    const closeDrawer = () => setDrawerPath(null)

    const handleMenuToggle = () => {
        if (isDesktop) setSidebarCollapsed(prev => !prev)
        else setDrawerPath(mobileOpen ? null : location.pathname)
    }

    const collapsed = isDesktop && sidebarCollapsed

    return (
        <div className="min-h-screen bg-hud-bg-primary hud-grid-bg">
            {/* Mobile Overlay */}
            {!isDesktop && mobileOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-45"
                    onClick={closeDrawer}
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
                    {/* 레이아웃은 유지하고 본문만 로더로 대체 */}
                    <Suspense fallback={<PageLoader />}>
                        <Outlet />
                    </Suspense>
                </main>
            </div>
        </div>
    )
}

export default MainLayout
