import type { State } from '$lib/remote'

export const reload = async (state: State) => {
    const response = await fetch(
        `https://dummyjson.com/users${getParams(state)}`
    )
    const json = await response.json()
    state.setTotalRows(json.total)
    return json.users
}


const getParams = ({ offset, rowsPerPage, search }: State) => {
    const page = `limit=${rowsPerPage}&skip=${offset}`

    if (search) {
        return `/search?q=${search}&${page}`
    }
    return `?${page}`
}












