<script lang="ts">
	import type { DataHandler, Row } from '$lib/legacy/remote'

	type T = $$Generic<Row>

	export let handler: DataHandler<T>

	let value = ''
	let timeout: any

	const search = () => {
		handler.search(value)
		clearTimeout(timeout)
		timeout = setTimeout( () => {
            handler.invalidate()
		}, 400)
	}
</script>

<input
	class={$$props.class ?? ''}
	bind:value
	placeholder={handler.i18n.search}
	spellcheck="false"
	on:input={search}
/>

<style>
	input {
		border: 1px solid #e0e0e0;
		border-radius: 4px;
		outline: none;
		padding: 0 8px;
		line-height: 24px;
		margin: 0;
		height: 24px;
		background: transparent;
		width: 40%;
		max-width: 176px;
		min-width: 96px;
		transition: all, 0.1s;
	}
	input:focus {
		border: 1px solid #bdbdbd;
	}
	input::placeholder {
		color: #9e9e9e;
		line-height: 24px;
	}
</style>
