import type { Field, Check } from '$lib/client'
import { check as comparator } from '$lib/client/Comparator'
import type FilterHandler from '../handlers/FilterHandler.svelte'

export default class FilterHelper<Row>
{
    private filterHandler   : FilterHandler<Row>
    private field           : Field<Row>
    private uid             : string
    private check           : Check<Row>
    private callback        : () => void
    public  value           = $state<string>('')

    constructor(filterHandler: FilterHandler<Row>, field: Field<Row>, check?: Check<Row>)
    {
        this.filterHandler  = filterHandler
        this.field          = field
        this.uid            = 'f_' + (Math.random()).toString(28).substring(2)
        this.check          = check ?? comparator.isLike
        this.callback       = () => { return }
    }

    public set(check?: Check<Row>)
    {
        this.filterHandler.set(this.value, this.field, check ?? this.check, this.uid)
    }

    public clear()
    {
        this.callback()
        this.filterHandler.set(undefined, this.field)
    }

    public on(event: 'clear', callback: () => void)
    {
        this.callback = callback
    }
}
