import React, { type FC, useState } from 'react'
import { type TableColumn, TableColumnType } from '../types'
import { type TableContextData, TableContextProvider } from '../context'
import { mock } from '../mock'
import TableHeader from '../TableHeader'
import TableBody from '../TableBody'
import { useTable } from '../hooks'

const columns: TableColumn[] = [
  {
    type: TableColumnType.TEXT,
    accessor: 'name',
    title: 'Full name'
  },
  {
    type: TableColumnType.TEXT,
    accessor: 'age',
    title: 'age'
  },
  {
    type: TableColumnType.TEXT,
    accessor: 'score',
    title: 'score',
    valueExtractor: (row) => row.score.number,
    sortBy: 'score.number'
  }
]

interface TableProps extends TableContextData {}

const Table: FC<TableProps> = () => {
  const [searchValue, setSearchValue] = useState('')

  const {
    columns: tableColumns,
    handleSorting,
    resetSorting,
    appliedSorting,
    data
  } = useTable({
    columns,
    data: mock,

    enableSorting: true,
    enableMultiSorting: true,
    enableSearch: true,

    searchFor: searchValue
  })

  return (
    <TableContextProvider columns={tableColumns} data={data}>
      <div onClick={resetSorting}>Clear Sorting</div>

      <input
        type="text"
        value={searchValue}
        onChange={(e: any) => {
          setSearchValue(e.target.value)
        }}
      />

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
