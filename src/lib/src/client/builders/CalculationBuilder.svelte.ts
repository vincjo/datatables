import type { Field, TableHandler } from '$lib/src/client'
import { sort, parse }              from '$lib/src/client/core'

type Sort = [key: 'value' | 'count', direction: 'asc' | 'desc']

export default class CalcultationBuilder<Row>
{
    private callback    : (row: $state.Snapshot<Row>) => string | number
    private precision   : number
    private table       : TableHandler<Row>

    constructor(table: TableHandler<Row>, field: Field<Row>)
    {
        this.table      = table
        this.callback   = parse(field).callback as (row: $state.Snapshot<Row>) => string | number
    }

    public distinct(param?: { sort: Sort }): { value: string, count: number }[]
    {
        const values = this.table.allRows.map(row => this.callback(row))

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
        if (param?.sort) {
            const [field, direction] = param.sort
            if (field === 'count') {
                result.sort((x, y) => sort.asc(x.value, y.value))
            }
            result.sort((a, b) => sort[direction](a[field], b[field]))
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

    public median(param?: { precision: number }): number
    {
        this.precision  = param?.precision ?? 2
        const values = [...this.table.allRows.map(row => this.callback(row))]
            .sort((a: number, b: number) => a - b)
            .filter(Boolean) as number[]
        if (values.length === 0) return null
        const half = Math.floor(values.length / 2)
        return (values.length % 2
            ? values[half]
            : this.round((values[half - 1] + values[half]) / 2)
        )
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
        console.log(value, typeof(value))
        return Number(value.toFixed(this.precision))
    }
}