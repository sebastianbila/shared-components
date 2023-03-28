import { create } from 'zustand'
import {
  type RowsData,
  type TableColumn,
  type TableColumnMap
} from '@/components'
import { type AppliedSorting, SORTING_ORDER } from './types'
import { mapAppliedSortingMapToArray } from '@/components/table/helpers'
import SortingEngine from './engine'

interface UseSortingState {
  data: RowsData
  columnsMap: TableColumnMap
  originalData: RowsData
  setState: (state: any) => void
  appliedSorting: AppliedSorting
  clearAppliedSorting: () => void
  performOneColumnSorting: (accessor: string, column: TableColumn) => RowsData
  performMultiSorting: (accessor: string, column: TableColumn) => RowsData
}

const useModState = create<UseSortingState>()((set, get) => {
  const sortingEngine = new SortingEngine()

  const getNextSortingOrder = (accessor: string): SORTING_ORDER => {
    const { appliedSorting } = get()
    const orderMatching = {
      [SORTING_ORDER.ASC]: SORTING_ORDER.DESC,
      [SORTING_ORDER.DESC]: SORTING_ORDER.DEFAULT,
      [SORTING_ORDER.DEFAULT]: SORTING_ORDER.ASC
    }

    const currentColumnOrder =
      appliedSorting.get(accessor) ?? SORTING_ORDER.DEFAULT

    return orderMatching[currentColumnOrder]
  }

  const updateAppliedSorting = (accessor: string): void => {
    const { appliedSorting } = get()

    const order = getNextSortingOrder(accessor)
    const map: AppliedSorting = structuredClone(appliedSorting)

    // Delete from map if sorting is default
    if (order === SORTING_ORDER.DEFAULT) {
      map.delete(accessor)
    } else {
      map.set(accessor, order)
    }

    set({ appliedSorting: map })
  }

  return {
    originalData: [],
    data: [],
    appliedSorting: new Map(),
    columnsMap: new Map(),

    setState: (state: any) => {
      set(state)
    },

    clearAppliedSorting: () => {
      set({
        appliedSorting: new Map()
      })
    },

    performOneColumnSorting: (accessor: string, column: TableColumn) => {
      const { data, originalData, appliedSorting } = get()

      const order = getNextSortingOrder(accessor)
      const sorterData = sortingEngine.performSorting(data, {
        key: accessor,
        order,
        sortBy: column.sortBy,
        sortingFn: column.sortingFn
      })

      const map = structuredClone(appliedSorting)
      map.clear()
      map.set(accessor, order)

      if (order === SORTING_ORDER.DEFAULT) {
        set({
          data: originalData,
          appliedSorting: new Map()
        })

        return
      }

      set({
        appliedSorting: map,
        data: sorterData
      })
    },

    performMultiSorting: (accessor: string) => {
      updateAppliedSorting(accessor)

      const { data, originalData, appliedSorting, columnsMap } = get()

      const sortBy = mapAppliedSortingMapToArray(appliedSorting, columnsMap)

      if (!sortBy.length) {
        set({ data: originalData })
        return
      }

      const dataToSort = sortBy.length === 1 ? originalData : data
      const sortedData = sortingEngine.performMultiSorting(dataToSort, sortBy)

      set({ data: sortedData })
    }
  }
})

export default useModState
