import {
  type SortByArray,
  type SortByItem,
  SORTING_ORDER,
  type SortingFnReturnType
} from './types'
import { type Dictionary } from '@/types'
import { getNestedAttribute } from '@/utils/common'

class SortingEngine {
  public performMultiSorting(
    data: Dictionary[],
    sortBy: SortByArray
  ): Dictionary[] {
    const sortingFn = (a, b): any => {
      let result = 0

      for (let i = 0; i < sortBy.length; i++) {
        result = this.getSortingFunction(a, b, sortBy[i])
      }

      return result
    }

    return structuredClone(data).sort(sortingFn)
  }

  public performSorting(data: Dictionary[], sortBy: SortByItem): Dictionary[] {
    return this.performMultiSorting(data, [sortBy])
  }

  private getSortingFunction(
    a: Dictionary,
    b: Dictionary,
    { key, order, sortingFn, sortBy }: SortByItem
  ): SortingFnReturnType {
    if (!order || order === SORTING_ORDER.DEFAULT) return 0

    if (sortingFn !== undefined) {
      return sortingFn(a, b)
    }

    let aAttr = a[key]
    let bAttr = b[key]

    if (sortBy) {
      aAttr = getNestedAttribute(a, sortBy).value
      bAttr = getNestedAttribute(b, sortBy).value
    }

    const sortingOrder = order === SORTING_ORDER.ASC ? 1 : -1

    if (aAttr < bAttr) {
      return (-1 * sortingOrder) as SortingFnReturnType
    } else if (aAttr > bAttr) {
      return (1 * sortingOrder) as SortingFnReturnType
    }
  }
}

export default SortingEngine
