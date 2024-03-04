export interface ColumnProps {
    field: string;
    header: string;
    sortable?: boolean;
    identifier?: string;
    align?: 'left' | 'right' | 'center';
    rowSpan?: number;
}