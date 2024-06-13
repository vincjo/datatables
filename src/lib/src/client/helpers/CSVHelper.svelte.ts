import type { TableHandler } from '$lib/src/client'

export default class CSVHelper<Row>
{
    private table: TableHandler<Row>

    constructor(table: TableHandler<Row>)
    {
        this.table  = table
    }

    public download(filename: string)
    {
        const csv = this.get()
        const element = document.createElement('a')
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(csv))
        element.setAttribute('download', filename)

        element.style.display = 'none'
        document.body.appendChild(element)

        element.click()
        document.body.removeChild(element)
    }

    public get()
    {
        const rows = this.getRows()
        rows.unshift(this.getHeader().join(','))
        return rows.join('\r\n')
    }

    private getRows()
    {
        return this.table.allRows.map(row => {
            const entries = Object.entries(row).map(([_, value]) => {
                if (value === null) return ''
                if (typeof value === 'number') {
                    return value
                }
                return `"${value}"`
            })
           return entries.join(',')
       })
    }

    private getHeader()
    {
        const [row] = this.table.allRows
        return Object.entries(row).map(([key, _]) => {
            return `"${key}"`
        })
    }
}
