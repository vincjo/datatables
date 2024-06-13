import * as fs from 'fs'

export const load = async () => {

    const response = await fetch('https://jsonplaceholder.typicode.com/comments?_page=1&_limit=5')

    const path = './src/routes/server/examples'
    const lib = './src/lib/server'
    const page = 'hello-world'
    return {
        dataset: await response.json(),
        components: [
            {
                name: '+page.server.ts',
                code: fs.readFileSync(`${path}/${page}/example.server.ts`).toString('utf-8'),
                language: 'typescript'
            },
            {
                name: 'Main.svelte',
                code: fs.readFileSync(`${path}/${page}/Main.svelte`).toString('utf-8'),
                components: [
                    // {
                    //     name: 'api.ts',
                    //     code: fs.readFileSync(`${path}/${page}/api.ts`).toString('utf-8'),
                    //     language: 'typescript'
                    // },
                    // {
                    //     name: 'Datatable.svelte',
                    //     code: fs.readFileSync(`${lib}/Datatable.svelte`).toString('utf-8'),
                    //     components: [
                    //         {
                    //             name: 'Search.svelte',
                    //             code: fs.readFileSync(`${lib}/Search.svelte`).toString('utf-8')
                    //         },
                    //         {
                    //             name: 'RowsPerPage.svelte',
                    //             code: fs.readFileSync(`${lib}/RowsPerPage.svelte`).toString('utf-8')
                    //         },
                    //         {
                    //             name: 'Pagination.svelte',
                    //             code: fs.readFileSync(`${lib}/Pagination.svelte`).toString('utf-8')
                    //         }
                    //     ]
                    // }
                ]
            }
        ]
    }
}
