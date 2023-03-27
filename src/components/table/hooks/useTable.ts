import { type RowData, type TableColumn } from '../types'
import { useSorting } from '@/components/table/features'

export interface UseTableOptions {
  columns: TableColumn[]
  data?: RowData[]
  enableSorting?: boolean
}

function useTable({ columns, data }: UseTableOptions): any {
  const { sortedData, appliedSorting, clearSorting, handleSorting } =
    useSorting(data || [])

  return {
    columns,
    data: sortedData,

    appliedSorting,
    handleSorting,
    clearSorting
  }
}

export default useTable
