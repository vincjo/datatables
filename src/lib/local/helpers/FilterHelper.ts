import type { Field, Comparator } from '$lib/local'
import { check } from '$lib/local/Comparator'
import type FilterHandler from '../handlers/FilterHandler'

type Value = string | number | boolean

export default class FilterHelper<Row>
{
    private filterHandler   : FilterHandler<Row>
    private filterBy        : Field<Row>
    private name            : string
    private comparator      : Comparator<Row>
    private callback        : () => void

    constructor(filterHandler: FilterHandler<Row>, filterBy: Field<Row>, comparator?: Comparator<Row>)
    {
        this.filterHandler  = filterHandler
        this.filterBy       = filterBy
        this.name           = 'f_' + (Math.random()).toString(28).substring(2)
        this.comparator     = comparator ?? check.isLike
        this.callback       = () => null
    }

    public set(value: Value, comparator?: Comparator<any>)
    {
        if (comparator) {
            this.comparator = comparator
        }
        this.filterHandler.set(value, this.filterBy, this.comparator, this.name)
    }

    public clear()
    {
        this.callback()
        this.filterHandler.set(undefined, this.filterBy)
    }

    public on(event: 'clear', callback: () => void)
    {
        this.callback = callback
    }
}
