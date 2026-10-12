import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach } from 'vitest'

// jsdom에는 matchMedia가 없으므로 화면 폭을 흉내 낸다 (기본: 데스크톱)
let viewportWidth = 1440

export const setViewportWidth = (width: number) => {
    viewportWidth = width
}

const evaluate = (query: string) => {
    const min = /min-width:\s*(\d+)px/.exec(query)
    return min ? viewportWidth >= Number(min[1]) : false
}

Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: (query: string) => ({
        matches: evaluate(query),
        media: query,
        onchange: null,
        addEventListener: () => {},
        removeEventListener: () => {},
        addListener: () => {},
        removeListener: () => {},
        dispatchEvent: () => false,
    }),
})

afterEach(() => {
    cleanup()
    viewportWidth = 1440
    localStorage.clear()
    document.documentElement.className = ''
})
