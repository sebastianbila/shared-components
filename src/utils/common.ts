import { type Dictionary, type NestedAttributeReturnType } from '@/types'

export function getNestedAttribute(
  data: Dictionary,
  attribute: string
): NestedAttributeReturnType {
  const keys = attribute.split('.')
  let value = structuredClone(data)
  let path: string = ''

  for (let i = 0; i < keys.length; i++) {
    const key: string = keys[i]
    path += path ? '.' : ''

    if (key.includes('[')) {
      const entity = key.split(/[[\]]+/)
      const prop = entity[0]
      const index = entity[1] || 0

      value = value[prop][index]
      path += `[${prop}][${index}]`
    } else {
      value = value[key]
      path += key
    }
  }

  return {
    path,
    value
  }
}
