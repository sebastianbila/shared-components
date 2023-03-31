import {
  type SearchFeature,
  type SearchOptions,
  type SortingFeature,
  type SortingOptions,
  type SortingResult
} from '../features'
import { type RowsData, type TableColumns } from '../types'

export interface BaseTableState {
  readonly originalData?: RowsData
  data?: RowsData
}

export interface TableState extends BaseTableState, Partial<SortingResult> {
  columns: TableColumns
  __initial?: boolean
}

export type TableCoreOptions = {
  onStateChange: (state: TableState) => void
  state: TableState
  columns: TableColumns
  data?: RowsData
} & Partial<SortingOptions> &
  Partial<SearchOptions>

export interface ComposerOptions
  extends Required<Pick<TableCoreOptions, 'state' | 'onStateChange'>> {}

export type TableOptions = Omit<TableCoreOptions, 'state' | 'onStateChange'>

export interface TableFeatures {
  sorting: SortingFeature
  search: SearchFeature
}
