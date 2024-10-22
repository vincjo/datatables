import type { RequestEvent } from '@sveltejs/kit'


export const handle = async ({ event, resolve }) => {
    const theme = event.cookies.get('siteTheme') ?? 'light'
    const mode = getMode(event)
    return resolve(event, {
        transformPageChunk: ({ html }) => { 
            return html.replace(`data-theme=""`, `data-theme="${theme}"`)
                       .replace(`data-mode=""`, `data-mode="${mode}"`)
        }
    })
}

const getMode = (event: RequestEvent) => {
    if (event.url.pathname.includes('/server/')) {
        return 'server'
    }
    else if (event.url.pathname.includes('/client/')) {
        return 'client'
    }
    return event.cookies.get('siteMode') ?? 'client'
}