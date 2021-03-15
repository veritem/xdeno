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
