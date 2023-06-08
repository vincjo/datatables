export const check = {
    contains: (entry: any, value: any) => {
        return stringify(entry).indexOf(stringify(value)) > -1
    },

    startsWith: (entry: any, value: any) => {
        return stringify(entry).startsWith(stringify(value))
    },

    endsWith: (entry: any, value: any) => {
        return stringify(entry).endsWith(stringify(value))
    },

    isEqualTo: (entry: any, value: any) => {
        return stringify(entry) === stringify(value)
    },

    isGreaterThan: (entry: number, value: number) => {
        if (isNull(entry)) return false
        return entry > value
    },

    isGreaterThanOrEqualTo: (entry: number, value: number) => {
        if (isNull(entry)) return false
        return entry >= value
    },

    isLessThan: (entry: number, value: number) => {
        if (isNull(entry)) return false
        return entry < value
    },

    isLessThanOrEqualTo: (entry: number, value: number) => {
        if (isNull(entry)) return false
        return entry <= value
    },

    isBetween: (entry: number, value: [min: number, max: number]) => {
        if (isNull(entry)) return false
        const [min, max] = value
        return entry >= min && entry <= max
    },

    isStrictlyBetween: (entry: number, value: [min: number, max: number]) => {
        if (isNull(entry)) return false
        const [min, max] = value
        return entry > min && entry < max
    },

    isTrue: (entry: boolean, value = 'boolean') => {
        return entry === true
    },

    isFalse: (entry: boolean, value = 'boolean') => {
        return entry === false
    },

    isNull: (entry: null, value = 'null') => {
        return entry === null || entry === undefined
    },

    isNotNull: (entry: any, value = 'null') => {
        return entry === null || entry === undefined ? false : true
    }
}


/* utils */

function stringify(value: string | number | boolean = null) {
    return String(value)
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
}

function isNull(entry: any) {
    if (entry === null || entry === undefined) return true
}