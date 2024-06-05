import type { Field, TableHandler } from '$lib/client'
import { parseField } from '$lib/client/utils'

export default class CalcultationHelper<Row>
{
    private callback    : (row: Row) => Row[keyof Row]
    private precision   : number
    private table       : TableHandler<Row>

    constructor(table: TableHandler<Row>, field: Field<Row>)
    {
        this.table      = table
        this.callback   = parseField(field).callback
    }

    public distinct(): { value: string, count: unknown }[]
    {
        const values = this.table.rawRows.map(row => this.callback(row)) as any[]

        const result = values.reduce((acc, curr) => {
            if (Array.isArray(curr)) {
                for (const item of curr) {
                    acc[item] = (acc[item] ?? 0) + 1
                }
                return acc
            }
            acc[curr] = (acc[curr] ?? 0) + 1
            return acc
        }, {})
        return Object.entries(result).map(([value, count]) => ({ value, count }))
    }

    public avg(param?: { precision: number }): number
    {
        this.precision  = param?.precision ?? 2
        if (this.table.allRows.length === 0) return 0
        const values = this.table.allRows.map(row => this.callback(row)).filter(Boolean) as number[]
        return this.round(values.reduce((acc, curr) => acc + curr, 0) / values.length)
    }

    public sum(param?: { precision: number }): number
    {
        this.precision  = param?.precision ?? 2
        const values = this.table.allRows.map(row => this.callback(row)) as number[]
        return this.round(values.reduce((acc, curr) => acc + curr, 0))
    }

    public bounds(): number[]
    {
        const values = this.table.allRows.map(row => this.callback(row))

        const numbers = values.filter(Boolean) as number[]
        if (numbers.length === 0) return [null, null]
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
        return Number(value.toFixed(this.precision))
        // if (this.precision === 0) {
        //     return Math.round(value)
        // }
        // const denominator = Math.pow(10, this.precision)
        // return Math.round( (value + Number.EPSILON) * denominator ) / denominator
    }
}