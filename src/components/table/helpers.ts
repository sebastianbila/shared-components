import {
  type AppliedSorting,
  type SortByArray
} from '@/components/table/features'
import { type TableColumn, type TableColumnMap } from '@/components'

export function mapAppliedSortingMapToArray(
  appliedSorting: AppliedSorting,
  columnsMap: TableColumnMap
): SortByArray {
  const sortingObject = Object.fromEntries(appliedSorting)

  return Object.keys(sortingObject).map((accessor: string) => {
    const column = columnsMap.get(accessor)

    return {
      key: accessor,
      order: sortingObject[accessor],
      sortBy: column?.sortBy,
      sortingFn: column?.sortingFn
    }
  })
}

export function mapTableColumnsArrayToMap(
  columns: TableColumn[]
): TableColumnMap {
  const map = new Map<string, TableColumn>()

  columns.forEach((column: TableColumn) => {
    map.set(column.accessor, column)
  })

  return map
}
