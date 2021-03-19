import {
  AsyncConfigurator,
  BaseConfigurator,
  Context,
  StateConfigurator,
  TriggerConfigurator,
} from "./index.ts";

export type StateHook<S, E> = (state: S, context: Context<S, E>) => void;
export type TransitionHook<S, E> = (
  fromState: S,
  toState: S,
  context: Context<S, E>,
) => void;

export type TransitionAction<S, E> = (
  fromState: S,
  toState: S,
  context: Context<S, E>,
) => void;
export type Condition<S, E> = (context: Context<S, E>) => boolean;

export interface TransitionConfigurator<S, E>
  extends
    BaseConfigurator<S, E>,
    StateConfigurator<S, E>,
    TriggerConfigurator<S, E>,
    AsyncConfigurator<S, E> {
  withAction(action: TransitionAction<S, E>): TransitionConfigurator<S, E>;
  withCondition(condition: Condition<S, E>): TransitionConfigurator<S, E>;
}
