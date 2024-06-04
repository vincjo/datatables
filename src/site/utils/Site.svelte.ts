import { page } from '$app/stores'
import { base } from '$app/paths'
import { get } from 'svelte/store'

export default class Site
{
    public mode     = $state('client')
    public theme    = $state('dark')
    public url      = $derived(get(page).url.pathname)

    public setMode(value: 'client' | 'remote' | string)
    {
        document.documentElement.dataset.mode = value
        document.cookie = `siteMode=${value}; max-age=31536000; path="/"`
        this.mode = value
        return value
    }

    public getMode()
    {
        const regex = new RegExp(`(^| )siteMode=([^;]+)`)
        const match = document.cookie.match(regex)
        if (match) {
            this.mode = match[2]
            return match[2]
        }
        this.mode = 'client'
        return 'client'
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
        if (base) {
            return `${base}${url}`.replace('//', '/').replace(/\/$/, '')
        }
        return url

    }

    public switchMode(mode: string)
    {
        if (this.url.indexOf(`/${this.mode}/docs`) > -1) {
            this.setMode(mode)
            return this.getPath(`/${mode}/docs`)
        }
        else if (this.url.indexOf(`/${this.mode}/api`)) {
            this.setMode(mode)
            return this.getPath(`/${mode}/api`)
        }
        else if (this.url.indexOf(`/${this.mode}/examples`)) {
            this.setMode(mode)
            return this.getPath(`/${mode}/examples`)
        }
        this.setMode(mode)
        return this.getPath('/')
    }
}