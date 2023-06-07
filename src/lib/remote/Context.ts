import { type Writable, writable, get } from 'svelte/store'
import type { State } from '$lib/remote'
import type { Params }  from '../DataHandler'

export default class Context<Row>
{
    public rows: Writable<Row[]>
    public pageNumber: Writable<number>
    public rowsPerPage: Writable<number>
    public triggerChange: Writable<number>
    public globalSearch: Writable<string>


    constructor(data: Row[], params: Params)
    {
        this.rows = writable(data)
        this.pageNumber = writable(1)
        this.rowsPerPage = writable(params.rowsPerPage)
        this.triggerChange = writable(0)
        this.globalSearch = writable('')

    }

    public getState(): State
    {
        return {
            pageNumber: get(this.pageNumber),
            rowsPerPage: get(this.rowsPerPage),
            search: get(this.globalSearch)
        }
    }
}