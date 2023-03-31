import { TableCore, type TableOptions, type TableState } from '../core'

import { useEffect, useState } from 'react'

const tableCore = new TableCore()

function useTable(options: TableOptions): any {
  const [state, setState] = useState<TableState>(tableCore.initialState)

  useEffect(() => {
    return () => {
      tableCore.unsubscribe()
    }
  }, [])

  tableCore.setOptions({
    ...options,
    state,
    onStateChange: (_state) => {
      setState(_state)
      return _state
    }
  })

  return state
}

export default useTable
