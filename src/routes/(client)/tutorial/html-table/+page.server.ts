import * as fs from 'fs'

export const load = async () => {
<<<<<<< HEAD:src/routes/tutorial/html-table/+page.server.ts
    const path = './src/routes/tutorial'
=======
    const path = './src/routes/(client)/tutorial'
>>>>>>> upstream/master:src/routes/(client)/tutorial/html-table/+page.server.ts
    return {
        dataset: fs.readFileSync(`./src/data/data.ts`).toString('utf-8'),
        components: [
            {
                name: 'Main.svelte',
                code: fs.readFileSync(`${path}/html-table/Main.svelte`).toString('utf-8')
            }
        ]
    }
}
