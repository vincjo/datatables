import type { State, Order, Row } from '$lib/remote'


export const reload = async (state: State) => {
    const qs = getParams(state)
    const response = await fetch(
        `https://jsonplaceholder.typicode.com/comments?${qs}`
    )
    return response.json()
}

const getParams = ({ pageNumber, rowsPerPage, sorted }: State) => {

    let params = `_page=${pageNumber}`

    if (rowsPerPage) {
        params += `&_limit=${rowsPerPage}`
    }
    if (sorted) {
        const value = sorted as Order<Row>
        params += `&_sort=${value.orderBy}&_order=${value.direction}`
    }

    return params
}
