import { SvelteSet } from 'svelte/reactivity'


export default class Set<T> extends SvelteSet<T>
{
    constructor(data?: Iterable<T>)
    {
        super(data)
    }

    public includes(value: T)
    {
        return this.has(value)
    }
}