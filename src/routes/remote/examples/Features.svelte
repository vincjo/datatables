<script>
    let { ...f } = $props()
</script>

<ul class="flex">
    Capabilities: 
    <li>{f.search         ? '✅' : '❌'} search</li>
    <li>{f.rowsPerPage    ? '✅' : '❌'} rows per page</li>
    <li>{f.sort           ? '✅' : '❌'} sorting</li>
    <li>{f.filters        ? '✅' : '❌'} column filters</li>
    <li>{f.pagination     ? '✅' : '❌'} pagination</li>
    <li>{f.totalRows      ? '✅' : '❌'} row count</li>
</ul>

<style>
    ul {
        list-style: none;
        flex-wrap: wrap;
        padding: 0;
        margin: 0 0 16px 0;
    }
    li {
        padding: 2px 8px;
        margin: 2px;
        border-radius: 4px;
        color: var(--font);
        font-size: 12px;
        background: var(--grey-lighten);
    }
</style>