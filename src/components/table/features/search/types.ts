import { type BaseTableState, type TableState } from '@/components'

export interface SearchState extends Required<BaseTableState> {}

export interface SearchOptions {
  enableSearch: boolean
  searchFor: string
}

export interface PrivateSearchOptions extends Pick<SearchOptions, 'searchFor'> {
  state: TableState
  onStateChange: (state: SearchState) => void
}
