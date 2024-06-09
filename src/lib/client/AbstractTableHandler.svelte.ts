import type { Params }  from './TableHandler.svelte'
import EventsHandler    from './handlers/EventsHandler'
import type { Filter, Sort, Field } from '$lib/client'
import { parseField, match, nestedFilter } from './utils'


export default abstract class AbstractTableHandler<Row>
{
    public events               = new EventsHandler()
    public filters              = $state<(Filter<Row>)[]>([])
    public rowsPerPage          = $state<number>(10)
    public currentPage          = $state<number>(1)
    public filterCount          = $derived<number>(this.filters.length)
    public rawRows              = $state.frozen<Row[]>([])
    public allRows              = $derived<Row[]>(this.createAllRows())
    public rows                 = $derived<readonly Row[]>(this.createPagedRows())
    public rowCount             = $derived<{total: number, start: number, end: number, selected: number}>(this.createRowCount())
    public pages                = $derived<number[]>(this.createPages())
    public pageCount            = $derived<number>(this.pages.length)
    public pagesWithEllipsis    = $derived<number[]>(this.createPagesWithEllipsis())
    public sort                 = $state<(Sort<Row>)>({})
    public selected             = $state<(Row | Row[keyof Row])[]>([])
    public selectBy             : string
    public selectScope          = $state<'all' | 'currentPage'>('currentPage')
    public isAllSelected        = $derived<boolean>(this.createIsAllSelected())
    public element              = $state<HTMLElement>(undefined)
    public clientWidth          = $state<number>(1000)
    protected searchScope       = $state<(Field<Row>)[]>(null)
    protected search            = $state<string>('')

    constructor(data: Row[], params: Params)
    {
        this.rawRows = data
        this.rowsPerPage = params.rowsPerPage ?? 10
        this.selectBy = params.selectBy
    }

    private createAllRows()
    {
        let allRows = structuredClone(this.rawRows) as Row[]
        if (this.search) {
            allRows = allRows.filter((row) => {
                const fields = this.searchScope ?? Object.keys(row) as Field<Row>[]
                const scope = fields.map((field: Field<Row>) => {
                    return parseField(field)
                })
                for(const { key } of scope) {
                    if (key) {
                        row[key] = nestedFilter(row[key], this.search)
                    }
                }
                return scope.some(({ callback, key }) => {
                    return match(callback(row), this.search)
                })
            })
            this.currentPage = 1
            this.events.trigger('change')
        }
        if (this.filterCount > 0) {
            for (const { callback, value, check, key } of this.filters) {
                allRows = allRows.filter((row) => {
                    if (key) {
                        row[key] = nestedFilter(row[key], value, check)
                    }
                    return match(callback(row), value, check)
                })
            }
            this.currentPage = 1
            this.events.trigger('change')
        }
        return allRows
    }

    private createPagedRows()
    {
        if (!this.rowsPerPage) return this.rawRows
        return this.allRows.slice(
            (this.currentPage - 1) * this.rowsPerPage,
            this.currentPage * this.rowsPerPage
        )
    }

    private createRowCount()
    {
        const total = this.allRows.length
        if (!this.rowsPerPage) {
            return { total: total, start: 1, end: total, selected: this.selected.length }
        }
        return {
            total: total,
            start: this.currentPage * this.rowsPerPage - this.rowsPerPage + 1,
            end: Math.min(this.currentPage * this.rowsPerPage, total),
            selected: this.selected.length
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
        if (this.pages.length <= 7) {
            return this.pages
        }
        const ellipse = null
        const firstPage = 1
        const lastPage = this.pages.length
        if (this.currentPage <= 4) {
            return [
                ...this.pages.slice(0, 5),
                ellipse,
                lastPage
            ]
        } else if (this.currentPage < this.pages.length - 3) {
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
                ...this.pages.slice(this.pages.length - 5, this.pages.length)
            ]
        }
    }

    private createIsAllSelected()
    {
        if (this.rows.length === 0) {
            return false
        }
        if (this.selectBy) {
            const identifiers = this.rows.map(row => row[this.selectBy])
            return identifiers.every(id => this.selected.includes(id))
        }
        return this.rows.every(row => this.selected.includes(row))
    }
}
