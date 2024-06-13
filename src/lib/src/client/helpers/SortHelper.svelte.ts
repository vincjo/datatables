import type { Field } from '$lib/src/client'
import type SortHandler from '../handlers/SortHandler.svelte'
import type { Params } from '../handlers/SortHandler.svelte'


export default class SortHelper<Row>
{
    private sortHandler     : SortHandler<Row>
    private field           : Field<Row>
    private uid             : string
    public  isActive        = $derived<boolean>(this.createIsActive())
    public  direction       = $derived<'asc' | 'desc'>(this.createDirection())
    private params          : Params

    constructor(sortHandler: SortHandler<Row>, field: Field<Row>, params)
    {
        this.sortHandler    = sortHandler
        this.field          = field
        this.uid            = 's_' + (Math.random()).toString(28).substring(2)
        this.params         = params ?? {}
    }

    public set()
    {
        this.sortHandler.set(this.field, this.uid, this.params)
    }

    public asc()
    {
        this.sortHandler.asc(this.field, this.uid, this.params)
    }

    public desc()
    {
        this.sortHandler.desc(this.field, this.uid, this.params)
    }

    public clear()
    {
        this.sortHandler.clear()
    }

    private createIsActive()
    {
        if (this.uid === this.sortHandler['table']['sort']?.identifier) {
            return true
        }
        return false
    }

    private createDirection()
    {
        if (this.isActive === false) return null
        return this.sortHandler['table']['sort']?.direction
    }
}
