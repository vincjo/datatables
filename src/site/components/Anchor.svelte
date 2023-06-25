<script>
    import { anchor } from '$site/utils/page'
    import viewport from '$site/utils/viewport'
    export let name
</script>

<section use:viewport on:enterViewport={() => ($anchor = '#' + name)}>
    <!-- svelte-ignore a11y-missing-content -->
    <a class="anchor" {name} />
    <slot />
</section>

<style>
    section {
        min-height: 400px;
        margin-top: 48px;
    }
    a {
        display: block;
    }
</style>
