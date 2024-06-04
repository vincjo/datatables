import type { ServerLoadEvent } from '@sveltejs/kit'
import { ROOT_DIR } from './index'
import FS from './FS'
import AST from './AST'
type Params = [
    mode: 'client' | 'remote',
    key: 'types' | 'method' | 'properties',
    name: string
]
import * as fs from 'fs'
import * as path from 'path'

export default class API
{
    protected static ROOT_DIR = './src/routes/test'

    public static async get(url: ServerLoadEvent)
    {
        const mode = url.params.mode
        const [key, name] = url.params.slug.split('~')
        const source = API.read(`${ROOT_DIR}/${mode}/${key}.${name}.json`)
        return {
            ...source,
            markdown: await this.markdown(mode, key, name)
        }
    }

    public static find(params: Params)
    {
        const [mode, key, name] = params
        return API.read(`${ROOT_DIR}/${mode}/${key}.${name}.json`)
    }

    public static nav(mode: string)
    {
        return API.read(`${ROOT_DIR}/${mode}/nav.json`)
    }

    public static async generate(mode: 'client' | 'remote')
    {
        const fs = new FS(mode)
        await fs.generate()
    }

    public static async parse(mode: 'client' | 'remote')
    {
        const ast = new AST(mode)
        return await ast.parse()
    }

    public static read(filepath: string)
    {
        const exists = fs.existsSync(filepath)
        if (!exists) return {
            error: `Documentation not found - ${path.resolve(filepath)}`
        }
        return JSON.parse(fs.readFileSync(filepath, 'utf8'))
    }

    public static async markdown(mode: string, key: string, name: string,)
    {
        const doc = { md: '', error: null }
        const filepath = `${ROOT_DIR}/${mode}/${key}.${name}.md`
        try {
            const mdsvex = await import('mdsvex')
            const md = fs.readFileSync(filepath).toString('utf-8')
            const compiled = await mdsvex.compile(md)
            doc.md = compiled.code.replace(/{@html `/g, '').replace(/`}/g, '')
        } catch (error) {
            doc.md = `<p style="color:var(--ternary)">Documentation not found</p>`
            doc.error = JSON.stringify(error)
        }
        return doc.md
    }
}