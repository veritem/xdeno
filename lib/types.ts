// export type StateHook<S, E> = (state: S, context: Context<S, E>) => void;

// export interface Context<S, E> {
//   stateMachine: StateMachine<S, E>;
//   event?: E;
//   eventPayload?: any;
//   result?: any;
//   error?: Error;
// }

// // export interface StateMachine<S, E> {
// //   getCurrentState(): S;
// //   getStateHierarchy(): S[];
// //   canHandle(event: E, eventPayload?: any): boolean;
// //   handle(event: E, eventPayload?: any): StateMachine<S, E>;
// // }

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
