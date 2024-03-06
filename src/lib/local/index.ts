// Reexport your entry components here
import DataHandler  from './DataHandler'
import { check }    from './Comparator'

export { DataHandler, check }

export type { default as EventHandler } from './handlers/EventHandler'

export type Internationalization = {
    search?: string
    show?: string
    entries?: string
    filter?: string
    rowCount?: string
    noRows?: string
    previous?: string
    next?: string
}

export type Row = { [key: string]: any  }
export type Field<Row> = keyof Row | ((row: Row) => Row[keyof Row])


export type Comparator<Row> = (entry: Row[keyof Row], value: any) => boolean

export type Criterion = { value: string | number | [min: number, max: number], comparator: Comparator<Row> }

export type Filter<Row> = {
    callback: (row: Row) => Row[keyof Row]
    identifier: string
    value?: string | number | boolean | symbol | Criterion[] | number[]
    comparator?: Comparator<Row>
    key?: string
}

export type Sort<Row> = {
    callback?: (row: Row) => Row[keyof Row]
    identifier?: string
    direction?: 'asc' | 'desc'
    key?: string
}




/**
 * @deprecated use (Row[keyof Row] | Row) instead
 * 
 * import type { Row } from '@vincjo/datatables'
 */
export type Selectable<Row> = Row[keyof Row] | Row

/**
 * @deprecated use type Field<Row> instead
 * 
 * import type { Field } from '@vincjo/datatables'
 */
export type FilterBy<Row> = Field<Row>

/**
 * @deprecated use type Field<Row> instead
 * 
 * import type { Field } from '@vincjo/datatables'
 */
export type OrderBy<Row>  = Field<Row>

/**
 * @deprecated use type Sort<Row> instead
 * 
 * import type { Sort } from '@vincjo/datatables'
 */
export type Order<Row>  = Sort<Row>