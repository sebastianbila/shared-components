import { type RowData, type TableColumn } from '../types'
import { useSorting, type UseSortingOptions } from '@/components/table/features'
import { mapTableColumnsArrayToMap } from '@/components/table/helpers'

export interface UseTableOptions extends UseSortingOptions {
  columns: TableColumn[]
  data?: RowData[]

  enableSorting?: boolean
}

function useTable({ columns, data, enableMultiSorting }: UseTableOptions): any {
  const columnsMap = mapTableColumnsArrayToMap(columns)

  const { sortedData, appliedSorting, resetSorting, handleSorting } =
    useSorting(data || [], {
      enableMultiSorting,
      columnsMap
    })

  return {
    columns,
    data: sortedData,

    appliedSorting,
    handleSorting,
    resetSorting
  }
}

export default useTable
