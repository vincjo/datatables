import { writable, type Writable, type Readable, derived } from 'svelte/store'
import { match } from '$lib/client/utils'

export default class SearchHelper 
{
    private items: Writable<any[]>
    private value : Writable<string>
    private filteredItems: Readable<any[]>

    constructor(items: any[])
    {
        this.items = writable(items)
        this.value = writable('')
        this.filteredItems = this.createFilteredItems()
    }

    public set(value: string)
    {
        this.value.set(value)
    }

    public get(): Readable<any[]>
    {
        return this.filteredItems
    }

    private createFilteredItems()
    {
        return derived(
            [this.items, this.value],
            ([$items, $value]) => {
                if ($value) {
                    $items = $items.filter((item) => {
                        return match(item, $value)
                    })
                }
                return $items
            }
        )
    }
}