import { TableCore, type TableOptions, type TableState } from '../core'

import { useState } from 'react'

const tableCore = new TableCore()

function useTable(options: TableOptions): any {
  const [state, setState] = useState<TableState>(tableCore.state)

  tableCore.createTable({
    ...options,
    state,
    onStateChange: (state) => {
      setState(state)
    }
  })

  return state
}

export default useTable
