<script lang="ts">
	import type { DataHandler, Row } from '$lib/remote'

	type T = $$Generic<Row>

	export let handler

	let value = ''
	let timeout: any

	const search = () => {
		handler.search(value)
		clearTimeout(timeout)
        if (!handler.invalidate) return;
		timeout = setTimeout( () => {
            handler.invalidate()
		}, 400)
	}
</script>

<div class='searchContainer'>
    <input
        class={$$props.class ?? ''}
        bind:value
        placeholder={handler.i18n.search}
        spellcheck="false"
        on:input={search}
    />
    {#if value.length > 0}
        <button class='clearSearchButton' on:click={() => {
            value = '';
            search();
            }}
        >x</button>
    {/if}
</div>

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
		width: 100%;
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
    .searchContainer {
        display: flex;
        flex-direction: row;
    }

    .clearSearchButton {
        padding: 0 5px;
        border: solid 1px lightGray
    }
</style>
