import type { State, Sorting, Filter } from '$lib/remote'
import type { Params }  from './TableHandler.svelte'
import EventsHandler    from './handlers/EventsHandler'

export default class AbstractTableHandler<Row>
{
    public events               = new EventsHandler()
    public totalRows            = $state<number>(undefined)
    public rowsPerPage          = $state<number>(10)
    public currentPage          = $state<number>(1)
    public search               = $state<string>('')
    public filters              = $state<Filter[]>([])
    public rows                 = $state<Row[]>([])
    public rowCount             = $derived(this.createRowCount())
    public pages                = $derived<number[]>(this.createPages())
    public pageCount            = $derived<number>(this.createPageCount())
    public pagesWithEllipsis    = $derived<number[]>(this.createPagesWithEllipsis())
    public sorting              = $state<Sorting>({})
    public selected             = $state<(Row | Row[keyof Row])[]>([])
    public isAllSelected        = $derived<boolean>(this.createIsAllSelected())
    public selectBy             : keyof Row | undefined
    public element              = $state<HTMLElement>(undefined)
    public clientWidth          = $state<number>(1000)

    constructor(data: Row[], params: Params)
    {
        this.events             = new EventsHandler()
        this.rows               = data
        this.selectBy           = params.selectBy as keyof Row ?? undefined
        this.totalRows          = params.totalRows
        this.rowsPerPage        = params.rowsPerPage ?? 10
    }

    public getState(): State
    {
        return {
            currentPage: this.currentPage,
            rowsPerPage: this.rowsPerPage,
            offset: this.rowsPerPage * (this.currentPage - 1),
            search: this.search,
            sorting: this.sorting.field ? this.sorting : undefined,
            filters: this.filters.length > 0 ? this.filters : undefined as any,
            setTotalRows: (value: number) => this.totalRows = value
        }
    }

    private createPages()
    {
        if (!this.rowsPerPage || !this.totalRows) {
            return undefined
        }
        const pages = Array.from(Array(Math.ceil(this.totalRows / this.rowsPerPage)))
        return pages.map((_, i) => i + 1)
    }

    private createPageCount()
    {
        if (!this.pages) return undefined
        return this.pages.length
    }

    private createPagesWithEllipsis()
    {
        if (!this.pages) {
            return undefined
        }
        if (this.pageCount <= 7) {
            return this.pages
        }
        const ellipse = null
        const firstPage = 1
        const lastPage = this.pageCount
        if (this.currentPage <= 4) {
            return [
                ...this.pages.slice(0, 5),
                ellipse,
                lastPage
            ]
        } else if (this.currentPage < this.pageCount - 3) {
            return [
                firstPage,
                ellipse,
                ...this.pages.slice(this.currentPage - 2, this.currentPage + 1),
                ellipse,
                lastPage
            ]
        } else {
            return [
                firstPage,
                ellipse,
                ...this.pages.slice(this.pageCount - 5, this.pageCount)
            ]
        }
    }

    private createRowCount()
    {
        if (!this.rowsPerPage || !this.totalRows) {
            return {
                total: undefined,
                start: undefined,
                end: undefined,
                selected: this.selected.length
            }
        }
        return {
            total: this.totalRows,
            start: this.currentPage * this.rowsPerPage - this.rowsPerPage + 1,
            end: Math.min(this.currentPage * this.rowsPerPage, this.totalRows),
            selected: this.selected.length
        }
    }

    private createIsAllSelected()
    {
        if (this.rows.length === 0) {
            return false
        }
        if (this.selectBy) {
            const ids = this.rows.map(row => row[this.selectBy])
            return ids.every(id => this.selected.includes(id))
        }
        return this.rows.every(row => this.selected.includes(row as Row))
    }
}