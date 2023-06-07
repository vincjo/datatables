import * as fs from 'fs'

export const load = async () => {
    
    const response = await fetch('https://dummyjson.com/users?limit=10&skip=0')

    const path = './src/routes/remote/examples'
    const lib = './src/lib/remote'
    const page = 'user-api'
    return {
        dataset: response.json(),
        components: [
            {
                name: '+page.server.ts',
                code: fs.readFileSync(`${path}/${page}/example.server.ts`).toString('utf-8'),
                language: 'typescript'
            },
            {
                name: 'api_helper.ts',
                code: fs.readFileSync(`${path}/${page}/user_api_helper.ts`).toString('utf-8'),
                language: 'typescript'
            },
            {
                name: 'Main.svelte',
                code: fs.readFileSync(`${path}/${page}/Main.svelte`).toString('utf-8'),
                components: [
                    // {
                    //     name: 'Th.svelte',
                    //     code: fs.readFileSync(`${lib}/Th.svelte`).toString('utf-8')
                    // },
                    // {
                    //     name: 'ThFilter.svelte',
                    //     code: fs.readFileSync(`${lib}/ThFilter.svelte`).toString('utf-8')
                    // },
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
                            // {
                            //     name: 'RowCount.svelte',
                            //     code: fs.readFileSync(`${lib}/RowCount.svelte`).toString('utf-8')
                            // },
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
