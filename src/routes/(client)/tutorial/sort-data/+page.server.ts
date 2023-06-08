import * as fs from 'fs'

export const load = async () => {
<<<<<<< HEAD:src/routes/tutorial/sort-data/+page.server.ts
    const path = './src/routes/tutorial'
=======
    const path = './src/routes/(client)/tutorial'
>>>>>>> upstream/master:src/routes/(client)/tutorial/sort-data/+page.server.ts
    return {
        dataset: fs.readFileSync(`./src/data/data.ts`).toString('utf-8'),
        components: [
            {
                name: 'Main.svelte',
                code: fs.readFileSync(`${path}/sort-data/Main.svelte`).toString('utf-8')
            },
            {
                name: 'Th.svelte',
                code: fs.readFileSync(`${path}/Th.svelte`).toString('utf-8')
            }
        ]
    }
}
