import { writable, derived, type Writable, type Readable } from 'svelte/store'
import type { Params } from '../DataHandler'
import type { Sorted } from './Handlers/Rows'

export default class Context
{
    public  count               : Writable<number>
    public  rowsPerPage         : Writable<number|null>
    public  pageNumber          : Writable<number>
    public  triggerChange       : Writable<number>
    public  globalSearch        : Writable<{ value: string|null }>
    public  filters             : Writable<any[]>
    public  rows                : Writable<any[]>
    public  rowCount            : Readable<{ total: number; start: number; end: number }>
    public  pages               : Readable<number[]>
    public  pagesWithEllipsis   : Readable<number[]>
    public  pageCount           : Readable<number>
    public  sorted              : Writable<Sorted>
    public  selected            : Writable<any[]>
    public  isAllSelected       : Readable<boolean>

    constructor(data: any[], params: Params)
    {
        this.count              = writable(params.count)
        this.rowsPerPage        = writable(params.rowsPerPage)
        this.pageNumber         = writable(1)
        this.triggerChange      = writable(0)
        this.globalSearch       = writable({ value: null })
        this.filters            = writable([])
        this.rows               = writable(data)
        this.rowCount           = this.createRowCount()
        this.pages              = this.createPages()
        this.pagesWithEllipsis  = this.createPagesWithEllipsis()
        this.pageCount          = this.createPageCount()
        this.sorted             = writable({ key: null, direction: null })
        this.selected           = writable([])
        this.isAllSelected      = this.createIsAllSelected()
    }

    private createRowCount(): Readable<{ total: number; start: number; end: number; }>
    {
        return derived(
            [this.count, this.pageNumber, this.rowsPerPage],
            ([$count, $pageNumber, $rowsPerPage]) => {

                if (!$rowsPerPage || !$count) {
                    return { total: $count, start: 1, end: $count }
                }
                return {
                    total: $count,
                    start: ($pageNumber * $rowsPerPage - $rowsPerPage) + 1,
                    end: Math.min( ($pageNumber * $rowsPerPage), $count),
                }
            }
        )
    }

    private createPages(): Readable<number[]>
    {
        return derived(
            [this.rowsPerPage, this.count],
            ([$rowsPerPage, $count]) => {
                if (!$rowsPerPage || !$count) {
                    return [1]
                }
                const pages = Array.from(
                    Array(Math.ceil($count / $rowsPerPage))
                )
                return pages.map( (row, i) => {
                    return i + 1
                })
            }
        )
    }

    private createPagesWithEllipsis(): Readable<number[]>
    {
        return derived(
            [this.pages, this.pageNumber],
            ([$pages, $pageNumber]) => {
                if ($pages.length <= 7) {
                    return $pages
                }
                const ellipse = null
                const firstPage = 1
                const lastPage = $pages.length
                if($pageNumber <= 4) {
                    return [
                        ...$pages.slice(0, 5),
                        ellipse,
                        lastPage,
                    ]
                }
                else if ($pageNumber < $pages.length - 3) {
                    return [
                        firstPage,
                        ellipse,
                        ...$pages.slice($pageNumber - 2, $pageNumber + 1),
                        ellipse,
                        lastPage
                    ]
                }
                else {
                    return [
                        firstPage,
                        ellipse,
                        ...$pages.slice($pages.length - 5, $pages.length)
                    ]
                }
            }
        )
    }

    private createPageCount(): Readable<number>
    {
        return derived( this.pages, ($pages) => {
            return $pages.length
        })
    }

    private createIsAllSelected(): Readable<boolean>
    {
        return derived(
            [this.selected, this.rows, this.rows],
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