

Either an object key (column name) or a function that takes a row as input and returns a value.

Note that if you run `TableHandler` in *server-side pagination* mode, the type `Field` can only be an object key.

## Example

```ts
// keyof Row: 
'first_name'

// expression:
(row) => row.first_name + row.last_name

// nested prop
(row) => row.user.login_count.value
```