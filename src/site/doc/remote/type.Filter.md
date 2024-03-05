```ts
type Filter<Row> = {
    filterBy: keyof Row
    value?: string | number | boolean
}
```


Filter applied to the data.


## Example

```ts
filter = { 
    filterBy: 'name', 
    value: 'john' 
}
```