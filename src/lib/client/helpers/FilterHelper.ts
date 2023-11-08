import type { Field, Comparator } from '$lib/client'
import { check } from '$lib/client/Comparator'
import type FilterHandler from '../handlers/FilterHandler'

type Value = string | number | boolean

export default class FilterHelper<Row>
{
    private filterHandler   : FilterHandler<Row>
    private filterBy        : Field<Row>
    private comparator      : Comparator<Row>
    private callback        : () => void

    constructor(filterHandler: FilterHandler<Row>, filterBy: Field<Row>, comparator?: Comparator<Row>)
    {
        this.filterHandler  = filterHandler
        this.filterBy       = filterBy
        this.comparator     = comparator ?? check.isLike
        this.callback       = () => null
    }

    public set(value: Value, comparator?: Comparator<any>)
    {
        if (comparator) {
            this.comparator = comparator
        }
        this.filterHandler.set(value, this.filterBy, this.comparator)
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
