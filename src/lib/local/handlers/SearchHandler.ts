import type Context from '$lib/local/Context'
import type { Writable } from 'svelte/store'

export default class SearchHandler<Row> 
{
    private search: Writable<{ value?: string, scope?: (keyof Row)[] }>
    private triggerClearSearch: Writable<number>

    constructor(context: Context<Row>) 
    {
        this.search             = context.search
        this.triggerClearSearch = context.triggerClearSearch
    }

    public set(value: string, scope: (keyof Row)[] = null)
    {
        this.search.update((store) => {
            store = {
                value: value ?? '',
                scope: scope ?? null
            }
            return store
        })
    }

    public remove()
    {
        this.search.set({ value: null, scope: null })
        this.triggerClearSearch.update((store) => { return store + 1 })
    }
}
