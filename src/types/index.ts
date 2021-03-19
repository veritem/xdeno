//deno-lint-ignore-file no-empty-interface
export interface configOpts {
  stateEnterHooks?: StateHook[];
  stateExitHooks?: StateHook[];
  stateChangeHooks?: StateHook[];
  transitionHooks?: StateHook[];
  unhandledEventHooks?: StateHook[];
}

export interface Configuration<S, E> {}

export type StateHook = {
  state: string;
};

export type { InvokeEachParam, TaskParameter } from "./FunctionParameters.ts";
export type { StateMachine } from "./Statemachine.ts";
export type { Context } from "./context.ts";
export type { TransitionConfigurator, TransitionHook } from "./Transition.ts";
export type {
  AsyncConfigurator,
  BaseConfigurator,
  StateConfigurator,
  StateMachineConfigurator,
  TriggerConfigurator,
} from "./StateMachine.ts";
