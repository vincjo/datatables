import * as fs from 'fs'

export const load = async () => {

    const path = './src/routes/examples/server'
    const lib = './src/lib/src/server'
    const page = 'pokedex-api'
    return {
        dataset: [],
        components: [
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
                    //     name: 'PokemonStats.svelte',
                    //     code: fs.readFileSync(`${path}/${page}/PokemonStats.svelte`).toString('utf-8')
                    // },
                    // {
                    //     name: 'PokemonTypes.svelte',
                    //     code: fs.readFileSync(`${path}/${page}/PokemonTypes.svelte`).toString('utf-8')
                    // },
                    // {
                    //     name: 'Datatable.svelte',
                    //     code: fs.readFileSync(`${lib}/Datatable.svelte`).toString('utf-8'),
                    //     components: [
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
