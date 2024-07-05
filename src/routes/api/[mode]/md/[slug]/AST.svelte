<script lang="ts">
    import { page } from '$app/stores'

    let ast = $state(undefined)

    const load = async () => {
        ast = undefined
        const { mode, slug } = $page.params
        const [key, name] = slug.split('~')

        const response = await fetch(`http://localhost:3333/document/get?mode=${mode}&key=${key}&name=${name}`)
        ast = await response.json()
    }
</script>







<section>
    <button onclick={() => load()}>Load AST</button>
    {#if ast}
        <pre>{JSON.stringify(ast, null, 4)}</pre>
    {/if}
</section>

<style>
    button {
        color: var(--ternary);
        font-family: JetBrains;
    }
    pre {
        color: var(--font);
    }
</style>