
import { path } from 'gros/page'


export default class Site
{
    public mode     = $state('client')
    public theme    = $state('dark')

    public async setMode(value: 'client' | 'server' | string)
    {
        document.documentElement.dataset.mode = value
        document.cookie = `siteMode=${value}; max-age=31536000; path="/"`
        this.mode = value
        return value
    }

    public getMode()
    {
        if (path.current.includes(`/client/`)) {
            return 'client'
        }
        else if (path.current.includes(`/server/`)) {
            return 'server'
        }
        else {
            const regex = new RegExp(`(^| )siteMode=([^;]+)`)
            const match = document.cookie.match(regex)
            if (match) {
                return match[2]
            }
        }
        return 'client'
    }

    public setTheme = (theme: string) => {
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
}