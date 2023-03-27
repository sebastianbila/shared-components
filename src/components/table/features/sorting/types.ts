import { type RowData } from '@/components/table'

export enum SORTING_ORDER {
  ASC = 'asc',
  DESC = 'desc',
  DEFAULT = 'default'
}

export type AppliedSorting = Map<string, SORTING_ORDER>

export type HandleSortingFn = (accessor: string) => void

export interface UseSortingReturnType {
  sortedData: RowData
  appliedSorting: AppliedSorting
  handleSorting: HandleSortingFn
  clearSorting: () => void
}

export type SortBy = Array<{
  key: string
  order: SORTING_ORDER
}>
