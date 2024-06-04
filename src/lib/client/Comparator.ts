import type { Criterion } from '$lib/client'
import { isNull, isNotNull, stringify } from './utils'

export const check = {

    isLike: (entry: any, value: any) => {
        return stringify(entry).indexOf(stringify(value)) > -1
    },

    isNotLike: (entry: any, value: any) => {
        return stringify(entry).indexOf(stringify(value)) === -1
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

    isNotEqualTo: (entry: any, value: any) => {
        return stringify(entry) !== stringify(value)
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

    isBetween: (entry: number, [min, max]: [min: number, max: number]) => {
        if (isNull(entry)) return false
        return entry >= min && entry <= max
    },

    isStrictlyBetween: (entry: number, [min, max]: [min: number, max: number]) => {
        if (isNull(entry)) return false
        return entry > min && entry < max
    },

    isTrue: (entry: boolean, _: any) => {
        return entry === true
    },

    isFalse: (entry: boolean, _: any) => {
        return entry === false
    },

    isNull: (entry: null, _: any) => {
        return isNull(entry)
    },

    isNotNull: (entry: any, _: any) => {
        return isNotNull(entry)
    },

    whereIn: (entry: any, values: Criterion[] = []) => {
        if (isNull(entry)) return false
        if (values.length === 0) return false
        for(const { value, check } of values) {
            if (check(entry, value)) {
                return true
            }
        }
        return false
    },
}

