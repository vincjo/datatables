import { sveltekit } from '@sveltejs/kit/vite'
import type { UserConfig } from 'vite'
import Icons from 'unplugin-icons/vite'
import * as path from 'path'

const config: UserConfig = {
    plugins: [
        sveltekit(),
        Icons({
            compiler: 'svelte',
            defaultStyle: 'width:28px; height:28px; color:var(--font);'
        })
    ],
    resolve: {
        alias: {
            $site: path.resolve('./src/site'),
        }
    }
}

export default config
