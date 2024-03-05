import { writable } from 'svelte/store'
export { default as TSParser } from './TSParser'

export const mode = writable('')

export const setMode = (value: 'client' | 'remote') => {
    document.documentElement.dataset.mode = value
    document.cookie = `siteMode=${value}; max-age=31536000; path="/"`
    mode.set(value)
    return value
}

export const getMode = () => {
    const regex = new RegExp(`(^| )siteMode=([^;]+)`)
    const match = document.cookie.match(regex)
    if (match) {
        return match[2]
    }
    return 'client'
}