import type { Field } from '$lib/client'
import type SortHandler from '../handlers/SortHandler.svelte'

export default class SortingHelper<Row>
{
    private sortHandler     : SortHandler<Row>
    private field           : Field<Row>
    private uid             : string
    public  isActive        = $derived<boolean>(this.createIsActive())
    public  direction       = $derived<'asc' | 'desc'>(this.createDirection())

    constructor(sortHandler: SortHandler<Row>, field: Field<Row>)
    {
        this.sortHandler    = sortHandler
        this.field          = field
        this.uid            = 's_' + (Math.random()).toString(28).substring(2)
    }

    public set()
    {
        this.sortHandler.set(this.field, this.uid)
    }

    public asc()
    {
        this.sortHandler.asc(this.field, this.uid)
    }

    public desc()
    {
        this.sortHandler.desc(this.field, this.uid)
    }

    public clear()
    {
        this.sortHandler.clear()
    }

    private createIsActive()
    {
        if (this.uid === this.sortHandler['table'].sort?.identifier) {
            return true
        }
        return false
    }

    private createDirection()
    {
        if (this.isActive === false) return null
        return this.sortHandler['table'].sort?.direction
    }
}
