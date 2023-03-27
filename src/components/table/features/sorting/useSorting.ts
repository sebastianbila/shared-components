import { useCallback, useEffect, useState } from 'react'
import {
  type AppliedSorting,
  SORTING_ORDER,
  type UseSortingReturnType
} from './types'
import { type RowsData } from '@/components/table'
import { convertAppliedSortingMapToArray } from '@/components/table/features/sorting/helpers'
import { performMultiSorting } from '@/components/table/features/sorting/engine'
import { signal } from '@preact/signals-react'

function useSorting(originalData: RowsData): UseSortingReturnType {
  const [data, setData] = useState<RowsData>([])

  const appliedSorting = signal<AppliedSorting>(new Map())

  useEffect(() => {
    setData(originalData)
  }, [originalData])

  const getNextSortingOrder = useCallback(
    (accessor: string): SORTING_ORDER => {
      const orderMatching = {
        [SORTING_ORDER.ASC]: SORTING_ORDER.DESC,
        [SORTING_ORDER.DESC]: SORTING_ORDER.DEFAULT,
        [SORTING_ORDER.DEFAULT]: SORTING_ORDER.ASC
      }

      const currentColumnOrder =
        appliedSorting.get(accessor) ?? SORTING_ORDER.DEFAULT

      return orderMatching[currentColumnOrder]
    },
    [appliedSorting]
  )

  const updateSortingColumns = useCallback(
    (accessor: string): void => {
      setAppliedSorting((prev) => {
        const order = getNextSortingOrder(accessor)

        // Delete from map if sorting is default
        if (order === SORTING_ORDER.DEFAULT) {
          const cloned = structuredClone(prev)
          cloned.delete(accessor)
          return new Map(cloned)
        }

        return new Map(prev.set(accessor, order))
      })
    },
    [getNextSortingOrder]
  )

  const dynamicSort = useCallback((): any => {
    const sortBy = convertAppliedSortingMapToArray(appliedSorting)

    return performMultiSorting(data, sortBy)
  }, [data, appliedSorting])

  const handleSorting = useCallback(
    (accessor: string): void => {
      updateSortingColumns(accessor)
    },
    [dynamicSort, updateSortingColumns]
  )

  // trigger sorting after appliedSorting was updated
  useEffect(() => {
    // const sortedData = dynamicSort()
    // setData(sortedData)
  }, [appliedSorting, dynamicSort])

  const clearSorting = useCallback(() => {
    setData(originalData)
    setAppliedSorting(new Map())
  }, [])

  console.log('appliedSorting', appliedSorting)

  return {
    sortedData: data,
    appliedSorting,

    handleSorting,
    clearSorting
  }
}

export default useSorting
