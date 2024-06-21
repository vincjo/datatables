import type { Field, Check } from '$lib/src/client'
import type FilterHandler from '../handlers/FilterHandler.svelte'
import { check as comparator } from '$lib/src/client/Comparator'

export default class FilterHelper<Row>
{
    private filterHandler   : FilterHandler<Row>
    private field           : Field<Row>
    private uid             : string
    private check           : Check<Row>
    public  value           = $state<string>('')

    constructor(filterHandler: FilterHandler<Row>, field: Field<Row>, check?: Check<Row>)
    {
        this.filterHandler  = filterHandler
        this.field          = field
        this.uid            = 'f_' + (Math.random()).toString(28).substring(2)
        this.check          = check ?? comparator.isLike
        this.cleanup()
    }

    public set(check?: Check<Row>)
    {
        this.filterHandler.set(this.value, this.field, check ?? this.check, this.uid)
    }

    public clear()
    {
        this.value = ''
        this.filterHandler.unset(this.uid)
    }

    private cleanup()
    {
        this.filterHandler['table'].on('clearFilters', () => this.clear())
    }
}
