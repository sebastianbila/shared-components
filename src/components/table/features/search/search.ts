import { type PrivateSearchOptions, type SearchState } from './types'
import { type PrivateSortingState } from '@/components/table/features'
import { Composer } from '@/components/table/core/composer'

const initialState: SearchState = {
  originalData: [],
  data: []
}

class SearchFeature extends Composer<
  PrivateSearchOptions,
  PrivateSortingState
> {
  public performSearch = (): void => {
    console.log('searh by', this.options.searchFor)
  }
}

export default SearchFeature
