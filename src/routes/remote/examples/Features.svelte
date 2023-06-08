<script>
    export let sort = false
    export let totalRows = false
    export let rowsPerPage = false
    export let search = false
    export let filters = false
    export let pagination = true
</script>

<ul class="flex">
    <li>{search         ? '✅' : '❌'} search</li>
    <li>{rowsPerPage    ? '✅' : '❌'} rows per page</li>
    <li>{sort           ? '✅' : '❌'} sorting</li>
    <li>{filters        ? '✅' : '❌'} column filters</li>
    <li>{pagination     ? '✅' : '❌'} pagination</li>
    <li>{totalRows      ? '✅' : '❌'} row count</li>
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
        border: 1px solid #e0e0e0;
        color: #212121;
        font-size: 12px;
        background: #f5f5f5;
    }
</style>