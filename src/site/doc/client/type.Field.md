```ts
type Field<Row> = keyof Row | ((row: Row) => Row[keyof Row])
```

Either an object key (column name) or a callback that takes a row as input and returns a value.

## Example

```ts
// keyof Row: 
'first_name'

// expression:
(row) => row.first_name + row.last_name

// nested props
(row) => row.user.login_count.value
```