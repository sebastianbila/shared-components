import { type Dictionary } from '@/types'

class SearchEngine {
  // public performSearch(searchFor: string, data: Dictionary[]): Dictionary[] {
  //   const result = []
  //   const query = searchFor.toLowerCase()
  //
  //   const searchFields = ['name', 'age']
  //
  //   return data.filter((object) => {
  //     const keys = Object.keys(object)
  //
  //     return keys.some((key) => {
  //       const value = object[key]
  //
  //       if (searchFields.includes(key)) {
  //         return String(value).toLowerCase().includes(query.toLowerCase())
  //       }
  //       return false
  //     })
  //   })
  // }

  public performSearch(
    searchFor: string,
    data: Dictionary[],
    fields?: string[]
  ): Dictionary[] {
    return this.deepSearch(searchFor, data)
  }

  deepSearch(
    searchValue,
    data,
    options = { caseSensitive: false }
  ): Dictionary[] {
    const results = []

    for (let i = 0; i < data.length; i++) {
      const item = data[i]

      if (typeof item === 'object') {
        for (const key in item) {
          const value = item[key]

          if (Array.isArray(value)) {
            const nestedResults = this.deepSearch(value, searchValue, options)
            if (nestedResults.length > 0) {
              item[key] = nestedResults
              results.push(item)
            }
          } else if (typeof value === 'object') {
            const nestedResults = this.deepSearch([value], searchValue, options)
            if (nestedResults.length > 0) {
              item[key] = nestedResults[0]
              results.push(item)
            }
          } else if (
            this.compareValues(value, searchValue, options.caseSensitive)
          ) {
            results.push(item)
          }
        }
      } else if (this.compareValues(item, searchValue, options.caseSensitive)) {
        results.push(item)
      }
    }

    return results
  }

  compareValues(
    value: string | number,
    searchValue: string,
    caseSensitive: boolean
  ): boolean {
    if (!caseSensitive) {
      value = value.toString().toLowerCase()
      searchValue = searchValue.toString().toLowerCase()
    }

    return String(value) === searchValue
  }
}

export default SearchEngine
