import type Context from '$lib/remote/Context'
import type { Writable } from 'svelte/store'

export default class SearchHandler<Row> 
{
    private search: Writable<string>

    constructor(context: Context<Row>) {
        this.search = context.search
    }

    public set(value: string)
    {
        this.search.set(value ?? null)
    }

    public remove()
    {
        this.search.set(null)
    }
}
