<script>
    import Prism from 'prismjs'
    import 'prism-svelte'
    import 'prismjs/components/prism-typescript'
    export let code
    export let language = 'typescript'
    export let fontSize = '14px'
    export let padding = '20px'

</script>


<aside class="thin-scrollbar-darken" style:font-size="{fontSize}">
    {#if language === 'typescript'}
<pre class="language-typescript" style:padding="{padding} 16px">
<code>{@html Prism.highlight(code, Prism.languages.typescript)}</code>
</pre>
    {:else}
        <pre class="language-svelte">{@html Prism.highlight(code, Prism.languages.svelte, 'svelte')}</pre>
    {/if}

</aside>


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
