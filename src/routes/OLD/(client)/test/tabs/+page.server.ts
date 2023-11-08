import * as fs from 'fs'

export const load = async () => {
    const path = './src/routes/(local)/test'
    const page = 'tabs'
    return {
        dataset: fs.readFileSync(`${path}/${page}/data.ts`).toString('utf-8'),
        components: [
            {
                name: 'Main.svelte',
                code: fs.readFileSync(`${path}/${page}/Main.svelte`).toString('utf-8'),
                components: [
                    {
                        name: 'Table.svelte',
                        code: fs.readFileSync(`${path}/${page}/Table.svelte`).toString('utf-8')
                    },
                ]
            }
        ]
    }
}
