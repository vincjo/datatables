import { sveltekit }        from '@sveltejs/kit/vite'
import replace              from '@rollup/plugin-replace'
import path                 from 'path'
import { config as dotenv } from 'dotenv'
import type { UserConfig }  from 'vite'

const result = dotenv({ path: '../.env'})
if (result.error) {
	dotenv({ path: '../../.env'})
}

const config: UserConfig = {
    plugins: [
        sveltekit(),
        replace({
            preventAssignment: true,
            values: {
                'BASE_URL': process.env.BASE_URL + `:5173/datatables.runes/api`,
                'STATIC_PATH': '/datatables.runes',
            }
        }),
    ],
    resolve: {
        alias: {
            $site: path.resolve('./src/site'),
        }
    }
}

export default config
