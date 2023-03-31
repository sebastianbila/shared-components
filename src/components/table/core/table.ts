import { type TableColumnsMap } from '@/components'
import { SearchFeature, SortingFeature } from '@/components/table/features'
import { mapTableColumnsArrayToMap } from '@/components/table/helpers'
import {
  type TableCoreOptions,
  type TableFeatures,
  type TableState
} from '@/components/table/core/types'
import isEqual from 'lodash.isequal'
import { BehaviorSubject, map, of, Subject, switchMap, tap } from 'rxjs'
import { distinctUntilChanged } from 'rxjs/operators'

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
  public readonly initialState = initialState

  public readonly features: TableFeatures

  private readonly state$ = new BehaviorSubject<TableState>(initialState)
  private readonly stateChanges$ = new Subject<Partial<TableState>>()
  private readonly options$ = new BehaviorSubject<TableCoreOptions>(
    initialOptions
  )

  constructor() {
    // initialize features
    this.features = {
      sorting: new SortingFeature(),
      search: new SearchFeature()
    }

    // watch on local state change to compose and emit state
    this.stateChanges$
      .pipe(
        distinctUntilChanged(isEqual),
        switchMap((newState) => {
          const composedState = {
            ...this.state$.value,
            ...newState,
            __initial: false
          }

          this.options$.value.onStateChange(composedState)
          return of(composedState).pipe(map(() => composedState))
        })
      )
      .subscribe(this.state$)

    // merge options and enable features
    this.options$
      .pipe(
        distinctUntilChanged(isEqual),
        switchMap((options: TableCoreOptions) => {
          const composedOptions = { ...this.options$.value, ...options }

          return of(composedOptions)
        }),
        tap((options) => {
          if (options.state.__initial) {
            this.emitState({
              columns: options.columns,
              data: options.data,
              originalData: options.data
            })

            this.initFeatures()
            return
          }

          this.emitState(options.state)
          this.useFeatures()
        })
      )
      .subscribe(this.options$)
  }

  private get options(): TableCoreOptions {
    return this.options$.value
  }

  private get state(): TableState {
    return this.state$.value
  }

  private get columnsMap(): TableColumnsMap {
    return mapTableColumnsArrayToMap(this.state.columns)
  }

  public readonly setOptions = (options: TableCoreOptions): void => {
    this.options$.next(options)
  }

  public unsubscribe = (): void => {
    this.options$.unsubscribe()
    this.state$.unsubscribe()
    this.stateChanges$.unsubscribe()

    Object.keys(this.features).forEach((key: string) =>
      this.features[key]?.unsubscribe?.()
    )
  }

  private readonly emitState = (newState: Partial<TableState>): void => {
    this.stateChanges$.next(newState)
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
    // Sorting feature
    if (this.options.enableSorting) {
      this.features.sorting.setOptions({
        state: this.state,
        columnsMap: this.columnsMap,
        enableMultiSorting: this.options.enableMultiSorting,
        onStateChange: (state) => {
          this.emitState(state)
        }
      })
    }

    // Search feature
    if (this.options.enableSearch) {
      this.features.search.setOptions({
        state: this.state,
        searchFor: this.options.searchFor || '',
        onStateChange: (state) => {
          this.emitState(state)
        }
      })
    }
  }
}

export default TableCore
