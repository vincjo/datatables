import type Context from '$lib/remote/Context'
import type { Writable } from 'svelte/store'

export default class SearchHandler<Row> 
{
    private globalSearch: Writable<string>

    constructor(context: Context<Row>) {
        this.globalSearch = context.globalSearch
    }

    public set(value: string)
    {
        this.globalSearch.set(value ?? null)
    }

    public remove()
    {
        this.globalSearch.set(null)
    }
}
