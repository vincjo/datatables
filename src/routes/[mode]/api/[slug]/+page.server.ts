import * as fs from 'fs'
import { TSParser } from '$site/utils'

export const load = (async (url) => {
    const [category, name] = url.params.slug.split('~')
    const mode = url.params.mode
    const doc = { md: '', error: null }
    const filename = category === 'methods' ? name : 'type.' + name
    try {
        const mdsvex = await import('mdsvex')
        const md = fs.readFileSync(`./src/site/doc/${mode}/${filename}.md`).toString('utf-8')
        const compiled = await mdsvex.compile(md)
        doc.md = compiled.code.replace(/{@html `/g, '').replace(/`}/g, '')
    } catch (error) {
        doc.md = `<p style="color:var(--ternary)">Documentation not found</p>`
        doc.error = JSON.stringify(error)
    }

    if (name.startsWith('create')) {
        const parser = new TSParser()
        const className = name.replace('create', '') + 'Helper'
        const helper = await parser.methods(`./src/lib/${mode}/helpers/${className}.ts`)

        return { doc, helper: structuredClone(helper) }
    }
    return { doc: doc }
})