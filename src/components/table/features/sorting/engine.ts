import { type RowsData } from '@/components'
import { type SortBy, SORTING_ORDER } from '@/components/table/features'

class SortingEngine {
  performMultiSorting(data: RowsData, sortBy: SortBy): RowsData {
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

  performSorting(data: RowsData, key: string, order: SORTING_ORDER): RowsData {
    const sortByItem = {
      key,
      order
    }
    return this.performMultiSorting(data, [sortByItem])
  }
}

export default SortingEngine
