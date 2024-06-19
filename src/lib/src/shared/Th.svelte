<script lang="ts">
    import type { Snippet } from 'svelte'

    let { children }: { children: Snippet } = $props()
</script>

<th>
    <strong>
        {@render children()}
    </strong>
</th>

<style>
    th {
        background: inherit;
        padding: 8px 20px;
        white-space: nowrap;
        font-size: 13px;
        user-select: none;
        text-align: left;
        border-bottom: 1px solid var(--grey, #e0e0e0);
    }
    th strong {
        white-space: pre-wrap;
        font-weight: bold;
        font-size: 13.5px;
        line-height: 16px;
    }
</style>
