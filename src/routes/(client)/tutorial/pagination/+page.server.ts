import * as fs from 'fs'

export const load = async () => {
<<<<<<< HEAD:src/routes/tutorial/pagination/+page.server.ts
    const path = './src/routes/tutorial'
=======
    const path = './src/routes/(client)/tutorial'
>>>>>>> upstream/master:src/routes/(client)/tutorial/pagination/+page.server.ts
    return {
        dataset: fs.readFileSync(`./src/data/data.ts`).toString('utf-8'),
        components: [
            {
                name: 'Main.svelte',
                code: fs.readFileSync(`${path}/pagination/Main.svelte`).toString('utf-8')
            },
            {
                name: 'Pagination.svelte',
                code: fs.readFileSync(`${path}/Pagination.svelte`).toString('utf-8')
            },
            {
                name: 'RowCount.svelte',
                code: fs.readFileSync(`${path}/RowCount.svelte`).toString('utf-8')
            },
            {
                name: 'RowsPerPage.svelte',
                code: fs.readFileSync(`${path}/RowsPerPage.svelte`).toString('utf-8')
            },
            {
                name: 'Search.svelte',
                code: fs.readFileSync(`${path}/Search.svelte`).toString('utf-8')
            },
            {
                name: 'ThFilter.svelte',
                code: fs.readFileSync(`${path}/ThFilter.svelte`).toString('utf-8')
            },
            {
                name: 'Th.svelte',
                code: fs.readFileSync(`${path}/Th.svelte`).toString('utf-8')
            }
        ]
    }
}
