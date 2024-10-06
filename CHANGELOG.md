# 2.0.0-runes.39 - 2024-10-06
### Added
- added `TableHandlerInterface` to improve shared components type.
### Changed
- update dependencies: svelte-next.262
- breaking: `table.createCalcultaion().distinct()` parameter is now: `distinct({ sort: [field, direction] })` 

### Fixed
- remove dupplicate builder: `ColumnViewBuilders`
- remove dupplicate type definition: `Row`, `ColumnView`, `Internationalization`, `Field`
- use generic `T` type in `AbstractTableHandler` instead of `Row` (server-side pagination).
- distinct values has a default order in addition to sort param
- fix `$$Generic<Row>` type for server-side pagination
- fix `isAllSelected` when `selectScope` = 'all'





# 2.0.0-runes.38 - 2024-10-04
### Fixed
- CSS import in `<Datatable>` component.

# 2.0.0-runes.37 - 2024-09-29

### Added
- feat: make selectBy parameter type of `Field<Row>` so it can combine multiple fields or use a nested property as identifier
- docs: added a [migration guide](https://github.com/vincjo/datatables/blob/runes/MIGRATION.md)
### Changed
- update dependencies: svelte-next.260
### Fixed
- added type="button" in `<Pagination>` and `<RowCount/>` components, including the legacy part.

# 2.0.0-runes.36 - 2024-09-16

### Added
- feat: add headless option for Datatable component
- feat: use @import instead of :global() in Datatable component
### Changed
- update dependencies: svelte-next.257

# 2.0.0-runes.32 - 2024-09-16

### Changed
- update dependencies: svelte-next.246


# 2.0.0-runes.31 - 2024-07-25

### Changed
- rename type `ViewColumn` to `ColumnView`
### Fixed
- improve types
- fix criterion value type

# 2.0.0-runes.30 - 2024-07-01

### Fixed
- client-side: refactor / improve types

# 2.0.0-runes.29 - 2024-06-30

### Fixed
- client-side: untrack sort and event dispatcher when rows are updated.


# 2.0.0-runes.28 - 2024-06-30

### Changed
- client-side *(breaking)*:  sort params for distinct values is now an object `{ field: 'value' | 'count', direction: 'asc' | 'desc' }` instead of an array
- client-side: use crypto UUID instead of js random string
- client-side: improve types

# 2.0.0-runes.27 - 2024-06-29

### Added
- client-side: regular expression search takes scope parameter into account

# 2.0.0-runes.26 - 2024-06-27

### Added
- server-side: added a `table.isLoading` state which is true while `invalidate()` method runs

# 2.0.0-runes.25 - 2024-06-26

### Fixed
- server-side: column filtering
