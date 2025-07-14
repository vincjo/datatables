import { type Field }       from '$lib/src/client'
import type SearchHandler   from '../handlers/SearchHandler.svelte'
import type { SearchInterface } from '$lib/src/shared'

export default class SearchBuilder<Row> implements SearchInterface
{
    public  value           = $state<string>('')
    private scope           : Field<Row>[]
    private searchHandler   : SearchHandler<Row>

    constructor(searchHandler: SearchHandler<Row>, scope?: Field<Row>[])
    {
        this.searchHandler  = searchHandler
        this.scope          = scope
        this.cleanup()
    }

    public set()
    {
        this.searchHandler.set(this.value, this.scope)
    }

    public init(value?: string)
    {
        this.value = value
        this.set()
        return this
    }

    public recursive()
    {
        this.searchHandler.recursive(this.value, this.scope)
    }

    public regex()
    {
        this.searchHandler.regex(this.value, this.scope)
    }

    public clear()
    {
        this.value = ''
        this.searchHandler.clear()
    }

    private cleanup()
    {
        this.searchHandler['table'].on('clearSearch', () => this.clear())
    }
}
