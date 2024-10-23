import { sveltekit }        from '@sveltejs/kit/vite'
import replace              from '@rollup/plugin-replace'
import { config as dotenv } from 'dotenv'
import type { UserConfig }  from 'vite'

const result = dotenv({ path: '../.env'})
if (result.error) {
	dotenv({ path: '../../.env'})
}

const port = process.env.NODE_ENV === 'development' ? ':5173' : ''


const config: UserConfig = {
    plugins: [
        sveltekit(),
        replace({
            preventAssignment: true,
            values: {
                'BASE_URL': process.env.BASE_URL + `${port}/datatables/documents`,
                'STATIC_PATH': '/datatables',
            }
        }),
    ]
}

export default config
