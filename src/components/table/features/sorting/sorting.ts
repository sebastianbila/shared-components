import { type TableColumn } from '@/components/table'
import {
  type HandleSortingFn,
  SORTING_ORDER,
  type SortingOptions,
  type SortingState
} from './types'
import SortingEngine from './engine'
import { mapAppliedSortingMapToArray } from '@/components/table/helpers'
import { type Dictionary } from '@/types'

const initialOptions = {
  data: [],
  columnsMap: new Map(),
  state: {
    data: [],
    originalData: [],
    appliedSorting: new Map()
  }
}

class SortingFeature {
  private options: SortingOptions = initialOptions as SortingOptions

  private readonly sortingEngine: SortingEngine

  constructor() {
    this.sortingEngine = new SortingEngine()
  }

  private get state(): SortingState {
    return this.options.state as SortingState
  }

  public setOptions = (options: SortingOptions): void => {
    this.options = options
  }

  public resetSorting = (): void => {
    this.setState({
      appliedSorting: new Map(),
      data: this.state.originalData
    })
  }

  public performSorting: HandleSortingFn = (accessor, column) => {
    if (this.options.enableMultiSorting) {
      this.performMultiSorting(accessor, column)
      return
    }

    this.performOneColumnSorting(accessor, column)
  }

  private readonly performOneColumnSorting: HandleSortingFn = (
    accessor,
    column
  ): void => {
    const { appliedSorting } = this.state

    const order = this.getNextSortingOrder(accessor)

    appliedSorting.clear()
    appliedSorting.set(accessor, {
      order,
      key: accessor,
      sortBy: column.sortBy,
      sortingFn: column.sortingFn
    })

    if (order === SORTING_ORDER.DEFAULT) {
      this.setState({
        data: this.state.originalData,
        appliedSorting: new Map()
      })

      return
    }

    const sortedData = this.sortingEngine.performSorting(
      this.state.data,
      appliedSorting.get(accessor)
    )

    this.setState({
      data: sortedData,
      appliedSorting
    })
  }

  private readonly performMultiSorting: HandleSortingFn = (
    accessor: string,
    column: TableColumn
  ): void => {
    this.updateAppliedSorting(accessor, column)

    const { data, appliedSorting } = this.state

    const sortBy = mapAppliedSortingMapToArray(
      appliedSorting,
      this.options.columnsMap
    )

    if (!sortBy.length) {
      this.setState({
        data: this.state.originalData
      })
      return
    }

    const dataToSort = sortBy.length === 1 ? this.state.originalData : data
    const sortedData = this.sortingEngine.performMultiSorting(
      dataToSort as Dictionary[],
      sortBy
    )

    this.setState({
      data: sortedData
    })
  }

  private readonly updateAppliedSorting = (
    accessor: string,
    column: TableColumn
  ): void => {
    const { appliedSorting } = this.state

    const order = this.getNextSortingOrder(accessor)

    // Delete from map if sorting is default
    if (order === SORTING_ORDER.DEFAULT) {
      appliedSorting.delete(accessor)
    } else {
      appliedSorting.set(accessor, {
        key: accessor,
        order,
        sortBy: column.sortBy,
        sortingFn: column.sortingFn
      })
    }

    this.setState({ appliedSorting })
  }

  private readonly getNextSortingOrder = (accessor: string): SORTING_ORDER => {
    const { appliedSorting } = this.state

    const orderMatching = {
      [SORTING_ORDER.ASC]: SORTING_ORDER.DESC,
      [SORTING_ORDER.DESC]: SORTING_ORDER.DEFAULT,
      [SORTING_ORDER.DEFAULT]: SORTING_ORDER.ASC
    }

    const currentColumnOrder =
      appliedSorting.get(accessor)?.order ?? SORTING_ORDER.DEFAULT

    return orderMatching[currentColumnOrder]
  }

  private readonly setState = (newState: Partial<SortingState>): void => {
    this.options.onStateChange({ ...this.state, ...newState })
  }
}

export default SortingFeature
