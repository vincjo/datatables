<script lang="ts">
    import { contacts } from './data'
    import { DataHandler } from '$lib/local'
    const handler = new DataHandler(contacts)

    const rows = handler.getRows()

    type Code = { year: string, category: string, group: string }


    const yearFilter = handler.createFilter('codes', (entry: Code[], value: number[]) => {
        // get minYear and maxYear as number[]
        const years = entry.map(item => Number(item.year))
        const [minYear, maxYear] = [Math.min(...years), Math.max(...years)]
        // check
        const [min, max] = value
        return minYear >= min && maxYear <= max
    })
    yearFilter.set([2007, 2020])

    const categoryFilter = handler.createFilter('codes', (entry: Code[], values: string[]) => {
        const categories = entry.map(item => item.category)
        for(const value of values) {
            if (categories.includes(value)) {
                return true
            }
        }
        return false
    })
    categoryFilter.set(['CIE', 'LIS'])

    const groupFilter = handler.createFilter('codes', (entry: Code[], values: string[]) => {
        const groups = entry.map(item => item.group)
        for(const value of values) {
            if (groups.includes(value)) {
                return true
            }
        }
        return false
    })
    groupFilter.set(['CIO', 'COL'])



    const filter = handler.createAdvancedFilter( 'codes', (row, value) => {
        const [category, group, minYear, maxYear] = value.split(';')
        if (!minYear && !maxYear) {
        return row.codes?.some((c) => c.category === category && c.group === group)
        } else return row.codes?.some(
        (c) => c.category === category && c.group === group && c.year >= minYear && c.year <= maxYear
        )
    })
</script>


<section>
    <aside>

    </aside>
    <pre>
        {#each $rows as row}
            {JSON.stringify(row, null, 2)}
        {/each}
    </pre>
</section>
