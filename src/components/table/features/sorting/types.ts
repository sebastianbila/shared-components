import {
  type BaseTableState,
  type TableColumn,
  type TableColumnsMap,
  type TableState
} from '@/components/table'
import { type Dictionary } from '@/types'

export type HandleSortingFn = (accessor: string, column: TableColumn) => void
export type AppliedSorting = Map<string, SortByItem>

export enum SORTING_ORDER {
  ASC = 'asc',
  DESC = 'desc',
  DEFAULT = 'default'
}

export interface SortByItem {
  key: string
  order: SORTING_ORDER
  sortBy?: string
  sortingFn?: SortingFn
}

export type SortByArray = SortByItem[]
export type SortingFnReturnType = -1 | 0 | 1
export type SortingFn = (a: Dictionary, b: Dictionary) => SortingFnReturnType

export interface PrivateSortingState extends Required<BaseTableState> {
  appliedSorting: AppliedSorting
}

export interface SortingOptions {
  enableSorting: boolean
  enableMultiSorting: boolean
}

export interface PrivateSortingOptions extends Partial<SortingOptions> {
  state: TableState
  columnsMap: TableColumnsMap
  onStateChange: (state: PrivateSortingState) => void
}

export interface SortingResult {
  appliedSorting: AppliedSorting
  handleSorting: HandleSortingFn
  resetSorting: () => void
}
