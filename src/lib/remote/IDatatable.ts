import type { Comparator, Field } from "$lib/local";

export interface Column {
    field: string;
    header: string;
    filterable?: boolean;
    sortable?: boolean;
    identifier?: string;
    align?: 'left' | 'right' | 'center';
    rowSpan?: number;
    filterBy?: Field<any>;
    comparator?: Comparator<any>;
}

export interface Cell {
    field: string;
    value: string;
}