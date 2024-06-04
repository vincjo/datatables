<script lang="ts">
    import type { TableHandler, Row } from '$lib/remote'

    type T = $$Generic<Row>
    type Props = {
        table: TableHandler,
        field: string
    }
    let { table, field }: Props = $props()

    let value: string = $state('')
	let timeout: any = $state(undefined)

    const filter = () => {
        table.filter(value, field)
		clearTimeout(timeout)
		timeout = setTimeout( () => {
            table.invalidate()
		}, 400)
	}
</script>

<th>
    <input
        style:text-align="left"
        type="text"
        placeholder={table.i18n.filter}
        spellcheck="false"
        bind:value
        oninput={filter}
    />
</th>

<style>
    th {
        border-bottom: 1px solid var(--grey, #e0e0e0);
    }
    input {
        width: 100%;
        height: 24px;
        border: none;
        text-align: left;
        padding: 0 20px;
        background: inherit;
        outline: none;
        border-radius: 0;
        font-size: 14px;
        color: var(--font-grey, #757575);
        font-family: Arial, Helvetica, sans-serif;
    }
    input::placeholder {
        color: var(--grey, #bdbdbd);
        font-size: 13px;
    }
    input:focus {
        outline: none;
        border: none;
    }
</style>
