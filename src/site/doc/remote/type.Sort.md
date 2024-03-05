```ts
export type Sort<Row> = {
    orderBy: keyof Row
    direction: 'asc' | 'desc'
}
```

Sort applied to the data.


## Example

```ts
sort = {
    orderBy: 'name',
    direction: 'asc'
}
```