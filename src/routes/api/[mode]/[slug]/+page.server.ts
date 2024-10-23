

export const load = async ({ params }) => {

    const mode = params.mode
    const [key, name] = params.slug.split('~')

    const response = await fetch(`BASE_URL/${mode}/${key}.${name}.json`)
    if (response.status !== 200) {
        return { page: {} }
    }
    const text = await response.text()
    const patched = text
        .replace(/check\?: any/g, 'check?: Check')
        .replace('{ sort: Sort; } | undefined): any[]', `{ sort: [key: 'value' | 'count', direction: 'asc' | 'desc']}: { value: unknown, count: number}[]`)
        .replace(/T\[any\]/g, 'T[keyof T]')
        .replace('(entry: Row[keyof Row], value: any)', '(entry: unknown, value: unknown)')
    return {
        page: JSON.parse(patched)
    }
}