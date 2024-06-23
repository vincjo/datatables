<script>
    import { Highlight } from 'svelte-highlight'
    import { typescript as language } from 'svelte-highlight/languages'
    const code = `
    const settings = {
        sortable: true,
        pagination: true,
        scrollY: true,
        rowsPerPage: 50,
        columnFilter: false,
        css: true,
        labels: {
            search: 'Search...',    // search input placeholer
            filter: 'Filter',       // filter inputs placeholder
            noRows: 'No entries to found',
            info: 'Showing {start} to {end} of {rows} entries',
            previous: 'Previous',
            next: 'Next',       
        },
        blocks: {
            searchInput: true, 
            paginationButtons: true,
            paginationRowCount: true,
        }
    }    
`

</script>

<h2>Datatable default settings</h2>
<div class="code">
    <Highlight {code} {language}/>
</div>

<style>
    h2{font-size:24px;color:#676778;font-weight:400;margin:24px 0 8px 0;}
    div.code{background:var(--hljs);border-radius:8px;padding:4px;}
</style>