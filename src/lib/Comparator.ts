import { format } from '$lib/core/utils'

export default class Comparator
{
    public static contains(entry: any, value: string | number | boolean)
    {
        return format(entry).indexOf( format(value) ) > -1
    }

    public static startsWith(entry: any, value: string)
    {
        return format(entry).startsWith( format(value) )
    }

    public static endsWith(entry: any, value: string)
    {
        return format(entry).endsWith( format(value) )
    }

    public static isEqualTo(entry, value: string | number | boolean)
    {
        return format(entry) === format(value)
    }

    public static isGreaterThan(entry, value: number)
    {
        return entry > value
    }

    public static isGreaterThanOrEqualTo(entry, value: number)
    {
        return entry >= value
    }

    public static isLessThan(entry, value: number)
    {
        return entry < value
    }

    public static isLessThanOrEqualTo(entry, value: number)
    {
        return entry <= value
    }

    public static isBetween(entry, value: [min: number, max: number])
    {
        const [min, max] = value
        return entry >= min && entry <= max
    }

    public static isStrictlyBetween(entry, value: [min: number, max: number])
    {
        const [min, max] = value
        return entry > min && entry < max
    }

    public static isTrue(entry, value = true)
    {
        return entry === true
    }

    public static isFalse(entry, value = false)
    {
        return entry === false
    }

    public static isNull(entry, value = null)
    {
        return entry === null
    }

    public static isNullish(entry, value = null)
    {
        return !entry ? true : false
    }
} 