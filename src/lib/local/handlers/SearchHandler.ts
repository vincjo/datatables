import type Context from '$lib/local/Context'
import type { Writable } from 'svelte/store'

export default class SearchHandler<Row> 
{
    private globalSearch: Writable<{ value?: string, scope?: (keyof Row)[] }>

    constructor(context: Context<Row>) {
        this.globalSearch = context.globalSearch
    }

    public set(value: string, scope: (keyof Row)[] = null)
    {
        this.globalSearch.update((store) => {
            store = {
                value: value ?? '',
                scope: scope ?? null
            }
            return store
        })
    }

    public remove()
    {
        this.globalSearch.set({ value: null, scope: null })
    }
}
