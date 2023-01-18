import { writable, derived } from 'svelte/store'
import type { Writable, Readable } from 'svelte/store'
import type { params } from '../DataHandler'

export default class Context
{
    public  rowsPerPage         : Writable<number|null>
    public  pageNumber          : Writable<number>
    public  triggerChange       : Writable<number>
    public  globalFilter        : Writable<string|null>
    public  localFilters        : Writable<any[]>
    public  rawRows             : Writable<any[]>
    private filteredRows        : Readable<any[]>
    public  rows                : Readable<any[]>
    public  rowCount            : Readable<{ total: number; start: number; end: number; }>
    public  pages               : Readable<number[]>
    public  pagesWithEllipsis   : Readable<number[]>
    public  pageCount           : Readable<number>
    public  sorted              : Writable<{ identifier: string | null ; direction: 'asc' | 'desc' | null; }>

    constructor(data: any[], params: params)
    {
        this.rowsPerPage        = writable(params.rowsPerPage)
        this.pageNumber         = writable(1)
        this.triggerChange      = writable(0)
        this.globalFilter       = writable(null)
        this.localFilters       = writable([])
        this.rawRows            = writable(data)
        this.filteredRows       = this.createFilteredRows()
        this.rows               = this.createPaginatedRows()
        this.rowCount           = this.createRowCount()
        this.pages              = this.createPages()
        this.pagesWithEllipsis  = this.createPagesWithEllipsis()
        this.pageCount          = this.createPageCount()
        this.sorted             = writable({ identifier: null, direction: null })
    }

    private createFilteredRows(): Readable<any[]>
    {
        return derived(
            [this.rawRows, this.globalFilter, this.localFilters],
            ([$rawRows, $globalFilter, $localFilters]) => {

                if ($globalFilter) {
                    $rawRows = $rawRows.filter( row => {
                        return Object.keys(row).some( k => {
                            if (row[k]) {
                                return row[k]
                                .toString()
                                .toLowerCase()
                                .normalize("NFD")
                                .replace(/[\u0300-\u036f]/g, "")
                                .indexOf(
                                    $globalFilter
                                        .toString()
                                        .toLowerCase()
                                        .normalize("NFD")
                                        .replace(/[\u0300-\u036f]/g, "")
                                ) > -1
                            }
                            return ''
                        })
                    })
                    this.pageNumber.set(1)
                    this.triggerChange.update( store => { return store + 1 })
                }

                if ($localFilters.length > 0) {
                    $localFilters.forEach(localFilter => {
                        return $rawRows = $rawRows.filter( row => localFilter
                            .filterBy(row)
                            .toString()
                            .toLowerCase()
                            .normalize("NFD")
                            .replace(/[\u0300-\u036f]/g, "")
                            .indexOf(
                                localFilter.value
                                    .toString()
                                    .toLowerCase()
                                    .normalize("NFD")
                                    .replace(/[\u0300-\u036f]/g, "")
                            ) > -1)
                    })
                    this.pageNumber.set(1)
                    this.triggerChange.update( store => { return store + 1 })
                }
                return $rawRows
            }
        )
    }

    private createPaginatedRows(): Readable<any[]>
    {
        return derived(
            [this.filteredRows, this.rowsPerPage, this.pageNumber],
            ([$filteredRows, $rowsPerPage, $pageNumber]) => {
                if (!$rowsPerPage) {
                    return $filteredRows
                }
                this.triggerChange.update( store => { return store + 1 })
                return $filteredRows.slice( ($pageNumber - 1) * $rowsPerPage, $pageNumber * $rowsPerPage )
            }
        )
    }

    private createRowCount(): Readable<{ total: number; start: number; end: number; }>
    {
        return derived(
            [this.filteredRows, this.pageNumber, this.rowsPerPage],
            ([$filteredRows, $pageNumber, $rowsPerPage]) => {

                const total = $filteredRows.length

                if (!$rowsPerPage) {
                    return { total:  total, start: 1, end: total }
                }
                return {
                    total: total,
                    start: ($pageNumber * $rowsPerPage - $rowsPerPage) + 1,
                    end: Math.min( ($pageNumber * $rowsPerPage), $filteredRows.length),
                }
            }
        )
    }

    private createPages(): Readable<number[]>
    {
        return derived(
            [this.rowsPerPage, this.filteredRows],
            ([$rowsPerPage, $filteredRows]) => {
                if (!$rowsPerPage) {
                    return [1]
                }
                const pages = Array.from(
                    Array(Math.ceil($filteredRows.length / $rowsPerPage))
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
        return derived(
            [this.pages],
            ([$pages]) => {
                return $pages.length
            }
        )
    }
}