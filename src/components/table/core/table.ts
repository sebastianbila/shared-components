import { type PrivateTableState, type TableColumnsMap } from '@/components'
import { SortingFeature } from '@/components/table/features'
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
  appliedColumns: new Map()
}

const initialOptions: TableCoreOptions = {
  onStateChange: () => {},
  columns: [],
  state: initialState
}

class TableCore {
  public features: TableFeatures
  private options: TableCoreOptions = initialOptions

  constructor() {
    this.features = {
      sorting: new SortingFeature()
    }
  }

  public get state(): TableState {
    return this.options.state
  }

  private get columnsMap(): TableColumnsMap {
    return mapTableColumnsArrayToMap(this.state.columns)
  }

  public createTable = (options: TableCoreOptions): TableCore => {
    this.options = Object.assign(this.options, options)

    if ((options.state as PrivateTableState).__initial) {
      this.setState({
        originalData: options.data,
        data: options.data,
        columns: options.columns,
        __initial: false
      })

      // NOTE temp trick
      setTimeout(() => {
        this.initFeatures()
      })
    }

    if (!isEqual(this.state, options.state)) {
      this.setState(options.state)
    }

    return this
  }

  public readonly setState = (
    state: PrivateTableState | Partial<PrivateTableState>,
    overwrite: boolean = false
  ): void => {
    if (overwrite) {
      this.options.onStateChange(state as TableState)
      return
    }

    const newState = cloneDeep({ ...this.state, ...state })
    delete newState.__initial
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
}

export default TableCore
