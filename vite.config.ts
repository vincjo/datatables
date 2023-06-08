import { sveltekit } from '@sveltejs/kit/vite'
import type { UserConfig } from 'vite'
import * as path from 'path'

const config: UserConfig = {
    plugins: [sveltekit()],
    resolve: {
        alias: {
            $components: path.resolve('./src/components'),
            $utils: path.resolve('./src/utils'),
            $data: path.resolve('./src/data')
        }
    }
}

export default config
