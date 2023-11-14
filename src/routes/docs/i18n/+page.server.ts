import * as fs from 'fs'

export const load = async () => {
    const path = './src/routes/docs'
    const lib = './src/lib/client'
    const page = 'i18n'
    return {
        dataset: fs.readFileSync(`./src/site/data/data.ts`).toString('utf-8'),
        components: [
            {
                name: 'Main.svelte',
                code: fs.readFileSync(`${path}/${page}/Main.svelte`).toString('utf-8'),
            }
        ]
    }
}
