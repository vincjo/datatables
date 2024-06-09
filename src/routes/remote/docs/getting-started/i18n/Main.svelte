<script lang="ts">
    import myData from '$site/data/data'
    import { TableHandler, Datatable, ThSort, ThFilter } from '$lib/client'

    const table = new TableHandler(myData, {
        rowsPerPage: 10,
        i18n: {
            search: 'Rechercher...',
            show: 'Afficher',
            entries: 'lignes',
            filter: 'Filtrer',
            rowCount: 'Lignes {start} à {end} sur {total}',
            noRows: 'Aucun résultat',
            previous: 'Précédent',
            next: 'Suivant'
        }
    })
</script>

<Datatable basic {table}>
    <table>
        <thead>
            <tr>
                <ThSort {table} field="first_name">First Name</ThSort>
                <ThSort {table} field="last_name">Last Name</ThSort>
                <ThSort {table} field="email">Email</ThSort>
            </tr>
            <tr>
                <ThFilter {table} field="first_name" />
                <ThFilter {table} field="last_name" />
                <ThFilter {table} field="email" />
            </tr>
        </thead>
        <tbody>
            {#each table.rows as row}
                <tr>
                    <td>{row.first_name}</td>
                    <td>{row.last_name}</td>
                    <td>{row.email}</td>
                </tr>
            {/each}
        </tbody>
    </table>
</Datatable>

