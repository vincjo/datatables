import type { Field, TableHandler } from '$lib/src/client'
import { parseField, sort } from '$lib/src/client/utils'

export default class CalcultationHelper<Row>
{
    private callback    : (row: Row) => unknown
    private precision   : number
    private table       : TableHandler<Row>

    constructor(table: TableHandler<Row>, field: Field<Row>)
    {
        this.table      = table
        this.callback   = parseField(field).callback
    }

    public distinct(sortBy?: { field: 'value' | 'count', direction?: 'asc' | 'desc' }): { value: string, count: number }[]
    {
        const values = this.table.allRows.map(row => this.callback(row)) as any[]

        const aggregate: { [key: string ]: number } = values.reduce((acc, curr) => {
            if (Array.isArray(curr)) {
                for (const item of curr) {
                    acc[item] = (acc[item] ?? 0) + 1
                }
                return acc
            }
            acc[curr] = (acc[curr] ?? 0) + 1
            return acc
        }, {})
        const result = Object.entries(aggregate).map(([value, count]) => ({ value, count }))
        if (sortBy) {
            const { field, direction } = sortBy
            return result.sort((x, y) => {
                const [a, b] = [x[field], y[field]]
                return sort[direction ?? 'asc'](a, b)
            })
        }
        return result
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

    private round(value: number)
    {
        return Number(value.toFixed(this.precision))
    }
}