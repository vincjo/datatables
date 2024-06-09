import Site from './Site.svelte'

export { default as Logo } from './Logo.svelte'
export { default as Banner } from './Banner.svelte'

export const site = new Site()

export const internal = {
    properties  : ['events', 'rawRows', 'sorting', 'filters', 'selectScope', 'selectBy'],
    types       : ['Sorting'],
    methods     : ['sort', 'sortAsc', 'sortDesc'],
}

export const deprcated = {
    properties  : [],
    types       : [],
    methods     : [],
}

export const internalFilter = (records: string[], key: string) => {
    return records.filter((record) => internal[key].includes(record) === false).sort()
}
