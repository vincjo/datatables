import { type Row, type Field, type Check, type Criterion, check } from '$lib/src/client'

export const isNull = (value: unknown) => {
    if (value === null || value === undefined || value === '') return true
    return false
}
export const isNotNull = (value: unknown) => { return !isNull(value) }

export const stringify = (value: unknown = null) => {
    return String(value)
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
}

export const parseField = (field: Field<Row>, uuid?: string) => {
    if (typeof field === 'string') {
        return {
            callback: (row: Row) => row[field],
            id: uuid,
            key: field,
        }
    } else if (typeof field === 'function') {
        return {
            callback: field,
            id: uuid,
            key: undefined,
        }
    }
    throw new Error(`Invalid field argument: ${String(field)}`)
}

export const match = (entry: unknown, value: unknown | Criterion[], compare: Check = check.isLike): boolean => {
    if (isNull(value)) {
        return true
    }
    else if (entry !== null && typeof entry === 'object') {
        return Object.keys(entry).some((k) => {
            return match(entry[k], value, compare)
        })
    }
    return compare(entry, value)
}

type NestedFilterParams = {
    highlight?: boolean,
    check?: Check
    isRecursive?: boolean
}
export const nestedFilter = (entry: unknown, value: unknown, params: NestedFilterParams) => {
    if (Array.isArray(entry)) {
        entry = entry.filter((item: unknown) => {
            // to disable recursion, check worth true anyway
            const check = params.isRecursive === true ? match(item, value, params.check) : true
            if (typeof item === 'object' && check === true) {
                for (const k of Object.keys(item)) {
                    item[k] = nestedFilter(item[k], value, params)
                }
            }
            return check
        })
    }
    if (params.highlight && (typeof entry === 'string' || typeof entry === 'number') && typeof value === 'string' && match(entry, value, params.check)) {
        return emphasize(entry, value)
    }
    return entry
}

const emphasize = (entry: string | number, value: string) => {
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

export const deepEmphasize = (row: Row, callback: (row: Row) => unknown, value: string) => {
    const path = callback.toString()
        .split('=>')[1]
        .replace(/\(\)/g, '')
        .replace(/\?/g, '')
        .split('.').splice(1).join('.')
        .trim()
    if (path.indexOf(' ') > -1) return row
    return deepSet(row, path, value)
}

const deepSet = (object: Row, path: string, value: string) => {
    const initial = object
    const keys = path.replace(/\[/g, '.[').split(".")
    try {
        for (let i = 0; i < keys.length; i++) {
            let current = keys[i]
            let next = keys[i + 1]
            if (current.includes('[')) {
                current = String(parseInt(current.substring(1, current.length - 1)))
            }
            if (next && next.includes('[')) {
                next = String(parseInt(next.substring(1, next.length - 1)))
            }
            if (next !== undefined) {
                object[current] = object[current] ? object[current] : (isNaN(Number(next)) ? {} : [])
            } else {
                object[current] = emphasize(object[current] as string | number, value)
            }
            object = object[current] as Row
        }
        return initial
    } catch(_) {
        return initial
    }
}

export const sort = {
    asc: (a: unknown, b: unknown, locales?: Intl.LocalesArgument, options?: Intl.CollatorOptions) => {
        if (a === b)                        return 0
        else if (isNull(a))                 return 1
        else if (isNull(b))                 return -1
        else if (typeof a === 'boolean')    return a === false ? 1 : -1
        else if (typeof a === 'string')     return a.localeCompare(b as string, locales, options)
        else if (typeof a === 'number')     return a - (b as number)
        else if (typeof a === 'object')     return JSON.stringify(a).localeCompare(JSON.stringify(b), locales, options)
        return String(a).localeCompare(String(b), locales, options)
    },
    desc: (a: unknown, b: unknown, locales?: Intl.LocalesArgument, options?: Intl.CollatorOptions) => {
        if (a === b)                        return 0
        else if (isNull(a))                 return 1
        else if (isNull(b))                 return -1
        else if (typeof b === 'boolean')    return b === false ? 1 : -1
        else if (typeof b === 'string')     return b.localeCompare(a as string, locales, options)
        else if (typeof b === 'number')     return b - (a as number)
        else if (typeof b === 'object')     return JSON.stringify(b).localeCompare(JSON.stringify(a), locales, options)
        else return String(b).localeCompare(String(a), locales, options)
    }
}