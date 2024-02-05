```ts
type Comparator<Row> = (entry: Row[keyof Row], value: any) => boolean
```

A callback function that compares data input (entry) with a value.

## Example

```ts
(entry, value) => entry !== value
```