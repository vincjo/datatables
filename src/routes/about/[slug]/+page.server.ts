import { readFileSync } from 'fs'

export const load = async ({ params }) => {
    const slug = params.slug
    try {
        const mdsvex = await import('mdsvex')
        const content = readFileSync(`./${slug}`).toString('utf-8')
        const html = await mdsvex.compile(content)
        return {
            content: `<div class="${slug.substring(0, 5).toLocaleLowerCase()}">` + html.code.replace(/{@html `/g, '').replace(/`}/g, '') + `</div>`
        } 
    } catch (error) {
        return {
            content: `<p style="color:var(--ternary)">Documentation not found</p>`
        }
    }
}