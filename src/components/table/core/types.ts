import {
  type SearchFeatureOptions,
  type SortingFeature,
  type SortingFeatureOptions,
  type SortingReturnType
} from '../features'
import { type RowsData, type TableColumns } from '../types'

export interface TableState extends Partial<SortingReturnType> {
  columns: TableColumns
  originalData?: RowsData
  data?: RowsData
}

export type PrivateTableState = TableState & { __initial: boolean }

export interface TableCoreOptions
  extends SortingFeatureOptions,
    SearchFeatureOptions {
  onStateChange: (state: TableState) => void
  state: TableState

  columns: TableColumns
  data?: RowsData
}

export interface TableOptions
  extends Omit<TableCoreOptions, 'onStateChange' | 'state'> {}

export interface TableFeatures {
  sorting: SortingFeature
  search
}
