import { isNull, stringify, isNotNull } from './value'
import type { Criterion, Check } from '$lib/src/client'


export const check: { [name: string]: Check } = {
    isLike:                 (entry: unknown, value: unknown)        => stringify(entry).includes(stringify(value)),
    isNotLike:              (entry: unknown, value: unknown)        => stringify(entry).includes(stringify(value)) === false,
    startsWith:             (entry: unknown, value: unknown)        => stringify(entry).startsWith(stringify(value)),
    endsWith:               (entry: unknown, value: unknown)        => stringify(entry).endsWith(stringify(value)),
    isEqualTo:              (entry: unknown, value: unknown)        => stringify(entry) === stringify(value),
    isNotEqualTo:           (entry: unknown, value: unknown)        => stringify(entry) !== stringify(value),
    isGreaterThan:          (entry: number, value: number)          => isNull(entry) ? false : (entry > value),
    isGreaterThanOrEqualTo: (entry: number, value: number)          => isNull(entry) ? false : (entry >= value),
    isLessThan:             (entry: number, value: number)          => isNull(entry) ? false : (entry < value),
    isLessThanOrEqualTo:    (entry: number, value: number)          => isNull(entry) ? false : (entry <= value),
    isBetween:              (entry: number, [min, max]: number[])   => isNull(entry) ? false : (entry >= min && entry <= max),
    isStrictlyBetween:      (entry: number, [min, max]: number[])   => isNull(entry) ? false : (entry > min && entry < max),
    isTrue:                 (entry: unknown, _: unknown)            => entry === true,
    isFalse:                (entry: unknown, _: unknown)            => entry === false,
    isNull:                 (entry: unknown, _: unknown)            => isNull(entry),
    isNotNull:              (entry: unknown, _: unknown)            => isNotNull(entry),

    // multiple criteria
    whereIn: (entry: unknown, criteria: Criterion[] = []) => {
        if (criteria.length === 0) return false
        for(const { value, check } of criteria) {
            if (value?.['key']) {
                return checkByKey(entry, value as any, check)
            }
            else if (check(entry, value)) {
                return true
            }
        }
        return false
    },


    // regexp
    match: (entry: unknown, pattern: string) => {
        const match = pattern.match(/^([\/~@;%#'])(.*?)\1([gimsuy]*)$/)
        const regex = match ? new RegExp(match[2], match[3]
              .split('')
              .filter((char, pos, flagArr) => flagArr.indexOf(char) === pos)
              .join('')
          ) 
          : new RegExp(pattern)
        return stringify(entry).match(regex) ? true : false
    },
}

const checkByKey = (entry: unknown, param: { key: string, value: unknown }, check: Check) => {
    if (!param?.key) return false
    const { key, value } = param
    if (Array.isArray(entry) === false && typeof entry === 'object') {
        const keys = Object.keys(entry)
        if (keys.includes(key) && check(entry[key], value)) {
			return true
		}
    }
    return false
}