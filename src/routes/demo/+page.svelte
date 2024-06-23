<script>
    import Demo from '$lib/components/Demo.svelte'
    import { code } from '$lib/code/demo.js'
    import { data } from '$lib/app/data.js'
	import { Datatable } from 'svelte-simple-datatables'
    let rows
</script>

<h2>Default settings</h2>
<Demo {code} {data}>
    <Datatable data={JSON.parse(data)} bind:dataRows={rows}>
        <thead>
            <tr>
                <th data-key="id">ID</th>
                <th data-key="first_name">First Name</th>
                <th data-key="last_name">Last Name</th>
                <th data-key="email">Email</th>
            </tr>
        </thead>
        <tbody>
            {#if rows}
                {#each $rows as row}
                <tr>
                    <td>{row.id}</td>
                    <td>{row.first_name}</td>
                    <td>{row.last_name}</td>
                    <td>{row.email}</td>
                </tr>
                {/each}
            {/if}
        </tbody>
    </Datatable>
</Demo>

<style>
	/* 40b3ff     ff3e00    676778*/
    h2{font-size:24px;color:#676778;font-weight:400;margin:16px 0 8px 0;}
    th:first-child{width:72px;}
    td{text-align:center;padding:4px 0}
</style>