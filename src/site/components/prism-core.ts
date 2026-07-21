import Prism from 'prismjs'

/**
 * PrismJS grammar packages (`prismjs/components/*`, `prism-svelte`) register
 * their grammars against a global `Prism`. Prism's browser build sets that
 * global automatically, but under Node SSR it does not — so on a hard page
 * load the grammar modules either throw `ReferenceError: Prism is not defined`
 * or attach their grammars to a different instance than the one we highlight
 * with, which surfaces as `The language "typescript" has no grammar`.
 *
 * Assigning the global here — in a module that is imported *before* the grammar
 * modules (see ./prism.ts) — guarantees they extend the exact instance we
 * export, in both the browser and SSR.
 */
;(globalThis as typeof globalThis & { Prism?: typeof Prism }).Prism = Prism

export default Prism
