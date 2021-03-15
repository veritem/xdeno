// deno-lint-ignore-file no-explicit-any
export interface StateMachine<S, E> {
  getCurrentState(): S;
  getStateHierarchy(): S[];
  canHandle(event: E, eventPayload?: any): boolean;
  handle(event: E, eventPayload?: any): StateMachine<S, E>;
}
