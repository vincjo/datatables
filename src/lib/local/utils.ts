import type { Row, Field } from '$lib/local'

export const isNull = (value: any) => {
    if (value === null || value === undefined || value === '') return true
    return false
}
export const isNotNull = (value: any) => { return !isNull(value) }

export const parseField = (field: Field<any>, name?: string) => {
    const identifier = name ?? field.toString()
    if (typeof field === 'string') {
        return {
            callback: (row: Row) => row[field],
            identifier,
            key: field as string
        }
    } else if (typeof field === 'function') {
        return {
            callback: field,
            identifier,
            key: undefined
        }
    }
    throw new Error(`Invalid field argument: ${String(field)}`)
}

