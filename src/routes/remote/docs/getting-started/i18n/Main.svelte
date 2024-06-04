<script lang="ts">
    import myData from '$site/data/data'
    import { DataHandler, Datatable, Th, ThFilter } from '$lib/client'

    const handler = new DataHandler(myData, {
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
    const rows = handler.getRows()
</script>

<Datatable basic {handler}>
    <table>
        <thead>
            <tr>
                <Th {handler} field="first_name">First Name</Th>
                <Th {handler} field="last_name">Last Name</Th>
                <Th {handler} field="email">Email</Th>
            </tr>
            <tr>
                <ThFilter {handler} field="first_name" />
                <ThFilter {handler} field="last_name" />
                <ThFilter {handler} field="email" />
            </tr>
        </thead>
        <tbody>
            {#each $rows as row}
                <tr>
                    <td>{row.first_name}</td>
                    <td>{row.last_name}</td>
                    <td>{row.email}</td>
                </tr>
            {/each}
        </tbody>
    </table>
</Datatable>

