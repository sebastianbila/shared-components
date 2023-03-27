import React, { type FC, useCallback } from 'react'
import { type TableColumn } from '@/components/table/types'
import { useTableContext } from '@/components/table/context'
import noop from 'lodash.noop'
import { type AppliedSorting } from '@/components/table/features/sorting'

interface TableHeaderProps {
  onSorting?: (accessor: string, column: TableColumn) => void
  appliedSorting: AppliedSorting
}

const TableHeader: FC<TableHeaderProps> = ({
  onSorting = noop,
  appliedSorting
}: TableHeaderProps) => {
  const { columns } = useTableContext()

  const handleSorting = useCallback(
    (column: TableColumn) => () => {
      onSorting?.(column.accessor, column)
    },
    [onSorting]
  )

  const renderColumns = useCallback(
    () =>
      columns.map((column: TableColumn) => (
        <th key={column.accessor} onClick={handleSorting(column)}>
          {column.title}
          &nbsp;({appliedSorting.get(column.accessor)})&nbsp;
        </th>
      )),
    [columns, appliedSorting, handleSorting]
  )

  return (
    <thead>
      <tr>{renderColumns()}</tr>
    </thead>
  )
}

export default TableHeader
