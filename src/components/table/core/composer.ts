import { type ComposeOptions } from './types'

export class Composer<Options extends ComposeOptions, State> {
  protected options: Options
  protected readonly initialState: State

  constructor(initialState?: State, initialOptions?: Options) {
    if (initialState) {
      this.initialState = initialState
    }

    if (initialOptions) {
      this.options = initialOptions
    }
  }

  protected get state(): State {
    return {
      ...this.initialState,
      ...(this.options.state as State)
    }
  }

  public readonly setOptions = (options: Options): void => {
    this.options = options
  }

  protected readonly emitState = (newState: Partial<State>): void => {
    this.options.onStateChange({ ...this.state, ...newState })
  }
}
