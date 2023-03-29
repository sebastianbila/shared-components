import {
  type RowsData,
  type TableColumn,
  type TableColumnsMap,
  type TableState
} from '@/components/table'
import { type Dictionary } from '@/types'

export interface SortingFeatureOptions {
  enableMultiSorting?: boolean
}

export type HandleSortingFn = (accessor: string, column: TableColumn) => void
export type AppliedSorting = Map<string, SortByItem>

export interface SortingReturnType {
  appliedSorting: AppliedSorting
  handleSorting: HandleSortingFn
  resetSorting: () => void
}

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

export interface SortingState {
  readonly originalData: RowsData
  data: RowsData
  appliedSorting: AppliedSorting
}

export interface SortingOptions {
  state: TableState
  columnsMap: TableColumnsMap
  enableMultiSorting?: boolean
  onStateChange: (state: SortingState) => void
}
