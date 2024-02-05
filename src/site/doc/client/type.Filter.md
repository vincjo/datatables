```ts
type Filter<Row> = {
    callback: (row: Row) => Row[keyof Row]
    identifier: string
    value?: string | number | boolean | symbol | Criterion[]
    comparator?: Comparator<Row>
}
```

not exposed - internal type
