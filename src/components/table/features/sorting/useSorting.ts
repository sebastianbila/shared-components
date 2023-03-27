import { useCallback, useEffect } from 'react'
import { type UseSortingOptions, type UseSortingReturnType } from './types'
import { type RowsData } from '@/components/table'
import useModState from './state'

function useSorting(
  originalData: RowsData = [],
  options: UseSortingOptions = {}
): UseSortingReturnType {
  const { enableMultiSorting = false } = options

  const {
    data,
    appliedSorting,
    setState,
    makeSorting,
    makeMultiSorting,
    clearAppliedSorting
  } = useModState()

  useEffect(() => {
    setState({
      originalData,
      data: originalData
    })
  }, [originalData])

  const handleSorting = useCallback(
    (accessor: string): void => {
      if (enableMultiSorting) {
        makeMultiSorting(accessor)
        return
      }

      makeSorting(accessor)
    },
    [makeSorting, makeMultiSorting]
  )

  return {
    sortedData: data,
    appliedSorting,
    handleSorting,
    clearSorting: clearAppliedSorting
  }
}

export default useSorting
