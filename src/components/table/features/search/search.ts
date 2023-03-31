import { debounceTime, distinctUntilChanged } from 'rxjs/operators'
import isEqual from 'lodash.isequal'
import isEmpty from 'lodash.isempty'
import { Composer } from '@/components/table/core/composer'
import { type PrivateSearchOptions, type SearchState } from './types'
import SearchEngine from './engine'

const initialState: SearchState = {
  originalData: [],
  data: []
}

class SearchFeature extends Composer<SearchState, PrivateSearchOptions> {
  private readonly engine: SearchEngine

  constructor() {
    super(initialState, { searchFor: '' })

    this.engine = new SearchEngine()

    const comparator = (
      a: PrivateSearchOptions,
      b: PrivateSearchOptions
    ): boolean => {
      return isEqual(a.searchFor, b.searchFor)
    }

    this.options$
      .pipe(distinctUntilChanged(comparator), debounceTime(500))
      .subscribe(({ searchFor }: PrivateSearchOptions) => {
        if (!isEmpty(searchFor)) {
          this.performSearch()
          return
        }

        this.emitState({
          data: this.state.originalData
        })
      })
  }

  public performSearch = (): void => {
    const data = this.engine.performSearch(
      this.options.searchFor,
      this.state.originalData
    )

    this.emitState({
      data
    })
  }
}

export default SearchFeature
