import type Context from '$lib/local/Context'
import type { Writable } from 'svelte/store'
import type EventHandler from './EventHandler'

export default class SearchHandler<Row> 
{
    private search  : Writable<{ value?: string, scope?: (keyof Row)[] }>
    private events  : EventHandler

    constructor(context: Context<Row>) 
    {
        this.search = context.search
        this.events = context.events
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
        this.events.trigger('change')
        this.events.trigger('clearSearch')
    }
}
