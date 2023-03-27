import { type AppliedSorting, type SortBy } from '@/components/table/features'

export function convertAppliedSortingMapToArray(
  appliedSorting: AppliedSorting
): SortBy {
  const sortingObject = Object.fromEntries(appliedSorting)

  console.log('appliedSorting', appliedSorting)
  console.log('sortingObject', sortingObject)
  return Object.keys(sortingObject).map((accessor: string) => ({
    key: accessor,
    order: sortingObject[accessor]
  }))
}
