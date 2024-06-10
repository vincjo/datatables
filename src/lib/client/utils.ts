import { type Row, type Field, type Check, type Criterion, check } from '$lib/client'

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

export const parseField = (field: Field<any>, uid?: string) => {
    const identifier = uid ?? field.toString()
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

export const match = (
    entry: Row[keyof Row],
    value: string|number|boolean|symbol|Criterion[],
    compare: Check<any> = check.isLike
) => {
    if (isNull(value)) return true

    if (!entry) return compare(entry, value)

    else if (typeof entry === 'object') {
        return Object.keys(entry).some((k) => {
            return match(entry[k], value, compare)
        })
    }
    else if (Array.isArray(entry))
    if (!compare) return check.isLike(entry, value)
    return compare(entry, value)
}

export const nestedFilter = (
    entry: any,
    value: any,
    highlight = false,
    compare: Check<any> = undefined,
) => {
    if (Array.isArray(entry)) {
        entry = entry.filter((item: any) => {
            const check = match(item, value, compare)
            if (typeof item === 'object' && check === true) {
                for (const k of Object.keys(item)) {
                    item[k] = nestedFilter(item[k], value, highlight, compare)
                }
            }
            return check
        })
    }
    if (highlight && (typeof entry === 'string' || typeof entry === 'number') && match(entry, value, compare)) {
        const search = value
            .replace(/a/g, '[aàâáä]')
            .replace(/e/g, '[eèêéë]')
            .replace(/i/g, '[iìîíï]')
            .replace(/o/g, '[oòôо́ö]')
            .replace(/u/g, '[uùûúü]')
            .replace(/y/g, '[yỳŷýÿ]')
        const exp = new RegExp(`${search}`, 'gi')
        return String(entry).replace(exp, `<u class="highlight">$&</u>`)
    }
    return entry
}
