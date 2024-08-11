<script lang="ts">
    import Prism from 'prismjs'
    import 'prismjs/components/prism-typescript'
    import CopyButton from './Demo_CopyButton.svelte'
    let { dataset }: { dataset: string } = $props()

    const highlight = () => {
        return Prism.highlight(dataset, Prism.languages.typescript)
    }
</script>



<pre class="language-typescript thin-scrollbar">
<CopyButton code={dataset}/>
{@html highlight()}
</pre>


<style>
    pre {
        position: relative;
        max-height: 80vh;
        border: 1px solid var(--grey);
        border-radius: 8px;
        background: var(--bg-code);
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        right: 0;
        overflow: auto;
        padding: 0;
    }
    @media (max-width: 800px) {
        pre {
            left: 0;
            padding-top: 32px;
        }
    }
</style>
