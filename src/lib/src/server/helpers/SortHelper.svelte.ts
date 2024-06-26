import type SortHandler from '../handlers/SortHandler.svelte'

export default class SortHelper<Row>
{
    private sortHandler : SortHandler<Row>
    private field       : string
    public  isActive    = $derived<boolean>(this.createIsActive())
    public  direction   = $derived<'asc' | 'desc'>(this.createDirection())

    constructor(sortHandler: SortHandler<Row>, field: string)
    {
        this.sortHandler = sortHandler
        this.field       = field
    }

    public set()
    {
        this.sortHandler.set(this.field)
    }

    public asc()
    {
        this.sortHandler.asc(this.field)
    }

    public desc()
    {
        this.sortHandler.desc(this.field)
    }

    private createIsActive()
    {
        if (this.field === this.sortHandler['table']['sort']?.field) {
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
