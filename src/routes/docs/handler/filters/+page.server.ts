import * as fs from 'fs'

export const load = async () => {
    const path = './src/routes/docs/handler'
    const lib = './src/lib/client'
    const page = 'filters'
    return {
        dataset: fs.readFileSync(`./src/site/data/pokedex.ts`).toString('utf-8'),
        components: [
            {
                name: 'CriteriaFilter.svelte',
                code: fs.readFileSync(`${path}/${page}/MCF_TableFilter.svelte`).toString('utf-8'),
            },
            {
                name: 'Main.svelte',
                code: fs.readFileSync(`${path}/${page}/MCF_Table.svelte`).toString('utf-8'),
                components: [
                    {
                        name: 'Th.svelte',
                        code: fs.readFileSync(`${lib}/Th.svelte`).toString('utf-8')
                    },
                    {
                        name: 'Datatable.svelte',
                        code: fs.readFileSync(`${lib}/Datatable.svelte`).toString('utf-8'),
                        components: [
                            {
                                name: 'Search.svelte',
                                code: fs.readFileSync(`${lib}/Search.svelte`).toString('utf-8')
                            },
                            {
                                name: 'RowsPerPage.svelte',
                                code: fs.readFileSync(`${lib}/RowsPerPage.svelte`).toString('utf-8')
                            },
                            {
                                name: 'RowCount.svelte',
                                code: fs.readFileSync(`${lib}/RowCount.svelte`).toString('utf-8')
                            },
                            {
                                name: 'Pagination.svelte',
                                code: fs.readFileSync(`${lib}/Pagination.svelte`).toString('utf-8')
                            }
                        ]
                    }
                ]
            }
        ]
    }
}