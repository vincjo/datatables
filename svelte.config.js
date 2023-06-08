import { mdsvex } from 'mdsvex'
import mdsvexConfig from './mdsvex.config.js'
import adapter from '@sveltejs/adapter-node'
import preprocess from 'svelte-preprocess'

/** @type {import('@sveltejs/kit').Config} */
const config = {
    extensions: ['.svelte', ...mdsvexConfig.extensions],
    preprocess: [preprocess(), mdsvex(mdsvexConfig)],

    kit: {
        adapter: adapter({ out: 'build' }),
        paths: {
            base: '/datatables'
        }
<<<<<<< HEAD
    }
=======
    },
	vitePlugin: {
		experimental: {
			inspector: {
				toggleKeyCombo: 'meta-shift',
				holdMode: true,
				showToggleButton: 'always',
                toggleButtonPos: 'bottom-right',
			}
		}
	}
>>>>>>> upstream/master
}

export default config
