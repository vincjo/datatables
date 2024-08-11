<script lang="ts">
    import Prism from 'prismjs'
    import 'prism-svelte'
    import 'prismjs/components/prism-typescript'
    import CopyButton from './Demo_CopyButton.svelte'
    import Nav from './Demo_Code_Nav.svelte'
    import  { type Code, parseCode } from '$site'
    let { components, hasNav }: {
        components: Code[],
        hasNav: boolean
    } = $props()
    let code = $state(components[0].code)
    let language = $state(components[0].language ? 'typescript' : 'svelte')

    const highlight = () => {
        if (language === 'typescript') {
            return Prism.highlight(parseCode(code), Prism.languages.typescript)
        }
        return Prism.highlight(parseCode(code), Prism.languages.svelte, 'svelte')
    }
</script>



<section>
    <CopyButton {code}/>
    {#if hasNav}
        <Nav {components} bind:code={code} bind:language={language}/>
    {/if}
    <pre class="language-{language} thin-scrollbar">{@html highlight()}</pre>
</section>


<style>
    section {
        position: relative;
        height: 100%;
        width: 100%;
        min-height: 80vh;
        border: 1px solid var(--grey);
        border-radius: 8px;
        background: var(--bg-code);
    }
    pre {
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        right: 0;
        overflow: auto;
        padding: 0;
        border-radius: 8px;
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
