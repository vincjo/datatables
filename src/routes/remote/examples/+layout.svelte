<script lang="ts">
    let { children } = $props()
    import Layout from '$site/components/examples/Layout.svelte'
    const nav = [
        {
            title: `Comment API`,
            page: 'hello-world',
            description: `Columns sorting. Source: JSON Placeholder`,
            tag: ['rows per page', 'sorting', 'pagination', 'row count']
        },
        {
            title: `User API`,
            page: 'user-api',
            description: `Search with total rows returned. Source: Dummy JSON`,
            tag: ['search', 'rows per page', 'pagination', 'row count']
        },
        {
            title: `Todo API`,
            page: 'todo-api',
            description: `Column filtering. Source: JSON Placeholder`,
            tag: ['search', 'rows per page', 'sorting', 'column filters', 'pagination']
        },
        {
            title: `Pokedex API`,
            page: 'pokedex-api',
            description: `A Pokemon list. Source: Poke API`,
            tag: ['rows per page', 'pagination', 'row count']
        },
        // {
        //     title: `Beer API`,
        //     page: 'beer-api',
        //     description: `Row selection. Source: Punk API`,
        //     tag: ['search', 'rows per page', 'pagination']
        // },
    ]
</script>

<Layout {nav}>
    {@render children()}
</Layout>
