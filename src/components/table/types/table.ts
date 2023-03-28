import {
  type CustomTableColumn,
  type SelectTableColumn,
  type TextTableColumn
} from './columns'
import { type Dictionary } from '@/types'
import { type SortingFn } from '@/components/table/features'

export type RowData = Dictionary
export type RowsData = RowData[]

export interface BaseTableColumn {
  accessor: string
  title?: string
  valueExtractor?: (row: RowData) => string

  sortBy?: string
  sortingFn?: SortingFn
}

export type TableColumn =
  | CustomTableColumn
  | TextTableColumn
  | SelectTableColumn

export type TableColumnMap = Map<string, TableColumn>
