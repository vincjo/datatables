import { parseFromFiles,
    type TypeAliasDeclaration,
    type Method,
    type Field,
    type ClassDeclaration,
} from '@ts-ast-parser/core'

export default class AST
{
    private mode: 'client' | 'remote'

    constructor(mode: 'client' | 'remote' = 'client')
    {
        this.mode = mode
    }

    public async parse()
    {
        return {
            ...await this.classDeclarations(),
            types: await this.types(),
        }
    }

    public async types()
    {
        const { project } = await parseFromFiles([`./src/lib/${this.mode}/index.ts`])
        const reflectedModules = project?.getModules() ?? []
        const [ ast ] = reflectedModules.map(item => item.serialize())

        return ast.declarations.map((type: TypeAliasDeclaration) => {
            if (type.name === 'Check') {
                type.value.text = `(entry: Row[keyof Row], value: any) => boolean`
            }
            return {
                name: type.name,
                text: 'type ' + type.name + ' = ' + type.value.text,
                jsDoc: type.jsDoc,
                ast: type
            }
        })
    }

    public async classDeclarations()
    {
        const { project } = await parseFromFiles([`./src/lib/${this.mode}/TableHandler.svelte.ts`])
        const reflectedModules = project?.getModules() ?? []
        const [ ast ] = reflectedModules.map(item => item.serialize())
        const classDeclaration = ast.declarations.find(declaration => declaration.kind === 'Class') as ClassDeclaration
        const { properties, methods } = classDeclaration
        return {
            properties: this.parseProperties(properties),
            methods: await this.parseMethods(methods),
        }
    }

    private async parseMethods(declarations: readonly Method[])
    {
        if (!declarations) {
            return []
        }
        const methods = []
        for (const method of declarations) {
            const [ signature ] = method.signatures
            const args = signature?.parameters?.map(parameter => {
                const separator = parameter.optional ? '?: ' : ': '
                return {
                    name: parameter.name,
                    type: parameter.type.text.replace(/"/g, "'"),
                    text: parameter.name + separator + parameter.type.text.replace(/"/g, "'"),
                    optional: parameter.optional
                }
            }) ?? []
            const text = method.name + '(' + args.map(arg => arg.text).join(', ') + '): ' + signature.return.type.text

            methods.push({
                name: method.name,
                text: text,
                returnType: signature.return?.type?.text,
                args: args,
                jsDoc: method.jsDoc,
                ast: method,
                ext: await this.parseHelper(method.name)
            })
        }
        return methods
    }

    private parseProperties(declarations: readonly Field[])
    {
        if (!declarations) return []
        const properties = declarations.map(property => {
            const def = property?.default as string ?? ''
            const rune = def.startsWith('$') ? def.split('>(')[0] + '>' : undefined
            const type = rune ?? property.type.text
            return {
                name: property.name,
                text: 'type ' + type,
                type: type,
                jsDoc: property.jsDoc,
                ast: property
            }
        })
        return properties
    }

    private async parseHelper(name: string)
    {
        if (name.startsWith('create') === false) {
            return undefined
        }
        const className = name.replace('create', '')
        const { project } = await parseFromFiles([`./src/lib/${this.mode}/helpers/${className}Helper.svelte.ts`])
        const reflectedModules = project?.getModules() ?? []
        if (reflectedModules.length === 0) {
            return undefined
        }
        const [ ast ] = reflectedModules.map(item => item.serialize())
        const classDeclaration = ast.declarations.find(declaration => declaration.kind === 'Class') as ClassDeclaration
        const { properties, methods } = classDeclaration
        return {
            properties: this.parseProperties(properties),
            methods: await this.parseMethods(methods),
        }
    }
}