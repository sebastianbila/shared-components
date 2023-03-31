import { type ComposerOptions } from './types'
import { BehaviorSubject } from 'rxjs'

export abstract class Composer<State, Options> {
  protected readonly initialState: State
  protected options$: BehaviorSubject<Options>

  protected constructor(
    initialState?: Partial<State>,
    initialOptions?: Partial<Options>
  ) {
    if (initialState) {
      this.initialState = initialState
    }

    this.options$ = new BehaviorSubject<Options>(initialOptions as Options)
  }

  protected get options(): Options {
    return this.options$.value
  }

  protected get state(): State {
    return {
      ...this.initialState,
      ...(this.options.state as State)
    }
  }

  public readonly setOptions = (options: Options & ComposerOptions): void => {
    this.options$.next(options)
  }

  public unsubscribe = (): void => {
    this.options$.unsubscribe()
  }

  protected readonly emitState = (newState: Partial<State>): void => {
    this.options.onStateChange({ ...this.state, ...newState })
  }
}
