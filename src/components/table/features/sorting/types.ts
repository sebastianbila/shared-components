import {
  type RowData,
  type TableColumn,
  type TableColumnMap
} from '@/components/table'
import { type Dictionary } from '@/types'

export interface UseSortingOptions {
  enableMultiSorting?: boolean
}

export interface LocalUseSortingOptions extends UseSortingOptions {
  columnsMap: TableColumnMap
}

export enum SORTING_ORDER {
  ASC = 'asc',
  DESC = 'desc',
  DEFAULT = 'default'
}

export type SortingFnReturnType = -1 | 0 | 1
export type SortingFn = (a: Dictionary, b: Dictionary) => SortingFnReturnType
export type AppliedSorting = Map<string, SORTING_ORDER>
export type HandleSortingFn = (accessor: string, column: TableColumn) => void

export interface SortByItem {
  key: string
  order: SORTING_ORDER
  sortBy?: string
  sortingFn?: SortingFn
}

export type SortByArray = SortByItem[]

export interface UseSortingReturnType {
  sortedData: RowData
  appliedSorting: AppliedSorting
  handleSorting: HandleSortingFn
  resetSorting: () => void
}
