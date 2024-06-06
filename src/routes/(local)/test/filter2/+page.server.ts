import * as fs from 'fs'

export const load = async () => {
    const path = './src/routes/(local)/test'
    const lib = './src/lib/local'
    const page = 'filter2'
    return {
        components: [
            {
                name: 'Main.svelte',
                code: fs.readFileSync(`${path}/${page}/Main.svelte`).toString('utf-8'),
                components: [
                    {
                        name: 'ThFilter.svelte',
                        code: fs.readFileSync(`${path}/${page}/ThFilter.svelte`).toString('utf-8')
                    },
                ]
            }
        ]
    }
}
