import { type RowsData } from '@/components'
import { type SortBy, SORTING_ORDER } from '@/components/table/features'

// function performSorting(
//   data: RowsData,
//   accessor: string,
//   order: SORTING_ORDER
// ): RowsData {
//   const sortOrder = order === SORTING_ORDER.ASC ? 1 : -1
//
//   const sortingFn = (a, b): any => {
//     let result = 0
//
//     if (a[accessor] < b[accessor]) result = -1
//     if (a[accessor] > b[accessor]) result = 1
//
//     return result * sortOrder
//   }
//
//   return structuredClone(data).sort(sortingFn)
// }

function performMultiSorting(data: RowsData, sortBy: SortBy): RowsData {
  const sortingFn = (a, b): any => {
    let result = 0
    for (let i = 0; i < sortBy.length; i++) {
      const { key, order } = sortBy[i]

      const sortOrder = order === SORTING_ORDER.ASC ? 1 : -1

      if (a[key] < b[key]) {
        result = -1 * sortOrder
        break
      } else if (a[key] > b[key]) {
        result = 1 * sortOrder
        break
      }
    }

    return result
  }

  return structuredClone(data).sort(sortingFn)
}

function performSorting(
  data: RowsData,
  key: string,
  order: SORTING_ORDER
): RowsData {
  return performMultiSorting(data, [
    {
      key,
      order
    }
  ])
}

export { performMultiSorting, performSorting }
