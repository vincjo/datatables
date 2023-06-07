import Context from './Context'
import Trigger from './Trigger'

import { type Writable, get } from 'svelte/store'
import type { Internationalization, Row, Event } from '$lib/remote'

export type Params = { rowsPerPage?: number, i18n?: Internationalization }

export default class DataHandler<T extends Row = any> 
{
    private context: Context<T>
    public trigger: Trigger<T>
    public pageNumber: Writable<number>
    public i18n: Internationalization

    constructor(data: T[] = [], params: Params = { rowsPerPage: 5 }) 
    {
        this.context = new Context(data, params)
        this.trigger = new Trigger(this.context)
        this.pageNumber = this.context.pageNumber
        this.i18n = this.translate(params.i18n)
    }

    public setRows(data: T[])
    {
        this.context.rows.set(data)
    }

    public getRows(): Writable<T[]> 
    {
        return this.context.rows
    }

    public setPage(value: number | 'previous' | 'next'): void 
    {
        const pageNumber = get(this.pageNumber)

        if (value === 'previous') {
            if (pageNumber === 1) return
            this.pageNumber.set(pageNumber - 1)
        }
        else if (value === 'next') {
            this.pageNumber.set(pageNumber + 1)
        }
        else {
            this.pageNumber.set(value as number)
        }
        this.trigger.run('navigate')
    }

    public setRowsPerPage(): void 
    {
        this.trigger.run('display')
    }

    public search(value: string): void 
    {
        this.context.globalSearch.set(value)
        this.trigger.run('search')
    }

    public getRowsPerPage(): Writable<number | null> 
    {
        return this.context.rowsPerPage
    }

    public getPageNumber(): Writable<number> 
    {
        return this.context.pageNumber
    }

    public getTriggerChange(): Writable<number>
    {
        return this.context.triggerChange
    }

    public on(event: Event, fn: Function) 
    {
        this.trigger.setAction(event, fn)
    }

    public translate(i18n: Internationalization): Internationalization 
    {
        return {
            ...{
                search: 'Search...',
                show: 'Show',
                entries: 'entries',
                filter: 'Filter',
                rowCount: 'Showing {start} to {end} of {total} entries',
                noRows: 'No entries found',
                previous: 'Previous',
                next: 'Next'
            },
            ...i18n
        }
    }
}