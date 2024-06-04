
export const load = async ({ params, data }) => {
    const mode = params.mode
    const { properties, methods, types } = data.nav ?? await getFromVPS(mode)
    return {
        nav: {
            properties: properties.filter((item: string) => data.internal.properties.includes(item) === false).sort(),
            methods   : methods.filter((item: string) => data.internal.methods.includes(item) === false).sort(),
            types     : types.filter((item: string) => data.internal.types.includes(item) === false).sort()
        },
        error: data.nav?.error
    }
}


const getFromVPS = async (mode: string) => {
    const response = await fetch(`https://vincjo.fr/datatables.runes/doc/${mode}/nav.json`)
    return await response.json()
}