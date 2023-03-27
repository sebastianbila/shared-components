import type { BaseTableColumn } from './table'

export enum TableColumnType {
  TEXT = 'text',
  LINK = 'text',
  SELECT = 'SELECT',
  CUSTOM = 'custom'
}

export interface ColumnTypeDef extends BaseTableColumn {
  type: TableColumnType
}

export interface CustomTableColumn extends ColumnTypeDef {
  type: TableColumnType.CUSTOM
}

export interface TextTableColumn extends ColumnTypeDef {
  type: TableColumnType.TEXT
}

export interface SelectTableColumn extends ColumnTypeDef {
  type: TableColumnType.SELECT
}
