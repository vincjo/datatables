<script>
    import Doc from './doc.svx'

</script>

<h2>Sticky table header</h2>

<section>
    <Doc/>
    <article>
        <table>
            <thead>
                <th>First name</th>
                <th>Last name</th>
            </thead>
            <tbody>
                {#each Array.from(Array(100).keys()) as row}
                <tr>
                    <td>John</td>
                    <td>Doe</td>
                </tr>
                {/each}
            </tbody>
        </table>
    </article>
</section>





<style>
    section {
        display:flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        align-items: center;
    }
    article {
        width:200px;
        margin-top:40px;
        height:200px;
        overflow-y: auto;
        margin-left:24px;
        border:2px solid #eee;
    }
    table {
        text-align:center;
        width:100%;
        border-collapse:separate;
        border-spacing:0;
    }
    thead {
        background:#fff;
        height:32px;
        position: sticky;
        inset-block-start: 0;
    }
    th {
        border-bottom:1px solid #e0e0e0;
    }
</style>