import type { Row, Field } from '$lib/local'

export const isNull = (value: any) => {
    if (value === null || value === undefined || value === '') return true
    return false
}
export const isNotNull = (value: any) => { return !isNull(value) }

export const stringify = (value: any = null) => {
    return String(value)
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
}

export const parseField = (field: Field<any>) => {
    const identifier = field.toString()
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

