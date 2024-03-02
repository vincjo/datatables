import type { Field } from '$lib/client'
import type Context from '$lib/client/Context'
import { type Writable, type Readable, get, derived } from 'svelte/store'
import { parseField } from '$lib/client/utils'

export default class CalcultationHelper<Row>
{
    private rawRows     : Writable<Row[]>
    private filteredRows: Readable<Row[]>
    private callback    : (row: Row) => Row[keyof Row]
    private precision   : number

    constructor(context: Context<Row>, field: Field<Row>, param: { precision: number })
    {
        this.rawRows        = context.rawRows
        this.filteredRows   = context.filteredRows
        this.callback       = parseField(field).callback
        this.precision      = param.precision
    }

    public distinct(callback?: (values: any[]) => any[]): { value: string, count: unknown }[]
    {
        const rawRows = get(this.rawRows)
        const values = rawRows.map(row => this.callback(row))

        const array = callback ? callback(values) : values

        const result = array.reduce((acc, curr) => {
            acc[curr] = (acc[curr] ?? 0) + 1
            return acc
        }, {})
        return Object.entries(result).map(([value, count]) => ({ value, count }))
    }

    public avg(callback?: (values: number[]) => number[]): Readable<number>
    {
        return derived(this.filteredRows, $filteredRows => {
            if ($filteredRows.length === 0) return 0
            const values = $filteredRows.map(row => this.callback(row)).filter(Boolean) as number[]
            const array = callback ? callback(values) : values
            return this.round(array.reduce((acc, curr) => acc + curr, 0) / array.length)
        })
    }

    public sum(callback?: (values: number[]) => number[]): Readable<number>
    {
        return derived(this.filteredRows, $filteredRows => {
            const values = $filteredRows.map(row => this.callback(row)) as number[]
            const array = callback ? callback(values) : values
            return this.round(array.reduce((acc, curr) => acc + curr, 0))
        })
    }

    public bounds(callback?: (values: number[]) => number[]): [min: number, max: number]
    {
        const rawRows = get(this.rawRows)
        const values = rawRows.map(row => this.callback(row))

        const numbers = callback ?
            callback(values as number[]).filter(Boolean) :
            values.filter(Boolean) as number[]

        return [
            Math.min(...numbers),
            Math.max(...numbers)
        ]
    }

    public setPrecision(value: number): void
    {
        this.precision = value
    }

    private round(value: number)
    {
        if (this.precision === 0) {
            return Math.round(value)
        }
        const denominator = Math.pow(10, this.precision)
        return Math.round( (value + Number.EPSILON) * denominator ) / denominator
    }
}