import type { Field } from '$lib/client'
import type SortingHandler from '../handlers/SortingHandler.svelte'

export default class SortingHelper<Row>
{
    private sortingHandler  : SortingHandler<Row>
    private field           : Field<Row>
    private uid             : string
    public  isActive        = $derived<boolean>(this.createIsActive())
    public  direction       = $derived<'asc' | 'desc'>(this.createDirection())

    constructor(sortingHandler: SortingHandler<Row>, field: Field<Row>)
    {
        this.sortingHandler = sortingHandler
        this.field          = field
        this.uid            = 's_' + (Math.random()).toString(28).substring(2)
    }

    public set()
    {
        this.sortingHandler.set(this.field, this.uid)
    }

    public asc()
    {
        this.sortingHandler.asc(this.field, this.uid)
    }

    public desc()
    {
        this.sortingHandler.desc(this.field, this.uid)
    }

    public clear()
    {
        this.sortingHandler.clear()
    }

    private createIsActive()
    {
        if (this.uid === this.sortingHandler.getTable().sorting?.identifier) {
            return true
        }
        return false
    }

    private createDirection()
    {
        if (this.isActive === false) return null
        return this.sortingHandler.getTable().sorting?.direction
    }
}
