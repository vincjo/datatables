Get all filters applied to the dataset.


## Usage
```ts
const filters = handler.getFilters()

const list = filters.map(({ filterBy, check, value }) => `${filterBy} ${check} ${value}`)
```

## Output

- **email** endsWith `@my-site.com`

- **first_name** isEqualTo `John`

- **login_count** isGreaterThanOrEqualTo `2000`
