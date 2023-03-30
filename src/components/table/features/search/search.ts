import { type SearchFeatureOptions } from './types'

class SearchFeature {
  options: SearchFeatureOptions

  setOptions = (options: SearchFeatureOptions): void => {
    this.options = { ...this.options, ...options }
  }
}

export default SearchFeature
