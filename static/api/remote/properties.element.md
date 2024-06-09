

HTMLElement reference for the table container.

Default to *undefined*, set when <Datatable/> component is mounted.

Useful to handle column visibility.

<br>

## Usage

If you are using `<Datatable/>`, you can access this prop without setting it.

See `createView` method for more info.

<br>

## Setting

If you are NOT using `<Datatable/>`

```svelte
<article bind:this={table.element}>
    <table>
        <thead>[...]</thead>
        <tbody>[...]</tbody>
    </table>
</article>
```