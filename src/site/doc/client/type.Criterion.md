```ts
type Criterion = { 
    value: string | number | [min: number, max: number], 
    comparator: Comparator<Row> 
}
```

Criterion is part of multiple-criteria filters called with `createAdvancedFilter()` method.

## Example

```ts
import { check } from '@vincjo/datatables'
const criterion = { value: 'High priority', comparator: check.isEqualTo }
```