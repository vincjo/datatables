<script>
    import Prism from 'prismjs'
    import 'prism-svelte'
    import 'prismjs/components/prism-typescript'
    import CopyButton from './CopyButton.svelte'
    import Nav from './DemoCode_Nav.svelte'
    export let components
    export let codeNav
    let code = components[0].code
    let language = components[0].language ? 'typescript' : 'svelte'
    const parse = (code) => {
        return code
            .replace('$lib/client', '@vincjo/datatables')
            .replace('$lib/remote', '@vincjo/datatables/remote')
    }
    const highlight = () => {
        if (language === 'typescript') {
            return Prism.highlight(parse(code), Prism.languages.typescript)
        }
        return Prism.highlight(parse(code), Prism.languages.svelte, 'svelte')
    }
</script>


<CopyButton {code} />

<section>
    {#if codeNav}
        <Nav {components} bind:code={code} bind:language={language}/>
    {/if}
    <pre class="language-{language} thin-scrollbar">{@html highlight()}</pre>
</section>


<style>
    section {
        position: relative;
        height: 100%;
        width: 100%;
    }
    pre {
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        right: 0;
        overflow: auto;
        padding: 0;
    }
    pre.hasNav {
        left: 200px;
    }

    @media (max-width: 800px) {
        pre {
            left: 0;
            padding-top: 32px;
        }
    }
</style>
