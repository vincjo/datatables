import Site from './Site.svelte'

export { default as Logo } from './Logo.svelte'
export { default as Banner } from './Banner.svelte'

export const site = new Site()

export const internal = {
    properties  : [],
    types       : ['Sort', 'SearchType'],
    methods     : [],
}

export const deprcated = {
    properties  : [],
    types       : [],
    methods     : [],
}

export const internalFilter = (records: string[], key: string) => {
    return records.filter((record) => internal[key].includes(record) === false).sort()
}

export type Code = {
    name: string, 
    code: string,
    language?: 'typescript' | 'svelte' 
    components?: Code[],
}

export const parseCode = (code: string) => {
    return code
        .replace(/\$lib\/src\/client/g, '@vincjo/datatables')
        .replace(/\$lib\/src\/server/g, '@vincjo/datatables/server')
}