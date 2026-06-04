import type { Field } from '$lib/src/client'

export const parse = <Row>(field: Field<Row>, id?: string) => {
    if (typeof field === 'string') {
        return {
            callback: (row: Row) => row[(field as keyof Row)],
            id: id,
            key: field,
        }
    } else if (typeof field === 'function') {
        return {
            callback: field as (row: Row) => unknown,
            id: id,
            key: undefined as string | undefined,
        }
    }
    throw new Error(`Invalid field argument: ${String(field)}`)
}