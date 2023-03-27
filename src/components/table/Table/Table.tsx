import React, { type FC } from 'react'
import { type TableColumn, TableColumnType } from '../types'
import { type TableContextData, TableContextProvider } from '../context'
import { mock } from '../mock'
import TableHeader from '../TableHeader'
import TableBody from '../TableBody'
import { useTable } from '../hooks'

const columns: TableColumn[] = [
  {
    type: TableColumnType.TEXT,
    accessor: 'fullName',
    title: 'Full name'
  },
  {
    type: TableColumnType.TEXT,
    accessor: 'email',
    title: 'email'
  },
  {
    type: TableColumnType.TEXT,
    accessor: 'address',
    title: 'Address'
  }
]

interface TableProps extends TableContextData {}

const Table: FC<TableProps> = () => {
  const {
    columns: tableColumns,
    handleSorting,
    clearSorting,
    appliedSorting,
    data
  } = useTable({
    columns,
    data: mock,
    enableSorting: true
  })

  return (
    <TableContextProvider columns={tableColumns} data={data}>
      <div onClick={clearSorting}>Clear</div>
      <table style={{ borderCollapse: 'collapse' }}>
        <TableHeader
          onSorting={handleSorting}
          appliedSorting={appliedSorting}
        />
        <TableBody />
      </table>
    </TableContextProvider>
  )
}

export default Table
