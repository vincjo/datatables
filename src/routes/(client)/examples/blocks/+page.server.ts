import * as fs from 'fs'

export const load = async () => {
<<<<<<< HEAD:src/routes/examples/callback/+page.server.ts
    const path = './src/routes/examples'
    const lib = './src/lib'
    const page = 'callback'
=======
    const path = './src/routes/(client)/examples'
    const lib = './src/lib'
    const page = 'blocks'
>>>>>>> upstream/master:src/routes/(client)/examples/blocks/+page.server.ts
    return {
        dataset: fs.readFileSync(`./src/data/data.ts`).toString('utf-8'),
        components: [
            {
                name: 'Main.svelte',
                code: fs.readFileSync(`${path}/${page}/Main.svelte`).toString('utf-8'),
                components: [
                    {
                        name: 'Th.svelte',
                        code: fs.readFileSync(`${lib}/Th.svelte`).toString('utf-8')
                    },
                    {
                        name: 'ThFilter.svelte',
                        code: fs.readFileSync(`${lib}/ThFilter.svelte`).toString('utf-8')
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
