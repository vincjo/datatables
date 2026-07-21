/**
 * Central PrismJS setup. Import from here (never `prismjs` directly) so the
 * grammar modules always attach to the instance we export.
 *
 * Import order matters and is guaranteed by ES module evaluation order:
 * `./prism-core` sets `globalThis.Prism` first, then the grammar modules load.
 */
import Prism from './prism-core'
import 'prismjs/components/prism-typescript.js'
import 'prism-svelte'

export default Prism
