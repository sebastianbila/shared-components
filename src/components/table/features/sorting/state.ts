import { create } from 'zustand'
import { type RowsData } from '@/components'
import { type AppliedSorting, SORTING_ORDER } from './types'
import { convertAppliedSortingMapToArray } from './helpers'
import SortingEngine from './engine'

interface UseSortingState {
  data: RowsData
  originalData: RowsData
  setState: (state: any) => void
  appliedSorting: AppliedSorting
  clearAppliedSorting: () => void
  makeSorting: (accessor: string) => RowsData
  makeMultiSorting: (accessor: string) => RowsData
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

    setState: (state: any) => {
      set(state)
    },

    clearAppliedSorting: () => {
      set({
        appliedSorting: new Map()
      })
    },

    makeSorting: (accessor: string) => {
      const { data, originalData, appliedSorting } = get()

      const order = getNextSortingOrder(accessor)
      const sorterData = sortingEngine.performSorting(data, accessor, order)

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

    makeMultiSorting: (accessor: string) => {
      updateAppliedSorting(accessor)

      const { data, originalData, appliedSorting } = get()

      const sortBy = convertAppliedSortingMapToArray(appliedSorting)
      const dataToSort = sortBy.length === 1 ? originalData : data

      const sortedData = sortingEngine.performMultiSorting(dataToSort, sortBy)

      set({ data: sortedData })
    }
  }
})

export default useModState
