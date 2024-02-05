<script lang="ts">
    import Highlight from '$site/components/Highlight.svelte'
    export let parser: any
    export let name: string
    export let md: string

</script>



<h1 class:deprecated={parser.isDeprecated}>
    {name}
</h1>
    {#if parser.isDeprecated}
        <span>@deprecated</span>
    {/if}


    {#if md}
        {@html md}
    {/if}


<style>
    h1 {
        font-size: 24px;
        font-family: JetBrains;
        color: var(--primary);
    }
    h1.deprecated {
        color: var(--font-grey);
        text-decoration: solid line-through var(--font-grey);
        /* text-decoration: solid line-through #e57373; */
    }
    span {
        color: var(--ternary);
        font-size: 18px;
        font-family: JetBrains;
    }
</style>