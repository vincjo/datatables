import type { Field, Check } from '$lib/src/client'


export { isNull, isNotNull, stringify } from './value'
export { match, sift, deepEmphasize }   from './entry'
export { check }                        from './check'
export { data, sort }                   from './rows'
export { parse }                        from './field'

export type Search<Row> = {
    value: string
    scope?: Field<Row>[]
    isRecursive?: boolean
    check?: Check
}

export type Filter<Row> = {
    callback: (row:  $state.Snapshot<Row>) => unknown
    id: string
    value?: unknown
    check?: Check
    key?: string
}

export type Query<Row> = {
    path: string[]
    id: string
    value?: unknown
    check?: Check
}

export type Sort<Row> = {
    callback?: (row:  $state.Snapshot<Row>) => unknown
    id?: string
    direction?: 'asc' | 'desc'
    key?: string,
}


