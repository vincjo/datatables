<script>
    export let handler
    const filters = handler.getFilters()
</script>

<aside>
    <b>Filters ({$filters.length})</b>
    {#each $filters as filter}
        <ul>
            <li style:color="blue">filterBy: "{filter.filterBy}"</li>
            <li style:color="purple">check: "{filter.check}"</li>
            <li style:color="green">value: "{filter.value}"</li>
        </ul>
    {/each}
</aside>

<style>
    aside {
        position: absolute;
        top: 8px;
        left: 8px;
        bottom: 8px;
        background: #fafafa;
        font-weight:bold;
        padding: 8px;
        border-radius: 4px;
        width: 160px;
        border: 1px solid #e0e0e0;
    }

    ul {
        margin: 0 4px;
        border-bottom: 1px solid #e0e0e0;
        list-style-type: none;
        padding: 4px;
    }
    li {
        font-weight: normal;
    }
</style>