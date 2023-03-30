import { type RowsData } from '@/components'

export interface SearchState {
  data: RowsData
}

export interface SearchFeatureOptions {
  searchFor?: string
  onStateChange: (SearchState) => void
}
