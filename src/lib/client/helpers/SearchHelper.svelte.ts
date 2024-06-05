import { match, isNotNull } from '$lib/client/utils'

export default class SearchHelper 
{
    private rawItems    = $state.frozen<any[]>([])
    public  value       = $state<string>('')
    public  items       = $derived<readonly any[]>(this.createFilteredItems())
    constructor(items: any[])
    {
        this.rawItems = items
    }

    private createFilteredItems(): readonly any[]
    {
        if (isNotNull(this.value)) {
            return this.rawItems.filter(item => match(item, this.value))
        }
        return this.rawItems
    }
}