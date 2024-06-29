import Site from './Site.svelte'

export { default as Logo } from './Logo.svelte'
export { default as Banner } from './Banner.svelte'

export const site = new Site()

export const internal = {
    properties  : ['$$slot_def', '$$prop_def', '$$events_def', '$$bindings'],
    types       : ['Sort', 'SearchType'],
    methods     : ['$destroy', '$on', '$set'],
}

export const deprcated = {
    properties  : [],
    types       : [],
    methods     : [],
}

export const internalFilter = (records: string[], key: string) => {
    return records.filter((record) => internal[key].includes(record) === false).sort()
}
