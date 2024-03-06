export interface Column {
    field: string;
    header: string;
    filterable?: boolean;
    sortable?: boolean;
    identifier?: string;
    align?: 'left' | 'right' | 'center';
    rowSpan?: number;
}

export interface Cell {
    field: string;
    value: string;
}