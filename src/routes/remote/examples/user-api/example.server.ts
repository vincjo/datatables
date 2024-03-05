


export const load = async () => {
    const response = await fetch(
        'https://dummyjson.com/users?limit=10&skip=0'
    )
    return {
        data: response.json(),
    }
}











