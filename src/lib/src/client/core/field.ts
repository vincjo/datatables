import type { Field } from '$lib/src/client'

export const parse = <Row>(field: Field<Row>, id?: string) => {
    if (typeof field === 'string') {
        return {
            callback: (row: $state.Snapshot<Row>) => row[(field as keyof $state.Snapshot<Row>)],
            id: id,
            key: field,
        }
    } else if (typeof field === 'function') {
        return {
            callback: field as (row: $state.Snapshot<Row>) => unknown,
            id: id,
            key: undefined,
        }
    }
    throw new Error(`Invalid field argument: ${String(field)}`)
}