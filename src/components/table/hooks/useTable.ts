import { type RowData, type TableColumn } from '../types'
import { useSorting, type UseSortingOptions } from '@/components/table/features'

export interface UseTableOptions extends UseSortingOptions {
  columns: TableColumn[]
  data?: RowData[]
  enableSorting?: boolean
}

function useTable({ columns, data, enableMultiSorting }: UseTableOptions): any {
  const { sortedData, appliedSorting, clearSorting, handleSorting } =
    useSorting(data, { enableMultiSorting })

  return {
    columns,
    data: sortedData,

    appliedSorting,
    handleSorting,
    clearSorting
  }
}

export default useTable
