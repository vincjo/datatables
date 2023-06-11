import type { State } from '$lib/remote'

export const reload = async ({ offset, rowsPerPage, setTotalRows }: State) => {
    const response = await fetch(
        `https://dummyjson.com/users?limit=${rowsPerPage}&skip=${offset}`
    )
    const json = await response.json()
    setTotalRows(json.total)
    return json.users
}















