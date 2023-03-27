import {
  type CustomTableColumn,
  type SelectTableColumn,
  type TextTableColumn
} from './columns'
import { type Dictionary } from '@/types'

export type RowData = Dictionary
export type RowsData = RowData[]

export interface BaseTableColumn {
  accessor: string
  title?: string
  valueExtractor?: (row: RowData) => string
}

export type TableColumn =
  | CustomTableColumn
  | TextTableColumn
  | SelectTableColumn
