<script lang="ts">
    import { page } from '$app/stores'
    import Content  from './Content.svelte'

    let { data } = $props()

    const [key] = $derived($page.params.slug.split('~'))
</script>

<section class="api">
    <Content data={data.page} {key}/>
</section>


<style>
    section :global(p) {
        font-size: 13px;
        font-family: JetBrains;
        color: var(--font-grey);
    }
    section :global(h2) {
        font-size: 16px;
        font-family: JetBrains;
        margin-top: 16px;
        color: var(--primary);
    }
    section :global(h3) {
        color: var(--font-grey);
    }
    section :global(p code) {
        background: var(--primary-lighten-1);
        padding: 2px 4px;
        color: var(--primary);
        border: 1px solid var(--primary-lighten-1);
        border-radius: 4px;
    }
</style>