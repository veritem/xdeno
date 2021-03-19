// deno-lint-ignore-file no-explicit-any
import { Configuration, Context, TransitionConfigurator } from "./index.ts";
import { TransitionHook } from "./index.ts";

export type StateHook<S, E> = (state: S, context: Context<S, E>) => void;
export type UnhandledEventHook<S, E> = (
  event: E,
  state: S,
  context: Context<S, E>,
) => void;

export interface StateMachine<S, E> {
  getCurrentState(): S;
  getStateHierarchy(): S[];
  canHandle(event: E, eventPayload?: any): boolean;
  handle(event: E, eventPayload?: any): StateMachine<S, E>;
}

export interface GlobalConfigurator<S, E>
  extends BaseConfigurator<S, E>, StateMachineConfigurator<S, E> {
  onStateEnter(hook: StateHook<S, E>): GlobalConfigurator<S, E>;
  onStateExit(hook: StateHook<S, E>): GlobalConfigurator<S, E>;
  onTransition(hook: TransitionHook<S, E>): GlobalConfigurator<S, E>;
  onStateChange(hook: TransitionHook<S, E>): GlobalConfigurator<S, E>;
  onUnhandledEvent(hook: UnhandledEventHook<S, E>): GlobalConfigurator<S, E>;
}

export interface TriggerConfigurator<S, E> extends BaseConfigurator<S, E> {
  transitionTo(targetState: S): TransitionConfigurator<S, E>;
  selfTransition(): TransitionConfigurator<S, E>;
  internalTransition(): TransitionConfigurator<S, E>;
  ignore(): TransitionConfigurator<S, E>;
}

export interface BaseConfigurator<S, E> {
  getConfig(): Configuration<S, E>;
}

export interface StateMachineConfigurator<S, E> extends BaseConfigurator<S, E> {
  global(): GlobalConfigurator<S, E>;
  initialState(state: S): StateConfigurator<S, E>;
  state(state: S): StateConfigurator<S, E>;
  start(): StateMachine<S, E>;
}

export interface StateConfigurator<S, E>
  extends BaseConfigurator<S, E>, StateMachineConfigurator<S, E> {
  onEnter(action: StateAction<S, E>): StateConfigurator<S, E>;
  onExit(action: StateAction<S, E>): StateConfigurator<S, E>;
  on(event: E): TriggerConfigurator<S, E>;
  onAny(): TriggerConfigurator<S, E>;
  onTimeout(timeout: number): TriggerConfigurator<S, E>;
  do(asyncOperation: AsyncOperation<S, E>): AsyncConfigurator<S, E>;
  submachine<S2>(
    submachineConfig: Configuration<S2, E>,
  ): StateConfigurator<S, E>;
}

export type StateAction<S, E> = (state: S, context: Context<S, E>) => void;
export type AsyncOperation<S, E> = (
  state: S,
  context: Context<S, E>,
) => Promise<any>;

export interface AsyncConfigurator<S, E> extends BaseConfigurator<S, E> {
  onSuccess(): TriggerConfigurator<S, E>;
  onFailure(): TriggerConfigurator<S, E>;
}
