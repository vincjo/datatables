<script lang="ts">
    let { data } = $props()
</script>

<section class="about">
    {@html data.content}
</section>


<style>
    section {
        max-width: 720px;
    }
    :global(.about h1) {
        margin-top: 72px !important;
    }
    :global(.contr li) {
        margin: 16px 0;
        font-family: Archivo;
        font-size: 16px;
    }
    :global(.licen) {
        padding-top: 56px;
    }
</style>