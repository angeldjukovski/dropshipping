import { Sort } from '../types/sort.enum';

export interface Filter {
    page?: number;
    limit?: number;
    sort?: Sort;
    discount?: boolean;
}