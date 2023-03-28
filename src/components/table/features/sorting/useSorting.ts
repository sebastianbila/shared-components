import { useCallback, useEffect } from 'react'
import { type LocalUseSortingOptions, type UseSortingReturnType } from './types'
import { type RowsData, type TableColumn } from '@/components/table'
import useModState from './state'

function useSorting(
  originalData: RowsData = [],
  options: LocalUseSortingOptions
): UseSortingReturnType {
  const { columnsMap, enableMultiSorting = false } = options

  const {
    data,
    appliedSorting,
    setState,
    performOneColumnSorting,
    performMultiSorting,
    clearAppliedSorting
  } = useModState()

  useEffect(() => {
    setState({
      data: originalData,
      originalData,
      columnsMap
    })
  }, [originalData])

  const handleSorting = useCallback(
    (accessor: string, column: TableColumn): void => {
      if (enableMultiSorting) {
        performMultiSorting(accessor, column)
        return
      }

      performOneColumnSorting(accessor, column)
    },
    []
  )

  const resetSorting = useCallback(() => {
    clearAppliedSorting()
    setState({
      data: originalData
    })
  }, [])

  return {
    sortedData: data,
    appliedSorting,
    handleSorting,
    resetSorting
  }
}

export default useSorting
