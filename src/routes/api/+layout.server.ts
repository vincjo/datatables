import Parser from './Parser'

export const load = async () => {

    const parser = new Parser()
    const methods = await parser.methods(`./src/lib/client/DataHandler.ts`)
    const types = await parser.types(`./src/lib/client/index.ts`)

    return {
        parser: { types, methods }
    }
}
