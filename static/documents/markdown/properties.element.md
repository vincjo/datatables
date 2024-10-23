

HTMLElement reference for the table container.

Default to *undefined*, set when `<Datatable/>` component is mounted.

Useful to handle column visibility and frozen columns.

<br>

## Usage

If you are using `<Datatable/>`, you can access this prop without setting it.

<br>

## Setting

If you don't use `<Datatable/>`

```svelte
<article bind:this={table.element}>
    <table>
        <thead>[...]</thead>
        <tbody>[...]</tbody>
    </table>
</article>
```