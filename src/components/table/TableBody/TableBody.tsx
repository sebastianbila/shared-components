import React, { type FC, useCallback } from 'react'
import { useTableContext } from '../context'
import { type RowData, type TableColumn } from '../types'

const TableBody: FC = () => {
  const { columns, data } = useTableContext()

  const renderCells = useCallback(
    (row: RowData) =>
      columns.map((column: TableColumn, idx) => {
        const value = row[column.accessor]

        return <td key={idx}>{String(value)}</td>
      }),
    []
  )

  const renderRow = useCallback((row: RowData, idx) => {
    const logic = '...'
    return <tr key={idx}>{renderCells(row)}</tr>
  }, [])

  return <tbody>{data?.map(renderRow)}</tbody>
}

export default TableBody
