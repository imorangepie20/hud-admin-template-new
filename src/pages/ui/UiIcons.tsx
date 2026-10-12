import { useState } from 'react'
import { Search, Check, Star, Heart, Plus, Edit, Share2, Download, Trash2, icons } from 'lucide-react'
import HudCard from '../../components/common/HudCard'

// lucide-react 전체 아이콘 (이 페이지는 lazy 로딩되므로 메인 번들에는 포함되지 않는다)
const iconNames = Object.keys(icons).sort()
const PAGE_SIZE = 120

const UiIcons = () => {
    const [searchQuery, setSearchQuery] = useState('')
    const [copiedIcon, setCopiedIcon] = useState<string | null>(null)
    const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)

    const query = searchQuery.trim().toLowerCase()
    const filteredIcons = iconNames.filter(name => name.toLowerCase().includes(query))
    const visibleIcons = filteredIcons.slice(0, visibleCount)

    const handleSearch = (value: string) => {
        setSearchQuery(value)
        setVisibleCount(PAGE_SIZE)
    }

    const copyToClipboard = (iconName: string) => {
        navigator.clipboard.writeText(`<${iconName} />`)
        setCopiedIcon(iconName)
        setTimeout(() => setCopiedIcon(null), 2000)
    }

    const renderIcon = (name: string) => {
        const IconComponent = icons[name as keyof typeof icons]
        if (!IconComponent) return null
        return <IconComponent size={24} className="text-hud-text-primary" />
    }

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-hud-text-primary">Icons</h1>
                    <p className="text-hud-text-muted mt-1">Lucide React icon library - {filteredIcons.length.toLocaleString()} / {iconNames.length.toLocaleString()} icons</p>
                </div>
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-hud-text-muted" size={18} />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => handleSearch(e.target.value)}
                        placeholder="Search icons..."
                        className="w-full sm:w-64 pl-10 pr-4 py-2 bg-hud-bg-secondary border border-hud-border-secondary rounded-lg text-sm text-hud-text-primary placeholder-hud-text-muted focus:outline-none focus:border-hud-accent-primary transition-hud"
                    />
                </div>
            </div>

            {/* Icons Grid */}
            <HudCard noPadding>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10">
                    {visibleIcons.map((iconName) => (
                        <button
                            key={iconName}
                            onClick={() => copyToClipboard(iconName)}
                            className="p-4 flex flex-col items-center gap-2 border-r border-b border-hud-border-secondary hover:bg-hud-bg-hover transition-hud group relative"
                        >
                            {copiedIcon === iconName ? (
                                <Check size={24} className="text-hud-accent-success" />
                            ) : (
                                renderIcon(iconName)
                            )}
                            <span className="text-[11px] leading-tight text-hud-text-muted w-full text-center break-all line-clamp-2">
                                {copiedIcon === iconName ? 'Copied!' : iconName}
                            </span>

                            {/* Tooltip */}
                            <div className="hidden md:block absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-hud-bg-primary border border-hud-border-secondary rounded text-xs text-hud-text-primary opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
                                {iconName} · Click to copy
                            </div>
                        </button>
                    ))}
                </div>

                {filteredIcons.length === 0 && (
                    <p className="py-12 text-center text-sm text-hud-text-muted">No icons match "{searchQuery}"</p>
                )}

                {visibleCount < filteredIcons.length && (
                    <div className="p-4 flex items-center justify-center gap-3 border-t border-hud-border-secondary">
                        <span className="text-xs text-hud-text-muted">
                            Showing {visibleIcons.length.toLocaleString()} of {filteredIcons.length.toLocaleString()}
                        </span>
                        <button
                            onClick={() => setVisibleCount(c => c + PAGE_SIZE)}
                            className="px-4 py-2 text-sm border border-hud-accent-primary text-hud-accent-primary rounded-lg hover:bg-hud-accent-primary/10 transition-hud"
                        >
                            Load more
                        </button>
                        <button
                            onClick={() => setVisibleCount(filteredIcons.length)}
                            className="px-4 py-2 text-sm text-hud-text-secondary hover:text-hud-text-primary transition-hud"
                        >
                            Show all
                        </button>
                    </div>
                )}
            </HudCard>

            {/* Icon Sizes */}
            <HudCard title="Icon Sizes" subtitle="Different size variants">
                <div className="flex flex-wrap items-end gap-6">
                    {[16, 20, 24, 32, 40, 48, 64].map((size) => (
                        <div key={size} className="text-center">
                            <Star size={size} className="text-hud-accent-primary mx-auto" />
                            <p className="text-xs text-hud-text-muted mt-2">{size}px</p>
                        </div>
                    ))}
                </div>
            </HudCard>

            {/* Icon Colors */}
            <HudCard title="Icon Colors" subtitle="Using different accent colors">
                <div className="flex items-center gap-4 flex-wrap">
                    <Heart size={32} className="text-hud-accent-primary" />
                    <Heart size={32} className="text-hud-accent-secondary" />
                    <Heart size={32} className="text-hud-accent-success" />
                    <Heart size={32} className="text-hud-accent-warning" />
                    <Heart size={32} className="text-hud-accent-danger" />
                    <Heart size={32} className="text-hud-accent-info" />
                    <Heart size={32} className="text-hud-text-primary" />
                    <Heart size={32} className="text-hud-text-secondary" />
                    <Heart size={32} className="text-hud-text-muted" />
                </div>
            </HudCard>

            {/* Icon Styles */}
            <HudCard title="Icon Buttons" subtitle="Icons in different button styles">
                <div className="flex flex-wrap gap-4">
                    <button className="p-3 bg-hud-accent-primary text-hud-bg-primary rounded-lg hover:bg-hud-accent-primary/90 transition-hud">
                        <Plus size={20} />
                    </button>
                    <button className="p-3 border border-hud-accent-primary text-hud-accent-primary rounded-lg hover:bg-hud-accent-primary/10 transition-hud">
                        <Edit size={20} />
                    </button>
                    <button className="p-3 bg-hud-accent-primary/10 text-hud-accent-primary rounded-lg hover:bg-hud-accent-primary/20 transition-hud">
                        <Heart size={20} />
                    </button>
                    <button className="p-3 bg-hud-accent-primary text-hud-bg-primary rounded-full hover:bg-hud-accent-primary/90 transition-hud">
                        <Share2 size={20} />
                    </button>
                    <button className="p-3 border border-hud-accent-primary text-hud-accent-primary rounded-full hover:bg-hud-accent-primary/10 transition-hud">
                        <Download size={20} />
                    </button>
                    <button className="p-3 bg-hud-accent-danger text-white rounded-lg hover:bg-hud-accent-danger/90 transition-hud">
                        <Trash2 size={20} />
                    </button>
                </div>
            </HudCard>
        </div>
    )
}

export default UiIcons
