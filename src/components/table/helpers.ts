import {
  type AppliedSorting,
  type SortByArray
} from '@/components/table/features'
import { type TableColumn, type TableColumnsMap } from '@/components'

export function mapAppliedSortingMapToArray(
  appliedSorting: AppliedSorting,
  columnsMap: TableColumnsMap
): SortByArray {
  const sortingObject = Object.fromEntries(appliedSorting)

  return Object.keys(sortingObject).map((accessor: string) => {
    const column = columnsMap.get(accessor)

    return {
      key: accessor,
      order: sortingObject[accessor].order,
      sortBy: column?.sortBy,
      sortingFn: column?.sortingFn
    }
  })
}

export function mapTableColumnsArrayToMap(
  columns: TableColumn[]
): TableColumnsMap {
  const map = new Map<string, TableColumn>()

  columns.forEach((column: TableColumn) => {
    map.set(column.accessor, column)
  })

  return map
}
