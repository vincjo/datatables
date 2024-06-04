<script lang="ts">
    import Nav from './Nav.svelte'
    let { data, children } = $props()
</script>


<Nav nav={data.nav}/>
<section class="thin-scrollbar">
    {#if data.error}
        <p>{data.error}</p>
    {:else}    
        <div>
            {@render children()}
        </div>
    {/if}
</section>

<style>
    section {
        position: absolute;
        top: 0;
        bottom: 0;
        left: calc(240px + 32px);
        right: 0;
        overflow-y: auto;
    }
    div {
        max-width: 960px;
        padding: 40px 40px 80px 40px;
    }
    @media (min-width: 1200px) {
        section {
            left: calc(240px + 96px);
        }
    }
    @media (max-width: 800px) {
        section {
            left: 0;
        }
    }
    p {
        display: block;
        margin: 80px auto;
        color: var(--ternary);
        width: 600px;
        text-align: center;
        padding: 24px 16px;
        border-radius: 19px;
        border: 2px dashed var(--ternary);
        font-weight: bold;
        font-size: 16px;
        font-family: JetBrains;
    }
</style>
