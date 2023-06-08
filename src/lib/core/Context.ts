import { writable, derived, type Writable, type Readable } from 'svelte/store'
<<<<<<< HEAD
import type { Params } from '../DataHandler'
import type { Sorted } from './Handlers/Rows'
import { check } from './Comparator'

export type FilterBy<T> = keyof T | ((row: T) => T[keyof T])
export type FilterValue<T, FB extends FilterBy<T>> = FB extends keyof T
    ? T[FB]
    : FB extends (row: T) => infer V
    ? V
    : never

export type Comparator<T> = (...args: any) => any
export interface Filter<T> {
    filterBy: (row: T) => T[keyof T]
    value?: string | number
    compare: any
    identifier: string
}

export interface RowCount {
    total: number
    start: number
    end: number
}

export default class Context<TRow> {
    public rowsPerPage: Writable<number | null>
    public pageNumber: Writable<number>
    public triggerChange: Writable<number>
    public globalSearch: Writable<{ value: string | null; scope: string[] | null }>
    public filters: Writable<Filter<TRow>[]>
    public rawRows: Writable<TRow[]>
    public filteredRows: Readable<TRow[]>
    public rows: Readable<TRow[]>
    public rowCount: Readable<RowCount>
    public pages: Readable<number[]>
    public pagesWithEllipsis: Readable<number[]>
    public pageCount: Readable<number>
    public sorted: Writable<Sorted<TRow>>
    public selected: Writable<TRow[]>
    public selectScope: Writable<'all' | 'currentPage'>
    public isAllSelected: Readable<boolean>

    constructor(data: TRow[], params: Params) {
        this.rowsPerPage = writable(params.rowsPerPage)
        this.pageNumber = writable(1)
        this.triggerChange = writable(0)
        this.globalSearch = writable({ value: null, scope: null })
        this.filters = writable([])
        this.rawRows = writable(data)
        this.filteredRows = this.createFilteredRows()
        this.rows = this.createPaginatedRows()
        this.rowCount = this.createRowCount()
        this.pages = this.createPages()
        this.pagesWithEllipsis = this.createPagesWithEllipsis()
        this.pageCount = this.createPageCount()
        this.sorted = writable({ identifier: null, direction: null, fn: null })
        this.selected = writable([])
        this.selectScope = writable('all')
        this.isAllSelected = this.createIsAllSelected()
=======
import type { Filter, Order, Selectable, Comparator } from '$lib/core'
import type { Params }  from '$lib/DataHandler'
import { check } from './Comparator'


export default class Context<Row> 
{
    public rowsPerPage          : Writable<number | null>
    public pageNumber           : Writable<number>
    public triggerChange        : Writable<number>
    public globalSearch         : Writable<{ value?: string, scope?: (keyof Row)[] }>
    public filters              : Writable<Filter<Row>[]>
    public rawRows              : Writable<Row[]>
    public filteredRows         : Readable<Row[]>
    public rows                 : Readable<Row[]>
    public rowCount             : Readable<{ total: number, start: number, end: number }>
    public pages                : Readable<number[]>
    public pagesWithEllipsis    : Readable<number[]>
    public pageCount            : Readable<number>
    public sorted               : Writable<(Order<Row>)>
    public selected             : Writable<Selectable<Row>[]>
    public selectScope          : Writable<'all' | 'currentPage'>
    public isAllSelected        : Readable<boolean>

    constructor(data: Row[], params: Params) 
    {
        this.rowsPerPage        = writable(params.rowsPerPage)
        this.pageNumber         = writable(1)
        this.triggerChange      = writable(0)
        this.globalSearch       = writable({})
        this.filters            = writable([])
        this.rawRows            = writable(data)
        this.filteredRows       = this.createFilteredRows()
        this.rows               = this.createPaginatedRows()
        this.rowCount           = this.createRowCount()
        this.pages              = this.createPages()
        this.pagesWithEllipsis  = this.createPagesWithEllipsis()
        this.pageCount          = this.createPageCount()
        this.sorted             = writable({})
        this.selected           = writable([])
        this.selectScope        = writable('all')
        this.isAllSelected      = this.createIsAllSelected()
>>>>>>> upstream/master
    }

    private createFilteredRows() 
    {
        return derived(
            [this.rawRows, this.globalSearch, this.filters],
            ([$rawRows, $globalSearch, $filters]) => {
                if ($globalSearch.value) {
                    $rawRows = $rawRows.filter((row) => {
                        const scope = $globalSearch.scope ?? Object.keys(row)
                        return scope.some((key) => {
                            return this.matches(row[key], $globalSearch.value)
                        })
                    })
                    this.pageNumber.set(1)
                    this.selected.set([])
<<<<<<< HEAD
                    this.triggerChange.update((store) => {
                        return store + 1
                    })
=======
                    this.triggerChange.update((store) => { return store + 1 })
>>>>>>> upstream/master
                }

                if ($filters.length > 0) {
                    $filters.forEach((filter) => {
                        return ($rawRows = $rawRows.filter((row) => {
<<<<<<< HEAD
                            const entry = localFilter.filterBy(row)
                            if (
                                localFilter.value === null ||
                                localFilter.value === undefined ||
                                localFilter.value === ''
                            )
                                return true
                            return this.matches(entry, localFilter.value, localFilter.compare)
=======
                            const entry = filter.filterBy(row)
                            if (!filter.value) return true
                            return this.matches(entry, filter.value, filter.check)
>>>>>>> upstream/master
                        }))
                    })
                    this.pageNumber.set(1)
                    this.selected.set([])
<<<<<<< HEAD
                    this.triggerChange.update((store) => {
                        return store + 1
                    })
=======
                    this.triggerChange.update((store) => { return store + 1 })
>>>>>>> upstream/master
                }
                return $rawRows
            }
        )
    }

    private matches(entry: Row[keyof Row], value: string|number|boolean|symbol, compare: Comparator<Row> = null) 
    {
        if (!entry && compare) {
            return compare(entry, value)
        }
        if (!entry) return check.contains(entry, value)
        else if (typeof entry === 'object') {
            return Object.keys(entry).some((k) => {
                return this.matches(entry[k], value, compare)
            })
        }
        if (!compare) return check.contains(entry, value)
        return compare(entry, value)
    }

    private createPaginatedRows()
    {
        return derived(
            [this.filteredRows, this.rowsPerPage, this.pageNumber],
            ([$filteredRows, $rowsPerPage, $pageNumber]) => {
                if (!$rowsPerPage) {
                    return $filteredRows
                }
                this.triggerChange.update((store) => {
                    return store + 1
                })
                return $filteredRows.slice(
                    ($pageNumber - 1) * $rowsPerPage,
                    $pageNumber * $rowsPerPage
                )
            }
        )
    }

    private createRowCount()
    {
        return derived(
            [this.filteredRows, this.pageNumber, this.rowsPerPage],
            ([$filteredRows, $pageNumber, $rowsPerPage]) => {
                const total = $filteredRows.length

                if (!$rowsPerPage) {
                    return { total: total, start: 1, end: total }
                }
                return {
                    total: total,
                    start: $pageNumber * $rowsPerPage - $rowsPerPage + 1,
                    end: Math.min($pageNumber * $rowsPerPage, $filteredRows.length)
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
<<<<<<< HEAD
            return pages.map((row, i) => {
=======
            return pages.map((_, i) => {
>>>>>>> upstream/master
                return i + 1
            })
        })
    }

    private createPagesWithEllipsis()
    {
        return derived([this.pages, this.pageNumber], ([$pages, $pageNumber]) => {
            if ($pages.length <= 7) {
                return $pages
            }
            const ellipse = null
            const firstPage = 1
            const lastPage = $pages.length
            if ($pageNumber <= 4) {
<<<<<<< HEAD
                return [...$pages.slice(0, 5), ellipse, lastPage]
=======
                return [
                    ...$pages.slice(0, 5),
                    ellipse,
                    lastPage
                ]
>>>>>>> upstream/master
            } else if ($pageNumber < $pages.length - 3) {
                return [
                    firstPage,
                    ellipse,
                    ...$pages.slice($pageNumber - 2, $pageNumber + 1),
                    ellipse,
                    lastPage
                ]
            } else {
<<<<<<< HEAD
                return [firstPage, ellipse, ...$pages.slice($pages.length - 5, $pages.length)]
=======
                return [
                    firstPage,
                    ellipse,
                    ...$pages.slice($pages.length - 5,
                    $pages.length)
                ]
>>>>>>> upstream/master
            }
        })
    }

    private createPageCount()
    {
        return derived(this.pages, ($pages) => {
            return $pages.length
        })
    }

    private createIsAllSelected()
    {
        return derived(
            [this.selected, this.rows, this.filteredRows, this.selectScope],
            ([$selected, $rows, $filteredRows, $selectScope]) => {
<<<<<<< HEAD
                const rowCount =
                    $selectScope === 'currentPage' ? $rows.length : $filteredRows.length
=======
                const rowCount = $selectScope === 'currentPage' ? $rows.length : $filteredRows.length
>>>>>>> upstream/master
                if (rowCount === $selected.length && rowCount !== 0) {
                    return true
                }
                return false
            }
        )
    }
}
