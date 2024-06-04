<script lang="ts">
    import Prism from 'prismjs'
    import 'prism-svelte'
    import 'prismjs/components/prism-typescript.js'
    type Props = { code?: string, language?: string, fontSize?: string, padding?: string }
    let {
        code = '',
        language = 'typescript',
        fontSize = '14px',
        padding = '20px'
    }: Props = $props()
</script>

{#if language === 'typescript'}
<aside class="thin-scrollbar" style:font-size="{fontSize}">
    <pre class="language-typescript" style:padding="{padding} 16px"><code>{@html Prism.highlight(code, Prism.languages.typescript)}</code></pre>
</aside>

{:else}

<pre class="language-svelte">{@html Prism.highlight(code, Prism.languages.svelte, 'svelte')}</pre>

{/if}

<style>
    aside {
        overflow: auto;
        background: var(--bg-code);
        border-radius: 4px;
    }
    pre {
        margin: 0;
        background: var(--bg-code);
        padding: 32px;
    }
    code {
        background: var(--bg-code);
    }
</style>