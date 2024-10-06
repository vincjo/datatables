import type FilterHandler from '../handlers/FilterHandler.svelte'

export default class FilterBuilder<Row>
{
    public  value           = $state<string>('')
    private timeout         = undefined
    private filterHandler   : FilterHandler<Row>
    private field           : keyof Row

    constructor(filterHandler: FilterHandler<Row>, field: keyof Row)
    {
        this.filterHandler  = filterHandler
        this.field          = field
        this.cleanup()
    }

    public set()
    {
        this.filterHandler.set(this.value, this.field)
		clearTimeout(this.timeout)
		this.timeout = setTimeout( () => {
            this.filterHandler['table'].invalidate()
		}, 400)
    }

    public clear()
    {
        this.value = ''
        this.filterHandler.unset(this.field)
    }

    private cleanup()
    {
        this.filterHandler['table'].on('clearFilters', () => this.clear())
    }
}
