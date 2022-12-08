<script>
	import { Highlight } from 'svelte-highlight'
	import { apache as language } from 'svelte-highlight/languages'
</script>

<svelte:head>
	<title>svelte-simple-datatables</title>
</svelte:head>

<aside>
	<img src="logo.svg" alt="logo"/>
	<div>
		<h1>svelte-simple-datatables</h1>
		<p>A toolkit to build your own datatable components with Svelte</p>
		<div>
			<img src="https://img.shields.io/npm/dt/svelte-simple-datatables?color=%23b71540" alt="npm downloads"/>
			<img src="https://img.shields.io/npm/v/svelte-simple-datatables?color=%23b71540" alt="npm version"/>
		</div>
	</div>
</aside>

<h2>Installation</h2>
<div class="code">
	<Highlight {language} code={`npm i -D @vincjo/svelte-simple-datatables`} />
</div>

<h2>Example</h2>
<section>
	LoL
</section>

<style>
	aside{display:flex;justify-content:start;margin-top:32px;}
	h1 {font-size:32px;line-height:32px; text-align: left; font-weight:400; margin: 0; }
	img {width: 88px;max-width: 400px;margin: 0 16px 0 0;}
	p {margin:0;color:#676778;padding:0;line-height:32px;font-size:16px;}
	div img{width:96px;}
	h2{font-size:24px;color:#676778;font-weight:400;margin:24px 0 8px 0;}
	/* 40b3ff     ff3e00    676778*/
	div.code{background:var(--hljs);border-radius:8px;padding:4px;max-width:440px;}
</style>