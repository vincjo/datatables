import type Context from '../Context'
import type { Writable } from 'svelte/store'

export default class Search
{
    private globalFilter: Writable<string|null>

    constructor(context: Context)
    {
        this.globalFilter = context.globalFilter
    }

    public set(value: string): void
    {
        this.globalFilter.update(store => {
            store = (value.length > 0) ? value : null
            return store
        })
    }

    public remove(): void
    {
        this.globalFilter.set(null)
    }
}