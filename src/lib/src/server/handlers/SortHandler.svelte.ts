import type { TableHandler } from '$lib/src/server'

export default class SortHandler<Row>
{
    private table: TableHandler

    constructor(table: TableHandler<Row>)
    {
        this.table = table
    }

    public set(field: string)
    {
        const sort = this.table['sort']

        if(!sort || sort.field !== field) {
            this.asc(field)
        }
        else if (sort.direction === 'asc') {
            this.desc(field)
        }
        else if (sort.direction === 'desc') {
            this.asc(field)
        }
    }

    public asc(field: string)
    {
        this.table['sort'] = { field, direction: 'asc' }
        this.table.setPage(1)
        this.table['event'].dispatch('change')
    }

    public desc(field: string)
    {
        this.table['sort'] = { field, direction: 'desc' }
        this.table.setPage(1)
        this.table['event'].dispatch('change')
    }

    // public set(field: string, direction: 'asc' | 'desc')
    // {
    //     const sort = { field, direction }
    //     if (this.hasMultipleSort === false) {
    //         this.sort.set([ sort ])
    //         return
    //     }
    //     this.sort.update((store) => {
    //         store = store.filter((item) => {
    //             return (item.field !== field) && item.direction
    //         })
    //         if (field) {
    //             store.push(sort)
    //         }
    //         return store
    //     })
    // }

    // public sort(field: string = null)
    // {
    //     if (!field) return
    //     const sort = get(this.sort)
    //     const exists = sort.find(sort => sort.field === field)

    //     if(!exists) {
    //         this.sortAsc(field)
    //     }
    //     else if (exists.direction === 'asc') {
    //         this.sortDesc(exists.field)
    //     }
    //     else if (exists.direction === 'desc') {
    //         this.sortAsc(field)
    //     } 
    // }

    // public sortAsc(field: string)
    // {
    //     if (!field) return
    //     this.set( field, 'asc' )
    //     this.triggerChange.update((store) => { return store + 1 })
    // }

    // public sortDesc(field: string)
    // {
    //     if (!field) return
    //     this.set( field, 'desc' )
    //     this.triggerChange.update((store) => { return store + 1 })
    // }

    // public applySort(params: { field: string, direction?: 'asc' | 'desc' } = null)
    // {
    //     if (params) {
    //         switch (params.direction) {
    //             case 'asc' : return this.sortAsc(params.field)
    //             case 'desc': return this.sortDesc(params.field)
    //             default    : return this.sort(params.field)
    //         }
    //     }
    //     const sort = get(this.sort)
    //     if (sort.length > 0) {
    //         for (const order of sort) {
    //             return this.applySort({ field: order.field, direction: order.direction })
    //         }
    //     }
    //     return
    // }
}
