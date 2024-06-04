import * as fs from 'fs'
import AST from './AST'
import { ROOT_DIR, type Declaration } from './index'



export default class FS 
{
    private mode: 'client' | 'remote'

    constructor(mode: 'client' | 'remote' = 'client')
    {
        this.mode = mode
    }

    public async generate() 
    {
        const ast = new AST(this.mode)
        const declaration = await ast.parse()
        this.createNav(declaration)
        this.createPages('types', declaration)
        this.createPages('methods', declaration)
        this.createPages('properties', declaration)
    }

    public createNav({ properties, methods, types }: Declaration)
    {
        const nav = {
            properties: properties.map(property => property.name),
            methods:    methods.map(method => method.name),
            types:      types.map(type => type.name)
        }
        this.write(`${ROOT_DIR}/${this.mode}/nav.json`, JSON.stringify(nav))
    }

    public createPages(key: keyof Declaration, declaration: Declaration)
    {
        for (const item of declaration[key]) {
            const filepath = `${ROOT_DIR}/${this.mode}/${key}.${item.name}.json`
            this.write(filepath, JSON.stringify(item))
        }
    }

    private write(filepath: string, content: string)
    {
        const exists = fs.existsSync(filepath)
        if (exists) {
            fs.unlinkSync(filepath)
        }
        fs.writeFileSync(filepath, content)
    }
}