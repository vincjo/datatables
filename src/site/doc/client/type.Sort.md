```ts
export type Sort<Row> = {
    callback?: (row: Row) => Row[keyof Row]
    identifier?: string
    direction?: 'asc' | 'desc'
}
```

Sort applied to the data. This object can be retrieved via the `handler.getSort()` method.


## Example

```ts
type Sort<Row> = {
    callback?: (row: Row) => Row[keyof Row]
    identifier?: string
    direction?: 'asc' | 'desc'
}
```