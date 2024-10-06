import * as fs from 'fs'

export const load = async (url) => {
    const path = './src/routes' + url.route.id
    const lib = './src/lib/src/shared'
    return {
        dataset: fs.readFileSync(`./src/site/data/data.ts`).toString('utf-8'),
        components: [
            {
                name: 'Example.svelte',
                code: fs.readFileSync(`${path}/Example.svelte`).toString('utf-8'),
                components: [
                    {
                        name: 'Datatable.svelte',
                        code: fs.readFileSync(`${lib}/Datatable.svelte`).toString('utf-8'),
                    },
                    {
                        name: 'Th.svelte',
                        code: fs.readFileSync(`${lib}/Th.svelte`).toString('utf-8')
                    },
                    {
                        name: 'RowCount.svelte',
                        code: fs.readFileSync(`${lib}/RowCount.svelte`).toString('utf-8')
                    },
                    {
                        name: 'Search.svelte',
                        code: fs.readFileSync(`${lib}/Search.svelte`).toString('utf-8')
                    },
                    {
                        name: 'Pagination.svelte',
                        code: fs.readFileSync(`${lib}/Pagination.svelte`).toString('utf-8')
                    }
                ]
            }
        ]
    }
}