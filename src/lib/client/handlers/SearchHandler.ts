import type Context from '$lib/client/Context'
import type { Writable } from 'svelte/store'
import type { EventsHandler, Field } from '$lib/client'

export default class SearchHandler<Row> 
{
    private search  : Writable<{ value?: string, scope?: Field<Row>[] }>
    private events  : EventsHandler

    constructor(context: Context<Row>) 
    {
        this.search = context.search
        this.events = context.events
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
        this.events.trigger('change')
        this.events.trigger('clearSearch')
    }
}
