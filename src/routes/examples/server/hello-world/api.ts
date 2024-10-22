import type { State } from '$lib/src/server'

type Row = { id: string, name: string, email: string, body: string }

export const reload = async (state: State): Promise<Row[]> => {
    const response = await fetch(
        `https://jsonplaceholder.typicode.com/comments?${getParams(state)}`
    )
    return response.json()
}

const getParams = ({ currentPage, rowsPerPage, sort }: State<Row>) => {

    let params = `_page=${currentPage}`

    if (rowsPerPage) {
        params += `&_limit=${rowsPerPage}`
    }
    if (sort) {
        params += `&_sort=${sort.field}&_order=${sort.direction}`
    }

    return params
}
