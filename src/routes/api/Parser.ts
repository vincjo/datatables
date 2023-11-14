import { TypescriptParser } from 'typescript-parser'
import { doc as typeDoc } from './doc_types'
import * as fs from 'fs'

export default class Parser
{
    private parser = new TypescriptParser()

    public async methods(filepath: string)
    {
        const file = await this.parser.parseFile(filepath, 'root')
        const classDeclaration = file.declarations.find(item => item['methods'])

        const parsed = classDeclaration['methods'].map(method => {
            const { name, type, isOptional, isAsync, parameters, variables } = method
            const params = parameters.map(param => {
                return {
                    name: param.name,
                    type: param.type
                 }
            })
            return { name, type, isOptional, isAsync, params, variables }
        })

        for (const method of parsed) {
            try {
                const mdsvex = await import('mdsvex')
                const md = fs.readFileSync(`./src/site/doc/${method.name}.md`).toString('utf-8')
                const compiled = await mdsvex.compile(md)
                method.md = compiled.code.replace(/{@html `/g, '').replace(/`}/g, '')
            } catch (error) {

            }
        }
        return parsed.map(method => {
            const isDeprecated = [
                'update', 'applySorting', 'getSorted', 'getTriggerChange', 'getPageNumber'
            ].includes(method.name)
            return { ...method, isDeprecated }
        })
    }

    public async types(filepath: string)
    {
        const file = await this.parser.parseFile(filepath, 'root')
        const parsed = file.declarations.filter(item => item['isExported']).map(type => {
            return { name: type.name }
        })
        return parsed.map(type => {
            return { ...type, ...typeDoc[type.name]}
        })
    }
}