import * as fs from 'fs'

export const load = async () => {

    const response = await fetch('https://jsonplaceholder.typicode.com/comments?_page=1&_limit=10')

    return {
        dataset: await response.json(),
    }
}
