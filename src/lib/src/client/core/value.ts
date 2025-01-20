

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

export const isObject = (value: unknown) => {
    if (typeof value !== 'object')  return false
    else if (value === null)        return false
    else if (Array.isArray(value))  return false
    return true
}

export const isObjectArray = (value: unknown) => {
    if (typeof value !== 'object')  return false
    else if (value === null)        return false
    return true
}