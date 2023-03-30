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
  __initial: true,
  columns: [],
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

  public createTable = (options: TableCoreOptions): void => {
    this.options = Object.assign(this.options, options)

    if (this.options.state.__initial) {
      this.setState({
        columns: options.columns,
        data: options.data,
        originalData: options.data
      })
      this.initFeatures()

      return
    }

    if (!isEqual(this.state, options.state)) {
      this.setState(options.state)
    }

    this.useFeatures()
  }

  private readonly setState = (
    state: TableState | Partial<TableState>
  ): void => {
    const newState = cloneDeep({
      ...this.state,
      ...state,
      __initial: false
    })

    this.state = newState
    this.options.onStateChange(newState)
  }

  private initFeatures(): void {
    if (this.options.enableSorting) {
      this.setState({
        handleSorting: this.features.sorting.performSorting,
        resetSorting: this.features.sorting.resetSorting
      })
    }
  }

  private useFeatures(): void {
    if (this.options.enableSorting) {
      this.useSorting()
    }
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
