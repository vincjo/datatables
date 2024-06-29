<script lang="ts">
    import type { TableHandler } from '$lib'
    let { table }: { table: TableHandler } = $props()
    const search = table.createSearch()
</script>

<aside>
    <svg width="18" height="18" viewBox="0 0 24 24"><path fill="var(--font-grey)" d="M9.539 15.23q-2.398 0-4.065-1.666Q3.808 11.899 3.808 9.5t1.666-4.065T9.539 3.77t4.064 1.666T15.269 9.5q0 1.042-.369 2.017t-.97 1.668l5.909 5.907q.14.14.15.345q.009.203-.15.363q-.16.16-.354.16t-.354-.16l-5.908-5.908q-.75.639-1.725.989t-1.96.35m0-1q1.99 0 3.361-1.37q1.37-1.37 1.37-3.361T12.9 6.14T9.54 4.77q-1.991 0-3.361 1.37T4.808 9.5t1.37 3.36t3.36 1.37"/></svg>
    <input type="text" placeholder="Search..." spellcheck="false" bind:value={search.value} oninput={() => search.set()}/>
</aside>

<style>
    aside {
        position: relative;
    }
    input {
        background: var(--bg);
        border: 1px solid var(--grey);
        color: var(--font);
        width: 100%;
        padding-left: 32px;
    }
    svg {
        position: absolute;
        top: calc((40px - 20px) / 2);
        left: 8px;
    }
</style>