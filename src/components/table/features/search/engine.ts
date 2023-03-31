import { type Dictionary } from '@/types'

class SearchEngine {
  public performSearch(searchFor: string, data: Dictionary[]): Dictionary[] {
    const result = []

    for (const item: Dictionary of data) {
      if () {
        result.push(this.matchesSearchTerm(searchFor, data))
      }
    }

    return result
  }

  private matchesSearchTerm(searchFor, item): any {
    const query = searchFor.toLowerCase().toString()

    const result = new Set()


    for (const value of Object.values(item)) {
      if (typeof value === 'string' && value.toLowerCase().includes(query)) {
        return true
      }

      if (Array.isArray(value)) {
        // ..preform for array
      }


      // this.matchesSearchTerm(searchFor, value)

      // // means it's object
      Object.keys(value).forEach((key) => {
        if (
          value[key] &&
          typeof value[key] !== 'object' &&
          String(value[key]).toLowerCase() === query
        ) {
          result.add(value)
        }
      })
    }
    return result
  }
}

export default SearchEngine
