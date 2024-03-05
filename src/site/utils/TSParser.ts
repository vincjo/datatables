import { TypescriptParser } from 'typescript-parser'

export default class Parser
{
    private parser = new TypescriptParser()
    private isDeprecated = ['update', 'applySorting', 'getSorted', 'getTriggerChange', 'getPageNumber', 'isAllSelected', 'onChange']

    public async methods(filepath: string)
    {
        const file = await this.parser.parseFile(filepath, 'root')
        const classDeclaration = file.declarations.find(item => item['methods'])

        const parsed = classDeclaration['methods'].map(method => {
            const { name, type, isOptional, isAsync, parameters, variables, visibility } = method
            if (visibility === 0) {
                return null
            }
            const params = parameters.map(param => {
                return {
                    name: param.name,
                    type: param.type
                 }
            })
            return { name, type, isOptional, isAsync, params, variables }
        }).filter(Boolean)

        return parsed.map(method => {
            const isDeprecated = this.isDeprecated.includes(method.name)
            return { ...method, isDeprecated, declaration: Parser.getDeclaration(method) }
        })
    }

    public static getDeclaration(method)
    {
        // { name, type, isOptional, isAsync, params, variables }
        const { name, type, isAsync, params } = method
        return `${isAsync ? 'async ' : ''}${name}(${params.map(param => param.name + ': ' + param.type).join(', ')}): ${type ?? 'void'}`
    }

    public async types(filepath: string)
    {
        const deprecated = ['Selectable', 'FilterBy', 'OrderBy', 'Order']
        const file = await this.parser.parseFile(filepath, 'root')
        return  file.declarations.filter(item => item['isExported']).map(type => {
            return { name: type.name, isDeprecated: deprecated.includes(type.name) }
        })
    }
}
