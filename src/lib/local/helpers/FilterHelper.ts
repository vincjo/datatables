import type { Field, Comparator } from '$lib/local'
import { check } from '$lib/local/Comparator'
import type FilterHandler from '../handlers/FilterHandler'

type Value = string | number | boolean

export default class FilterHelper<Row>
{
    private filterHandler   : FilterHandler<Row>
    private filterBy        : Field<Row>

    constructor(filterHandler: FilterHandler<Row>, filterBy: Field<Row>)
    {
        this.filterHandler  = filterHandler
        this.filterBy       = filterBy
    }

    public set(value: Value, comparator: Comparator<any> = check.contains)
    {
        this.filterHandler.set(value, this.filterBy, comparator)
    }

    public clear()
    {
        this.filterHandler.set(undefined, this.filterBy)
    }
}
