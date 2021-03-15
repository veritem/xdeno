export interface configOpts {
  stateEnterHooks?: StateHook[];
  stateExitHooks?: StateHook[];
  stateChangeHooks?: StateHook[];
  transitionHooks?: StateHook[];
  unhandledEventHooks?: StateHook[];
}

export type StateHook = {
  state: string;
};

export type { InvokeEachParam, TaskParameter } from "./FunctionParameters.ts";
export type { StateMachine } from "./Statemachine.ts";
export type { Context } from "./context.ts";
