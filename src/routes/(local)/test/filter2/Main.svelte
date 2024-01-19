<script>
	import { DataHandler } from '$lib';
	import ThFilter from './ThFilter.svelte';


	const data = [
		{
			name: 'Mario',
			status: 'DRAFT',
			ammount: 41
		},
		{
			name: 'George',
			status: 'OPEN',
			ammount: 54
		},
		{
			name: 'Mario',
			status: 'OPEN',
			ammount: 31
		}
	];

	const handler = new DataHandler(data, { rowsPerPage: 3 });
	const rows = handler.getRows();

	const keys = Object.keys(data[0]); // ['name', 'status', 'ammount']

</script>

<table>
	<thead>
		<tr>
			{#each keys as key}
				<th>{key}</th>
			{/each}
		</tr>
		<tr>
			{#each keys as key}
				<ThFilter {handler} {key} />
			{/each}
		</tr>
	</thead>
	<tbody>
		{#each $rows as row}
			<tr>
				{#each keys as key}
					<td>{row[key]}</td>
				{/each}
			</tr>
		{/each}
	</tbody>
</table>