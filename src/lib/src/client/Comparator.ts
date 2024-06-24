import type { Criterion } from '$lib/src/client'
import { isNull, isNotNull, stringify } from './utils'

export const check = {

    isLike: (entry: unknown, value: unknown) => {
        return stringify(entry).indexOf(stringify(value)) > -1
    },

    isNotLike: (entry: unknown, value: unknown) => {
        return stringify(entry).indexOf(stringify(value)) === -1
    },

    startsWith: (entry: unknown, value: unknown) => {
        return stringify(entry).startsWith(stringify(value))
    },

    endsWith: (entry: unknown, value: unknown) => {
        return stringify(entry).endsWith(stringify(value))
    },

    isEqualTo: (entry: unknown, value: unknown) => {
        return stringify(entry) === stringify(value)
    },

    isNotEqualTo: (entry: unknown, value: unknown) => {
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

    isTrue: (entry: boolean, _: unknown) => {
        return entry === true
    },

    isFalse: (entry: boolean, _: unknown) => {
        return entry === false
    },

    isNull: (entry: null, _: unknown) => {
        return isNull(entry)
    },

    isNotNull: (entry: unknown, _: unknown) => {
        return isNotNull(entry)
    },

    whereIn: (entry: unknown, values: Criterion[] = []) => {
        if (isNull(entry)) return false
        if (values.length === 0) return false
        for(const { value, check } of values) {
            if (check(entry, value)) {
                return true
            }
        }
        return false
    },

    match: (entry: unknown, pattern: string) => {

        const match = pattern.match(/^([\/~@;%#'])(.*?)\1([gimsuy]*)$/)
        const regex = match ? new RegExp(match[2], match[3]
              .split('')
              .filter((char, pos, flagArr) => flagArr.indexOf(char) === pos)
              .join('')
          ) 
          : new RegExp(pattern)
        return stringify(entry).match(regex) ? true : false
    }
}
