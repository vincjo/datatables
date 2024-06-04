Get all filters currently applied to the dataset.


## Usage
```ts
const list = table.filters.map(({ key, comparator, value }) => `${key} ${comparator.name} ${value}`)
```

## Output

- **email** endsWith `@my-site.com`

- **first_name** isEqualTo `John`

- **login_count** isGreaterThanOrEqualTo `2000`
