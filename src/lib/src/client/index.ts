export { default as TableHandler } from './TableHandler.svelte'
export { check } from './core'

import type { Internationalization, Field }         from '$lib/src/shared'
export type { default as AdvancedFilterBuilder }    from './builders/AdvancedFilterBuilder.svelte'
export type { default as CalculationBuilder }       from './builders/CalculationBuilder.svelte'
export type { default as CSVBuilder }               from './builders/CSVBuilder.svelte'
export type { default as FilterBuilder }            from './builders/FilterBuilder.svelte'
export type { default as RecordFilterBuilder }      from './builders/RecordFilterBuilder.svelte'
export type { default as SearchBuilder }            from './builders/SearchBuilder.svelte'
export type { default as SortBuilder }              from './builders/SortBuilder.svelte'
export { default as RecordFilter }                  from './builders/RecordFilterBuilder.svelte'

export {
    Datatable,
    Search,
    RowsPerPage,
    Th,
    ThSort,
    ThFilter,
    Pagination,
    RowCount,
    type Row,
    type Field,
    type Internationalization,
    type ColumnView,
    type TableHandlerInterface,
} from '$lib/src/shared'

export type SortParams = {
    locales?: Intl.LocalesArgument,
    options?: Intl.CollatorOptions
}

export type Check = (entry: unknown, value: unknown) => boolean

export type TableParams<Row> = {
    rowsPerPage?: number,
    selectBy?: Field<Row>,
    highlight?: boolean,
    i18n?: Internationalization,
}

export type Criterion = {
    value: unknown,
    check: Check
}