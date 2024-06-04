import { sveltekit } from '@sveltejs/kit/vite'
import type { UserConfig } from 'vite'
import * as path from 'path'

const config: UserConfig = {
    plugins: [
        sveltekit(),
    ],
    resolve: {
        alias: {
            $site: path.resolve('./src/site'),
        }
    }
}

export default config
