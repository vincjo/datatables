
import { path } from 'gros/page'


export default class Site
{
    public mode     = $state(undefined)
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
        if (path.current.includes(`/client`)) {
            return 'client'
        }
        else if (path.current.includes(`/server`)) {
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
}