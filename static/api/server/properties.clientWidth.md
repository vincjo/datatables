
Default to 1000, set when `<Datatable/>` component is mounted, .

Represent the dynamic width of the table element.

<br>

## Usage

If you are using `<Datatable/>`, you can access this prop without setting it.

```svelte
<div class:small={table.clientWidth < 600}>
    [...]
</div>
```

## Setting

If you are NOT using `<Datatable/>`

```svelte
<article bind:clientWidth={table.clientWidth}>
    <table>
        <thead>[...]</thead>
        <tbody>[...]</tbody>
    </table>
</article>
```