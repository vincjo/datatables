
# Migration from SSD v1 to v2

This guide is a work in progress to help you migrate your existing (v1) svelte simple datatables to v2. In order to make the migration process a little easier, v1 is embed in "legacy" namespace so you'll be able to upgrade your components progressively by simply changing imports.

## Install

```bash
npm install @vincjo/datatables@runes
```

## Replacement in all your project

```diff
- @vincjo/datatables
+ @vincjo/datatables/legacy

- @vincjo/datatables/remote
+ @vincjo/datatables/legacy/remote
```

--- 

END

---




