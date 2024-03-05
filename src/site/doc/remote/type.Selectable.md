```ts
type Selectable<Row> = Row[keyof Row] | Row
```

## Replaced by: 

```ts
Row[keyof Row] | Row
```