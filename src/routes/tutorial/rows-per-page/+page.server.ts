import * as fs from 'fs'

export const load = async () => {
    const path = './src/routes/tutorial'
    const page = 'rows-per-page'
    return {
        dataset: fs.readFileSync(`./src/data/data.ts`).toString('utf-8'),
        components: [
            {
                name: 'Main.svelte',
                code: fs.readFileSync(`${path}/${page}/Main.svelte`).toString('utf-8'),
            },
            {
                name: 'RowsPerPage.svelte',
                code: fs.readFileSync(`${path}/${page}/RowsPerPage.svelte`).toString('utf-8'),
            },
            {
                name: 'Search.svelte',
                code: fs.readFileSync(`${path}/${page}/Search.svelte`).toString('utf-8'),
            },
            {
                name: 'ThFilter.svelte',
                code: fs.readFileSync(`${path}/${page}/ThFilter.svelte`).toString('utf-8'),
            },
            {
                name: 'Th.svelte',
                code: fs.readFileSync(`${path}/${page}/Th.svelte`).toString('utf-8'),
            },
        ]
    }
}