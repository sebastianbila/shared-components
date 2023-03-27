import React, {
  createContext,
  type FC,
  type PropsWithChildren,
  useContext
} from 'react'
import { type RowData, type TableColumn } from './types'

export interface TableContextData {
  columns: TableColumn[]
  data?: RowData[]
  enableSorting?: boolean
}

const TableContext = createContext<TableContextData>({ columns: [] })

type TableContextProviderProps = PropsWithChildren<TableContextData>

export const TableContextProvider: FC<any> = ({
  children,
  ...props
}: TableContextProviderProps) => {
  return (
    <TableContext.Provider value={props as TableContextData}>
      {children}
    </TableContext.Provider>
  )
}

export const useTableContext = (): TableContextData =>
  useContext<TableContextData>(TableContext)
