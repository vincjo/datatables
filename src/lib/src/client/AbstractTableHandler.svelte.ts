import type { Filter, Sort, Field, TableHandlerParams } from '$lib/src/client'
import { parseField, match, nestedFilter, deepEmphasize } from './utils'
import EventDispatcher from '$lib/src/shared/EventDispatcher'


export default abstract class AbstractTableHandler<Row>
{
    protected selectBy          : string
    protected highlight         : boolean
    protected event             = new EventDispatcher()
    protected rawRows           = $state.frozen<Row[]>([])
    protected searchScope       = $state<(Field<Row>)[]>(null)
    protected search            = $state<string>('')
    protected selectScope       = $state<'all' | 'currentPage'>('currentPage')
    protected sort              = $state<(Sort<Row>)>({})

    public filters              = $state<(Filter<Row>)[]>([])
    public rowsPerPage          = $state<number>(10)
    public currentPage          = $state<number>(1)
    public element              = $state<HTMLElement>(undefined)
    public clientWidth          = $state<number>(1000)
    public filterCount          = $derived<number>(this.filters.length)
    public allRows              = $derived<readonly Row[]>(this.createAllRows())
    public rows                 = $derived<readonly Row[]>(this.createRows())
    public rowCount             = $derived<{total: number, start: number, end: number, selected: number}>(this.createRowCount())
    public pages                = $derived<number[]>(this.createPages())
    public pageCount            = $derived<number>(this.pages.length)
    public pagesWithEllipsis    = $derived<number[]>(this.createPagesWithEllipsis())
    public selected             = $state<(Row | Row[keyof Row])[]>([])
    public isAllSelected        = $derived<boolean>(this.createIsAllSelected())

    constructor(data: Row[], params: TableHandlerParams)
    {
        this.rawRows        = data
        this.rowsPerPage    = params.rowsPerPage
        this.highlight      = params.highlight ?? false
        this.selectBy       = params.selectBy
    }

    private createAllRows()
    {
        let allRows = structuredClone(this.rawRows)
        if (this.search) {
            allRows = allRows.filter((row) => {
                const fields = this.searchScope ?? Object.keys(row) as Field<Row>[]
                const scope = fields.map((field: Field<Row>) => {
                    return parseField(field)
                })
                for(const { key, callback } of scope) {
                    if (key) {
                        row[key] = nestedFilter(row[key], this.search, this.highlight)
                    }
                    else if (this.highlight) {
                        row = deepEmphasize(row, callback, this.search) as Row
                    }
                }
                return scope.some(({ callback }) => {
                    return match(callback(row), this.search)
                })
            })
            this.currentPage = 1
            this.event.dispatch('change')
        }
        if (this.filterCount > 0) {
            for (const { callback, value, check, key } of this.filters) {
                allRows = allRows.filter((row) => {
                    const checked = match(callback(row), value, check)
                    if (key) {
                        row[key] = nestedFilter(row[key], value, this.highlight, check)
                    }
                    else if (this.highlight && checked && value && typeof value === 'string') {
                        row = deepEmphasize(row, callback, value) as Row
                    }
                    return checked
                })
            }
            this.currentPage = 1
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
