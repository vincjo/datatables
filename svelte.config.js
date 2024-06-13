import { mdsvex } from 'mdsvex'
import mdsvexConfig from './mdsvex.config.js'
import adapter from '@sveltejs/adapter-node'
import preprocess from 'svelte-preprocess'

/** @type {import('@sveltejs/kit').Config} */
const config = {
    extensions: ['.svelte', ...mdsvexConfig.extensions],
    preprocess: [mdsvex(mdsvexConfig), preprocess()],
    // compilerOptions: {
    //     runes: true
    // },
    kit: {
        adapter: adapter({ out: 'build' }),
        paths: {
            base: '/datatables.runes'
        },
        alias: {
			$site: 'src/site',
			$site: 'src/site/*',
		}
    },
	vitePlugin: {
        inspector: {
            toggleKeyCombo: 'meta-shift',
            holdMode: true,
            showToggleButton: 'always',
            toggleButtonPos: 'bottom-right',
        }
	}
}

export default config
