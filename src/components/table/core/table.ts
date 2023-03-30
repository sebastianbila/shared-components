import { type TableColumnsMap } from '@/components'
import { SearchFeature, SortingFeature } from '@/components/table/features'
import { mapTableColumnsArrayToMap } from '@/components/table/helpers'
import {
  type TableCoreOptions,
  type TableFeatures,
  type TableState
} from '@/components/table/core/types'
import cloneDeep from 'lodash.clonedeep'
import isEqual from 'lodash.isequal'

const initialState = {
  columns: [],
  __initial: true,
  appliedSorting: new Map()
}

const initialOptions: TableCoreOptions = {
  onStateChange: () => {},
  columns: [],
  state: initialState
}

class TableCore {
  public features: TableFeatures
  private options: TableCoreOptions = initialOptions

  private state: TableState = initialState

  constructor() {
    this.features = {
      sorting: new SortingFeature(),
      search: new SearchFeature()
    }
  }

  private get columnsMap(): TableColumnsMap {
    return mapTableColumnsArrayToMap(this.state.columns)
  }

  public createTable = (options: TableCoreOptions): TableCore => {
    this.options = Object.assign(this.options, options)

    if (options.state.__initial) {
      this.setState({
        originalData: options.data,
        data: options.data,
        columns: options.columns,
        __initial: false
      })

      this.initFeatures()
    }

    if (!isEqual(this.options.state, options.state)) {
      this.setState(options.state)
    }

    this.useFeatures()

    return this
  }

  public readonly setState = (
    state: TableState | Partial<TableState>
  ): void => {
    const newState = cloneDeep({ ...this.state, ...state })

    this.state = newState
    this.options.onStateChange(newState as TableState)
  }

  private initFeatures(): void {
    if (this.options.enableSorting) {
      this.enableSorting()
    }
  }

  private readonly enableSorting = (): void => {
    this.features.sorting.setOptions({
      state: this.state,
      columnsMap: this.columnsMap,
      enableMultiSorting: this.options.enableMultiSorting,
      onStateChange: (state) => {
        this.setState(state)
      }
    })

    this.setState({
      handleSorting: this.features.sorting.performSorting,
      resetSorting: this.features.sorting.resetSorting
    })
  }

  private useFeatures(): void {
    if (this.options.enableSorting) {
      this.useSorting()
    }

    console.log('o', this.options.searchFor)
  }

  private readonly useSorting = (): void => {
    this.features.sorting.setOptions({
      state: this.state,
      columnsMap: this.columnsMap,
      enableMultiSorting: this.options.enableMultiSorting,
      onStateChange: (state) => {
        this.setState(state)
      }
    })
  }
}

export default TableCore
