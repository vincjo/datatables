<script lang="ts">
    import Table from './MCF_Main.svelte'
</script>


<h1>Pokedex</h1>

<article class="bg-darken">
    <Table/>
</article>

<style>
    article {
        margin: 24px 0;
        max-width: 960px;
        border: 1px solid var(--grey);
        border-radius: 8px;
        padding-bottom: 8px;
    }
</style>