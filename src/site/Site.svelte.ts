import { page } from '$app/stores'
import { base } from '$app/paths'
import { get } from 'svelte/store'

export default class Site
{
    public mode     = $state('client')
    public theme    = $state('dark')

    public setMode(value: 'client' | 'server' | string)
    {
        document.documentElement.dataset.mode = value
        document.cookie = `siteMode=${value}; max-age=31536000; path="/"`
        this.mode = value
        return value
    }

    public getMode()
    {
        let mode = 'client'
        if (get(page).url.pathname.indexOf(`/client/`) > -1) {
            mode = 'client'
        }
        else if (get(page).url.pathname.indexOf(`/server/`) > -1) {
            mode = 'server'
        }
        else {
            const regex = new RegExp(`(^| )siteMode=([^;]+)`)
            const match = document.cookie.match(regex)
            if (match) {
                mode = match[2]
            }
        }
        return mode
    }

    public setTheme = (theme: 'dark' | 'light') => {
        document.documentElement.dataset.theme = theme
        document.cookie = `siteTheme=${theme}; max-age=31536000; path="/"`
        this.theme = theme
        return theme
    }

    public getTheme = () => {
        const regex = new RegExp(`(^| )siteTheme=([^;]+)`)
        const match = document.cookie.match(regex)
        if (match) {
            return match[2]
        }
        const userPrefersDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches
        if (userPrefersDarkMode) {
            return 'dark'
        }
        return 'light'
    }

    public getPath(url: string)
    {
        const root = '/datatables.runes'
        return `${root}${url}`.replace('//', '/').replace(/\/$/, '')
        if (base) {
            return `${base}${url}`.replace('//', '/').replace(/\/$/, '')
        }
        return url

    }
}