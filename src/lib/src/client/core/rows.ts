import type { Field } from '$lib/src/client'
import { type Search, type Filter, type Query } from '$lib/src/client/core'

import { match, sift, deepEmphasize }   from './entry'
import { isNull }                       from './value'
import { parse }                        from './field'


export const data = {
    search: <Row>(allRows: $state.Snapshot<Row[]>, { scope, isRecursive, value, check }: Search<Row>, highlight: boolean = false) => {
        return allRows.filter(row => {
            const keys = scope ?? Object.keys(row) as Field<Row>[]
            const fields = keys.map(field => parse(field))
            for(const { key, callback } of fields) {
                if (key) {
                    row[key] = sift(row[key], value, {
                        highlight: highlight,
                        isRecursive: isRecursive === true
                    })
                }
                else if (highlight) {
                    row = deepEmphasize(row, value, callback)
                }
            }
            return fields.some(({ callback }) => {
                return match(callback(row), value, { check })
            })
        })
    },
    filter: <Row>(allRows: $state.Snapshot<Row[]>, { callback, value, check, key }: Filter<Row>,  highlight: boolean = false) => {
        return allRows.filter((row) => {
            const checked = match(callback(row), value, { check })
            if (key) {
                row[key] = sift(row[key], value, {
                    highlight: highlight, 
                    check: check,
                    isRecursive: true
                })
            }
            else if (highlight && checked && value && typeof value === 'string') {
                row = deepEmphasize(row, value, callback)
            }
            return checked
        })
    },
    query: <Row>(allRows: $state.Snapshot<Row[]>, { path, value, check }: Query<Row>) => {
        return allRows.filter(row => {
            if (path.length === 0) {
                return check(row, value)
            }
            let obj = row
            let i = 1
            let verify = false
            function recursive(i) {

            }
            // ['groups', 'users']
            // row[groups].map(group => group.users.map(user) => {

            // })

            // row.groups.filter(group => group.users.filter(user => ))
            for (const prop of path) {
                if (i === 1 && i < path.length) {
                    obj = obj[prop]
                    for (const subobj of obj[prop]) {

                    }
                }
                if (i === path.length) {
                    console.log(prop, obj)
                    obj[prop] = data.query(obj[prop], { path: [], value, check } as Query<Row>)
                    if (obj[prop].length > 0) {
                        verify = true
                    }
                }
                obj = obj[prop]
                i++
            }
            return verify
        })
        // return allRows.map(row => {
        //     let obj = row
        //     const [root, ...props] = path
        //     let i = 1
        //     for (const prop of path) {
        //         if (obj[prop]) {
        //             if (obj[root]) {
        //                 obj[root] = data.query(obj[root], { path, value, check } as Query<Row>) 
        //             }
        //             if (i < props.length) {
        //                 obj[prop] = data.query(obj[prop], { path, value, check } as Query<Row>)
        //             }
        //             else {
        //                 obj[prop] = obj[prop].filter((item: any) => check(item))
        //             }
        //         }
        //         i++
        //     }
        //     return row
        // }).filter(Boolean)
    }
}

export const sort = {
    asc: (a: unknown, b: unknown, locales?: Intl.LocalesArgument, options?: Intl.CollatorOptions) => {
        if (a === b)                        return 0
        else if (isNull(a))                 return 1
        else if (isNull(b))                 return -1
        else if (typeof a === 'boolean')    return a === false ? 1 : -1
        else if (typeof a === 'string')     return a.localeCompare(b as string, locales, options)
        else if (typeof a === 'number')     return a - (b as number)
        else if (typeof a === 'object')     return JSON.stringify(a).localeCompare(JSON.stringify(b), locales, options)
        return String(a).localeCompare(String(b), locales, options)
    },
    desc: (a: unknown, b: unknown, locales?: Intl.LocalesArgument, options?: Intl.CollatorOptions) => {
        if (a === b)                        return 0
        else if (isNull(a))                 return 1
        else if (isNull(b))                 return -1
        else if (typeof b === 'boolean')    return b === false ? 1 : -1
        else if (typeof b === 'string')     return b.localeCompare(a as string, locales, options)
        else if (typeof b === 'number')     return b - (a as number)
        else if (typeof b === 'object')     return JSON.stringify(b).localeCompare(JSON.stringify(a), locales, options)
        else return String(b).localeCompare(String(a), locales, options)
    }
}