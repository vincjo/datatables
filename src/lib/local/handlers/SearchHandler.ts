import type Context from '$lib/local/Context'
import type { Writable } from 'svelte/store'
import type { EventHandler, Field } from '$lib/local'

export default class SearchHandler<Row> 
{
    private search  : Writable<{ value?: string, scope?: Field<Row>[] }>
    private event   : EventHandler

    constructor(context: Context<Row>) 
    {
        this.search = context.search
        this.event  = context.event
    }

    public set(value: string, scope: Field<Row>[] = null)
    {
        this.search.update((store) => {
            store = {
                value: value ?? '',
                scope: scope ?? null,
            }
            return store
        })
    }

    public clear()
    {
        this.search.set({ value: null, scope: null })
        this.event.trigger('change')
        this.event.trigger('clearSearch')
    }
}
