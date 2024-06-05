const internal = {
    properties: ['events', 'rawRows', 'sorting', 'filters', 'selectScope', 'selectBy'],
    types: ['Sorting'],
    methods: [],
}

export const load = async ({ params }) => {

    const mode = params.mode
    const response = await fetch(`BASE_URL/${mode}/nav.json`)
    const { properties, methods, types } =  await response.json()
    return {
        nav: {
            properties: properties.filter((item: string) => internal.properties.includes(item) === false).sort(),
            methods   : methods.filter((item: string) => internal.methods.includes(item) === false).sort(),
            types     : types.filter((item: string) => internal.types.includes(item) === false).sort()
        }
    }
}