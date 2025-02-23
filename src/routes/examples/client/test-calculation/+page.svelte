<script lang="ts">
    import { TableHandler } from '$lib/src/client'
    import { data } from './data'

    const table = new TableHandler(data)

    const boundsExpert = table.createCalculation('local_expert').bounds()
    const boundsPublic = table.createCalculation('local_public').bounds()

    const avgExpert = table.createCalculation('local_expert').avg({ precision: 0 })
    const avgPublic = table.createCalculation('local_public').avg({ precision: 0 })

    const sumExpert = table.createCalculation('local_expert').sum({ precision: 0 })
    const sumPublic = table.createCalculation('local_public').sum({ precision: 0 })
</script>


<h1>Adresses consultées</h1>
<table>
    <thead>
        <tr>
            <th></th>
            <th>Public</th>
            <th>Expert</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><b>Total</b></td>
            <td><code class="public">{sumPublic}</code></td>
            <td><code class="expert">{sumExpert}</code></td>
        </tr>
        <tr>
            <td><b>Moyenne</b></td>
            <td><code class="expert">{avgExpert}</code></td>
            <td><code class="public">{avgPublic}</code></td>
        </tr>
        <tr>
            <td><b>Min / Max</b></td>
            <td><code class="expert">Entre {boundsExpert[0]} et {boundsExpert[1]}</code></td>
            <td><code class="public">Entre {boundsPublic[0]} et {boundsPublic[1]}</code></td>
        </tr>
    </tbody>
</table>