import { match, isNotNull } from '$lib/src/client/utils'
import type { Row }         from '$lib/src/client'

export default class RecordFilterHelper
{
    public  value       = $state<string>('')
    public  records     = $derived<readonly Row[]>(this.createRecords())
    private rawRecords  = $state.raw<Row[]>([])
    private filter      = $state<string>('')

    constructor(records: Row[])
    {
        this.rawRecords = records
    }

    public set()
    {
        this.filter = this.value
    }

    private createRecords(): readonly Row[]
    {
        if (isNotNull(this.filter)) {
            return this.rawRecords.filter(record => match(record, this.filter))
        }
        return this.rawRecords
    }
}