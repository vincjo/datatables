import type { Field } from '$lib/local'
import type Context from '$lib/local/Context'
import { type Writable, type Readable, get, derived } from 'svelte/store'


export default class CalcultationHandler<Row>
{
    private field: Field<Row>
    private rawRows: Writable<Row[]>
    private filteredRows: Readable<Row[]>
    private callback: (row: Row) => Row[keyof Row]
    private precision: number

    constructor(context: Context<Row>, field: Field<Row>)
    {
        this.field          = field
        this.rawRows        = context.rawRows
        this.filteredRows   = context.filteredRows
        this.callback       = this.parse().callback
        this.precision      = 2
    }

    public distinct(callback: (values: any[]) => any[] = null)
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

    public avg(callback: (values: number[]) => any[] = null)
    {
        return derived(this.filteredRows, $filteredRows => {
            if ($filteredRows.length === 0) return 0
            const values = $filteredRows.map(row => this.callback(row)).filter(Boolean) as number[]
            const array = callback ? callback(values) : values
            return this.round(array.reduce((acc, curr) => acc + curr, 0) / array.length)
        })
    }

    public sum(callback: (values: number[]) => any[] = null)
    {
        return derived(this.filteredRows, $filteredRows => {
            const values = $filteredRows.map(row => this.callback(row)) as number[]
            const array = callback ? callback(values) : values
            return this.round(array.reduce((acc, curr) => acc + curr, 0))
        })
    }

    private parse()
    {
        if (typeof this.field === 'string') {
            return {
                callback: (row: Row) => row[this.field as keyof Row],
                identifier: this.field.toString()
            }
        } else if (typeof this.field === 'function') {
            return {
                callback: this.field,
                identifier: this.field.toString()
            }
        }
        throw new Error(`Invalid filterBy argument: ${String(this.field)}`)
    }

    public round(value: number)
    {
        const denominator = Math.pow(10, this.precision)
        return Math.round( (value + Number.EPSILON) * denominator ) / denominator
    }
}