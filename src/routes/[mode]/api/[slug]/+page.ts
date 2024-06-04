

export const load = async ({ params, data }) => {
    if (data.page) {
        return { page: data.page }
    }
    const mode = params.mode
    const [key, name] = params.slug.split('~')

    return {
        page: await getFromVPS(mode, key, name)
    }

}

const getFromVPS = async (mode: string, key: string, name: string) => {
    const response = await fetch(`https://vincjo.fr/datatables.runes/doc/${mode}/${key}.${name}.json`)
    return await response.json()
}