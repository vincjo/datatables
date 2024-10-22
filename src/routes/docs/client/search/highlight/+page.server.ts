import * as fs from 'fs'

export const load = async (url) => {
    const path = './src/routes' + url.route.id
    return {
        dataset: fs.readFileSync(`./src/site/data/data.ts`).toString('utf-8'),
        hasNav: false,
        components: [
            {
                name: 'Example.svelte',
                code: fs.readFileSync(`${path}/Example.svelte`).toString('utf-8'),
            }
        ]
    }
}