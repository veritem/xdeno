// deno-lint-ignore-file
import { StateMachine } from "./Statemachine.ts";

export interface Context<S, E> {
  stateMachine: StateMachine<S, E>;
  event?: E;
  eventPayload?: any;
  result?: any;
  error?: Error;
}
