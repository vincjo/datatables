<script>
    import Prism from 'prismjs'
    import 'prism-svelte'
    import 'prismjs/components/prism-typescript'
    import CopyButton from './CopyButton.svelte'
    import Nav from './DemoCode_Nav.svelte'
    export let components
    let code = components[0].code
    let language = components[0].language ? 'typescript' : 'svelte'
    const parse = (code) => {
        return code
            .replace('$lib/local', '@vincjo/datatables')
            .replace('$lib/remote', '@vincjo/datatables/remote')
    }
</script>


<CopyButton {code} />

<section>
    <Nav {components} bind:code={code} bind:language={language}/>
    <aside class="thin-scrollbar-darken">
        {#if language === 'typescript'}
        <pre class="language-typescript">
{@html Prism.highlight(parse(code), Prism.languages.typescript)}
        </pre>
        {:else}
        <pre class="language-svelte">
{@html Prism.highlight(parse(code), Prism.languages.svelte, 'svelte')}
        </pre>
        {/if}

    </aside>
</section>


<style>
    section {
        position: relative;
        height: 100%;
        width: 100%;
    }
    aside {
        position: absolute;
        left: 200px;
        top: 0;
        bottom: 0;
        right: 0;
        overflow: auto;
        background: var(--hljs);
    }
    pre {
        margin: 0;
    }

    @media (max-width: 800px) {
        aside {
            left: 0;
            padding-top: 32px;
        }
    }
</style>
