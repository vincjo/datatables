import { writable, derived, type Writable, type Readable } from 'svelte/store'
import type { Filter, Sort, Field } from '$lib/client'
import type { Params }  from '$lib/client/DataHandler'
import { parseField, match } from './utils'
import EventsHandler from './handlers/EventsHandler'


export default class Context<Row> 
{
    public events               : EventsHandler
    public rowsPerPage          : Writable<number | null>
    public currentPage          : Writable<number>
    public search               : Writable<{ value?: string, scope?: (keyof Row)[] }>
    public filters              : Writable<Filter<Row>[]>
    public filterCount          : Readable<number>
    public rawRows              : Writable<Row[]>
    public filteredRows         : Readable<Row[]>
    public pagedRows            : Readable<Row[]>
    public rowCount             : Readable<{ start: number, end: number, total: number, selected: number }>
    public pages                : Readable<number[]>
    public pagesWithEllipsis    : Readable<number[]>
    public pageCount            : Readable<number>
    public sort                 : Writable<(Sort<Row>)>
    public selected             : Writable<(Row | Row[keyof Row])[]>
    public selectBy             : string
    public selectScope          : Writable<'all' | 'currentPage'>
    public isAllSelected        : Readable<boolean>

    constructor(data: Row[], params: Params) 
    {
        this.events             = new EventsHandler()
        this.rowsPerPage        = writable(params.rowsPerPage)
        this.currentPage        = writable(1)
        this.search             = writable({})
        this.filters            = writable([])
        this.filterCount        = this.createFilterCount()
        this.rawRows            = writable(data)
        this.filteredRows       = this.createFilteredRows()
        this.pagedRows          = this.createPagedRows()
        this.pages              = this.createPages()
        this.pagesWithEllipsis  = this.createPagesWithEllipsis()
        this.pageCount          = this.createPageCount()
        this.sort               = writable({})
        this.selected           = writable([])
        this.selectBy           = params.selectBy
        this.selectScope        = writable('all')
        this.isAllSelected      = this.createIsAllSelected()
        this.rowCount           = this.createRowCount()
    }

    private createFilterCount()
    {
        return derived(this.filters, ($filters) => $filters.length)
    }

    private createFilteredRows()
    {
        return derived(
            [this.rawRows, this.search, this.filters],
            ([$rawRows, $search, $filters]) => {
                if ($search.value) {
                    $rawRows = $rawRows.filter((row) => {
                        const fields = $search.scope ?? Object.keys(row) as Field<Row>[]
                        const scope = fields.map((field: Field<Row>) => {
                            const { callback } = parseField(field)
                            return callback
                        })
                        return scope.some((callback) => {
                            return match(callback(row), $search.value)
                        })
                    })
                    this.currentPage.set(1)
                    // this.selected.set([])
                    this.events.trigger('change')
                }

                if ($filters.length > 0) {
                    $filters.forEach((filter) => {
                        return ($rawRows = $rawRows.filter((row) => {
                            const entry = filter.callback(row)
                            return match(entry, filter.value, filter.comparator)
                        }))
                    })
                    this.currentPage.set(1)
                    // this.selected.set([])
                    this.events.trigger('change')
                }
                return $rawRows
            }
        )
    }

    private createPagedRows()
    {
        return derived(
            [this.filteredRows, this.rowsPerPage, this.currentPage],
            ([$filteredRows, $rowsPerPage, $currentPage]) => {
                if (!$rowsPerPage) {
                    return $filteredRows
                }
                return $filteredRows.slice(
                    ($currentPage - 1) * $rowsPerPage,
                    $currentPage * $rowsPerPage
                )
            }
        )
    }

    private createRowCount()
    {
        return derived(
            [this.filteredRows, this.currentPage, this.rowsPerPage, this.selected],
            ([$filteredRows, $currentPage, $rowsPerPage, $selected]) => {
                const total = $filteredRows.length
                if (!$rowsPerPage) {
                    return { total: total, start: 1, end: total, selected: $selected.length }
                }
                return {
                    total: total,
                    start: $currentPage * $rowsPerPage - $rowsPerPage + 1,
                    end: Math.min($currentPage * $rowsPerPage, $filteredRows.length),
                    selected: $selected.length
                }
            }
        )
    }

    private createPages()
    {
        return derived([this.rowsPerPage, this.filteredRows], ([$rowsPerPage, $filteredRows]) => {
            if (!$rowsPerPage) {
                return [1]
            }
            const pages = Array.from(Array(Math.ceil($filteredRows.length / $rowsPerPage)))
            return pages.map((_, i) =>  i + 1 )
        })
    }

    private createPagesWithEllipsis()
    {
        return derived([this.pages, this.currentPage], ([$pages, $currentPage]) => {
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
                    ...$pages.slice($pages.length - 5, $pages.length)
                ]
            }
        })
    }

    private createPageCount()
    {
        return derived(this.pages, ($pages) => $pages.length)
    }

    private createIsAllSelected()
    {
        // return derived(
        //     [this.selected, this.pagedRows, this.filteredRows, this.selectScope],
        //     ([$selected, $pagedRows, $filteredRows, $selectScope]) => {
        //         const rowCount = $selectScope === 'currentPage' ? $pagedRows.length : $filteredRows.length
        //         if (rowCount === $selected.length && rowCount !== 0) {
        //             return true
        //         }
        //         return false
        //     }
        // )

        return derived([this.selected, this.pagedRows], ([$selected, $pagedRows]) => {
            if ($pagedRows.length === 0) {
                return false
            }
            if (this.selectBy) {
                const ids = $pagedRows.map(row => row[this.selectBy])
                return ids.every(id => $selected.includes(id))
            }
            return $pagedRows.every(row => $selected.includes(row as Row))
        })
    }
}
