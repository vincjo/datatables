<script>
    import Prism from 'prismjs'
    import 'prism-svelte'
    import 'prismjs/components/prism-typescript'
    export let code
    export let language = 'typescript'
    export let fontSize = '14px'

</script>


<aside class="thin-scrollbar-darken" style:font-size="{fontSize}">
    {#if language === 'typescript'}
<pre class="language-typescript">
<code>{@html Prism.highlight(code, Prism.languages.typescript)}</code>
</pre>
    {:else}
        <pre class="language-svelte">{@html Prism.highlight(code, Prism.languages.svelte, 'svelte')}</pre>
    {/if}

</aside>


<style>
    aside {
        overflow: auto;
        background: #212121;
        border-radius: 4px;
    }
    pre {
        margin: 0;
        background: #212121;
        padding: 32px;
    }
    code {
        background: #212121;
    }
</style>
