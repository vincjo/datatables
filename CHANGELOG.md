# 2.0.0-runes.32 - 2024-08-XX

<!-- ### Added -->
<!-- ### Changed -->
### Fixed
- lib export


# 2.0.0-runes.31 - 2024-07-25

<!-- ### Added -->
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

<!-- ### Added -->

### Changed
- client-side *(breaking)*:  sort params for distinct values is now an object `{ field: 'value' | 'count', direction: 'asc' | 'desc' }` instead of an array
- client-side: use crypto UUID instead of js random string
- client-side: improve types
<!-- ### Fixed -->

# 2.0.0-runes.27 - 2024-06-29

### Added
- client-side: regular expression search takes scope parameter into account

# 2.0.0-runes.26 - 2024-06-27

### Added
- server-side: added a `table.isLoading` state which is true while `invalidate()` method runs

# 2.0.0-runes.25 - 2024-06-26

### Fixed
- server-side: column filtering
