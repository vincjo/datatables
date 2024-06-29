
Apply calculations on specific columns.

## Usage

```ts
table.createCalculation('price').sum()      // sum
table.createCalculation('price').avg()      // average
table.createCalculation('price').distinct() // distinct values
table.createCalculation('price').bound()    // bounds [min, max]
```