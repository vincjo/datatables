import type { Field, TableParams } from '$lib/src/client'
import { EventDispatcher }  from '$lib/src/shared'
import { type Search, type Filter, type Query, type Sort, data, parse } from './core'
import { SvelteSet } from '$lib/legacy'

export default abstract class AbstractTableHandler<Row>
{
    protected selectBy         ?: Field<Row>
    protected selectScope       = $state<'all' | 'currentPage'>('currentPage')
    protected highlight         : boolean
    protected event             = new EventDispatcher()
    protected rawRows           = $state.raw<Row[]>([])
    protected search            = $state<(Search<Row>)>({ value: null })
    protected sort              = $state<(Sort<Row>)>({})

    public filters              = $state<(Filter<Row>)[]>([])
    public queries              = $state<(Query<Row>)[]>([])
    public rowsPerPage          = $state<number>(10)
    public currentPage          = $state<number>(1)
    public element              = $state<HTMLElement>(undefined)
    public clientWidth          = $state<number>(1000)
    public filterCount          = $derived<number>(this.filters.length)
    public allRows              = $derived<readonly $state.Snapshot<Row>[]>(this.createAllRows())
    public rows                 = $derived<readonly $state.Snapshot<Row>[]>(this.createRows())
    public rowCount             = $derived<{total: number, start: number, end: number, selected: number}>(this.createRowCount())
    public pages                = $derived<readonly number[]>(this.createPages())
    public pageCount            = $derived<number>(this.pages.length)
    public pagesWithEllipsis    = $derived<readonly number[]>(this.createPagesWithEllipsis())
    public selected             = $state<(SvelteSet<unknown>)>(new SvelteSet())
    public isAllSelected        = $derived<boolean>(this.createIsAllSelected())

    constructor(data: Row[], params: TableParams<Row>)
    {
        this.rawRows        = data
        this.rowsPerPage    = params.rowsPerPage ?? null
        this.highlight      = params.highlight ?? false
        this.selectBy       = params.selectBy
    }

    private createAllRows()
    {
        let allRows = $state.snapshot(this.rawRows)
        if (this.search.value) {
            allRows = data.search(allRows, this.search, this.highlight)
            this.event.dispatch('change')
        }
        else if (this.filters.length > 0) {
            for (const filter of this.filters) {
                allRows = data.filter(allRows, filter, this.highlight)
            }
            this.event.dispatch('change')
        }
        else if (this.queries.length > 0) {
            for (const query of this.queries) {
                allRows = data.query(allRows, query)
            }
            this.event.dispatch('change')
        }
        return allRows
    }

    private createRows()
    {
        if (!this.rowsPerPage) return this.allRows
        return this.allRows.slice(
            (this.currentPage - 1) * this.rowsPerPage,
            this.currentPage * this.rowsPerPage
        )
    }

    private createRowCount()
    {
        const total = this.allRows.length
        if (!this.rowsPerPage) {
            return { total: total, start: 1, end: total, selected: this.selected.size }
        }
        return {
            total: total,
            start: this.currentPage * this.rowsPerPage - this.rowsPerPage + 1,
            end: Math.min(this.currentPage * this.rowsPerPage, total),
            selected: this.selected.size
        }
    }

    private createPages()
    {
        if (!this.rowsPerPage) {
            return [1]
        }
        const pages = Array.from(Array(Math.ceil(this.allRows.length / this.rowsPerPage)))
        return pages.map((_, i) =>  i + 1 )
    }

    private createPagesWithEllipsis()
    {
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
        } else if (this.currentPage < lastPage - 3) {
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
                ...this.pages.slice(lastPage - 5, lastPage)
            ]
        }
    }

    private createIsAllSelected()
    {
        if (this.rowCount.total === 0 || !this.selectBy) {
            return false
        }
        const { callback } = parse(this.selectBy)
        if (this.selectScope === 'all') {
            const identifiers = this.allRows.map(callback)
            return identifiers.every(id => this.selected.has(id))
        }
        const identifiers = this.rows.map(callback)
        return identifiers.every(id => this.selected.has(id))
    }
}
