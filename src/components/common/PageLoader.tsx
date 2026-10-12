interface PageLoaderProps {
    fullScreen?: boolean
}

// lazy 로딩 중 표시하는 로더
const PageLoader = ({ fullScreen = false }: PageLoaderProps) => {
    return (
        <div
            className={`flex items-center justify-center ${fullScreen ? 'min-h-screen bg-hud-bg-primary' : 'min-h-[50vh]'}`}
        >
            <div className="w-10 h-10 rounded-full border-2 border-hud-border-secondary border-t-hud-accent-primary animate-spin" />
        </div>
    )
}

export default PageLoader
