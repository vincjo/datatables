import * as fs from 'fs'

export const load = async () => {
    const path = './src/routes/(local)/test'
    const lib = './src/lib/client'
    const page = 'radio-group'
    return {
        dataset: fs.readFileSync(`${path}/${page}/data.ts`).toString('utf-8'),
        components: [
            {
                name: 'Main.svelte',
                code: fs.readFileSync(`${path}/${page}/Main.svelte`).toString('utf-8'),
            }
        ]
    }
}
