import { type Writable, writable, get, derived, type Readable } from 'svelte/store'
import type { State, Order, Filter, Selectable } from '$lib/remote'
import type { Params }  from './DataHandler'

export default class Context<Row>
{
    public totalRows            : Writable<number | undefined>
    public rowsPerPage          : Writable<number>
    public pageNumber           : Writable<number>
    public triggerChange        : Writable<number>
    public globalSearch         : Writable<string>
    public filters              : Writable<Filter<Row>[]>
    public rows                 : Writable<Row[]>
    public rowCount             : Readable<{ total: number, start: number, end: number }>
    public pages                : Readable<number[]>
    public pagesWithEllipsis    : Readable<number[]>
    public pageCount            : Readable<number>
    public sorted               : Writable<(Order<Row>)>
    public selected             : Writable<Selectable<Row>[]>
    public isAllSelected        : Readable<boolean>


    constructor(data: Row[], params: Params)
    {
        this.totalRows          = writable(params.totalRows)
        this.rowsPerPage        = writable(params.rowsPerPage)
        this.pageNumber         = writable(1)
        this.triggerChange      = writable(0)
        this.globalSearch       = writable('')
        this.filters            = writable([])
        this.rows               = writable(data)
        this.rowCount           = this.createRowCount()
        this.pages              = this.createPages()
        this.pagesWithEllipsis  = this.createPagesWithEllipsis()
        this.pageCount          = this.createPageCount()
        this.sorted             = writable({})
        this.selected           = writable([])
        this.isAllSelected      = this.createIsAllSelected()
    }

    public getState(): State
    {
        return {
            pageNumber: get(this.pageNumber),
            rowsPerPage: get(this.rowsPerPage),
            search: get(this.globalSearch),
            totalRows: get(this.totalRows)
        }
    }

    private createPages()
    {
        return derived([this.rowsPerPage, this.totalRows], ([$rowsPerPage, $totalRows]) => {
            if (!$rowsPerPage || !$totalRows) {
                return undefined
            }
            const pages = Array.from(Array(Math.ceil($totalRows / $rowsPerPage)))
            return pages.map((_, i) => {
                return i + 1
            })
        })
    }

    private createPagesWithEllipsis()
    {
        return derived([this.pages, this.pageNumber], ([$pages, $pageNumber]) => {
            if (!$pages) {
                return undefined
            }
            if ($pages.length <= 7) {
                return $pages
            }
            const ellipse = null
            const firstPage = 1
            const lastPage = $pages.length
            if ($pageNumber <= 4) {
                return [
                    ...$pages.slice(0, 5),
                    ellipse,
                    lastPage
                ]
            } else if ($pageNumber < $pages.length - 3) {
                return [
                    firstPage,
                    ellipse,
                    ...$pages.slice($pageNumber - 2, $pageNumber + 1),
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
            [this.totalRows, this.pageNumber, this.rowsPerPage],
            ([$totalRows, $pageNumber, $rowsPerPage]) => {

                if (!$rowsPerPage || !$totalRows) {
                    return undefined
                }
                return {
                    total: $totalRows,
                    start: $pageNumber * $rowsPerPage - $rowsPerPage + 1,
                    end: Math.min($pageNumber * $rowsPerPage, $totalRows)
                }
            }
        )
    }

    private createIsAllSelected()
    {
        return derived(
            [this.selected, this.rows],
            ([$selected, $rows]) => {
                const rowCount = $rows.length
                if (rowCount === $selected.length && rowCount !== 0) {
                    return true
                }
                return false
            }
        )
    }
}