

export const handle = async ({ event, resolve }) => {
    const theme = event.cookies.get('siteTheme')
    if (theme) {
        return await resolve(event, {
            transformPageChunk: ({ html }) => html.replace(`data-theme=""`, `data-theme="${theme}"`)
        })
    }

    return await resolve(event)
}