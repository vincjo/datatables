import type { Field, TypeAliasDeclaration, Method as ASTMethod } from '@ts-ast-parser/core'

export { default as API } from './API'

export const ROOT_DIR = './static/doc'

export const internal = {
    properties: ['events', 'rawRows', 'sorting', 'filters', 'selectScope'],
    types: ['Sorting'],
    methods: [],
}

export type Declaration = {
    types: Type[],
    properties: Property[],
    methods: Method[]
}

export type Method = {
    name: string,
    text: string,
    returnType: string,
    args: { name: string, type: string, text: string }[],
    jsDoc: any[],
    ast: ASTMethod,
    ext?: { methods: Method[], properties: Property[] },
    markdown?: string,
}

export type Type = {
    name: string,
    text: string,
    jsDoc: any[],
    ast: TypeAliasDeclaration,
    markdown?: string,
}

export type Property = {
    name: string,
    text: string,
    type: string,
    jsDoc: any[],
    ast: Field,
    markdown?: string
}