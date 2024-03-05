import { type Writable, writable, get, derived, type Readable } from 'svelte/store'
import type { State, Sort, Filter } from '$lib/remote'
import type { Params }  from './DataHandler'
import EventsHandler from './handlers/EventsHandler'

export default class Context<Row>
{
    public totalRows            : Writable<number | undefined>
    public rowsPerPage          : Writable<number>
    public currentPage          : Writable<number>
    public events               : EventsHandler
    public search               : Writable<string>
    public filters              : Writable<Filter<Row>[]>
    public rows                 : Writable<Row[]>
    public rowCount             : Readable<{ total: number, start: number, end: number, selected: number }>
    public pages                : Readable<number[]>
    public pagesWithEllipsis    : Readable<number[]>
    public pageCount            : Readable<number>
    public sort                 : Writable<Sort<Row>>
    public selected             : Writable<(Row | Row[keyof Row])[]>
    public isAllSelected        : Readable<boolean>
    public selectBy             : keyof Row | undefined


    constructor(data: Row[], params: Params)
    {
        this.totalRows          = writable(params.totalRows)
        this.rowsPerPage        = writable(params.rowsPerPage)
        this.currentPage        = writable(1)
        this.events             = new EventsHandler()
        this.search             = writable('')
        this.filters            = writable([])
        this.rows               = writable(data)
        this.rowCount           = this.createRowCount()
        this.pages              = this.createPages()
        this.pagesWithEllipsis  = this.createPagesWithEllipsis()
        this.pageCount          = this.createPageCount()
        this.sort               = writable(undefined)
        this.selected           = writable([])
        this.isAllSelected      = this.createIsAllSelected()
        this.selectBy           = params.selectBy as keyof Row ?? undefined
    }

    public getState(): State
    {
        const currentPage   = get(this.currentPage)
        const rowsPerPage   = get(this.rowsPerPage)
        const sort          = get(this.sort)
        const filters       = get(this.filters)
        return {
            currentPage,
            rowsPerPage,
            offset: rowsPerPage * (currentPage - 1),
            search: get(this.search),
            sorted: sort ?? undefined as any, // deprecated
            sort: sort ?? undefined as any,
            filters: filters.length > 0 ? filters : undefined as any,
            setTotalRows: (value: number) => this.totalRows.set(value)
        }
    }

    private createPages()
    {
        return derived([this.rowsPerPage, this.totalRows], ([$rowsPerPage, $totalRows]) => {
            if (!$rowsPerPage || !$totalRows) {
                return undefined
            }
            const pages = Array.from(Array(Math.ceil($totalRows / $rowsPerPage)))
            return pages.map((_, i) => i + 1)
        })
    }

    private createPagesWithEllipsis()
    {
        return derived([this.pages, this.currentPage], ([$pages, $currentPage]) => {
            if (!$pages) {
                return undefined
            }
            if ($pages.length <= 7) {
                return $pages
            }
            const ellipse = null
            const firstPage = 1
            const lastPage = $pages.length
            if ($currentPage <= 4) {
                return [
                    ...$pages.slice(0, 5),
                    ellipse,
                    lastPage
                ]
            } else if ($currentPage < $pages.length - 3) {
                return [
                    firstPage,
                    ellipse,
                    ...$pages.slice($currentPage - 2, $currentPage + 1),
                    ellipse,
                    lastPage
                ]
            } else {
                return [
                    firstPage,
                    ellipse,
                    ...$pages.slice($pages.length - 5,
                    $pages.length)
                ]
            }
        })
    }

    private createPageCount()
    {
        return derived(this.pages, ($pages) => {
            if (!$pages) return undefined
            return $pages.length
        })
    }

    private createRowCount()
    {
        return derived(
            [this.totalRows, this.currentPage, this.rowsPerPage, this.selected],
            ([$totalRows, $currentPage, $rowsPerPage, $selected]) => {

                if (!$rowsPerPage || !$totalRows) {
                    return {
                        total: undefined,
                        start: undefined,
                        end: undefined,
                        selected: $selected.length
                    }
                }
                return {
                    total: $totalRows,
                    start: $currentPage * $rowsPerPage - $rowsPerPage + 1,
                    end: Math.min($currentPage * $rowsPerPage, $totalRows),
                    selected: $selected.length
                }
            }
        )
    }

    private createIsAllSelected()
    {
        return derived([this.selected, this.rows], ([$selected, $rows]) => {
            if ($rows.length === 0) {
                return false
            }
            if (this.selectBy) {
                const ids = $rows.map(row => row[this.selectBy])
                return ids.every(id => $selected.includes(id))
            }
            return $rows.every(row => $selected.includes(row as Row))
        })
    }
}