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
  columns: []
}

const initialOptions: TableCoreOptions = {
  onStateChange: () => {},
  columns: [],
  state: initialState
}

class TableCore {
  public features: TableFeatures
  public state: TableState = initialState
  private options: TableCoreOptions = initialOptions

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
      this.emitState({
        columns: options.columns,
        data: options.data,
        originalData: options.data
      })
      this.initFeatures()

      return
    }

    if (!isEqual(this.state, options.state)) {
      this.emitState(options.state)
    }

    this.useFeatures()
  }

  private readonly emitState = (
    newState: TableState | Partial<TableState>
  ): void => {
    const _composedState = cloneDeep({
      ...this.state,
      ...newState,
      __initial: false
    })

    this.state = _composedState
    this.options.onStateChange(_composedState)
  }

  private initFeatures(): void {
    if (this.options.enableSorting) {
      this.emitState({
        handleSorting: this.features.sorting.performSorting,
        resetSorting: this.features.sorting.resetSorting
      })
    }
  }

  private useFeatures(): void {
    if (this.options.enableSorting) {
      this.useSorting()
    }

    if (this.options.enableSearch) {
      this.features.search.setOptions({
        state: this.state,
        searchFor: this.options.searchFor || '',
        onStateChange: (state) => {
          // this.emitState(state)
        }
      })
      this.features.search.performSearch()
    }
  }

  private readonly useSorting = (): void => {
    this.features.sorting.setOptions({
      state: this.state,
      columnsMap: this.columnsMap,
      enableMultiSorting: this.options.enableMultiSorting,
      onStateChange: (state) => {
        this.emitState(state)
      }
    })
  }
}

export default TableCore
