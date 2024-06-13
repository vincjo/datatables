import { match, isNotNull } from '$lib/src/client/utils'
import type { Row } from '$lib/src/client'

export default class RecordFilterHelper
{
    private rawRecords  = $state.frozen<Row[]>([])
    public  value       = $state<string>('')
    public  records     = $derived<readonly Row[]>(this.createRecords())
    private search      = $state<string>('')

    constructor(records: Row[])
    {
        this.rawRecords = records
    }

    public set()
    {
        this.search = this.value
    }

    private createRecords(): readonly Row[]
    {
        if (isNotNull(this.value)) {
            return this.rawRecords.filter(record => match(record, this.search))
        }
        return this.rawRecords
    }
}