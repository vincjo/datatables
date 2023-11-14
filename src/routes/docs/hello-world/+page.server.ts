import * as fs from 'fs'

export const load = async () => {
    const path = './src/routes/docs'
    const page = 'hello-world'
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
