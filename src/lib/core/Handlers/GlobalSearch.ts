<<<<<<< HEAD
import type Context from '../Context'
import type { Writable } from 'svelte/store'

export default class Search<T> {
    private globalSearch: Writable<{ value: string | null; scope: string[] | null }>

    constructor(context: Context<T>) {
=======
import type Context from '$lib/core/Context'
import type { Writable } from 'svelte/store'

export default class Search<Row> 
{
    private globalSearch: Writable<{ value?: string, scope?: (keyof Row)[] }>

    constructor(context: Context<Row>) {
>>>>>>> upstream/master
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

<<<<<<< HEAD
    public remove(): void {
=======
    public remove()
    {
>>>>>>> upstream/master
        this.globalSearch.set({ value: null, scope: null })
    }
}
