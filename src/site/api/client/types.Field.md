

Either an object key (column name) or a function that takes a row as input and returns a value.

## Example

```ts
// keyof Row: 
'first_name'

// expression:
(row) => row.first_name + row.last_name

// nested prop
(row) => row.user.login_count.value
```