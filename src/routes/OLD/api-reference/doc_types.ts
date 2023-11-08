
export const doc = {
    "Internationalization": {
        abstract: `Used to define the text displayed in showcase components.`,
        declaration: `type Internationalization = {
    search?: string
    show?: string
    entries?: string
    filter?: string
    rowCount?: string
    noRows?: string
    previous?: string
    next?: string
}       `,
        example: `const i18n = {
    search: 'Search...',
    show: 'Show', 
    entries: 'lines',
    filter: 'Filter',
    rowCount: 'Showing {start} to {end} of {total} entries',
    noRows: 'No entries to found',
    previous: 'Previous', 
    next: 'Next'
}`
    },
    "Row": {
        abstract: `A data object.`,
        declaration: `type Row = { [key: string]: unknown }`,
        example: `{ first_name: 'John', lastname: 'Doe' }`
    },
    "Field": {
        abstract: `Either an object key (column name) or a callback that takes a row as input and returns a value.`,
        declaration: `type Field<Row> = keyof Row | ((row: Row) => Row[keyof Row])`,
        example: `// keyof Row: 
'first_name'

// callback:
(row) => row.first_name + row.last_name`
    },
    "Comparator": {
        abstract: `A callback function that compares data input (entry) with a value.`,
        declaration: `type Comparator<Row> = (entry: Row[keyof Row], value: any) => boolean`,
        example: `(entry, value) => entry !== value`
    },
    "Criterion": {
        abstract: ``,
        declaration: `type Criterion = { value: string | number | [min: number, max: number], comparator: Comparator<Row> }`,
        example: `import { check } from '@vincjo/datatables'
const criterion = { value: 'joh', comparator: check.startsWith }`
    },
    "Filter": {
        abstract: `not exposed - internal type`,
        declaration: `type Filter<Row> = {
    callback: (row: Row) => Row[keyof Row]
    identifier: string
    value?: string | number | boolean | symbol | Criterion[]
    comparator?: Comparator<Row>
}`
    },
    "Sort": {
        abstract: `Defines the sort applied to the data. This object can be retrieved via the <code>handler.getSort()</code> method.`,
        declaration: `export type Sort<Row> = {
    callback?: (row: Row) => Row[keyof Row]
    identifier?: string
    direction?: 'asc' | 'desc'
}`
    },
    "Selectable": {
        abstract: ``,
        declaration: `type Selectable<Row> = Row[keyof Row] | Row`,
        isDeprecated: true,
    },
    "FilterBy": {
        abstract: ``,
        declaration: `type FilterBy<Row> = Field<Row>`,
        isDeprecated: true,
    },
    "OrderBy": {
        abstract: ``,
        declaration: `type OrderBy<Row> = Field<Row>`,
        isDeprecated: true,
    },
    "Order": {
        abstract: ``,
        declaration: `type Order<Row> = Sort<Row>`,
        isDeprecated: true,
    }
}