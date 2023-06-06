import type Context from '../Context'
import type { Writable } from 'svelte/store'

export default class Search<T> 
{
    private globalSearch: Writable<{ value?: string, scope?: (keyof T)[] }>

    constructor(context: Context<T>) {
        this.globalSearch = context.globalSearch
    }

    public set(value: string, scope: (keyof T)[] = null)
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
