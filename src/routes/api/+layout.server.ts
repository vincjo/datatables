import Parser from './Parser'

export const load = async () => {

    const parser = new Parser()
    const methods = await parser.methods(`./src/lib/local/DataHandler.ts`)
    const types = await parser.types(`./src/lib/local/index.ts`)

    return {
        parser: { types, methods }
    }
}
